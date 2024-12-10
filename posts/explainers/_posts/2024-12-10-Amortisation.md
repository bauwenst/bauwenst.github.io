---
layout: post

title: "But really, what is amortisation?"
description: Computer science students hate this one trick!

tags: Compsci
---

Here's a fun fact about me: I graduated with the joint title of engineer (ir.) and master of science (MSc) in computer science, without anyone ever teaching me about sorting algorithms. It was only a couple months after I was hired as a PhD student that I taught myself sorting algorithms, and that was because I had to teach them to bachelor students in turn the week after.<br>
Inevitably, while studying other data structures, I also encountered the concept of *amortisation*. I vaguely remembered coming across [its Wikipedia page](https://en.wikipedia.org/wiki/Amortized_analysis) once and taking away that it meant something like "proving that something is fast via black magic". And yet, it really is not that deep.

1. dummy
{:toc}

# Time complexity of operations
Let's consider every computer scientist's favourite object type, namely a stack with dynamic resizing. When we express the cost of using this data structure, we always speak in terms of the cost of *one operation* applied to it: we can `pop` **the** last element, `push` **a** new element on top of it, or (depending on how expressive the interface is) `peek` at **one** of the intermediate values somewhere in the stack. 

Assuming the stack is stored as a contiguous block of reserved memory, it is trivial to prove that none of these operations are affected in speed by how many elements already exist on the stack... except in one case. Clearly, when the stack had space reserved for $$N$$ elements and there are $$N$$ elements on the stack, *pushing* another element is not possible unless it is resized. Resizing will involve reserving brand new space for e.g. $$2\cdot N$$ elements, and copying all the existing elements over, which costs $$N$$ load/store operations. So now, does a `push` cost us $$O(1)$$ or $$O(N)$$? Which is it? Similarly, we might want to shrink the list back down to $$N$$ when it falls below a certain number of elements again, so `pop` is implicated too: $$O(1)$$ or $$O(N)$$?

Amortised analysis says it's $$O(1)$$, as if these inevitable $$O(N)$$ cases can just be ignored. This is where the critically minded among us start raising at least one eyebrow.

# Don't believe in magic? Believe in the magic money printer!
There is this trick in amortisation called the *accounting method*. It is explained something like this: when you perform an operation on the list, don't just count the cost of that operation, but pretend that it has an invisible extra cost, which you keep as "credit" tied to the data structure. And then, when the time comes to do one of the expensive resizing operations, these "credits" can be "used" to bail out the expensive operation and pretend like it "was actually already accounted for".

Yet, this begs the question: if I can just spawn in invisible "credits" to reduce $$O(N)$$ to $$O(1)$$, what's stopping me from reducing any complexity to $$O(1)$$? If we have an infinite money printer, why not just print more money?! In other words: to believe in the magic ability to reduce $$O(N)$$ to $$O(1)$$, you have to believe in a magic money printer that should clearly have certain limitations, but *coincidentally*, we gave it just enough freedom to justify our claim that $$O(N)$$ can become $$O(1)$$. There clearly has to be a better explanation for this credit system and why a cost of $$O(N)$$ can evaporate.

# Where's the trick?
The accounting method is not wrong. It just doesn't explain where credit comes from; in complexity analysis, there actually *is* a place where complexity is not counted, and thus, if we can throw the cost of an operation into that black hole, we can similarly not count it and it would be justifiable like any other time we don't count there.

Consider this question: assuming we reserve so much stack memory that we never have to resize it, can I fill it with $$O(1)$$ cost?

Remember what we said above: we are interested in the cost of *single* operations. Yet, nobody actually does just one `push` to a stack *that already has values on it*. You don't start with a half-filled stack. You have some bag of input data -- let's say $$N$$ values -- which we want to `push` to the stack. *The lowest possible time complexity possible to do this, attained by the fastest algorithms that can possibly exist, is $$O(N)$$.* We tend to think of constant time as the lowest possible complexity, but *to handle $$N$$ data, we always perform at least $$O(N)$$ actions*. And yet, when we speak about time complexities like that of *pushing*, we claim that complexities like $$O(1)$$ can exist, as if our machine will run for a constant amount of time, whilst we know it will run in time proportional to the amount of input we have, i.e. $$O(N)$$, just to read all the input.

So now you see that there is a black hole in complexity analysis: we pretend like the cost of iterating over the input data does not matter, and thereby leave out an entire factor of $$N$$.[^1] So, what the accounting method explained above really does, is take the cost of $$N$$ copies when resizing the list, and it *hides the cost inside the data iteration* by attributing the eventual $$N$$ copies not to the `push`, but to the data iteration. And since we pretend like there isn't an external process that takes at least[^2] $$O(N)$$ to complete, attributing the copies to that process means that we don't see them at all inside the "frame of reference" used for single-element operations.

Shifting from one frame of reference to the other is often done implicitly. For example, when filling a heap, you will see a complexity cited of $$O(N \log N)$$. Yet, that first $$N$$ is not a feature of the algorithm, but of the data iteration. It's true that all of the above can easily be disambiguated by specifying that "it costs $$O(N)$$ time to *construct a stack* of $$N$$ elements" versus "it costs $$O(1)$$ (amortised) time to *add one element to a stack* of $$N$$ elements", but this distinction is often implicit ("pushing has $$O(1)$$ cost") and the second statement can only be made by assuming that it is nested inside the first statement. If you were to do exactly one `push` to a stack that magically appeared in memory -- without an external process running -- filled to the maximal size before needing expansion, you would see an operation that would actually have $$O(N)$$ time cost. In other words: when we claim anything about the cost of "just one operation, without counting the cost of constructing the rest of the stack", we still end up taking into account the external process, or equivalently, more than one operation, even though we think we can pretend to speak in a vacuum.

# Conclusion
Amortisation means hiding the time complexity of individual operations used for constructing a data structure inside the time complexity needed to iterate over the input data, because we don't count the latter when counting the former.



[^1]: Unless the iteration itself has its own increasing complexity $$T(N)$$, in which case it takes $$O(T(N)) + O(N)$$ complexity to even just generate the $$N$$ values to present to the stack.

[^2]: Yes, we have the notation $$\Omega(N)$$ for that, but let's not drag more symbols into this.
