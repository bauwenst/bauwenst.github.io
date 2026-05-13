---
title: Why you can't hack sorting algorithms
description: An overview of clever student proposals to sort faster than N log N, and why they fail.
layout: post
tags: Compsci
---
Having been a teaching assistant for a course on algorithms for three years now, I have encountered several cases of students trying to hack sorting algorithms such that they can outperform the established $$O(N \log N)$$ average-case time complexity for arbitrary lists. Here's why they failed.


# Hacking counting sort
## Theory 
Counting sort is an algorithm for sorting elements from a finite range of size $$R$$ which takes only $$O(N+R)$$ time regardless of the elements being sorted. 

To see why it would possible to sort some lists in better-than-linearitmic time, first consider a list that is just a random permutation of the numbers $$1,2,3,...,N$$. To return this shuffled list in sorted form, we could simply output
```python
for value in range(N):
    print(value)
```
which runs in linear time because it avoids comparisons between elements.

Counting sort extends this to cases where an element appears any amount of times (rather than exactly once), boiling down to
```python
for i in range(N):  # O(N)
    counts[index[input[i]]] += 1

for i in range(R):  # O(R)
    for _ in range(counts[i]):  # in total, O(N)
        print(index⁻¹[i])
```
or equivalently
```python
for value in input:  # O(N)
    counts[index[value]] += 1

for value in ordered_range:  # O(R)
    for _ in range(counts[index[value]]):  # in total, O(N)
        print(value)
```

The key condition to be able to run this, is that there exists an `index` data structure that _pre-defines a total order of all the possible elements in the range._ Because if there is a pre-defined total order, comparisons between values have already been done for us: if we are sorting letters, we don't need to compare **A** to **B** because we already know which one should come first. We just need an `index` that stores this knowledge, and then output as many **A**s as we find before outputting as many **B**s as we find.

## Proposal
What if we just treat the elements in any given list as the range of that list? To find all the possible values in my list, it just needs to be iterated once, in $$O(N)$$ time. The counting array will have a range of size $$R= N$$and likely be filled with a count of 1 for an arbitrary list, which we can then sort in $$O(N+R) = O(N+N) = O(N)$$ time.


## Why it fails
We don't just need a finite range of values. We need an _ordered_ finite range of values. We can know the elements in the list in $$O(N)$$ time, but that doesn't yet give us the order. To get the ordered range, we first need to sort the values we found. So, to sort an arbitrary list in linear time with counting sort, we need to... sort it first.

# Hacking LSD/MSD sort
## Theory
LSD sort and MSD sort are extensions of counting sort for sequences of counting-sortable elements, where the sequences are compared elementwise (i.e. you compare element by element, and you can stop comparing as soon as you find one pair of elements that is different). For example, since characters are counting-sortable, sequences of characters (strings) are sortable with LSD and MSD sort.

For sequences of equal width $$W$$, LSD sort runs a counting sort first on the least important position of the sequence (e.g. the end of a string), then the second-least important, etc... and finishes by counting-sorting the most important position. This takes $$W$$ times $$O(N+R)$$ and thus $$O(W(N+R)) = O(NW + NR)$$.

MSD sort starts with a counting sort of the most important position, and then splits into $$R$$ separate MSD sorts for the second-most important position, one for each set of sequences that has an equal value in the most important position. On average, $$\log_R N$$ subdivisions are needed, where on the $$i$$th subdivision $$R^i$$counting sorts happen involving $$N/R^i$$ elements and thus having complexity $$O\left(\frac{N}{R^i} + R\right)$$ each, totalling $$O(N+R^{i+1})$$ work for subdivision $$i$$ and therefore totalling

$$
\sum_{i=0}^{\log_R N - 1} (N+R^{i+1}) = N\log_R N + \sum_{i=0}^{\log_R N - 1} R^{i+1} = N\log_R N + O\left(\sum_{i=0}^{\log_R N - 1} R^{({\log_R N - 1})+1} \right) = O(N\log_R N).
$$

Of course, if you run out of positions to compare before reaching sets of size 1, your sort is already finished, and thus really the complexity is limited to $$O\left(N\min(\log_RN,W)\right)$$.

Whether LSD and MSD are themselves truly _linear_ sorts depends on how $$W$$ behaves as a function of $$N$$. If strings stay the same length regardless of how many there are, then both are clearly $$O(N)$$. If strings grow just as much as how many there are ($$W = c\cdot N$$), then LSD sort is quadratic and MSD sort is just another linearitmic sort.

## Proposal
Why don't we treat floating-point numbers as strings and sort them with MSD sort? Since precision is always limited anyway, all floating-point numbers are just strings of digits that can be aligned on the comma and compared digit-by-digit. There are only 10 digits, so $$R = 10$$, which is very manageable.

## Why it fails
Actually, for floating-point numbers, it doesn't fail! Of course, in the case of very long floating-point numbers, MSD is just $$O(N\log N)$$. In the case of short floating-point numbers, LSD and MSD sort both do $$O(NW)$$ work, and that's [a linear-time way to sort floating-point numbers, better than QuickSort](https://stackoverflow.com/questions/3539265/why-quicksort-is-more-popular-than-radix-sort).

Yet, the whole point of generic sorting algorithms is that they are built around an abstract `less(x,y)` operator, where the implementation, and thus the data type of the list elements, can be as complicated as you want. So MSD is not a linear-time replacement for the use-cases QuickSort, MergeSort and HeapSort were designed for, but it _is_ when just integers or floats are being sorted.

This is not some trick. The assumption that we are _not_ sorting numbers is actually very much built into the way we analyse time complexity. All of the algorithms built around `less(x,y)` comparisons include plenty of numerical comparisons that are never counted. For example, consider Hoare partitioning in QuickSort:

```python
pivot = input[0]
i = 1
j = len(input)-1
while i < j:
    while less(input[i], pivot):
        i += 1
    while not less(input[j], pivot):
        j -= 1
    if i < j:
        swap(input, i, j)
        i += 1
        j -= 1
swap(input, 0, j)
```

How many comparisons happen in this algorithm? Ordinarily, unless the final swap inside the loop causes `i >= j`, Hoare partitioning is cited as taking an exact amount of $$N+1$$ comparisons, since all $$N-1$$ non-pivot elements are compared to the pivot exactly once in all cases except the $$2$$ elements at the boundary between the left and right half, which are each compared a second time. We are so exact that we track even just +1 comparison explicitly. And yet, whenever the outer loop happens, `i` is compared to `j`. The outer loop could run for up to $$N/2$$ iterations in case both loops terminate immediately on their first check (i.e. the list starts out with a layout where the left half exists entirely on the right, and the right half on the left). But we don't say Hoare is $$N + 1 + N/2$$ in the worst case. We say it is $$N+1$$ in the worst case. _Comparing numbers fundamentally does not interest us._ And so, MSD sort, which works better for numbers, is not cited as a superior algorithm to QuickSort.

# Hacking bucket sort
## Theory
Bucket sort is a kind of single-step MSD sort. First all items are partitioned into $$k$$ sets which have a known ordering between them, and then each bucket is sorted internally. There are four conditions for using bucket sort as a linear sorting algorithm: (1) the amount of buckets has to scale up linearly with $$N$$, (2) computing which bucket an element belongs to must be $$O(1)$$, (3) each bucket must be equally probable, and (4) the buckets must have a total ordering between them. The last condition guarantees correctness, i.e. that we can concatenate sorted buckets and have one large sorted result. The first three conditions guarantee linear time complexity: let there be $$k$$ buckets, then first $$O(N)$$ work is done to put each element in a bucket, which will give buckets of size $$N/k$$. Then each of those is sorted with another algorithm which is linearitmic in the general case (if it is already linear, you don't need bucket sort), costing 

$$
O\left(\frac Nk\log\left(\frac Nk\right)\right)
$$

per bucket and thus 

$$
O\left(N\log \left(\frac Nk\right)\right)
$$

total. When $$k = f\cdot N$$ with $$f \in [0,1]$$ a constant, the logarithmic factor becomes constant and thus 

$$
O\left(k\cdot \frac{N}{k} \log \left(\frac{N}{k}\right)\right) = O\left(N\log\left(\frac{1}{f}\right)\right) = O(N).
$$

## Proposal
For numbers, why not always apply bucket sort? Just find the length $$N$$, the minimum $$m$$ and the maximum $$M$$ of your list in $$O(N)$$ time, then define $$k = f\cdot N$$ buckets by splitting $$[m,M]$$ into sub-intervals of size $$(M-m)/k$$. To find the bucket an input number $$x$$ belongs to, we map it to a relative position on the interval $$x' = (x - m)/(M-m)$$ and then use that to see how far along the $$k$$ buckets we are, putting the input in bucket $$i = \lfloor x'\cdot k\rfloor$$ (which we manually set to $$k-1$$ when $$i = k$$).

## Why it fails
Indeed, although the amount of buckets scales up with $$N$$, the mapping is $$O(1)$$ and the buckets are ordered, the buckets are not equally probable in the general case. The worst case of bucket sort is that a small amount of buckets $$b$$ dominates the rest, which happens for basically all non-uniform distributions of numbers (e.g. a normal distribution, which occurs a lot more than uniformly random numbers in practice due to the central limit theorem). In that case, the cost of sorting is really just

$$
O\left(b\cdot\frac Nb \log\left(\frac Nb\right)\right) = O\left(N\log \left(\frac Nb\right)\right) = O(N\log N)
$$

which is the same cost as sorting a single bucket with all the elements inside and thus not having buckets at all.

Of course, we could define the bucket boundaries not uniformly spaced, but spaced according to the known distribution of the numbers, using quantiles. But then it is no longer a general-purpose algorithm for any set of numbers. (And indeed, we can't even deduce empirical quantiles from the numbers, because that first requires sorting them.)

# Hacking k-ary merge sort
## Theory
Merge sort splits the list to be sorted into a binary tree of $$\log_2N$$ layers which progressively reshuffle the list to become more and more sorted. Each element at the end of such a reshuffle was the maximum of 2 elements, which takes $$1 = 2-1$$ comparisons to figure out. Thus, the complexity is
$$
O((2-1)\cdot N\cdot \log_2 N) = O(N\log_2 N).
$$
The same logic holds when we replace "2" by "$$k$$" above. The tree becomes shallower since each sublist is not $$1/2$$ of the length of the list being split, but $$1/k$$. At the same time, each layer is now more expensive, since each element now has to be the maximum of $$k$$ elements, which takes $$k-1$$ comparisons. The complexity is then $$O((k-1)\cdot N\cdot \log_k N)$$.

## Proposal
Use $$k$$-ary merge sort with $$k\to N$$ so that the tree becomes as shallow as possible.

## Why it fails
There will be only one layer in the tree, where every element is the maximum of $$N$$ elements. This is just selection sort, and indeed then the complexity simplifies to $$O((N-1)N \log_N N) = O(N^2)$$.

One could wonder what the optimal $$k$$ is, then. Converting $$\log_kN = \ln N/\ln k$$ the optimal $$k$$ would be the solution to

$$
0 = \frac{\textrm d}{\textrm d k}\Big((k-1)\cdot N\cdot \log_kN\Big) = N\ln N\cdot\frac{\textrm d}{\textrm d k}\left(\frac{k-1}{\ln k}\right) = N\ln N\cdot\frac{\ln k - (k-1)/k}{(\ln k)^2}
$$

and since $$k\geq 2$$, this can be simplified to
$$
k\ln k = k-1
$$
which has no solutions for $$k \geq 2$$. (Interestingly, if the $$-1$$ hadn't been there, the solution would've been $$k=e$$.) Indeed, the complexity function is monotonously increasing with $$k$$, and the most optimal value in the allowed range of $$k \in [2,N]$$ is already the classic $$k=2$$.
