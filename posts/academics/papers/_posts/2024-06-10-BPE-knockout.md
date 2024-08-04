---
layout: post

title: "BPE-knockout: Pruning Pre-existing BPE Tokenisers with Backwards-compatible Morphological Semi-supervision"
description: My first ever published paper, in one of the top conferences in NLP.
---
After a harrowing round of peer review earlier this year (story for another day), I'm pleased to say that I am officially a published author. This article gives a short overview of my first paper, [*BPE-knockout: Pruning Pre-existing BPE Tokenisers with Backwards-compatible Morphological Semi-supervision*](https://aclanthology.org/2024.naacl-long.324/). For a more detailed and slightly more technical overview, watch the 13-minute video explainer [here](https://s3.amazonaws.com/pf-user-files-01/u-59356/uploads/2024-05-19/9123qlr/NAACL2024_BPE-knockout.mp4).

1. dummy
{:toc}

*This blog post was also posted to my co-author Pieter's website: [https://pieter.ai/bpe-knockout](https://pieter.ai/bpe-knockout).*

---

Almost a decade ago, [it was incontrovertibly shown](https://aclanthology.org/P16-1162/) that NLP systems could process language as a sequence of sub-word units just as well as (and often better than) processing full words instead. With that, the field of sub-word tokenisation was born, tasked with splitting words into such sub-word units. Riding on the success of [attention in LSTMs](https://arxiv.org/abs/1409.0473) and later [in transformers](https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf), the *byte-pair encoding (BPE)* tokeniser has become the default sub-word tokeniser: it is used in popular models such as LLaMA, the family of GPTs, Mistral etc... and requires no hand-crafted linguistic resources, like the models we train. 

# BPE
Based on the compression algorithm of the same name, BPE works by merging the smallest data unit (characters or bytes) into bigger and bigger units until it no longer can. Training starts by splitting a corpus into words and those words into characters. This set of characters is the alphabet, and is used to initialise the token vocabulary $$V$$. The training algorithm then iteratively finds the most frequently occurring pair of adjacent tokens $$(x,y)$$, concatenates them into a new token $$xy$$ everywhere, adds that to the vocabulary, and remembers this merge $$(x,y) \to xy$$ in a (ordered) list $$M$$. This continues until the vocabulary reaches a pre-set size. That's how easy it is to train a BPE tokeniser $$(V,M)$$. 

Then, to tokenise any new word, it is split into characters, and the list of remembered merges $$M$$ is replayed in order, where any merge that is possible in the given word is applied. Ideally, this segments a word into the most linguistically meaningful units. Unfortunately, BPE has no notion of linguistics, meaning it often merges characters that should definitely stay separated. For example, the BPE tokeniser used in RoBERTa, which has picked up on frequent patterns in the English language, is very quick to merge `e` and `s` into one token `es`. Compound words such as `horseshoe`, which should ideally be segmented into two tokens `horse/shoe`, are predictably botched by BPE:

<span style="display:inline-block; white-space: nowrap; width:92%;">
    <img src="/cdn/img/png/2024/bpe-horseshoe.png" width="100%"/>
</span>

This is one of my favourite images to red-pill people about the dire state of tokenisation. Clearly, there is a need to supplement BPE's unsupervised training with linguistically informed data.

# BPE-knockout
We present BPE-knockout, a post-processing step for existing BPE tokenisers that eliminates problematic merges. Given a dataset that shows the desirable segmentation for sufficiently many words -- in our case, that's a segmentation into morphemes, the building blocks used by the language itself to compose a word, as in the famous `dis/establish/ment/arian/ism` -- we let BPE tokenise the same words and compare the desirable segmentation with BPE's segmentation. Since every merge removes exactly one separation between two characters (by contracting the tokens those characters are part of), the disappearance of a desirable segmentation boundary can be blamed on exactly one merge. We count up how many times $$N(m)$$ every merge $$m\in M$$ is applied and how many times $$B(m)$$ it is blamed out of those. Hence, we know **which merges cause more harm than good overall**, namely when $$B(m)/N(m) \geq \frac12$$ (i.e. they remove a desirable boundary the majority of the time they are applied) **and we disable such merges permanently**.

Disabling a merge $$(x,y)\to xy$$ means that the token $$xy$$ can never be formed again. That would in turn imply that every token formed using $$xy$$, by merges like $$(xy,z)\to xyz$$ or $$(z,xy)\to zxy$$, would also never be formed again; we get a recursive cascade of disabled merges. To prevent such unintended consequences, we design a more surgical *knockout* procedure, where we only remove the token $$xy$$ and its merge, but we keep merges that used $$xy$$ by replacing it with its parents: the two-token merge $$(xy,z)\to xyz$$ becomes a three-token merge $$(x,y,z)\to xyz$$ and so on. Since BPE's vocabulary $$V$$ and merges $$M$$ are really just vertices and edges in a graph, knockout can be easily visualised in the $$(V,M)$$ graph that represents the tokeniser:

<span style="display:inline-block; white-space: nowrap; width:92%;">
    <img src="/cdn/img/png/2024/knockout-graph.png" width="100%"/>
</span>


By knocking holes into the BPE merge graph informed by desirable segmentations, we effectively inject linguistic knowledge into the otherwise unsupervised BPE tokeniser, in such a way that it remembers it in future segmentations. This is in contrast to [training BPE on a pre-segmented corpus](https://aclanthology.org/W17-4706/), which still crosses desirable boundaries at inference time despite never having done so at training time.

# Software and citation
You can find the code for the paper [on GitHub](https://github.com/bauwenst/BPE-knockout), with an easy-to-use wrapper class found in my tokeniser library [TkTkT](https://github.com/bauwenst/TkTkT).

If you use our paper for your own work, please cite:
```bibtex
@inproceedings{bauwens-delobelle-2024-bpe,
    title = "{BPE}-knockout: Pruning Pre-existing {BPE} Tokenisers with Backwards-compatible Morphological Semi-supervision",
    author = "Bauwens, Thomas  and  Delobelle, Pieter",
    booktitle = "Proceedings of the 2024 Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (Volume 1: Long Papers)",
    month = jun,
    year = "2024",
    address = "Mexico City, Mexico",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2024.naacl-long.324",
    pages = "5810--5832"
}
```