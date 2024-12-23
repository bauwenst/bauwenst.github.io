---
layout: post

title: "Does DeBERTa have infinite context length, and how large is the receptive field of a token?"
description: Disentangling the strangeness of relative distance and more.

tags: Language modelling
---
The promise of [DeBERTa](https://arxiv.org/abs/2006.03654) is that it does away with absolute positional embeddings added at the start of the transformer encoder, and replaces it instead with an attention mechanism that takes into account the relative distance between tokens when doing attention, in every head of every layer. Since absolute positional embeddings [are the only part of a transformer](https://datascience.stackexchange.com/q/120601/141432) whose dimensionality is related to the length of the input, would taking it out mean DeBERTa can process an infinite amount of tokens at once? Let's analyse.

1. dummy
{:toc}

# Theory
## Relative distance
The disentangled attention mechanism of DeBERTa uses relative positional embeddings. The exact mechanism does not matter here; all you should know is that if you take any pair of token positions $$(i_1,j_1)$$ and any other pair of token positions $$(i_2,j_2)$$, the relative positional embedding involved when doing attention within such a pair is the *same* in both pairs if $$i_1 - j_1 = i_2 - j_2$$. Indeed, you can identify that relative positional embedding by this number $$\Delta = i-j$$. The same positional embedding is used any number of times that a token $$i-j$$ removed from another token attends to the latter.

This is in contrast to absolute positional embeddings, where each position $$\{i_1,j_1,i_2,j_2\}$$ contributes its own positional embedding. Here, the positional information involved in attention from position $$i$$ to position $$j$$ is the same as that in attention from position $$j$$ to position $$i$$, namely the $$i$$th and $$j$$th positional embeddings (or at least, what has become of them since they were added to the token embeddings all the way before the first layer of the transformer). We hence also have to limit the possible positions to the $$L$$ indices $$0 \dots L-1$$ and hence a context length of $$L$$.

The same kind of limit obviously has to hold for $$\Delta$$, because we can't store infinitely many relative embeddings either. Here's the twist: instead of limiting the attention distance to a window of $$L$$ acceptable $$\Delta$$ values, DeBERTa clips the $$\Delta$$ values at some point such that past a certain point in both directions, all tokens seem to effectively be equally far away. It remains to have a transformation from $$\Delta$$ to a 0-based indexing system to look up these embeddings. The DeBERTa paper assumes that there are $$L = 2k$$ valid $$\Delta$$ values where they choose $$k = 512$$, and defines the indexing function as

$$
\delta(i, j) = \begin{cases}
    0 & \text{if } i-j \leq -k \\
    2k-1 &\text{if } i-j \geq +k \\
    i-j+k & \text{otherwise}
\end{cases} 
$$

At first glance, this *looks* like how you would parameterise a symmetric window: $$k$$ positions to the left and $$k$$ to the right... right? Look closer. I told you there are $$2k$$ valid $$\Delta$$ values. A token can also attend to itself, the centre of the window. So, if a window has a centre and then $$k$$ positions to its left and $$k$$ to its right, wouldn't there be $$k+k+1 = 2k+1$$ valid $$\Delta$$ values? 

The bodies are buried in the $$\leq$$ sign above: notice how the "otherwise" case, which you would expect contains all valid $$\Delta$$ values, actually cannot produce the value $$0$$ because it automatically lands in the "too far left" case at the top. Here is a clearer definition:

$$
\delta(i, j) = \begin{cases}
    0               & \text{if } \Delta(i,j) < -k \\
    \Delta(i,j) + k & \text{if } -k \leq \Delta(i,j) < +k) \\
    2k-1            & \text{if } +k \leq \Delta(i,j)
\end{cases}
$$

where it is now clear that the middle case (the non-overflowing case) ranges from $$-k$$ tokens to the left of the centre of the window to $$k-1$$ tokens to the right. In other words: the amount of relative positional embeddings is an even number ($$2k$$) because there is one missing to the right of the current token $$i$$.

## Receptive field
As mentioned, a token still attends to all other tokens in DeBERTa, although it can only uniquely identify $$2k - 2$$ distances. The ends, namely $$\delta(i,j) = 0$$ and $$\delta(i,j) = 2k-1$$, are aliases for all tokens that are at least $$k$$ to the left and $$k-1$$ to the right respectively.

Now, imagine that we have a token that obtains clear information from the token $$k-1$$ to the left and $$k-2$$ to the right. Now we move to the *next* layer, and imagine the furthest token to the left of our original token that can see it clearly. It must see our original token at $$k-2$$ tokens removed. Our original token was able to discern a token $$k-2$$ away itself, so the new token effectively has an unambiguous view of all tokens up to $$2 \cdot (k-2)$$ removed. The argument can be extended recursively to find that in layer $$n$$ of a DeBERTa transformer, a token has access to unambiguously located information for all tokens up to $$(k-2)n$$ tokens to the right. The same argument also applies leftwards except with one more token, so $$(k-1)n$$ to the left.

In total, that gives a [*receptive field*](https://theaisummer.com/receptive-field/) of $$1 + (k-2)n + (k-1)n = 1 + (2k-3)n$$ tokens. If you ignore the aliases of the very leftmost and very rightmost token, this increases to $$1 + (2k-1)n$$ tokens, which is the result found in [this article](https://wandb.ai/akshayuppal12/DeBERTa/reports/The-Next-Generation-of-Transformers-Leaving-BERT-Behind-With-DeBERTa--VmlldzoyNDM2NTk2) except they forget the $$+1$$ of the token being in its own receptive field.


# Practice
## Why you need a finite context length
It should go without saying that just because you *can* process an unlimited amount of tokens, that doesn't mean you *should*. There is no standard limit on how many characters can appear in one example of a text corpus. Thus, you should anticipate the case where a dataset accidentally contains an example of millions of characters, resulting in tens of thousands of tokens; either that input tensor makes you run out of memory, and if it doesn't, chances are that it does once you try performing quadratic attention across it. 

Thus, you need some kind of truncation of the input in practice. What to limit it to? One idea would be to demand that the very middle token of this maximal context length should eventually have received unambiguous positional information from the entire context. In other words: set the context length to the receptive field size of that token, which is $$1 + (2k-1)n$$ for an $$n$$-layer model.

## On the other hand, beware of HuggingFace's baked-in context length
DeBERTa has a theoretically infinite context length. So, does HuggingFace's `DebertaTokenizerFast` loaded from a checkpoint with `AutoTokenizer.from_pretrained("microsoft/deberta-base")` have no limit set on the amount of tokens it can produce? Think again. For some reason, it has a context length of 512 built in.

```python
tk = AutoTokenizer.from_pretrained("microsoft/deberta-base")
print(tk.model_max_length)  # You'd expect this to be nothing...

tokens = tk(sentence, truncation=True)["input_ids"]
print(len(tokens))  # Capped at 512 for arbitrarily long sentences.

tokens = tk(sentence, truncation=True, max_length=1_000_000)["input_ids"]
print(len(tokens))  # Capped at 1 000 000.
```

## Absolute embeddings in all the wrong places...
Of course, the world of transformers wouldn't be the world of transformers without extremely messy bookkeeping. 

### Microsoft's issues
The original paper claims twice that DeBERTa adds absolute positional embeddings in its decoder: on page 2, we see

> The disentangled attention mechanism already considers the contents and relative positions of the context words, but not the absolute positions of these words, which in many cases are crucial for the prediction. Consider the sentence “a new store opened beside the new mall” with the italicized words “store” and “mall” masked for prediction. Although the local contexts of the two words are similar, they play different syntactic roles in the sentence. (Here, the subject of the sentence is “store” not “mall,” for example.) These syntactical nuances depend, to a large degree, upon the words’ absolute positions in the sentence, and so it is important to account for a word’s absolute position in the language modeling process. **DeBERTa incorporates absolute word position embeddings right before the softmax layer** where the model decodes the masked words based on the aggregated contextual embeddings of word contents and positions.

and again on page 5

> There are two methods of incorporating absolute positions. The BERT model incorporates absolute positions in the input layer. **In DeBERTa, we incorporate them right after all the Transformer layers but before the softmax layer for masked token prediction,** as shown in Figure 2. In this way, DeBERTa captures the relative positions in all the Transformer layers and only uses absolute positions as complementary information when decoding the masked words. Thus, we call DeBERTa’s decoding component an Enhanced Mask Decoder (EMD). In the empirical study, we compare these two methods of incorporating absolute positions and observe that EMD works much better. 

And yet, there are [no absolute positional embedding weights to be found](https://github.com/microsoft/DeBERTa/issues/52) in the DeBERTa decoder.

It gets worse. The pretrained DeBERTa checkpoints released by Microsoft, like [`deberta-base`](https://huggingface.co/microsoft/deberta-base), actually contain full-on absolute positional embeddings before the first layer, which is unsurprising given that their encoder is preceded by `BertEmbeddings` which [they define](https://github.com/microsoft/DeBERTa/blob/4d7fe0bd4fb3c7d4f4005a7cafabde9800372098/DeBERTa/deberta/bert.py#L223) equivalently to how HuggingFace does. And indeed, once you get Microsoft's implementation working (for which I had to [fix the package myself](https://github.com/bauwenst/DeBERTa-package)), you can't push more than 512 tokens through without a dimensionality error.

On the other hand, Microsoft's implementation does seem to contain [some magic spaghetti code](https://github.com/microsoft/DeBERTa/blob/4d7fe0bd4fb3c7d4f4005a7cafabde9800372098/DeBERTa/apps/models/masked_language_model.py#L30) for adding positionality in terms of "$$z$$-scores", but I'm as lost as you are trying to understand it -- unless you aren't lost, in which case you are less lost than I am and you should probably write a blog post and email it to me.

### HuggingFace's issues
The HuggingFace implementation has the inverse of these problems: it *does not* have the absolute positional embeddings at the start (which is the entire promise of DeBERTa) and hence allows infinite context, but then again its [MLM decoding head](https://github.com/huggingface/transformers/blob/f38590dade57c1f8cf8a67e9409dae8935f8c478/src/transformers/models/deberta/modeling_deberta.py#L1103) also *does not* have the special $$z$$-score logic that Microsoft does have and hence adds no absolute positional information.

HuggingFace's implementation is plagued by one additional issue, which is that [the MLM head architecture doesn't match that in Microsoft's checkpoints](https://github.com/huggingface/transformers/issues/27586#issuecomment-1817882943). Here's what HuggingFace's MLM head looks like for DeBERTa:
```
(cls): DebertaOnlyMLMHead(
|   (predictions): DebertaLMPredictionHead(
|   |   (transform): DebertaPredictionHeadTransform(
|   |   |   (dense): Linear(in_features=768, out_features=768, bias=True)
|   |   |   (transform_act_fn): GELUActivation()
|   |   |   (LayerNorm): LayerNorm((768,), eps=1e-07, elementwise_affine=True)
|   |   )
|   |   (decoder): Linear(in_features=768, out_features=50265, bias=True)
|   )
)
```
and here's what Microsoft's MLM head looks like:
```
(lm_predictions): EnhancedMaskDecoder(
|   (lm_head): BertLMPredictionHead(
|   |   (dense): Linear(in_features=768, out_features=768, bias=True)
|   |   (LayerNorm): LayerNorm((768,), eps=1e-07, elementwise_affine=True)
|   )
)
```
Note: do not mind that HuggingFace has an extra `decoder` layer, because it is there implicitly for Microsoft as well. Microsoft hardcoded weight tying in their implementation, so you will [see the `EnhancedMaskDecoder` access](https://github.com/microsoft/DeBERTa/blob/4d7fe0bd4fb3c7d4f4005a7cafabde9800372098/DeBERTa/apps/models/masked_language_model.py#L117) `self.deberta.embeddings.word_embeddings.weight` which [the `BertLMPredictionHead` then multiplies](https://github.com/microsoft/DeBERTa/blob/4d7fe0bd4fb3c7d4f4005a7cafabde9800372098/DeBERTa/deberta/bert.py#L283) by the result of the `LayerNorm`. The gist of both is the same: take the encoder's $$H$$-dimensional predictions, multiply them by an $$H \times H$$ matrix, apply a layer norm, and then predict the vocabulary with the $$H \times |V|$$ transpose of the embedding matrix.

The problematic mismatch is that a checkpoint from Microsoft contains $$H \times H$$ dense weights named `lm_predictions.lm_head.dense` whereas HuggingFace expects to find those same $$H \times H$$ dense weights under the name `cls.predictions.transform.dense`. It does not find these in Microsoft's checkpoints and hence when you load `DebertaForMaskedLM.from_pretrained("deberta-base")`, you can't actually use it for doing MLM because the $$H \times H$$ matrix between the encoder and the final projection is randomly re-initialised.

# Conclusion
The best setup for using DeBERTa seems to be (1) using the HuggingFace implementation since it lacks the absolute positional embeddings in the input and hence it does not have a predetermined context length, with (2) truncation in the tokeniser (`truncation=True, max_length=...`) such that the context length is informed by the maximum receptive field of a token according to the formula $$1 + (2k-1)n$$ where $$n$$ is the amount of layers in your model and $$k$$ half the amount of relative positional embeddings, which for `deberta-base` ($$n = 12$$ and $$k=512$$) comes out to be 12277, given that you (3) use it for any task that is not MLM unless you want to re-train the entire head.
