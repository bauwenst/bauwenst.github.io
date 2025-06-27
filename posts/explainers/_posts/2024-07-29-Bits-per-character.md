---
layout: post

title: "Bits-per-character and its relation to perplexity"
description: A short formalisation of an obscure metric.

tags: "language modelling"
---
I was recently reading [a paper](https://arxiv.org/abs/2405.07883) on how to train an adapter between a given model and any tokeniser, and noticed that they measured their causal language modelling performance in *bits-per-character (BPC)* rather than the more standard *perplexity (PPL)* with no citation to show for it. Let's dive into that!

1. dummy
{:toc}

# Definition
Bits-per-character is [defined as](https://datascience.stackexchange.com/a/94467/141432) the average character cross-entropy of a text sequence. Under some assumptions about
token probability models, you can derive BPC from them too.

Let the alphabet be $$A$$ and let the sequence of text be the characters $$x_1 ... x_T$$. Then the BPC is defined as

$$
    \text{BPC} = \frac{1}{T} \sum_{t=1}^T H(P_t, \hat P_t) = \frac{1}{T} \sum_{t=1}^T \sum_{c \in A} -P_t(c) \log_2 \hat P_t(c)
$$

where $$\hat P_t(c) = \hat P(c \mid x_1 \dots x_{t-1})$$, which is itself technically shorthand for $$\hat P(X_t = c \mid X_1 = x_1 \dots X_{t-1} = x_{t-1})$$.

For some reason, we now make the dubious assumption that $$P_t(c) = 1$$ iff $$c = x_t$$, which is arguably a very strange definition of probability. Anyway, under this, the last sum reduces to a single term, which we'll write with a natural logarithm from now on:

$$
    \text{BPC} = \frac{1}{T} \sum_{t=1}^T -\log_2 \hat P_t(x_t) = \frac{1}{\ln 2}\cdot \frac{1}{T} \sum_{t=1}^T -\ln \hat P_t(x_t)
$$

# Relation to token-level perplexity
Define a new time scale with aggregated characters representing tokens: $$(y_1 = x_1 ... x_{t_1}), ..., (y_N = x_{t_{N-1}+1} ... x_{t_N})$$.
Then

$$
\begin{aligned}
    \text{BPC} &= \frac{1}{\ln 2}\cdot \frac{1}{T} \sum_{t=1}^T -\ln \hat P_t(x_t) \\
        &= \frac{1}{\ln 2}\cdot \frac{1}{T} \sum_{n=1}^N \sum_{i=t_{n-1}+1}^{t_n} -\ln \hat P_i(x_i) \\
        &= \frac{1}{\ln 2}\cdot \frac{1}{T} \sum_{n=1}^N -\ln\left(\prod_{i=t_{n-1}+1}^{t_n} \hat P_i(x_i)\right)
\end{aligned}
$$

The assumption is now that

$$
\begin{aligned}
    \prod_{i=t_{n-1}+1}^{t_n} \hat P_i(x_i) &= \prod_{i=t_{n-1}+1}^{t_n} \hat P(x_i \mid x_1 \dots x_{i-1}) \\
                                            &= \prod_{i=t_{n-1}+1}^{t_n} \hat P(x_i \mid y_1, ..., y_{n-1}, x_{t_{n-1}+1}, ..., x_{i-1}) \\
                                            &= \hat P(y_n \mid y_1, ..., y_{n-1}).
\end{aligned}
$$

Hence, we get

$$
    \text{BPC} = \frac{1}{\ln 2}\cdot \frac{1}{T} \sum_{n=1}^N -\ln \hat P(y_n \mid y_1, ..., y_{n-1})  = \frac{1}{\ln 2}\cdot \frac{1}{T} \sum_{n=1}^N \text{NNL}_n
$$

which matches equation (2) in [this paper](https://arxiv.org/pdf/2404.09937) as a sanity check. Since perplexity is defined as the exponential of average token negative log likelihood (or the geometric mean of reciprocal token probability), i.e.

$$
    \text{PPL} = \sqrt[N]{\prod_{n=1}^N\frac{1}{\hat P(y_n \mid y_1, ..., y_{n-1})}} = \exp\left(\frac{1}{N} \sum_{n=1}^N \text{NNL}_n\right)
$$

we can express BPC in terms of PPL as

$$
    \text{BPC} = \frac{N}{T} \cdot \frac{\ln(\text{PPL})}{\ln 2}.
$$

In [this older blog post](https://sjmielke.com/comparing-perplexities.htm) on perplexity, the formula implicitly suggested at the end for making perplexities comparable boils down to computing 

$$
    \exp\left(\frac{N\ln(\text{PPL})}{T}\right)
$$

which, as you might now notice, is just $$\exp(\ln 2\cdot\text{BPC})$$, and since $$\ln 2 > 0$$ and $$e > 1$$, the latter transformation is order-preserving (any ordered sequence of BPC values stays ordered after applying said transformation).

You can find [an implementation of PPL-based BPC](https://github.com/bauwenst/LaMoTO/blob/master/src/lamoto/measuring/bpc.py) in my language modelling package [LaMoTO](https://github.com/bauwenst/LaMoTO).