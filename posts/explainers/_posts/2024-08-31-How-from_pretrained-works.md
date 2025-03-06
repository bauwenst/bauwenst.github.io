---
layout: post

title: How does HuggingFace's from_pretrained() know which weights in a checkpoint go where?
description: I dove deep so you don't have to.

tags: checkpoints
---
The famous `roberta-base` HuggingFace checkpoint is a serialised version of a `RobertaForMaskedLM` model, consisting of a `roberta` field and an `lm_head` field. Yet, despite this, you can still call `.from_pretrained("roberta-base")` on `RobertaForTokenClassification` and get an object that has a `roberta` field with exactly the checkpoint's `roberta` weights, but a head with a different architecture and randomly initialised weights. Even more strikingly, you can call `.from_pretrained("roberta-base")` on `RobertaModel`, which is what normally sits *inside* that `roberta` field and consists of the fields `embeddings` and `encoder`, and somehow it can *still* match all the relevant checkpoint weights to the correct fields. Ever wondered how that's done? Here's how.

1. dummy
{:toc}

# Goal
I was working on my latest new Python package [ArchIt](https://github.com/bauwenst/ArchIt), which is an alternative to how HuggingFace adapts models for different tasks and will soon be used to drive my language model training package [LaMoTO](https://github.com/bauwenst/LaMoTO). The goal was as follows: given a checkpoint `"checkpoint"` of the form
```
XyzForMaskedLM(
|    (xyz) XyzModel(...)
|    (lm_head) MaskedLMHead(...)
)
```
where `"xyz"` is actually any of the HuggingFace transformer model names listed [here](https://github.com/huggingface/transformers/tree/main/src/transformers/models) (e.g. the `roberta-base` checkpoint, which is a `RobertaForMaskedLM` and has a `"roberta"` field of type `RobertaModel`), and given a new architecture with fixed field names, like
```
Skeleton(
|   (model) Wrapper(
|   |   (core) XyzModel(...)
|   )
|   (head) ...
)
```
we want to implement this new class's `.from_pretrained()` method such that `Skeleton.from_pretrained("checkpoint")` copies the weights of the `xyz` field (i.e. `bert`, `roberta`, `deberta`, `electra`, etc...) into the `model.core` field and (trivially) ignore the head parameters. In essence, we want to copy the *headless* base model that lives inside a *heady*[^1] checkpoint under a field name that can vary, to a nested field of a new heady architecture with fixed name.

Additionally, we want to allow the checkpoint to be headless itself (e.g. a `RobertaModel` checkpoint, which doesn't exist publicly AFAIK).

Additionally, we want to allow the checkpoint to be a literal `Skeleton` checkpoint already with the same exact structure.

# The prefix system
So, what is the intelligent matching system PyTorch/HuggingFace have come up with that maps checkpoint weights to a given uninitialised model skeleton? Does it use some kind of fancy best-approximation algorithm trying to match matrix sizes? If that was the case, then there would be nothing to solve here, because no matter where the relevant weights would live in the checkpoint, they would be matched to the correct, possibly deeply nested fields in the skeleton we call `.from_pretrained()` on. Unfortunately, it's actually much dumber than that.

When a PyTorch `Module` hierarchy is saved, all the tensors that can be found inside it are gathered in a "state dictionary" of type `Dict[str, Tensor]` wherein every tensor is identified by a dot-separated sequence of fields to traverse to get to it. For example: `roberta-base` has a tensor identified by the string `"roberta.embeddings.word_embeddings.weight"` in this dictionary. Although the dictionary is only one level deep, its keys still implicitly define a hierarchy (keys with fewer dots live at a shallower depth in the model).

As explained, in HuggingFace, you have headless models and heady models. A headless model's top-level modules are its immediate components like embeddings and an encoder and so on. A heady model's top-level modules have one special module among them that is itself a headless model, stored in a field with a pre-determined name called the "prefix" associated with that headless model. The prefix for RoBERTa is "roberta", which means that all heady models containing RoBERTa have at least a field named "roberta". On the other hand, the headless model has no field "roberta".

The assumption is that you only ever call `.from_pretrained()` between a skeleton and a checkpoint of models that have the same prefix. That gives 4 possible variations to support:
1. Headless model initialised from a headless checkpoint: this should be a full copy-paste of the entire state dictionary;
2. Headless model initialised from a heady checkpoint: `RobertaModel.from_pretrained("roberta-base")`;
3. Heady model initialised from a headless checkpoint;
4. Heady model initialised from a heady checkpoint: `RobertaForTokenClassification.from_pretrained("roberta-base")`.

Weights are simply matched as follows: *for each heady model involved, strip away the prefix, and then look up the exact tensor keys expected by the skeleton that way.* You effectively reduce cases 2, 3 and 4 to case 1. For example, in the fourth case, all keys in the state dictionary except those related to the head will start with `"roberta."`. Similarly, all the keys expected by `RobertaForTokenClassification` except those related to the head start with `"roberta."`. After stripping off both prefixes, the checkpoint should have a tensor `"embeddings.word_embeddings.weight"` and the skeleton should expect[^2] a tensor `"embeddings.word_embeddings.weight"` as well. 

# Transferring weights between models with different prefixes
What we want to do falls outside of the four cases above, since we essentially have two prefixes in play: the checkpoint's weights are prefixed by either `xyz` (heady) or nothing (headless), whilst our skeleton's weights are prefixed by `model.core`.

Here is the problem: the stripping step above happens in the same scope, with the *same* string. It will obviously be impossible to get an exact match between the keys of the two state dictionaries involved by stripping off the same string: finding the headless model's checkpoint weights requires trimming the `"xyz"` prefix from all keys, yet we want them to be matched to the fields you get by trimming `"model.core"` from our skeleton.

So, how do you strip both prefixes? Here's what I've come up with.

What we know is the following. 
- Since you can't strip the prefix off the skeleton (as it is not a dictionary but an object, unlike the loaded checkpoint), `.from_pretrained()` will use the prefix associated with the skeleton to find the field that holds the headless model (with a call `getattr(heady_model, prefix)`) and load into that reference either all the checkpoint's weights (in the case of a headless checkpoint) or only those whose key has the same prefix (heady checkpoints).
- There are plenty of intermediate methods in `.from_pretrained()` that pass around the state dictionary. Since this dictionary is mutable, we can override one of these methods (a [shim](https://en.wikipedia.org/wiki/Shim_(computing))), mutate the keys in the dictionary, and then pass it along to the overridden method as if nothing happened. This really means we can manipulate the keys of the state dictionary in any way we want.

Because our skeleton (`Skeleton`) stores its headless model in a field of a field, the prefix seen in `.from_pretrained()` should clearly be tailored such that the `getattr()` call finds that nested field correctly. It hence has nothing to do with the `xyz` in the checkpoint and basically comes down to looking up `.model.core` in one `getattr()` call, which is possible if you override `.__getattr__()` to support dot-containing field names.

Now that we know the prefix will be `"model.core"`, we have to get rid of the `"xyz"` prefix in the checkpoint keys. We can do that in a shim, provided the user tells us what `xyz` is. This is why [ArchIt adds an extra argument to `.from_pretrained`](https://github.com/bauwenst/ArchIt/blob/23acde86a0984425e34eca3ebb756fa01ceb35a1/src/archit/instantiation/abstracts.py#L397) to declare which backbone is used.

Since the prefix is `"model.core"`, the four cases above will treat every checkpoint with any keys that start with `"model.core"` as a heady checkpoint of whatever is in `core`, and treat every checkpoint without any keys that start with `"model.core"` as a headless checkpoint of `core`. Therefore, when you present an `XyzForMaskedLM` state dictionary, which obviously doesn't have any keys prefixed by `"model.core"`,[^3] it will be seen as if it were a headless checkpoint of `core` and hence all the tensor keys of `core` should be present. By stripping off the `xyz` prefix in the state dictionary, these are exactly the keys present.

In short: HuggingFace thinks that `roberta-base`, a heady checkpoint containing two fields `roberta` and `lm_head`, is a headless checkpoint of a `Skeleton`, and ArchIt exploits this by trimming off the `"roberta."` prefix from the checkpoint's keys, so that when HuggingFace looks them up as you would with an actual headless checkpoint, they are actually found.

There's one very niche issue that remains to be solved in this exploit: whenever HuggingFace thinks you have a headless checkpoint, it actually triggers an assertion error [in the specific case](https://github.com/huggingface/transformers/blob/78b2929c0554b79e0489b451ce4ece14d265ead2/src/transformers/modeling_utils.py#L4311) when `any(key in expected_keys_not_prefixed and key not in base_model_expected_keys for key in loaded_keys)`. In words: it is not allowed that there exists a tensor key that *is* found inside the headless checkpoint and *is* expected by the skeleton but *isn't* expected by the headless part of the skeleton. In other words: a headless checkpoint is not allowed to contain tensors with the a key identical to a tensor in your skeleton's head. In our exploit, the whole point is to pretend that a state dictionary with head tensors is headless, so we run the risk of this error triggering. Hence, head weights cannot be transferred between models if differing prefixes and should be popped from the checkpoint. This is also the reason why you cannot load a `BertForTokenClassification` checkpoint into a `RobertaForTokenClassification` skeleton and vice versa, because the checkpoint will be seen as headless while containing a tensor with the same key as the tensor in the skeleton's head.
{:.note title="Implementation detail" .filled}

The other types of checkpoints we wanted to support are supported without issue: an actual headless checkpoint doesn't need any stripping for the expected keys to be found on a lookup, and a `Skeleton` checkpoint has all its keys starting with `"model.core"` which is the prefix seen by `.from_pretrained()` and hence it will be stripped off, and hence we are done.

# Bonus: Mismatch between HuggingFace's warning system and loading system
HuggingFace normally prints a warning when some of the skeleton's weights could not be found in the given checkpoint. Without a warning, all weights in `model.core` have been loaded successfully, right? 

Not so fast. The way this warning is computed is by comparing the string keys of the skeleton and the checkpoint after adequate prefix stripping, and **it has nothing to do with the code that loads the weights**. Indeed, because these are two separate systems, it is possible that the skeleton is not initialised, and yet the warning system is convinced that the skeleton was initialised.

When does this happen? If you don't override `.__getattr__()` as mentioned above, `hasattr(skeleton, "model.core")` will return false (even though there is a field `model` which itself has a field `core`) and the skeleton's reference won't be updated to `model.core`, preventing access to the fields inside `model.core`. Meanwhile, `skeleton.state_dict()` *will* work, and hence the warning system can clearly see all the tensors inside `model.core` whilst the loading system can't access them.

To actually know the load succeeded, go into [`modeling_utils.py`](https://github.com/huggingface/transformers/blob/main/src/transformers/modeling_utils.py) to the definition of [`load()`](https://github.com/huggingface/transformers/blob/78b2929c0554b79e0489b451ce4ece14d265ead2/src/transformers/modeling_utils.py#L732), and
replace the line that defines `args` by:
```python
print("Checking prefix:", prefix)
missing = []
unexpected = []
args = (state_dict, prefix, local_metadata, True, missing, unexpected, error_msgs)
```
Then, below that, look for the branch that runs when DeepSpeed is *disabled*, and replace the call to `module._load_from_state_dict(*args)` by:
```python
print("\tCandidates:", [key for key in state_dict if key.startswith(prefix) and "." not in key[len(prefix):]])
module._load_from_state_dict(*args)
print("\tMissing:", missing)
print("\tUnexpected:", unexpected)
```
Now you get a perfect picture of which weights are actually taken from the checkpoint to load into your model.

# Conclusion
Now you know the magic behind the seemingly flexible `.from_pretrained()` method, and how you can exploit it to transfer weights between architectures that have different prefixes. My Python package [ArchIt](https://github.com/bauwenst/ArchIt) uses this exploit to bridge the gap between custom architectures and existing HuggingFace checkpoints.


[^1]: "Heady" has [several meanings](https://www.merriam-webster.com/dictionary/heady), one of which is "intelligent".

[^2]: The way you compute which tensors are "expected" is actually decoupled from the way these tensors are set. Given the skeleton, you can get its state dictionary, strip the prefix, and get the set of keys you expect. This is nice for diagnosis. Then, to actually set the tensors that live at field paths that *correspond to* these keys (e.g. setting `roberta.embeddings.word_embeddings.weight` corresponding to the key `"roberta.embeddings.word_embeddings.weight"` which was detected as the stripped key `"embeddings.word_embeddings.weight"`), you obviously can't just "strip off" the first field `roberta` like you stripped off the prefix string `"roberta."`. Rather, [you call `getattr(heady_model, "prefix")`](https://github.com/huggingface/transformers/blob/78b2929c0554b79e0489b451ce4ece14d265ead2/src/transformers/modeling_utils.py#L4309) and continue with this as the model whose fields you are trying to copy into, as if your skeleton was always headless.

[^3]: Technically it's possible, but arguably, anyone who creates a HuggingFace architecture where the head is called `model` is retarded.
