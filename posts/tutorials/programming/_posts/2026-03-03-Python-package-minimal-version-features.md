---
title: What is my package's minimal Python version?
layout: post
description: A short guide to the features that force your package to have a given Python version as its minimum requirement.
tags:
last_modified_at: 2026-03-03
---
When you are writing your `pyproject.toml`, you may wonder what version of Python you should fill in as the `requires-python = ">= 3.xx"` value. This post shows you how you'll know.

1. dummy
{:toc}

Below, I list the most important features added in each version of Python. To determine the minimal version of Python required by your package (for which I assume you roughly know what kind of code can be encountered inside), you should read from top to bottom. When you hit a Python feature that you're sure is used in your package, that will be the minimal version to use with it.

# Python 3.14
If you use [`t`-strings](https://docs.python.org/3/whatsnew/3.14.html#pep-750-template-string-literals), you need at least Python 3.14.

**Typing:** if you [don't want to use quotations around type annotations](https://docs.python.org/3/whatsnew/3.14.html#whatsnew314-deferred-annotations) that refer to types that have not yet been defined, you need at least Python 3.14.

# Python 3.13
If you use [`warnings.deprecated`](https://docs.python.org/3/whatsnew/3.13.html#warnings) rather than `from typing import deprecated` (which is the backwards-compatible way of doing deprecation), you need at least Python 3.13.

If you want access to the experimental functionality of [running Python without global interpreter lock](https://docs.python.org/3/whatsnew/3.13.html#free-threaded-cpython), you need at least Python 3.13.

# Python 3.12
If you use quotation marks inside the `{ }` of an `f`-string using the same character as the quotation marks around the `f`-string itself, or you use a newline inside the `{ }`, you need at least Python 3.12.

**Typing:** if you use the [`@override` decorator](https://docs.python.org/3/whatsnew/3.12.html#pep-698-override-decorator-for-static-typing) to , or if you define generic classes using [simplified parameter syntax `class MyClass[T]:` rather than inheritance syntax `class MyClass(Generic[T]):`](https://docs.python.org/3/whatsnew/3.12.html#pep-695-type-parameter-syntax), you need at least Python 3.12.

# Python 3.11
If you want a [general speedup of up to 60%](https://docs.python.org/3/whatsnew/3.11.html#summary-release-highlights) over Python 3.10, you need at least Python 3.11.

**Typing:** if you want official support for the [`Self` type](https://docs.python.org/3/whatsnew/3.11.html#pep-673-self-type), or if you use [variadic generics](https://docs.python.org/3/whatsnew/3.11.html#pep-673-self-type) (but you probably don't), you need at least Python 3.11.

# Python 3.10
If you have a [`match` statement](https://docs.python.org/3/whatsnew/3.10.html#pep-634-structural-pattern-matching) in your code, you need at least Python 3.10.

If you use a `dataclass` with `kw_only` argument, you need at least Python 3.10.

**Typing:** if you use [`|` instead of `Union`](https://docs.python.org/3/whatsnew/3.10.html#pep-604-new-type-union-operator), or you use [`ParamSpec`](https://docs.python.org/3/whatsnew/3.10.html#pep-612-parameter-specification-variables), or you use [`TypeAlias`](https://docs.python.org/3/whatsnew/3.10.html#pep-613-typealias), you need at least Python 3.10.

# Python 3.9
If you use dictionary union with `|`, you need at least Python 3.9.

If you use string methods `str.removeprefix` or `str.removesuffix`, you need at least Python 3.9.

**Typing:** if you use [`list` rather than `List`](https://docs.python.org/3/whatsnew/3.9.html#type-hinting-generics-in-standard-collections), `tuple` rather than `Tuple`, `dict` rather than `Dict` and `set` rather than `Set` in your type annotations, you need at least Python 3.9.

# Python 3.8
If you use the infamous [walrus operator `:=`](), you need at least Python 3.8.

**Typing:** if you use the [`/` argument](https://docs.python.org/3/whatsnew/3.8.html#positional-only-parameters) to separate arguments that must never be specified as keyword arguments to those that can be, you need at least Python 3.8.

# End-of-life minima
Every year, the oldest Python version that is still supported with security updates is declared permanently obsolete. As of writing, the official [status page](https://devguide.python.org/versions/) shows that the latest version to have reached the end of support was Python 3.9, namely in the fall of 2025.

In a sense, it is pointless to require a minimal Python version so low that it is end-of-life, because nobody should be using that version and thus even if you don't use any features from later versions, you can at the very least allow yourself as the developer to use newer features in future modifications you make to your package.

That means that, as of writing (spring of 2026), you can safely set `requires-python = ">=3.10"` because everyone should be using at least 3.10. By the end of this year (2026) it should be 3.11. By the end of next year (2027) you can safely assume all users have the features of Python 3.12. So yeah, it'll be a while before you can assume that users have all that nicer syntax for generics.