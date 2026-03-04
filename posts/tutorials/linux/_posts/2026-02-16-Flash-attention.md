---
title: How to enable Flash Attention on a Linux cluster with Conda
description: Try install with pip, if it fails install NVCC and try again, if it fails build locally, if that fails install a lower version. And then do HuggingFace stuff.
tags:
  - Python
last_modified_at: 2026-02-16
layout: post
---
I recently wanted to try if using Flash Attention 2 would speed up my language model training, but installing it was more difficult than I thought. Here is how I did it.

# Setup
I am working on a Linux cluster using a `miniconda3` environment for Python 11.

# Attempt 1: `pip`
As a first attempt, after activating my `conda` environment, I tried running the recommended command:
```bash
pip install flash-attn --no-build-isolation
```
The reason for the flag at the end is so that this package depends on the same CUDA installation as PyTorch.

Unfortunately, this command fails to run with an `OSError: CUDA_HOME environment variable is not set.`

# Attempt 2: `pip` with `nvcc`
The reason for the error is that you need a CUDA compiler to install `flash-attn`. If you can't run the `nvcc` command, you don't have this compiler installed. This part is straightforward:
```bash
conda install -c nvidia cuda-toolkit
```
After this, you need to temporarily modify your environment variables to continue the install:
```bash
export CUDA_HOME=$CONDA_PREFIX
export PATH=$CUDA_HOME/bin:$PATH
```
Now you can again run
```bash
pip install flash-attn --no-build-isolation
```
which will likely succeed.

Unfortunately for me, when I then ran my training script, it crashed on a `from flash_attn` import statement with an `ImportError: /lib64/libc.so.6: version GLIBC_2.32 not found (required by .../lib/python3.11/site-packages/flash_attn_2_cuda.cpython-311-x86_64-linux-gnu.so)`. 

The minimal test to see if this error will happen is to just run the command 
```bash
python -c "import flash_attn"
```
which is equivalent to a single-line script that tries to import from the successful-but-broken installation of the package.

# Attempt 3: `pip` with `nvcc` and local build
The reason for this is a mismatch between the version of a C tool which `flash-attn` was pre-built for (2.32 apparently) and the version you have (the output of `ldd --version`, 2.28 in my case). So you can attempt to build the package yourself.

First things first, we need to properly remove the successful installation we did above.
```bash
pip uninstall flash-attn
pip cache remove flash-attn
conda clean --all
```
If you don't clear out the cache, we will not be able to build the package ourselves. Now,
```bash
pip install flash-attn --no-build-isolation --no-binary=:all: --no-cache-dir
```
which will take quite a while to run.

Unfortunately, this gave me the same error as above. Likely, the error came from other dependencies on a version above `ldd --version`, which you can detect using:
```bash
strings $CONDA_PREFIX/lib/python3.11/site-packages/flash_attn_2_cuda*.so | grep GLIBC_
```

# Attempt 4: `pip` with `nvcc` and lower version
In [this thread](https://github.com/Dao-AILab/flash-attention/issues/1708) people struggle with the same `GLIBC_2.32` issue above, and their recommendation is to use a lower version of the `flash-attn` package. Currently, version 2.8.3 is installed by default, but they recommend 2.7.4.post1 instead.

So, assuming you installed `nvcc` in Attempt 2 above, we will now try to downgrade:
```bash
pip uninstall flash-attn
pip install flash-attn==2.7.4.post1 --no-build-isolation
```
This worked.

# Epilogue
With the installation out of the way, I still needed to do at least two more things in order to enable Flash Attention 2 (FA2) in my model.

## Implementing
Apparently, FA2 is implemented with serialised batches. Usually, code expects tokens to have a 2D index (one vertical to select the example and one horizontal to select the position) and a 2D mask to tell which tokens are not padding, both of which are $$N\times L$$. Meanwhile, FA2 expects the $$T \leq N\cdot L$$ non-padding tokens to be serialised into one long 1D tensor, with the boundaries between examples given by another 1D cumulative index tensor.

It is the model backbone which is supposed to make the conversation, _not_ the data collator. And if your backbone does this conversation, any code beyond that which expects a batch dimension to be present, will break. For example, in my code, I very explicitly had an assignment `N, L = input_ids.shape` which broke because `input_ids` had become a long 1D tensor.

## Configuring
You must let `transformers` know that your model's implementation supports such serial batches by setting the `_supports_flash_attention` class property to True, and, for some reason, another class property `_supports_flash_attention_2` too. The class on which you should set this, is the class which the user gives the config to (most likely in a `.from_pretrained()` call, although not in my case), not any of its contained classes.

To then actually _use_ FA2, you must instantiate the config with a keyword argument `attn_implementation="flash_attention_2"`. If the user does not instantiate the config directly (e.g. in a `.from_pretrained()` call), likely there is a way to pass on keyword arguments to the config constructor (e.g. the keyword arguments on `.from_pretrained()`).

