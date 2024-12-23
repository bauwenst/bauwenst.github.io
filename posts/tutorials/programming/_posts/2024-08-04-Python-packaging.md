---
layout: post

title: "How to create your own Python packages and dependencies"
description: A short tutorial on how to lay out a repo, declare metadata, installing editable code, and doing it recursively.

tags: Python
---

At the time of writing, I've publicly released a handful of Python packages (five, to be precise: [Fiject](https://github.com/bauwenst/Fiject), [BPE-knockout](https://github.com/bauwenst/BPE-knockout), [TkTkT](https://github.com/bauwenst/TkTkT), [LaMoTO](https://github.com/bauwenst/LaMoTO), and [MoDeST](https://github.com/bauwenst/MoDeST)) covering various parts of the NLP research workflow, with more on the way. It took me a bit to learn how to set up Python code as a package (also inaccurately called "library" or more accurately called a "module"), and as I later discovered, it's not so trivial to have one custom package be installed automatically upon installing another custom package, especially when you are the author of both and are already using a working version. Let's dive straight in!

1. dummy
{:toc}

For this tutorial, I'm going to use the real-life example of my package `TkTkT`, the *ToKeniser ToolKiT*, which has many nested folders containing `.py` files and also uses some code from two other custom packages, `Fiject` and `BPE-knockout`. You can see its repository [here](https://github.com/bauwenst/TkTkT).

# Repo layout
## General folder structure
The whole point of creating a package is that we have some Python code spread across multiple `.py` files whose content we want people to be able to access in any of their own Python scripts using `import tktkt`. As responsible developers, we also have a bunch of tests to verify whether the code in the package actually does what it's supposed to do, and we may have some example scripts or even standalone docs to showcase how the package is used.

Clearly, we only want to deliver that first set of code to our users. It's pointless to install our testing suite to their machine, whether accessible or not. Hence, we separate the repo at the top level into three folders:
```
the-TkTkT-repository/
    doc/
    src/
    tst/
```
`src` is a standardised name, so best not change it. As for the test folder, I try to avoid naming it `test` or `tests` because those are already Python packages themselves.

## Modules and submodules
The folder structure *under* `src` will be what Python's `import` statement sees, as if everything from `src` upwards never existed. Hence, the entire package will be contained inside one top-level folder `tktkt` so that all imports look like `import tktkt.abc.efg` and so on.

Any `X` that can be imported with `import X` is called a *module*. Any Python file is automatically a module, and any folder that contains a file named `__init__.py` (even if completely empty) also becomes a module. Hence, the bare-bones package file structure looks like
```
the-TkTkT-repository/
    doc/
    src/
        tktkt/
            __init__.py
    tst/
```
In the case of TkTkT, code is additionally organised into *submodules*, like `tktkt.preparation`, `tktkt.models` and `tktkt.evaluation`. To declare these, we follow the same process:
```
the-TkTkT-repository/
    doc/
    src/
        tktkt/
            __init__.py
            evaluation/
                __init__.py
            models/
                __init__.py
            preparation/
                __init__.py
    tst/
```
In fact, `tktkt.models` again has submodules:
```
the-TkTkT-repository/
    doc/
    src/
        tktkt/
            __init__.py
            evaluation/
                __init__.py
            models/
                __init__.py
                bpe/
                    __init__.py
                kudopiece/
                    __init__.py
            preparation/
                __init__.py
    tst/
```
Let's now start populating our package with code. For example, you'll find the following files in TkTkT:
```
the-TkTkT-repository/
    doc/
    src/
        tktkt/
            __init__.py
            evaluation/
                __init__.py
                morphological.py
                entropy.py
            models/
                __init__.py
                bpe/
                    __init__.py
                    base.py
                    dropout.py
                    trimmed.py
                kudopiece/
                    __init__.py
                    segmentation.py
            preparation/
                __init__.py
                boundaries.py
                mappers.py
                perturbers.py
                splitters.py
    tst/
```
Once we will have installed the package (we'll get to that!), we can access code in e.g. `dropout.py` from anywhere on our machine using 
```python
import tktkt.models.bpe.dropout as dp
```
or, if there is a particular class we want to import (say, `BPEDropout`), like
```python
from tktkt.models.bpe.dropout import BPEDropout
```

## Local imports
But what if we want to import code from somewhere in the package *before* it is installed, because we are still in the early stages of developing the package? That's where *relative imports* come in.

Let's say we are in `dropout.py` and we want to import a class `ClassicBPE` from `base.py` as well as a class `BoundaryMarker` from `boundaries.py`. We can't use
```python
from tktkt.models.bpe.base import ClassicBPE
from tktkt.preparation.boundaries import BoundaryMarker
```
... because `tktkt` hasn't been installed as a package yet. The IDE and interpreter don't know what `tktkt` is. All they know about our project at the moment is that we are currently inside a Python file, and hence we can use that information to specify other files in the package relative to the current file:
```python
from .base import ClassicBPE
from ...preparation.boundaries import BoundaryMarker
```
In this, `.` is the submodule in which we find the current file (`bpe`), `..` is the submodule you find that submodule in (`models`) and the same for `...` (`tktkt`).

Do keep in mind that *you cannot execute files with relative imports*. Even if you have an `if __name__ == "__main__"` in that file, the relative import will cause the obscure error `ImportError: attempted relative import with no known parent package`, which still occurs even after you have installed your package. This is trivial to solve, though: if we want to run `dropout.py`, we can just create a new Python script outside the package where we `import tktkt.models.bpe.dropout` once we have it installed. (The whole point of a package is that it contains subroutines for use in executables, *not* that it contains standalone executables, anyway.)

## Importing `from` non-file modules
It makes sense to import `from` a `.py` file. Yet, any module can be imported from, and folders can be modules too. How does that work? The `__init__.py` file serves as a stand-in for the folder in that case. 

Let's say our package has some absolutely essential classes that are relevant for any user that wants to use the package. In that case, rather than making the user look for those classes inside sub-sub-sub-submodules, we can import them in the top-level `__init__.py`: for example, if we put
```python
from .models.bpe.base import ClassicBPE
```
in `src/tktkt/__init__.py`, users can write `from tktkt import ClassicBPE` without having to know exactly where it is implemented inside the package code. *Do not go overboard with this,* or you end up like HuggingFace `transformers` which has *every class* available at the top level, exposing way too many niche classes to every user. In technical jargon, we call such design a [goat rope](https://en.wiktionary.org/wiki/goat_rope).

## `*` imports
The statement `from X import *` doesn't quite mean "import everything there is to import from module `X`". What it actually means is "import everything there is to import from module `X` *with a name declared in the variable `__all__` of that module*". Indeed, you can heavily restrict what `*` imports, meaning you can give users the choice to either import a pre-made set of variables which you think most of them will need, whilst still allowing them (when they don't use `*`) to import variables that fall outside of that as long as they exist in `X`.

One very practical reason you'd want to use this is to prevent importing everything being imported by the file you are importing everything from. For example: we saw that `dropout.py` itself imports `BoundaryMarker` and `ClassicBPE`. If we now run `from tktkt.models.bpe.dropout import *`, we will import everything declared in `dropout.py` *and* everything imported, hence making `ClassicBPE` available to the user even though it was only meant as an auxiliary class for the implementation, not for the end user. To solve this, we put `__all__ = ["BPEDropout"]` at the bottom of the file. Users can now either import just the class we want to expose with `from tktkt.models.bpe.dropout import *`, or they can still specify they actually want `from tktkt.models.bpe.dropout import BPEDropout, ClassicBPE`.


# TOML project file
Our code is now coherent, and all that remains is to declare some metadata about it. For this, we use a `pyproject.toml` file that we put in the repo alongside our main folders. For TkTkT, the complete file [looks as follows](https://github.com/bauwenst/TkTkT/blob/master/pyproject.toml):
```python
[build-system]
requires = ["setuptools"]
build-backend = "setuptools.build_meta"

[project]
name = "tktkt"
version = "2024.08.01"
requires-python = ">= 3.9"
description = "Tokeniser toolkit: a collection of Pythonic subword tokenisers and supporting tools."
keywords = ["NLP", "tokenizers", "tokenization", "subwords", "segmentation", "natural language"]

authors = [
  {name = "Thomas Bauwens", email = "firstname.lastname@kuleuven.be"}
]
maintainers = [
  {name = "Thomas Bauwens", email = "firstname.lastname@kuleuven.be"}
]
readme = "README.md"
license = {file = "LICENSE"}
classifiers = [
    "Programming Language :: Python :: 3",
    "Operating System :: OS Independent",
]

dependencies = [
    "transformers >= 4.39.3",
    "tokenizers",
    "datasets",
    "evaluate",

    "sentencepiece",
    "regex"
]

[project.optional-dependencies]
github = [
    "bpe_knockout[github] @ git+https://github.com/bauwenst/BPE-knockout",
    "fiject               @ git+https://github.com/bauwenst/fiject",
    "clavier              @ git+https://github.com/MaxHalford/clavier"
]
```
Whenever I create a new package, I just copy this file from an existing package and change the first five fields under `[project]`, as well as the dependencies, which is what the majority of the rest of this article is about.

## Dependencies
Long ago, dependencies where specified in a file called `requirements.txt`. Nowadays, they all go inside the `pyproject.toml` (although there [is some disagreement](https://stackoverflow.com/a/76548420/9352077) whether you should also still have a `requirements.txt`).

All (direct) dependencies for `tktkt` are given at the end of the above file, in the form of two lists of strings. The syntax for those strings is exactly the same as for strings you would put after `pip install`, e.g. `pip install "transformers >= 4.39.3"`. As usual, you can install packages from different repositories:
- By default, running `pip install transformers` via the command line will make a request to the [*Python Package Index (PyPI)*](https://pypi.org/) to retrieve the latest version of the desired package, analogous to `npm` for *node.js*. When you specify a dependency with only a name, the assumption is that it exists on PyPI.
- If a package was never uploaded to PyPI, or is way out of date there (one example being `supar`, whose [latest PyPI version](https://pypi.org/project/supar/#history) is from 2021 whereas its [GitHub source](https://github.com/yzhangcs/parser) is two years ahead), you'll probably want to install it from GitHub instead of PyPI. In that case, you don't just specify the name of the package, but also `@ git+` and the URL.

The reason I have two lists of dependencies and a modifier `[github]` will be explained after we cover the two types of installation.

# Installation
We now have a repository containing source code and a `pyproject.toml`. Time to install it!

## Non-editable
By default, Python installs everything you ask it to install under its `site-packages` folder. If you're not the maintainer of the package, you can let Python keep a frozen version of the package there. 

If you have the repo stored on your machine, you can install the package by opening a command line in your repo folder and running
```bash
pip install .
```
This will automatically find the `pyproject.toml` file, find the module under `src/`, and put it under `site-packages`. *Note: from this point onward, editing the local files has no effect because the Python interpreter only sees the frozen copy that was made to `site-packages`.*

If the repo is on GitHub, you can either `git clone` it and do the above, or you can use the `@ git+` syntax like above:
```bash
pip install "tktkt @ git+https://github.com/bauwenst/TkTkT"
```

## Editable
If you're the developer of the package to install, you'll want an *editable install*: here, changes you make to the local files take effect immediately. The reason is simple: rather than copying files to `site-packages`, a link will be created that makes Python read your local files directly.

You simply run
```bash
pip install -e .
```
and now you can import your package while working on it, without ever having to reinstall it (even though files are added, removed and changed).

# Maintaining multiple packages with editable installs that depend on each other
## The problem
There's one very big problem in specifying your own packages as dependencies: **you cannot install dependencies as editable installs, and editable installs have lower priority than non-editable installs**.

To give a very practical example: my TkTkT package depends on my BPE-knockout package. To develop both of them, my machine's file system looks something like
```
Programming/
    Python/
        the-BPE-knockout-repo/
            pyproject.toml
            src/
                bpe_knockout/
                    __init__.py
                    ...
        the-TkTkT-repo/
            pyproject.toml
            src/
                tktkt/
                    __init__.py
                    ...
```
Obviously, I developed the BPE-knockout package before I developed TkTkT, which means that *I already had an editable install for `bpe_knockout`*. Yet, by adding the dependency 
```python
dependencies = [
    ...
    "bpe_knockout @ git+https://github.com/bauwenst/BPE-knockout"
    ...
]
```
to TkTkT's `pyproject.toml`, *an editable install of TkTkT would download a copy of the GitHub version of `bpe_knockout` to `site-packages`* and silently make my original editable install obsolete.

## The solution: optional dependencies
Since the `pyproject.toml` summarises not just your package code but also the rest of the repo (like where your `README.md` and `LICENSE` file are), it is supposed to capture both the dependencies for the package as well as any extra dependencies you need to run the tests. Obviously, it's useless to install the latter if you are not developing the package, so the `pyproject.toml` allows specifying groups of *optional dependencies* that the user can opt to install alongside the package. The way you do this is by declaring one or more lists under the `[project.optional-dependencies]` header. The way you install the package *with* those optional dependencies, *manually with `pip` or automatically with a dependency string*, is by modifying the package name with the name of the list to install. 

For example, TkTkT has an optional dependency list "`github = [...]`" and hence when you want to install TkTkT with those dependencies included, you don't run `pip install tktkt @ git+https://...` but instead you run `pip install tktkt[github] @ git+https://...`. The same holds for local files: rather than `pip install .` you would run `pip install .[github]` to fetch those extra dependencies found in `pyproject.toml` and install frozen versions in `site-packages`.

So, we have the ability to specify *lists of dependencies that should only be installed for users who don't already have them*. You as the developer already have editable installations of your own packages, so you are a user who does *not* need them. Hence, whenever you create a new package that depends on one of your older packages, that older package is an *optional* dependency because at least one user (you) doesn't want to install it to their `site-packages`.

To go back to the example: BPE-knockout is one of the optional dependencies of TkTkT, only installed for users who still need BPE-knockout (not me). We then recursively apply the same logic: BPE-knockout itself depends on Fiject, another one of my packages. It is assumed that if you *don't* install BPE-knockout with TkTkT, you already have BPE-knockout (editable or not), and hence you already have Fiject (editable or not). Conversely, if you *do* install BPE-knockout (to `site-packages`) with TkTkT, you should *also* try installing Fiject (to `site-packages`), and thus you see `bpe_knockout[github]` in the `github = [...]` list.

So, when I myself install TkTkT to one of my machines, I run
```bash
pip install "tktkt @ git+https://github.com/bauwenst/TkTkT"
```
whereas a normal user runs
```bash
pip install "tktkt[github] @ git+https://github.com/bauwenst/TkTkT"
```
which will also install `bpe_knockout[github]`, which will install Fiject by extension.

### Repeated and circular installs
Funnily enough, TkTkT is also a dependency of BPE-knockout, since BPE-knockout uses the interfaces defined in TkTkT. There is no problem with circular dependencies between modules, as long as the submodules of TkTkT that import from BPE-knockout *are not themselves imported by exactly those submodules they import* from BPE-knockout. Also, both of them have a direct dependency on Fiject.

The way `pip` handles duplicate and circular installs is by ignoring URLs it has already visited. Beware that it uses a *case-sensitive* exact match for this: hence, if TkTkT says it depends on `fiject @ git+https://github.com/bauwenst/fiject` and BPE-knockout says it depends on `fiject git+https://github.com/bauwenst/Fiject`, it will seem to `pip` that you're trying to install two different packages from two different URLs yet with the same name. You should therefore use the same exact casing whenever you specify a GitHub URL for your packages. Similarly, despite GitHub's big green button giving you a URL that ends in `.git`, avoid using it to `pip install` your package in general. The URL you use to `pip install` is counted as one of the visited URLs, and hence unless you use `.git` in *all* your dependency lists everywhere, you will again get an aliasing error. ([This exact issue](https://github.com/bauwenst/TkTkT/issues/1) happened to the TkTkT README at one point.)

# Running tests
Python can import from any subfolder of `site-packages` and from any editable install. There is one more folder that acts like `site-packages`, i.e. whose subfolders count as modules, which is the current working directory: this is why inside your repo,[^1] `from src.tktkt import ...` works (although you should never use it), and even `from tst import ...`. This means that the files under `tst/` can import from each other, although only with absolute imports and not with relative imports, since those rely on `__init__.py` files and your test files are not modules.

## Paths
Handling file paths can be frustrating because the current working directory tends to jump around unpredictably depending on where the test file you are running is located. Often, you want your tests to output to the same folder, e.g. an extra folder `data/` that lives next to `src/` and `tst/`. The boilerplate I use to achieve this is uses the wonderful `pathlib` package. In a file `tst/preamble.py`, write:
```python
from pathlib import Path

PATH_TST      = Path(__file__).resolve().parent
PATH_ROOT     = PATH_TST.parent
PATH_DATA     = PATH_ROOT / "data"
PATH_DATA_OUT = PATH_DATA / "out"
PATH_DATA_OUT.mkdir(exist_ok=True, parents=True)

# For users of TkTkT and Fiject:
#   from fiject import setFijectOutputFolder
#   from tktkt.files.paths import setTkTkToutputRoot
#   setFijectOutputFolder(PATH_DATA_OUT)
#   setTkTkToutputRoot(PATH_DATA_OUT)
```
Then, in every test file, start with a statement `from tst.preamble import *` such that no matter how nested the tests are, `PATH_DATA_OUT` always points to the same place.

# Conclusion
With that, you should be able to develop and import multiple Python packages that depend on each other. Optional dependencies for the win!


[^1]: If this isn't the case, try executing your script with `PYTHONPATH=. python ...` rather than `python ...`.