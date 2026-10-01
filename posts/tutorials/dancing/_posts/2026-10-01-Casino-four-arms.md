---
layout: post
title: Quadripunctual theory & the Macarena method
description: or _A Mathematical Model for Dancing with Four Arms_, illustrated with diagrams and more than 100 videos
last_modified_at: 2026-10-01
tags:
  - casino
  - salsa
---
In a [previous article](https://bauwenst.github.io/posts/tutorials/dancing/2025-03-17-Casino-two-arms/), I introduced mathematical labels for the different ways two people could connect their arms. As I pointed out there, my theory did not include support for common casino holds like hammerlocks, crowns etc. because they are asymmetrical: they are done on one side of the body at a time, on one person at a time, and it is not obvious how all these holds relate to each other using mathematical operations. I have developed a better model that solves this: _quadripunctual theory (QT)_.

1. dummy
{:toc}

It has taken me over a year, and thus over half of my dancing journey, to put this article together (August 2025 to October 2026), including one full rewrite. Just to say: I've thought about this _a lot_. Many, many nights during this time, the last thoughts in my brain before falling asleep were about figuring out this theory. As a byproduct, this article is also the largest organised collection of casino videos.

# Everyone needs arm theory
I am known as a _casinero_, and casino is known for its arm knots. If you dance casino (["Cuban salsa"](https://en.wikipedia.org/wiki/Cuban_salsa)), you may treat this article as your armwork Bible.

But actually, good _salseros_ also need a theory for understanding arms: if you are a salsero and you want to be able to dance as methodically as [this lead](https://www.instagram.com/reel/DdHzih-x6Tf/) or [this lead](https://www.instagram.com/reel/DcBqVvNsJ06/), you need to cultivate an intuition for arm theory. (For salseros, it may suffice to understand the Macarena method described shortly after this, since salseros can rely more on throws than turns as opposed to us casineros.)

And guess what? When I am cruelly forced to dance bachata, I apply the same arm theory as I do in casino, and it works! Casino and bachata are not the same dance, but _casineras and bachateras are humans, and humans have two arms_.

## ...and casineros need it the most.
We have an infinite domain of spatial configurations of four arms to discretise, and there are many ways to do so. Obviously, I am not the first casino dancer obsessed with non-invariant armwork, so there must be an existing way people communicate about what they do with their arms, right?

They do. It's just an incomprehensible mess.

Historically, several rueda figures became named using numbers [for historical reasons](https://salsaselfie.com/2021/07/13/cuban-salsa-the-origin-of-number-names-like-setenta-70/), like [_setenta_ (70)](https://www.youtube.com/watch?v=Mywysg1TSGU), [_siete_ (7)](https://www.youtube.com/watch?v=FKAafBcxqDU), and [_ochenta y cuatro_ (84)](https://www.youtube.com/watch?v=652-BfCWOsA). It is tradition that variations extending these figures receive the next number in line, which is why you can find figures named anywhere from _setenta y uno_ (71) up to _setenta y nueve_ (79) and from _ochenta y dos_ (82) to _ochtenta y ocho_ (88). Some people also started naming new sequences in the same way, which is why you can find [_sesenta_ (60)](https://www.youtube.com/watch?v=i9vHOYhBGao) and [_noventa_ (90)](https://www.youtube.com/watch?v=7PYNRDZsfdo).

Now, it's already problematic that people give names to _sequences_ rather than the _holds_ and _positions_ contained inside. And, these names are opaque: if I write in my notes to "do a _montaña_" and then I hit my head in a tragic accident, I won't be able to interpret my notes. But _numerical_ names are much worse, because now _every rueda group in the world_ is picking names for their choreographed sequences from the same set of 20 names. 

For example, [this Mexican guy](https://www.instagram.com/reel/DdZZT4aoCzC/) -- who is a teacher! -- dramatically captions his video with "88 + 82" _as if that means anything to anyone except himself_. In reality he is speaking complete nonsense gibberish. Does his sequence look like [this British 88](https://www.youtube.com/watch?v=6oPulqkzNgA) combined with [this Spanish 82](https://www.instagram.com/reel/DMW6h71vTxW/)? Or perhaps [this Polish 88](https://www.youtube.com/watch?v=v4_c1mBhFrQ) combined with [this Swiss 82](https://www.instagram.com/p/DJ_MLGzIIFQ/)? Even the people who _know_ "88" and "82" don't know the sequence he has described. Has anyone ever been asked to demonstrate a "[60 con 90 x abajo](https://www.youtube.com/shorts/X6sihPqpqXk)" and known what to do?

# Bibrachial theory (BT)
## Recap
A short summary of my previous theory of dancing with two arms:
1. When you are holding hands in parallel, leader/follower can turn once clockwise or once counterclockwise with both arms overhead.
2. When you are holding hands crossed left over right, you can turn once clockwise or twice counterclockwise. When you are holding hands crossed right over left, the converse is true.
3. Walking around someone is equivalent to that person doing a turn the other way.
4. Turns will never make parallel hands become crossed hands; these are two independent families.

These observations were made for when the arms are in the middle between the leader and the follower, which I will call "center holds". It is all true, but very limited.

## Terminology
Let us also re-establish some standard terminology that describes where the dancers are (_state_, to which we will add an arm description) and how they evolve (_transitions_).

### State
Temporally, the music consists of _phrases_ of 8 counts, split into the _first bar_ (**1°**) counting 1-2-3-4 and the _second bar_ (**2°**) counting 5-6-7-8.

Spatially, follower on the left is called _abierta_ (**ab**), follower on the right is called caída (**ca**).

### Transitions
For followers, a walk from caída into abierta is a _dile que no (DQN)_. A clockwise turn from abierta to caída in 1° is a _vacilala_ (which happens on a semi-circle), whilst a clockwise turn in 2° is called a _vuelta_ if it's from abierta (which happens in-place) or an _exhibela_ if it's from caída (which happens on a line). A counterclockwise turn in 1° is an _enchufla_ whilst in 2° it is a _peínala_. A clockwise walk around the leader from caída to caída is a _rodeo_, and a counterclockwise walk around the leader from abierta to abierta it is a _rodeo inverso_.

For leaders, a counterclockwise turn in 2° is an _enchufate_ and a clockwise turn in 2° is a _giro_ (hook turn).[^1]

None of these terms have anything to do with arms. In this article, we will add a few arm-related transition names. For now, let's only define _enchufla/enchufate abajo_, which are done with all hands held low. Later, we will also see _pal piso (inverso)_ and _échala/échate_.

There are no other building blocks. Some building blocks get a different name depending on the hold, like _vacilala_ becoming _sombrero_, or _enchufla abajo_ becoming _Cubanita_, or _rodeo_ becoming _balsero_, and so on, but these are unnecessary.

## Updated notation
Now, I should disconnect this article somewhat from the conventions outlined in the previous article. There I spoke of "**cis** holds" (**C-2**, **C**, **C+2**) and "**trans** holds" (**T-3**, **T-1**, **T+1**, **T+3**) based on chemical convention, and decided that **+** would be counterclockwise because that's how angles are counted in mathematics.

However, in hindsight, this all makes the names of the positions less interpretable than they could be, making them more difficult to teach to others and more difficult to read as an instruction. Indeed, "cis" and "trans" are actually just indirect names for what the dancers actually _do_, which is canonically called  "starting with _manos parallelas_" (parallel hands) and "starting with _manos cruzadas_" (crossed hands). We could use "P" and "C", but this is not language-agnostic and it would be confusing to me, the one person responsible for making sure this system is without error. 

Additionally, people aren't used to reading the mathematical [unit circle](https://en.wikipedia.org/wiki/Unit_circle). They are used to reading a _clock_, and on a clock, **+** is clockwise (big surprise).

Thus, from now on:
- **II** is the prefix for holds with _parallel_ hands (leader's left hand is connected to the follower's right hand). I pronounce this as "lel" for short.
- **X** is the prefix for holds with _crossed_ hands (as in a handshake). I pronounce this as "ex".
- **+1, +2, +3** are _clockwise_ valences.

Therefore, what used to be called "**C+2**" in the previous article (parallel hands, then enchufla with both hands over her head) is now called **II-2**. Similarly, whereas the start of a sombrero used to be called "**T+1**", it is now called **X-1**. And so on.

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-01.svg"/>
</figure>
Center holds in **II** and **X**. More clockwise turns have been done the further up in the diagram you go.
{:.figcaption}

Now let's see why this system is incomplete.

## Why we need more expressivity: invariance
There's an interesting property of non-hammerlocking two-handed turns, like a simple left-high right-high (LHRH) vuelta from **II** into **II+2**: the result is _invariant_ to whether it is the leader who turns or the follower who turns, as long as the axes of rotation have the same [sense](https://en.wikipedia.org/wiki/Clockwise) (rather than having the opposite sense). Put differently, leader and follower see the exact same thing looking at the hold from their perspective. If turns were not invariant, looking at the hands would allow identifying who turned. Invariance is thus also equivalent to stating that leader and follower always have the same sorting order of arms: when the leader's left arm is over his right arm, so is the follower's.

For **X** holds, this is trivial to prove, because the left arms lie on the same line and the right arms do too. For **II** holds, you can prove this by contradiction: we use the fact that the hold must be different before and after a turn. Now we **assume** that after the turn, the leader's left arm ends above his right and the follower's right arm (connected to the leader's left) ends above her left. This way of crossing is actually not entangled -- try it! -- and falls apart into being just **II**. But since this reasoning is true from any starting hold, we can choose to start from **II**. Now we supposedly have a turn that starts in **II** and ends in **II**, which is impossible, and so the initial assumption is false when starting from **II**.
{:.note title="Proof of invariance" .filled}

This invariance is baked into the notation for bibrachial theory: you cannot deduce from entangled holds (**X-3**, **X-1**, **X+1**, **X+3**, **II-2**, **II+2**) whether it was the leader or the follower who turned to get there, because it doesn't matter. 

Yet, in a hammerlock, although both dancers see their hands moved over to one side, we know who turned because that person has one arm behind the back. Thus, at the bare minimum, we now need _separate notation for (the results of) leader vs. follower turns_.

# Equivariance and symmetry
## Equivariance: why we can focus on followers
When two humans dance, all movements they do are [equivariant](https://en.wikipedia.org/wiki/Equivariant_map) to exchanging the leader and follower role. That is: for any movement, switching the role of leader and follower _before_ executing the movement results in exactly the same end position as when first executing the movement and switching their roles _after_. The reason for this is that movement is purely physical; it sees a first body and a second body, but whom those bodies are assigned to is arbitrary.

For hammerlocks, crowns and so on, what this means is that it will suffice to model every hold that could be done to only the _follower_, and afterwards, duplicating this model for the leader. I will soon introduce the letter **F** into our notation, and replacing it by the letter **L** would give the same hold but with leader and follower switched.

Note that invariance is a special case of equivariance: if it doesn't matter who was leader and who was follower before the turn, then indeed the result will definitely be the same whether we switch the roles before or after the turn.

## Symmetry: why half of the theory creates itself
I have written on multiple occasions about [positional symmetries](https://bauwenst.github.io/posts/tutorials/dancing/2025-04-07-Casino-caida-substitutes/) in casino, which allow discovering new figures through [paradigm-filling](https://bauwenst.github.io/posts/tutorials/dancing/2025-08-06-Casino-desplazamientos/).[^2] That is, for each clockwise turn/walk, you can hypothesise the existence of a counterclockwise turn/walk. Or equivalently, for everything that happens with the left side of the body, you can hypothesise the same thing happening with the right side.

A clockwise turn for the follower hammerlocks her left arm on her right hip (from the leader's perspective, his left side). This implies that there exists a _counterclockwise_ turn that hammerlocks her _right_ arm on her _left_ hip (leader's right), and indeed, although the latter is not a named casino turn, it does appear in more advanced figures (see e.g. [this example](https://www.youtube.com/watch?v=9iBJFwaivIM) or [this dance](https://www.youtube.com/watch?v=UiFg3vyG5XM )).

This symmetry implies that, e.g., we only need to figure out hammerlocks on one side of the body, and everything we find will then transfer over to the other side with opposite rotational sense. As with equivariance, we will need some way of indicating which side the hammerlock is on. However, we shall not use a different letter for each side, because there exist figures that transition between these symmetries and we would like figures to be modelled as numerical operations where possible, rather than adding/removing letters. We will instead use **+** and **-** so that when flipping the signs, you mirror the dance.

# Quadripunctual theory (QT)
Let's now extend bibrachial theory (BT) to quadripunctual theory (QT), which can take into account turns where the arms of leader and follower do not end up in the same state, and thus we need to specify how four arms are positioned rather than just two.

## The Macarena method
The key insight of QT is that all non-invariant holds can be described by the 4 different points on the body that could be blocking an arm from being in the middle of the couple. The four points are:

1. **F,** = arm on the lower back (behind + low), better known as **_hammerlock_**.
2. **,F** = arm on the abdomen (front + low), as happens in _Kentucky_. We will call this a **_frontlock_**.
3. **'F** = arm around the neck, elbow down (front + high), better known as **_corona_**. When done to the follower, it is of course called corona**la**.
4. **F'** = arm behind the neck, elbow up (behind + high), as happens in _ahórcala_. We will call this a **_cuerno_** ("horn").

The notation is such that you can interpret a position from left to right. **II+F,** can be read verbatim as "parallel hands (**II**), with a hold where you first see the follower (**F**) and then see an arm below (**,**) created by a clockwise (**+**) turn" which is the classic _setenta_.

Recently, I was walking through my hotel at _Cuba in Tunisia_, where some animators were playing the Macarena. I started doing the dance during my walk, and realised that the Macarena touches all four points of QT: center, coronala, cuerno, front lock, hammerlock. Therefore, to more easily remember the four points defined in QT, I call this discretisation of holds the "Macarena method". Again, there are other ways to discretise arms which are more expressive or less expressive, but I am sticking with this one.

## How to read this article
This article is sectioned into the four points above (hammerlock, frontlock, corona, cuerno), for both **II** holds and **X** holds. There are many ways to order these sections:

1. First all **II** holds, then all **X** holds;
2. First all hammerlocks, then all coronas, etc...;
3. Order by simplicity;
4. Order by dependency;
5. Order by how you would teach these concepts to new students;

These all have issues. The first makes it difficult to e.g. relate **II**-hammerlocks to **X**-hammerlocks. The second makes it difficult to relate **II**-coronas to **II**-frontlocks. The third would put **II**-coronas first, but they can lead into a **II**-hammerlock which hasn't been explained yet in that case. The fourth makes you an expert in _setenta pal piso_ before even hearing about a _sombrero_. The fifth would break up each section into loosely ordered parts.

I have chosen my section order to respect dependencies (i.e.: you don't need to know future sections to understand current sections), and I have also put related **II**- and **X** holds (which obviously have no dependencies) together, except for **X**-coronas, which are only covered all the way at the end since they are so much more complex and niche than **II**-coronas. 

Reading from top to bottom is thus best for _understanding_, but not for _teaching_ two-handed  casino leading from scratch: you should not learn all the advanced mechanics involving **II**-hammerlocks before knowing about a basic **II**-corona. You can probably separate each section into a "basic" part (mechanics you'd learn from figures like _setenta_, _preciosa_, _sombrero_, _montaña_, ...) and an "advanced" part (_pal piso_, _salgo_, _bajo_, ...) and then aggregate those to turn this article into a curriculum.


<!--

- Hammerlocks
	- II-hammerlocks = introduces many vital concepts
	- X-hammerlocks = basically same as II-hammerlocks

- II-coronas  = super easy, although there is a bájate possible and this requires knowing about hammerlocks

- Frontlocks
	- II-frontlocks = super easy, basically just Kentucky, corona-wrap, salgo
		- also has bájate https://www.instagram.com/p/DXM1RMECMgz/
	- X-frontlocks = similar setup but no Kentucky etc.; has bájate + salgo sequence

- Full ganchos
	- Full II-ganchos = combine with corona and frontlock (like an X-gancho stabilises a hammerlock): https://www.instagram.com/reel/DUiDqZEikKs/ and https://www.instagram.com/reel/DdYmLMWRNA2/
	- Full X-ganchos = combine with hammerlock

- Cuernos = super easy
	- X-cuernos  = vital due to crowns; need frontlocks to discuss what ahorcala can do
	- II-cuernos = niche; need hammerlocks for bájate; unrelated to frontlock

- X-coronas / X-ganchos  = super niche and complicated
-->



# Hammerlocks (+F,)
## II-hammerlocks
Let us first look at the system of all _parallel_ hammerlocks, which will give us many of the essential concepts we need for understanding all the other holds.

### Pal piso and enchufla abajo
The most well-known hammerlock occurs in _setenta_ and is denoted **II+F,** (where **+** is used because the _vacilala_ in a _setenta_ is of course clockwise).

Now, it is easy to see that there should exist two more holds "on top of" this hammerlock: after all, we know that there exist three ways to hold parallel hands in the _middle_ of the couple (**II**, **II+2**, **II-2**), and in a sense, all a hammerlock does is move the hands of the follower closer together to one side of her body. Her hands are still parallel, just on one side of the body, not in the middle. Indeed, two more hammerlocks can be reached. 

Firstly, if she turns under the elbow as in [_setenta pal piso_](https://www.youtube.com/watch?v=tfVXFAHvOqM&t=37s)[^3], we see the hands of **II+2** but on her hip, and thus[^4] we call it **II+F,+2**. And indeed, we know this can be undone by a clockwise rodeo, which has the same effect as a counterclockwise turn as we saw in the last article. Secondly, from the base hammerlock, the leader could also do an _enchufla abajo_ (LLRL), to end up with the follower on his left side, his left elbow behind her shoulder. (This movement is just [the **II** equivalent of _Cubanita_](https://www.instagram.com/reel/DOGRxfwCGdo/?igsh=aGR4MDRuZTRuODEw) as it is known in **X** holds.)

We can name this hammerlock once we understand where it lives relative to other hammerlocks. Notice that [it is very natural](https://www.youtube.com/watch?v=UiFg3vyG5XM&t=7s) to [make her turn counterclockwise](https://www.instagram.com/reel/DPL4qVhiDP7/?igsh=cDBiamk1dnM4cmJq) in this case, doing a _pal piso inverso_ under your elbow while it is pressed on her shoulder, which then results in a hold that looks like **II+F,** but _mirrored_ on the other hip. We call that hold **II-F,** by symmetry. And so, since the position with the elbow behind the back is one counterclockwise turn (**-2**) removed from a neutral hammerlock (**+0**), it must be a **+2** and thus it is called **II-F,+2**.

It is possible to get from **II** into **II-F,** directly by doing an _enchufla al revés_ (LLRH), i.e. an enchufla -- a counterclockwise turn for the follower in 1° -- which opens her shoulder by keeping your right hand high. In fact, because of symmetry, the natural sequence described above (hammerlock, enchufla abajo, pal piso) is often mirrored, like [here](https://www.instagram.com/reel/DM4tE7goF8o/) and [here](https://www.instagram.com/reel/DO_U2pZDAiK/), starting from an enchufla al revés. The hold sequence is then no longer **II** into **II+F,** into **II-F,+2** into **II-F,** but rather **II** into **II-F,** into **II+F,-2** into **II+F,** at last. Indeed, mirroring just means flipping all the signs; left and right flip, clockwise and counterclockwise flip. The reason this mirrored sequence is preferable, is that it makes the pal piso clockwise, which followers are more comfortable with. Also, it ends in the more common hammerlock.[^5]

This all results in the following diagram of two ladders:

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-02.svg"/>
</figure>
**II**-hammerlock ladder.
{:.figcaption}

### Échala
For completeness, there exists one more turn-based transition in this system. I will call an _échala_, since it immediately unhammerlocks the follower and throws her off the ladder despite her being on some other rung than the middle.

Most commonly it happens after an enchufla abajo into **II-F,+2** and jumps straight into **II+2** as shown by David Jascha at the start of [this video](https://youtube.com/shorts/uArE3V5iB-M) or by Kevin Cano in [this video](https://www.instagram.com/reel/DK6eBhvCr41/?igsh=Nzlvbjlnbjc3OXd3) or by Andrea Milillo at 0:16 in [this video](https://www.instagram.com/reel/Dc3GXOduiiF/). (By symmetry, it should also be possible to do from **II+F,-2** into **II-2** although I have not seen anyone do it. The point is: it transitions from the elbow-behind-the-back rung of the ladder to a non-hammerlocked hold.) To execute it, after an enchufla abajo, you should make the insides of your own elbows touch, move your left forearm down to unhammerlock her, and move your right forearm up over her head.[^6]

### Salgo and bajo
Not all transitions starting in hammerlocks require turns. There is a family of movements which rely on contortions that can be done while both dancers are standing still.
#### On followers: salgo/bajo
A _salgo_ (literally "I exit") is when the leader frees the follower's hammerlocked arm by getting closer to the follower, pushing her arm down so that her elbow is loosened and can twist from pronation to supination, and moving it over her head. This is the most difficult mechanic to consistently pull off in casino, without question.

Mathematically, salgo turns any "**F,**" into "**2**" (and adds that 2 to whatever valence the hold already has). The sign of the hammerlock is inherited, which means that salgo of the follower's left hand (always hammerlocked on her right hip) is a **+2** and of her right hand a **-2**. For example:
- _salgo_(**II+F,**) = **II+2** by [Jorge Luis](https://www.instagram.com/reel/DX4TdZzsD2Q/) at 1:35.
- _salgo_(**II-F,**) = **II-2** by symmetry.
- _salgo_(**II-F,+2**) = **II-2+2** = **II** less commonly, although it exists.

This theory predicts that it is impossible to salgo from **II+F,+2** or **II-F,-2** since that would make **II+4** and **II-4** and those don't exist. You can verify experimentally that this is indeed impossible.[^7]

A _bajo_ (literally "I lower") is the inverse of salgo: the leader takes an arm in front of the follower, moves it over her head and bends her elbow until she is in hammerlock, with no turning involved. Because it is the inverse of salgo, the math is also inverted: first isolate **2** from the current hold, then turn it into **F,** as it is consumed to get into the hammerlock. (It is that hammerlock which would result in the current hold after a salgo.) Some examples:
- _bajo_(**II+2**) = **II+F,** by [Kevin Cano](https://www.instagram.com/reel/DZcCgaZxKt3/).
- _bajo_(**II**) = _bajo_(**II+2-2**) = **II+F,-2** as seen [here](https://www.instagram.com/reel/DWQe6YQjM5J?igsh=MWd0ZXA0dmlrMjFmZA==).
- _bajo_(**II+'F+2**) = **II+F,** by [Abel Pérez](https://www.instagram.com/reel/DZxAOK5u-QB/?igsh=dWtndG9sMnJmdGEw). (We will see more about the **+'F** ladder below.)

I took the terms _salgo_ and _bajo_ Gastón Carvallo, who demonstrates both movements [here](https://www.instagram.com/reel/DMiYOOEow9F/?igsh=MTUwMmlkbDFkZmUydg==).

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-03.svg"/>
</figure>
**II**-hammerlock ladder with bajo/salgo in blue.
{:.figcaption}

#### On leaders: salte/bájate and moño
It occasionally happens that leaders in **II+L,** or **II-L,** contort their own arm out of hammerlock, which we will call a _salte_ (literally "let yourself out"): for example, at 4:05 in [this video](https://www.instagram.com/reel/DY3-qi-NVk8/), I pass through a **II+L,'** before doing a salte and then a candado.

However, it is much more common for a leader to do a _moño_ to free himself, which is when he bends forwards and lets his hammerlocked arm glide over his back. This is very distinct from a salte, because the arm leaves from the other hip and the elbow is _flexed_ rather than _extended_. The mathematical effect of moño is identical to that of salgo/salte, turning "**L,**" into "**2**". The most relevant examples:
- _moño_(**II+L,**) = **II+2** by [Yoandy](www.youtube.com/watch?v=hLyxGgsIC9c&t=223s), although in practice, this moño basically always ends in **II+'F+2** because it is much easier to do it with your right hand pressed to the follower's right shoulder.
- _moño_(**II+L,-2**) = **II+2-2** = **II** by [Lucas Beluzo](https://www.instagram.com/p/DThenbriLDu/).

I took the name moño ("bow") from Lucas Beluzo in the video above. It refers to the fact that the elbow looks like one of the ears of a ribbon bow during the moño.

_Bajo_ does have a common equivariant -- when the leader contorts _his_ arm _into_ a hammerlock -- which I will call _bájate_ for consistency. We will see a special example of this below. One other example:
- _bájate_(**II**) = **II+L,-2** as seen [here](https://www.youtube.com/watch?v=DS7JqAtOpbU&t=16s). It is natural to then do a moño since _moño_(**II+L,-2**) = **II+2-2** = **II**. This is very similar to what you lead to start a Santiago (see below), except without turning your body counterclockwise.

### Complicado
In a hammerlock, the non-hammerlocked arm is still free to be manipulated. One thing that commonly happens with it, is to walk underneath it, as in _setenta complicado_, past the other person. Multiple different transitions exist after walking under the arm, and so it itself will just be called "a complicado". 

#### Complicado on the left
In the specific case of _setenta complicado_, you make her turn counterclockwise under the arm you walked under, to undo her hammerlock. The result is actually that now _you_ are in hammerlock, on your left hip (**II-L,**). From here, you can turn clockwise with your left hand over your head (_enchufate inverso_) to unhammerlock into **II** or with your left hand held down (_enchufate abajo inverso_) to get into **II+L,-2** which naturally leads into another clockwise turn to get into **II+L,** (which we will see later). Another option after a complicado is to do a _passbehind_, where you walk in a half circle clockwise around the follower while her arms trace a half circle downwards, ending in the mirrored **II-F,** directly.

_Joint hammerlocks_, where both leader and follower are in a hammerlock, are the result of combining a complicado with a bájate. There are practically only 2 joint **II**-hammerlocks that occur in casino: one derives from **II+F,** with a leader hammerlock on top (**II+F,+L,** or abbreviated **II+FL,**) and the other from **II+F,+2** with a leader hammerlock on top (**II+F,+2+L,** or again **II+FL,+2**). They are respectively undone using a moño and a rodeo, both ending up in **II+F,** again. In both cases, the leader sees the follower on his right; theoretically, the mirror images (**II-F,-L,** and **II-F,-2-L,**) could also occur, but I have never seen anyone bother with them since it requires both dancers to walk on a counterclockwise circle, which feels unnatural.

A complicado from **II+F,** can also be followed by a leader candado by stopping the enchufate early, which I will cover near the end of the article.

#### Complicado on the right
A complicado from **II-F,** has similar (but mirrored) follow-ups. It has a passbehind into **II+F,** as well as an enchufate to get out and an enchufate abajo to tangle more. In the latter case, you end up in **II-L,+2** which either forces you to do a counterclockwise giro under her arm (the mirror image of the giro from **II+L,-2**, i.e. a pal piso for the leader) to make the **+2** disappear (**II-L,**) but more amenable is to do a clockwise giro to unhammerlock yourself and drop the **-L,** (**II+2**). You can see examples of this movement in [this video](https://www.instagram.com/p/DY3-qi-NVk8/) at 2:18 or in [this video](https://www.instagram.com/reel/DWZfM9ricvY/?igsh=MWoyd2FpcHB4MTJvMQ==) at 1:22, and I will call it _échate_, the leader equivariant of _échala_. To execute it, somehow (e.g. using a re-grip) twist your left wrist counterclockwise so the palm is facing up, and scoop the forearm forwards and over your head. 

There is also one famous follower complicado, which appears in [La Suerte's _Santiago_](https://youtube.com/shorts/vlSqi-msy60) figure. It starts out with the leader walking under his left arm from **II** which, although it feels a lot like a complicado, is actually a LHRL enchufate. The resulting **II-L,** then lends itself to making her do a passbehind into **II+L**, (and indeed, if you pause the above video after the first enchufla and imagine she is leading him, you'll see an enchufla al revés, complicado passbehind, and enchufla, or as a hold sequence, **II** into **II-F,** into **II+F,** into **II**).

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-04.svg"/>
</figure>
**II**-hammerlocks: complicados, passbehinds, and leader giros.
{:.figcaption}

## X-hammerlocks
### Pal piso, enchufla abajo, complicado
We used a simple argument above to justify why the **II**-hammerlock ladder has 3 rungs just like the original **II-2**, **II**, **II+2** central holds. Similarly, in the case of _crossed_ hammerlocks, there will be 4 rungs on the ladder, corresponding to **X+3**, **X+1**, **X-1** and **X-3** on top of the hammerlock.

Of course, there will be two ladder legs -- one on each hip -- and only one rung on each leg is readily accessible from a non-hammerlock, respectively by doing a vuelta/vacilala on **X-1** and an enchufla al revés on **X+1**. You can recognise these base hammerlocks by the fact that the non-hammerlocked arm is free to move up and down.

Most properties of parallel hammerlocks can be verified to apply to crossed hammerlocks. For example, when stepping onto the ladder, the valence does not change. This is how we know what to call the base hammerlocks: **II+0** becomes **II+F,+0** and thus **X-1** becomes **X+F,-1** and **X+1** becomes **X-F,+1**. This can be verified by noting that a pal piso can be done _twice along the original rotation or once in the opposite direction_. So, after a hammerlocking vacilala on **X-1**, you can make her turn clockwise under your right elbow another two times, as shown [here](https://youtu.be/UiFg3vyG5XM?si=lStOEuln50fN3gBb&t=334s) (two pal pisos done on **X+F,-1** to get into **X+F,+3**, from which nothing can be done except a rodeo).

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-08.svg"/>
</figure>
**X**-hammerlock ladder. The group in the top left represents ahórcala with a vuelta. The bottom left shows a Bayamo.
{:.figcaption}

Enchufla abajo still changes the valence by 2: **X+F,-1** turns into **X-F,+1** and vice versa. Passbehinds still keep the valence equal: **X+F,-1** turns into **X-F,-1** and **X+F,+1** turns into **X-F,+1**.

Different from **II**-hammerlocks is how enchuflas abajos and passbehinds relate to the base hammerlocks of the ladder: in **II** holds, the base hammerlocks are connected directly by a passbehind, whereas in **X** holds a passbehind requires that you "tunnel" through the arm and thus create more entanglement. Conversely, in **II** holds, an enchufla abajo creates more entanglement in the hammerlock, whereas in **X** holds, an enchufla abajo directly transitions from one base to the other with no extra entanglement. Even beginners know this intuitively, because Cubanita is symmetrical.[^8]

Note however that passbehinds still move horizontally across the diagram (**+0**) and enchuflas abajos still move between south-west and north-east (**+2** or **-2**), in both **II** and **X** holds. The fundamental difference between **II** holds and **X** holds is that the base rungs have the same valence in **II** whilst they differ by **2** in **X**. This means that the same valence does not imply the same "amount of entanglement" in **X**, and therefore, _not_ changing valence increases the entanglement (**X+F,-1** is less entangled than **X-F,-1** but both are a **-1**).

A great example of all these transitions can be seen in [this performance](https://www.youtube.com/watch?v=BHqDde2hrXY) by Jakub Mazuch starting around 1:55: he starts in **X-1** followed by a vacilala into **X+F,-1** followed by a passbehind into **X-F,-1** followed by an enchufla abajo inverso into **X+F,-3** followed by a pal piso into **X+F,-1** again, followed by another pal piso into **X+F,+1** followed by a passbehind into **X-F,+1** followed by a vuelta into **X+1**. (He then continues with a frontlock, which we will see below.)

In [this video](https://www.instagram.com/reel/DdWhYNoCxNH/), Jimi Jacks shows a perfect example of leader-follower equivariance by first walking through an **X** sequence on the follower, and then walking through the same sequence on himself. First, he does the exact same sequence as Jakub Mazuch from **X+F,-1** to **X+F,-1**. Then he does an enchufla into **X-1** followed by a giro into **X+L,-1**. From there, he does the equivariant of the previous sequence: a follower passbehind into **X-L,-1** followed by an enchufate inverso (he switches from his left hip to his right hip) into **X+L,-3** and an immediate giro into **X+L,-1** again. Finally he makes her turn while he is still in his hammerlock to create an **X+F,+L,** joint **X**-hammerlock (see below) followed by an enchufate to undo his hammerlock into just **X+F,-1** and an enchufla into **X-1**. 

Finally, to get into **X+F,-3** or **X-F,+3** without an enchufla abajo (and without going against the pal piso direction), it also works to do an arm throw like [this one](https://www.instagram.com/reel/DQuGsiwjQCo/) (although throws are more of a thing from salsa and less from casino), along a circle in the pal piso direction (so, since in **X+F,-1** the natural pal piso is clockwise, you throw the arm clockwise). Note however that this is trickier to execute than it looks: throwing the arm down is easy, but for it to come back up, there are a variety of ways in which her elbow can block her.

### Salgo, bajo, moño
The same mathematics as with **II**-hammerlocks apply to salgo and bajo.
- _salgo_(**X+F,+1**) = **X+2+1 = X+3** by [Gastón Carvallo](https://www.instagram.com/p/DU0re2YDZ_g/?img_index=1).
- _bajo_(**X-3**) = _bajo_(**X-2-1**) = **X-F,-1** by [Jorge Luis](https://www.instagram.com/reel/DZc6sfgNvR2/?igsh=MTVqaDQ3azVremE5dw==) (at 0:35). Indeed, this is an extreme example, but as predicted by the math, it works![^9]
- _moño_(**X-L,+1**) = **X-2+1** = **X-1** by [Salsaficion](https://www.youtube.com/shorts/mAZoSMjFsxs).

The theory again predicts that it is impossible to salgo from **X+F,+3** and **X-F,-3**, since that would make **X+5** and **X-5** which don't exist.

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-09.svg"/>
</figure>
**X**-hammerlock ladder with bajo/salgo in blue.
{:.figcaption}

Note that I have not yet found video evidence of the salgo/bajo between **X+F,-3** and **X-1** on the left and the salgo/bajo between **X-F,+3** and **X+1** on the right. Yet, mathematically they are possible. For example, I hypothesise that you can do a bajo from **X-1** or a salgo from **X+F,-3** by putting your right hand behind your neck to get close enough to her and lock her in place.
{:.note title="Theoretical prediction" .filled}

#### Joint hammerlocks
There are 4+1 joint **X**-hammerlocks in practice.

There is one joint **X**-hammerlock where leader and follower are facing each other and being on each other's right side, which again has no practical mirror image for the same reason as we explored in joint **II**-hammerlocks. Whereas the joint **II**-hammerlock had each free arm connected to each hammerlocked arm, now the hammerlocked arms are connected and the free arms are connected. Since this hold is perfectly symmetrical, it has valence of **+0** and can simply be denoted **X+F,+L,** for which we already saw a way to create it above.

In the remaining four joint **X**-hammerlocks, leader and follower are facing the same direction. The most common joint **X**-hammerlock is reached by starting in **X-F,+1** (the base hammerlock on her left hip, reached from **X+1**) and then doing a bájate, putting you in a position on her left where you can no longer salgo her arm, but you can salte your own left arm, and so effectively you are in an **X+L,-1** leader hammerlock with extra decoration, and thus we call it **X-F,+L,-1** (or **X-FL,-1** for short). The other common joint **X**-hammerlock is obtained as the natural consequence of twisting the follower's wrists forwards from there, giving a follower hammerlock instead. We call it **X+F,-L,+1** (or **X+FL,+1** for short).[^10] By symmetry, we get two other holds **X+FL-1** (abierta, possibility to salte) and [**X-FL,+1**](https://youtu.be/UiFg3vyG5XM?t=255) (caída, possibility to salgo).

#### Double hammerlocks
Bajos in **X** holds uniquely[^11] give rise to _double hammerlocks_. Here, the follower has _both_ her arms crossed behind her back and the leader is holding her with parallel hands, like [here](https://youtu.be/UiFg3vyG5XM?si=9xxp812jwgHKaj8u&t=161). This is one way of converting **X-F,+1** into **X+F,-1**: you get into **X-F,+1** with an enchufla, then do a DQN with a bajo, and then do a (clockwise) pal piso.

Since there are two ways to cross the arms _in front_ of the follower (namely **X-1** and **X+1**), there are also two ways to cross the arms _behind_ the follower in a double hammerlock. As was the case with joint hammerlocks, _the topmost arm defines the hold_. That is: if the follower has her left arm behind her back and we bajo the right arm, the hold is _not_ a left-armed hammerlock with a decoration on top, but a right-armed hammerlock with a decoration underneath. So, a [bajo on **X+F,-1**](https://www.instagram.com/reel/Dc00Rb5IS3x/) turns into **X-F,,+1** and a [bajo on **X-F,+1**](https://www.youtube.com/shorts/1Pw8G7M7uio) turns into **X+F,,-1**.[^12] 

In that first video, both double hammerlocks appear in sequence: it starts in the base hammerlock **X+F,-1** followed by a bajo into **X-F,,+1** and a _pal piso inverso_ into **X-F,+1** followed by a DQN and second bajo into **X+F,,-1** which is resolved here with a salgo back into **X-F,+1** and a vuelta into **X+1**. In [this nudo](https://www.instagram.com/reel/DLkoFZBi6dI/) by Wim El Guapo, the reverse happens: he starts with an enchufla into the base hammerlock **X-F,+1**. After a DQN with bajo, we get a double hammerlock **X+F,,-1**. After a pal piso, we get the base hammerlock **X+F,-1**. After a second bajo, we get the double hammerlock **X-F,,+1**. Finally, after a second pal piso, we get the hammerlock **X+F,+1** which in this case is resolved using a salgo into **X+3** followed by an enchufla into **X+1** and a crown.

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-10.svg"/>
</figure>
Double **X**-hammerlock transitions.
{:.figcaption}

## Total
Since all hammerlocks should be accessible in some way when led well, there are 3 parallel hammerlocks and 4 crossed hammerlocks on each hip of each person, as well as 2 double crossed hammerlocks per person and (in practice) 2 joint parallel hammerlocks and 5 joint crossed hammerlocks, and, yielding a total of 

$$
2\cdot (2\cdot (3 + 4) + 2) + (2 + 5) = 39
$$

hammerlock positions we have modelled above. (This is not counting decorations on top of hammerlocks, like coronas, cuernos and ganchos, which we cover below.)

## A final note on equivariance
We have already seen some forms of equivariance show up above, and indeed, applying equivariance will theoretically yield another set of the same diagrams, just with **F** and **L** exchanged. However, in practice there are some constraints on leading that make some transitions impossible, and conversely, there are some freedoms on leading that make some transitions much easier.

An example of a constraint is that leaders don't do rodeos, so an equivariant of Bayamo won't exist. For a similar reason, a leader doesn't get into a double hammerlock by doing some kind of DQN, but he can do it by letting the follower do a rodeo around him when he is already hammerlocked. In fact, the leader can even avoid pal piso altogether by doing a rodeo, as is exemplified in a [_matrix_](https://www.instagram.com/reel/DLVAvtCxASi/?igsh=enlqZDlpdTc4aGZ): starting in **X-L,+1** (the base mirrored hammerlock), he lets the follower do a clockwise rodeo where eventually he dives under her arm. As we have seen in the previous article, a rodeo one way has the same effect as a turn the other way, so this is effectively a counterclockwise leader pal piso, and indeed, he ends up in **X-L,-1** ready to make her do a passbehind into **X+L,-1** (and usually he gets out with an enchufate into **X-1**).

An example of an extra freedom is that leaders can un-hammerlock their own arm without needing a signal and without risk of elbow injuries. This means that _échate_, the leader equivariant of _échala_ we saw above, is much easier to do than _échala_: indeed, you can just do a giro from **II-L,+2** into **II+2**, and because your body and brain are connected, you will know exactly how to bend your arm to not injure yourself. Similarly, performing a _salte_ is much easier than performing a _salgo_ (in fact, salgos are in my experience the one casino movement with the highest failure rate, even with experienced followers) because your muscles are infinitely more attuned to controlling _your_ joints than someone else's.

# II-coronas (II+'F)
A model with just hammerlocks cannot explain common caída-based figures like [_preciosa_](https://www.youtube.com/watch?v=dGot4USgBy4). For this, we need to add another point to the body: the _corona_, which wraps an arm around the neck with the elbow on the chest. These are much more complicated to model in **X** holds, so for now, we stick to **II** holds.

Like center **II** holds and **II**-hammerlocks, **II**-coronalas _on the right_ also have a ladder with three rungs. The most common one, as in _preciosa_, happens from **II** by draping the leader's right arm on the follower's right shoulder, and will be called **II+'F**. 

By holding this coronala [while doing an exhibela](https://youtu.be/hLyxGgsIC9c?t=224), you end in a contortion of **II+2** which we will analogously call **II+'F+2**. (Doing an enchufla on this brings you back into **II+'F** and thus it is valuable to not just consider these coherent holds a stylised **II+2** and **II** despite **II+'F+2** basically just being **II+2** with one hand pushed towards her shoulder.) 

It is equally possible to get into **II-2** with an enchufla from **II** and again drape your right arm behind the follower's neck (see e.g. [here](https://www.instagram.com/reel/DcPAuZJoR0S/) and the start of [this video](https://www.instagram.com/p/DclSzBENJM5/)), giving the bottom rung **II+'F-2** of the ladder.[^13]

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-05.svg"/>
</figure>
Right-side (caída) **II**-corona transitions.
{:.figcaption}

To see the use of a **II**-corona _on the left_, we need frontlocks.

# Frontlocks (+,F)
A _frontlock_ is like a hammerlock except with the arm _in front of the body_ rather than behind. Because it is easier to accidentally escape for the follower than a hammerlock, people don't do frontlocks that often, except in the common case of _Kentucky_.

## II-frontlocks
A **II**-frontlock interacts with the **II**-corona in more than one way, and we will thus combine them into one diagram. To get into a **II**-frontlock, do any turn from **II** that would produce a hammerlock, but with the low and high hand reversed. For example, a vacilala that ends in a **II**-_hammerlock_ has left hand high and right hand low (LHRL), so a vacilala that ends in a **II**-_frontlock_ has left hand low and right hand high (LLRH). The result is **II+,F** instead of **II+F,** like before. (And of course, by equivariance, the leader can frontlock himself by doing a giro from **II** into **II+,L** as shown by Leonardo Esmoris near the end of [this video](https://www.instagram.com/reel/Ddjjh5rqktT/).)

From here, you can get into **II** again by unrolling the follower, which happens naturally without proper forward-pulling tension on the free arm. Alternatively, you can add a coronala _on top of_ the frontlock to get **II+',F** as seen [here](https://www.instagram.com/reel/DT5LLJGDb_R/) at 0:18. Finally, you can follow though with the clockwise turn by doing a salgo, to produce **II+2** as I do [here](https://www.instagram.com/reel/DY3-qi-NVk8/) at 2:00.

Mirroring the above gets us the counterclockwise frontlock **II-,F** from a LHRL enchufla, which is more common and sometimes called "cuddle position". Due to the _chirality_ of casino,[^14]  there is an extra transition that only happens from this frontlock in practice -- and never from **II+,F** -- as seen in [_Kentucky_](https://www.youtube.com/watch?v=V57F7c5R5jY), which alternates between **2°caII-,F** and **1°abII-'F** until an enchufla over her head into **II-2**. Interestingly, this is the only time a coronala appears on the left as far as I know.

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-06.svg"/>
</figure>
**II**-corona/**II**-frontlock transitions. The **II+'F-2** coronala trivially turns into a frontlock by pushing your right hand down past her shoulder.
{:.figcaption}

## X-frontlocks
Frontlocks in **X** holds are created by turning into **X+3** or **X-3** but holding one hand low, resulting in **X+,F+1** and **X-,F-1** respectively. Again, these holds are brittle unless there is proper forward pulling on the free hand.

### With hammerlocks
Unlike **II**-frontlocks, the two **X**-frontlocks (of the follower) can be combined with a hammerlock (of the leader) which works great to stabilise them. In each case below, a _bájate_ is used after the frontlock to achieve this.

[Wim El Guapo](https://www.instagram.com/reel/DSOiDfkCAto/) does two frontlocks starting at 2:32. The first one is again a bájate into **X+,F+L,-1** which he follows up with a follower passbehind into **X-L,+1** and this is of course easily escaped with a giro into **X+1**. (His second frontlock just consists of some fintas, and then the follower rolls out of the frontlock due to natural tension on the frontlocked arm, back into **X+1**.)

[Lucas Beluzo](https://www.instagram.com/reel/DTlDp5CCGv8/) shows a frontlock into **X+,F+1** followed by a bájate into **X+,F+L,-1** that stabilises the frontlock. He can then follow this comfortably by a salgo into **X+L,+1** which is exited by an _échate_ into **X+1**.

[Claudio Levis](https://www.instagram.com/reel/DMYbtPvOcuw/), does a bájate to get into **X+,F+L,-1** followed by the same salgo as Lucas into **X+L,+1**. He then does an enchufate abajo (a.k.a. _Cubanito_) to get the hammerlock on his other hip, which gets him an extra **+2** valence putting him in **X-L,+3** (i.e. a hammerlock on his left hip where his left hand is on top). He takes away 2 with a bajo into **X-L,+F,** but then undoes this with a salgo back into **X-L,+3** which he releases.

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-11.svg"/>
</figure>
**X**-frontlock transitions.
{:.figcaption}

# Full ganchos/ganchas (+go/+ga)
## Full II-ganchos
A _gancho_ happens when someone's arm is folded and the palm of the hand faces up ("extended" wrist), fingers pointing towards that person. It can be done in any position that has a free arm, either as decoration or practically as a way of compressing the arm into a tighter space.

In a _full gancho_, one person does a gancho, and the elbow and wrist of the _other_ person's arm are bent at 90° so that the palm faces down ("flexed" wrist) and the fingers are again pointing towards that person. The gancho plugs into this rectangular shape. 

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/png/2026/gancho.png"/>
</figure>
Full **II**-gancho: leader gancho plugged into gancha of the follower on the leader.
{:.figcaption}


In **II** holds, it happens regularly that the leader makes the _follower_ do a full gancho to him: he does this by making this rectangular shape on the follower's shoulder, which [in the past](https://bauwenst.github.io/posts/tutorials/dancing/2025-07-22-Casino-hammerlock-OP/) I have jokingly referred to as him doing a "[_gancha_](https://www.spanishdict.com/translate/gancha)" on her. Both the full gancho and full gancha in **II** holds happen most frequently on the right side of the couple (the near side in caída) and so a full gancho on that side will be denoted **+go** and a full gancha as **+ga**. For example, it is mostly standardised that [_setenta y uno_ (71)](https://www.youtube.com/watch?v=Au4QgkE5tTE) is the sequence starting in **abII** then vacilala into **II+F,** then enchufla into **caII+go** then DQN into **abII**. 

A gancho or gancha on the left side are less common and are denoted **-go** and **-ga**. I combine a left-side full gancho with a coronala (**II+'F-go**) at 2:45 [here](https://www.instagram.com/reel/DY3-qi-NVk8/).

A gancho also have practical use, namely as a stabiliser. As mentioned above, **II**-frontlocks are quite brittle; in fact, you can see an example of a **II+,F** frontlock that falls apart at 1:45 in [this video](https://www.instagram.com/reel/DY3-qi-NVk8/). Max Lupo shows in [this video](https://www.instagram.com/reel/DUiDqZEikKs/) and [this video](https://www.instagram.com/reel/DdYmLMWRNA2/) that this can be avoided with a **II+,F+go** gancho on the free arm.


<!--
Edit: This is  kind of moot because you just cannot turn in a gancho either way. This is why you can stabilise a clockwise II-frontlock with a right gancho against counterclockwise unrolling even though right ganchos prevent clockwise turns...

The difference between the two is whose elbow is on the outside (**II** holds) or inside (**X** holds) of the couple, which is always the person whose hand palm is facing up. This elbow in turn determines _which way the follower should turn to release it, and which way she cannot turn_. For example, in **II** holds, a gancho on the leader's right arm blocks clockwise turns (e.g. exhibela), whilst a gancha on his right arm blocks counterclockwise turns (e.g. peínala/Coca-Cola al revés).
-->

## Full X-ganchos
In **X** holds, full ganchos don't happen on the outer sides of the couple, but on the diagonals through the center. The most common full **X**-gancho happens during a vacilala into a **X+F,-1** hammerlock with the leader's right arm, and again, this right-armed gancho will thus be denoted **+go**. (As far as I know, a gancha on the follower doesn't exist on the diagonal of an **X** hold, so **+ga**/**-ga** are unused.)

Here too, a full gancho can help to stabilise a hold. At 1:10 in [this video](https://www.instagram.com/reel/DdHKUgit0uT/), the gancho first serves to keep the follower in place so I can salgo from **X+F,-1+go** into **X+1+go** and subsequently it serves to pull the follower in a circular walk while I do fintas with the free arm.

<!--
## Total
This tallying was wrong because you can gancho the bottom arm.
https://www.instagram.com/reel/DL9XkBpOQzg/

Ganchos/ganchas add a lot of extra holds. To be precise:
1. In **II**, each arm can have nothing, a gancho, or a gancha. That makes 9 possible combinations, of which 1 is just **II** itself, so 8 new holds.
2. In **X+1** and **X-1**, the top arm can have a gancho or a gancha. However, it's difficult to lead the gancha, so let's say we get 2 new holds.
3. In **II+F,** or **II-F,** or **II+L,** or **II-L,** there can be a gancho or a gancha on the free arm, but again the gancha is difficult to lead so let's say we get 4 new holds.
4. In **II+'F** there can be a gancho (but never a gancha) on the left arm and thus in **II+'F** there can be a gancho on the right arm, and by equivariance, there should be a coronate **II-'L** and **II+'L** where the same applies but for a gancha. This gives another 4 new holds.

So that gives 18 new holds. 

They could be denoted **+/-go** and **+/-ga** with some convention for what is **+** and what is **-**, but I will not go this far in QT because the real purpose a gancho serves is just to _shorten distances_: a gancho folds up arms of arbitrary length so they fit in a tight space. Compressed storage for later. Ganchos do not generate holds that could not exist without ganchos.
-->

# Cuernos (+F')
We have seen holds with the hand behind the back of the follower, in front of her abdomen, and in front of her head. We are only still missing holds with the hand behind the follower's head.

## X-cuernos
### Crowns
The most common cuerno, by far, happens in a _crown_, i.e. the end of a _sombrero_,[^15] where the follower's _right_ arm is put behind her neck. Because it is the most common, this will therefore be referred to as **+F'** in our notation. In a crown the leader's left arm is behind his neck, and by equivariance, that means **-L'** is the most common for him. To simplify notation for crowns, we will write **+F'-L'** as **+FL'** below.

As with all **X** holds, there is a left-over-right ("more clockwise") version and a right-over-left ("more counterclockwise") version, denoted **X+FL'+1** (you could call this an "**X+1** crown") and **X+FL'-1** (an "**X-1** crown") respectively. The same arm of the follower is used for both since it is the far arm in caída. 

To see the other arm used, you need to find the rare crown in abierta, like the second crown in _sombrero doble_. The first crown is always a clockwise **X+FL'+1**. Then, depending on who you ask, either a flat DQN is done to keep the valence and get into [**X-FL'+1**](https://youtube.com/shorts/Bmkd5-V4p-Q), or a DQN with peínala is done to lower the valence and get into [**X-FL'-1**](https://youtube.com/shorts/vwlH_V9Pui8).

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-12.svg"/>
</figure>
**X**-crowns. The dashed line is a regrip.
{:.figcaption}

### Uncuerno
Because **X** holds always have one arm on top and one on the bottom, each crown has one arm which is free to uncuerno and another which is constrained to doing fintas.

[ _Juana la Cubana_](https://www.youtube.com/shorts/4tDKLXTxrto) is a well-standardised sequence that plays with (un)cuernos: it starts in **X-1**, does a sombrero into **X+1** and crowns into **X+FL'+1**, then uncrowns only the follower to get **X-L'+1** which is maintained during a DQN for as long as possible, then moves the cuerno from leader to follower[^16] to get **X-F'+1**, and finally does an enchufla abajo into **X-F,+1-L'** and an exhibela into **X+1** or **X+FL'+1**.

In the last slide of [this post](https://www.instagram.com/p/Dc8dUQIiMkg/?img_index=5), Wilmer starts in a clockwise **X+FL'+1** crown but without the cuerno of the follower (so really, **X-L'+1**). He then makes her do a peínala under his arm and effectively ends up in a counterclockwise **X+FL'-1** crown, which he uncrowns completely and turns into a clockwise **X+FL'+1** crown with exhibela (and then plays with fintas on that).

In [this nudo](https://www.instagram.com/p/DKkSvIONRul/) by Xavi (dancing with the woman I would probably consider to be the best casino follower I have ever danced with, [Mabel Oriola](https://www.instagram.com/mabeloriola/)), at one point he gets into a clockwise **X+FL'+1** crown and then uncuernos himself so he can walk to the follower's other side and bajo the arm into **X+F,'-1**. He follows it up with a pal piso and a salgo like Gastón's nudo, and an enchufate to turn the **X+3** into **X+1**.

Finally, one of the only accepted re-grips in casino happens during a leader uncuerno in the middle of [_Sombrero de Manny_](https://www.youtube.com/watch?v=-Tp4eI0kWrY). Starting in a clockwise crown (**X+FL'+1**), the leader _lets go_ of the follower's cuerno (making **X-L'+1**) and then drops his arm so that it wraps around hers, making **X-L'+3**. Due to the **+3**, this then allows comfortably doing two counterclockwise turns in a row (in practice usually a peínala into **X+1** and an enchufla into **X-1** or **X-F,+1**).

### With hammerlocks
Just as frontlocks like coronas, hammerlocks like cuernos. Figures based on _ahórcala_ start with a hammerlocking vacilala (sometimes called _enroscala_) into **X+F,'-1** followed by a salgo out of the hammerlock but keeping the cuerno, into **X+F'+1**. An [actual ahórcala](https://www.youtube.com/shorts/opO2WJcy7tM) then simply transitions into **X+FL'+1**. Other sequences may continue with a vuelta into **X+3** (e.g. at 1:05 in [this video](https://www.instagram.com/reel/DY3-qi-NVk8/)) or with a frontlock into **X+,F+1** (e.g. [this video](https://www.instagram.com/reel/DNh4cNqCgy1/?igsh=cmhkbjF4dDFieWw5) by Manolo Triana; note however that the way Manolo continues from this frontlock is very unsatisfying and would have looked much better if he hammerlocked himself into **X+,F+L,-1** and only then let the follower do her passbehind, which we saw El Guapo do above).

There is a leader equivariant of ahórcala -- you may call it _ahórcate_ -- demonstrated by Kevin Cano in [this](https://www.instagram.com/reel/Dcd2kOMI6GQ/) amazing video. Same "arm on the neck" visual as ahórcala, except leader and follower are switched.

<!--
Diagram? At the end of the day it is actually just X+F,'-1 salgo into X+F'+1 uncuerno into X+1 and then the frontlock diagram.
-->

Cuernos are also used as a practical tool. Firstly, they can help to better execute a pal piso. For example, the start of the nudo in [this video](https://www.instagram.com/p/DU0re2YDZ_g/) is a vuelta into **X+F,'-1** to set up for a pal piso into **X+F,+1** (the cuerno disappears). Even more extreme is [this video](https://youtu.be/UiFg3vyG5XM), where there are two instances of a transition from **X+F,-1** into **X+F,+1** into **X+F,+3** (at 4:20 and 5:35) and in both cases they are done through a cuerno. Secondly, a leader cuerno is an alternative to a leader hammerlock for stabilising a follower's frontlock, as shown by Ronnie Stortini [here](https://www.instagram.com/reel/Dcs4VPoo6_U/).

## II-cuernos
In **II** holds, cuernos mostly show up in one of two scenarios, as discussed below.

### Disco
The _joint **II**-cuerno_ **II-F'-L'** (shortened to **II-FL'** if you want) is also called [disco](https://www.youtube.com/shorts/DkYFtl5Gc2Q). To get into disco, you could just raise both hands from **II** (since a joint **II**-cuerno is just a contortion of **II**). Alternatively, you can keep your hand in your neck right after a complicado (see e.g. [here](https://www.instagram.com/reel/DPHFvmWCbsY/) or at 1:50 [here](https://www.instagram.com/reel/DKKxqVnCn2l/)).

Getting out of disco always involves an uncuerno for either or both dancer. If both, the result is just **II**. If just one, often a _candado_ is performed on the dancer whose arm is kept in cuerno (see below). Alternatives also exist: in [this video](https://www.instagram.com/reel/DHDVb-dircI/?igsh=MWFubG52bDE1ZnF3Zw==) at 0:40, the cuerno on the leader is kept while a vuelta is done on the follower, and in [this video](https://www.instagram.com/reel/DKKxqVnCn2l/) at 1:55 the cuerno on the follower is kept while a pal piso is done on her.

### Candado
A _candado_[^17] is a four-step movement performed _from behind a person who is in a cuerno_. Once you understand how a candado works and that an elbow pointing upwards may announce that a candado is coming, sequences like [this](https://youtu.be/GvxlwAI8m0c) become much less confusing.

Say that the _left_ arm is the cuerno, then the person's arms move as follows:
1. Right arm moves from top to bottom, over the head and over the cuerno, onto the left hip.
2. Left arm uncuernos and goes down to a coronala on the right shoulder. 
3. Right arm goes up on the right shoulder 
4. Left arm goes up on the left shoulder 

Since the leader and follower are facing the same way during a candado, one of them must have done _half_ a turn to get there. Since full turns add **+2**/**-2**, half turns add **+1**/**-1**. We will write the four half turns that can be made as respectively **II+L+1** and **II-L-1** and **II+F+1** and **II-F-1** where the sign of the **L** or **F** matches the sign of the only cuerno you can do in that position. So, for example, if the couple is in **II** and the leader does a half turn counterclockwise, that makes **II-L-1**. If he then puts a cuerno (below, we will see how this happens in practice), it will be **II-L'-1** and this is always his left arm, as per above.

Once the cuerno has been freed, indeed **II-L-1** is a half turn away from both **II** (by turning back clockwise) and **II-2** (by turning further counterclockwise). By symmetry, candados with a cuerno of the right arm start from **II+L'+1** and can thus make either **II+2** or **II**.

#### Candados with leader left
There are generally two ways to set up a candado on leader left (**II-L'-1**): having the follower rodeo clockwise around the leader in cuerno but slowing her down before she gets around all the way (a clockwise rodeo is **-2** so half a clockwise rodeo is **-1**), or locking the follower behind you by using a gancho and then setting the cuerno.

For the first technique, to make the follower rodeo around you while you are in a cuerno, it is easiest to start from a _setenta complicado_ where you replace the final enchufate _over_ your head by an enchufate _against_ your head, i.e. your arm stays stuck in a cuerno. For examples, see [this video](https://www.instagram.com/reel/Dcow5AKTAU0/) or the first candado in [this video by Xavi](https://www.instagram.com/reel/DQoHCFajAf9/) or [this video](https://www.instagram.com/reel/DcDTjpiNQej/) or the one in [this video by Salsaficion](https://youtube.com/shorts/t9a-z4TT2T0) or [this video](https://youtu.be/MgjgpZl2lxc) from 0:40 onward. The more inefficient way to do it is to do the full enchufate into **II** and then doing a [disco](https://www.instagram.com/reel/DTfPIHwiFqE/) into **II+L'** which works as long as the follower is instructed to walk.

For the second technique, to keep the follower still with a gancho, start by doing an enchufla from **II+2** or **II+F,** so that she is walking to your right side.[^18] Then, turn your back on her with a half turn counterclockwise, pull up and back with your right hand and pull down and forward with your left hand, so that your right armpit can trap her right upper arm.[^19] This gancho locks you in place. Now, while holding her, you can comfortably put your left arm into cuerno (note that the gancho stays on top even though your left arm goes over your head) and start a candado from **II-L'-1**. For examples, see [this video](https://youtube.com/shorts/P6G1xx1IYWo) by Salsaficion, the second candado in [this video](https://www.instagram.com/reel/DQoHCFajAf9/) by Xavi, or [this video](https://www.instagram.com/reel/DWBMqpbDOq7/?igsh=MW5kOXVxNXl4bnY2dw==) of one of Xavi's classes.

#### Candados with leader right
Rather than applying symmetry, I have learnt other ways of doing a candado with a right cuerno (**II+L'+1**).

One way is to get into a leader hammerlock **II+L,** and doing an enchufate which is again blocked at your neck (effectively making **II+L,'-1**), but turning you counterclockwise just enough to _salte_ your left arm and start the candado over your head (**II+L'+1**).

Another way is a sequence I once learnt from Francesco that heavily plays with cuernos: starting in **II**, do a vuelta into **II+2** and then contort it by putting your right hand behind her neck into a higher-valent cuerno (**II-F'+2**). Then do an enchufla with the left hand but block it at her neck, so that she gets a cuerno with the other arm _and turns counterclockwise_ and releases the old cuerno (**II+F'**), which is really a neck-level Cubanita (in **X** holds, this is _toalla_). Finally, put your right hand behind your neck in a cuerno, momentarily passing through an inverse disco (**II+F'+L'**), and turn clockwise to automatically release her cuerno (**II+L'**) to start a candado in **II+L'+1**.

#### Candados on the follower
By equivariance, the same principles apply for doing candados on the follower. They are just more difficult to lead, because you are now puppeteering her arms while you are blind.

Two examples of a candado on the left are in [this tutorial](https://www.instagram.com/reel/Dc06q5nzdbY/) and in [this social dance](https://www.instagram.com/reel/DXQIak_CBFS/?igsh=MXV6ejgyZW4yNnh1Yg==) of Wim El Guapo. They both start with the equivariant of Lucas's disco above: the leader starts in **II** and this time _he_ walks around _her_ halfway clockwise, resulting in a **II+F'-1** cuerno and indeed the candado happens with her left hand.

As an example of a candado on the right, you can do a vacilala into **II+F,** followed by an enchufla blocked at her neck (creating **II+F,'-1**) followed by a salgo to make **II+F'+1** (but be careful executing this salgo safely: first down, then out).

### Juego
Once you uncuerno in this **+1**/**-1** position, the cuerno stays away. Nevertheless, the arms still have freedom to move. If it is the follower who is behind the leader, the leader has the opportunity to safely perform an infinite sequence of quick fintas around his head. We will call this sequence a _juego_. 

Every candado can end in a juego, but a juego doesn't require a candado; any half turn is a setup for a juego.

In a juego, one hand bounces from shoulder to shoulder, whilst the other hand bounces from shoulder to hip; in **II-L-1** this is the right hip, whereas in **II+L+1** this is the left hip.

#### Juego al derecho vs. al revés
It is up to the leader whether he wants to play the juego loop forwards or backwards. This means there is a _juego al derecho_ and a _juego al revés_ on each hip. 

Assume that we start with each hand of the leader on its own shoulder, which we will call the "base position" of the juego. Then, the [_juego al derecho_ from **II+L+1**](https://www.instagram.com/p/DSk66p5CKh_/) is as follows:
1. Left hand to right shoulder.
2. Right hand to left hip.
3. Left hand to left shoulder.
4. Right hand to right shoulder.

You can think of it as the right hand being disgusted by the left hand. The left hand tries to get to the right hand, which makes the right hand run far away, which makes the left hand go back and then the right hand comes back.

The _juego al revés_ from **II+L+1** is the time-reversed sequence:
1. Right hand to left hip.
2. Left hand to right shoulder.
3. Right hand to right shoulder.
4. Left hand to left shoulder.

Now it is the right hand that voluntarily joins the left hand, and the left hand that runs away. 

You will notice that step 3 and 4 of the _juego al revés_ are easier to do when you do them at the same time or at the very least by raising your right arm in step 4, because the arm that moves in step 4 will otherwise be trapped between your head and the top arm. You can see in [this video](https://www.youtube.com/shorts/RRcvPeMlDjg) that Steven Messina's left hand gets stuck on his right shoulder once his right hand has returned from the hip.

By symmetry, for _juego al derecho_ from **II-L-1** and [_juego al revés_ from **II-L-1**](https://youtube.com/shorts/UT-VSDy7jro) this is all true as well, except with "left" and "right" exchanged. In [this video](https://www.instagram.com/reel/DbgX1ZbNI5L/) at 0:40, I do an enchufla into **II-2** followed by a half-turn clockwise into **II-L-1** where I do (half of) a _juego al revés_ followed immediately by an exhibela into **II+2** and a half-turn counterclockwise into **II+L+1** where I do a _juega al derecho_.

#### Juego with bájate
In the base position of juego, the easiest way to exit is to move both hands to one shoulder and turning that way. Alternatively, one thing leaders do from both **II+L+1** and **II-L-1** is to bájate the left arm, turn clockwise, and moño. (The reason it is only done with that arm and it that direction is because it puts the follower in caída.)

The effect is different for both, of course. turning clockwise on **II+L+1** produces valence **+2** whilst on **II-L-1** it produces **+0**. Additionally, in the case of **II+L+1**, the moño forces your right hand to be pushed towards her shoulder and effectively you will be in **II+'F+2+L,** between the bájate and the moño and thus in **II+'F+2** after. For extra style, you can do the same fintas I do at the start of [this video](https://www.instagram.com/p/DdHKUgit0uT/) before the moño.

[For **II-L-1** there is no automatic coronala](https://youtube.com/shorts/UT-VSDy7jro), but it is way cooler to do a coronala into **II+'F** rather than nothing at all. For extra style, do the moño, but keep her hand on your left shoulder as long as you can until after you have put the coronala.

#### Summary of candado, juego, bájate
For candados and juegos on the leader, the following relationships hold:

|                           | II+L+1                                                   | II-L-1                                                                    |
| ------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| Candado's cuerno arm      | Right                                                    | Left                                                                      |
| Juego without candado via | [exhibela](https://www.instagram.com/p/DSk66p5CKh_/)+CCW | [enchufla](https://www.youtube.com/shorts/UT-VSDy7jro)+CW or **caII**+CCW |
| Juego's hip               | Left                                                     | Right                                                                     |
| Left bájate+moño makes    | **II+'F+2**                                              | **II+'F**                                                                 |

In the following diagram, the two 4-block groups represent a complicado-to-candado transition, the isolated blocks on either side represent a juego, and the two 2-block groups represent the left-arm bájate+moño.

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-07.svg"/>
</figure>
**II**-cuernos: candado (from complicado), juego, bájate-moño-coronala.
{:.figcaption}


It is already known that when the follower is walking into caída **II** -- for example, after an enchufla from **II+F,** -- the leader can do a half turn counterclockwise, lift both arms onto his shoulders and start doing a juego. Theory predicts that the mirror image of this should also be possible: when she is walking into abierta ending in **II** -- for example, after a DQN from caída **II** or a DQN with peínala from caída **II+2** -- the leader should be able to put both hands on his shoulders and do a juego on his other hip while making her rodeo inverso.
{:.note title="Theoretical prediction" .filled}

<!--
There are two scenarios:
- Candado from left leader cuerno == juego on right hip (the one from Jorge's Kentucky) == bájate+turn clockwise+mono comfortably into II+'F (and you can even keep the mono stuck behind your back a little longer for style) 
- Candado from right leader cuerno == juego on left hip (the one from Wilmer's exhibela) == bájate+turn clockwise+mono into II+'F+2 (and you can do fintas for style but not keep the mono) Found a video of Wilmer doing it: 
-->

### Other II-cuernos
Very rarely, you will see a **II**-cuerno that is not a disco or a candado. One example is [here](https://www.instagram.com/reel/DKKxqVnCn2l/) at 1:05, where Jorge Luis creates a position that could be denoted as **II-F'+L,-2**. From there, he does an insanely difficult giro to get into **II-F'+L,** and then a bajo into **II+F,+L,** and a moño into **II+F,** to end.

# X-coronala (X+'F/+Fgo/+Fga)
Let us finish with the most advanced and niche part of QT, which are **X**-coronalas. These holds are mathematically very interesting, because they actually come in three different flavours. Two of these flavours reveal to us that _coronalas and ganchos are actually related_ to each other (which was a big surprise to me), and that a **II**-coronala and a **II**-gancho both consist of two distinct pieces that can be separated.

## Gancho-based X-coronas
Remember the following four phenomena we have seen:
- A _gancho_ means that someone puts his/her _own hand on the shoulder of that same hand, palm facing up_, fingers pointing back.
- In a _gancha_, someone puts his/her hand _around a shoulder of the other person, palm facing down_, fingers pointing to the person doing the gancha.
- In a **II**-corona, a person's arm is put _in front of their neck_. 
- Also in a **II**-corona, the person doing it puts his/her own arm _behind the neck of the other_.

In the section on _full ganchos_, all the ganchos were married to ganchas and vice versa, like a plug and a socket: every gancho by the leader on his shoulder automatically causes a gancha by the follower on his same shoulder, and the converse. (It is for this reason that "gancho" is normally used as a synonym for "full gancho", but in this section this is _not_ the case.)

As it turns out, in **X** holds, these four properties are mix-and-matched: one flavour of **X**-corona combines the arm in front of the neck with a gancha (empty, never filled with a gancho), whilst another flavour of **X**-corona combines the arm behind the neck and the gancho (floating in the air, with no gancha to plug into).

In **X-1** in caída, put your right hand on her near shoulder. Observe that this is effectively a II-gancha and a **II**-coronala combined, except there is no gancho and no arm behind her neck. This gancha will be called **X+Fga-1**. There are three parts to this new symbol "**+Fga**": 
1. The "**+**" is because this shoulder has the most common **X**-gancha; 
2. The "**F**" is because the shoulder belongs to the follower;
3. The "**ga**" distinguishes it from a ganch**o**.

Now, from **X-1** caída again, take your right hand and put it on her far shoulder by going over her head. She is now showing a gancho. This will be called **X+Fgo-1**. Indeed the [_toalla_](https://www.youtube.com/watch?v=rggfpQ3it3s&t=23s) figure alternates between **X+Fgo-1** and **X-Fgo+1**, which works out nicely since it is basically a Cubanita at the neck and Cubanita alternates between **X+F,-1** and **X-F,+1**. The toalla equivariant for leaders, by the way, is [_balsero_](https://www.youtube.com/watch?v=9TRul_cN9ts), which, if you dance tight, is exactly done with two ganchos on your shoulders.

You can combine these two in something that looks more or less like a **II**-gancho combined with a **II**-coronala all on one shoulder. From **X+1** caída, put a gancha on her far shoulder with left, and then put your right hand over her head. The result is **X-Fga+Fgo+1**. You can make her exhibela under this to make **X+3**.

Note the big difference between something like **X+F,-1+go** and **X+Fga,-1**: one is a follower hammerlock with a full gancho on the free arm, the other is a gancha on the follower's left shoulder with a hammerlock overtop.

## Bajo on **X**-gancha
Something cool you can do with an **X**-gancha of the topmost arm (**X+Fga-1** and **X-Fga+1** and **X+Lga-1** and **X-Lga+1**) is that you can put a hammerlock overtop it. For example: from **X+Fga-1** you can take the left arm and bajo it so that it lands on her right hip, creating **X+Fga,-1**. Like in a double hammerlock, the bajo puts the _hammerlocked arm on top of an existing hold_, which stays underneath. If you salgo the arm, the **X**-gancha is still there. 

In fact, with suitable wrist rotation, you can actually turn that bottom gancha arm into a hammerlock itself, making the hold a double hammerlock. The perfect example of this is [this follow-up](https://www.instagram.com/reel/DdD0XMkoflL/) on Gastón Carvallo's nudo we discussed above. From 0:15 in the video, starting in **X+1** (technically **X-L'+1**), he does a peínala and uncuerno into **X-1** and quickly puts a gancha on her left shoulder with his right hand to create **X+Fga-1** followed by a bajo into **X+Fga,-1**. Then he raises the gancha over her head to bajo the other arm too, creating **X+F,,-1** where notably the arm that is hammerlocked second is _below_ the arm that was hammerlocked first. He then does a salgo into **X-F,+1** and an enchufla abajo inverso (Cubanita) into **X+F,-1** where he reverses and mirrors the sequence: he gets back into a double hammerlock **X-F,,+1** followed by a salgo of the bottom arm into a gancha on her right shoulder, indeed creating **X-Fga,+1**. He puts his head inside the gancha for styling, then does a salgo on the hammerlock into just **X-Fga+1**, and finally releases the gancha into just **X+1**. (For extra swag, he then makes her vuelta which would result in **X+3**, but he secretly lets go inside the vuelta so that he ends in **X+1** and crowns.) In the end, he takes a walk around the following diagram:

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-13.svg"/>
</figure>
**X**-ganchas, gancha-hammerlocks and double hammerlocks.
{:.figcaption}


[Andrea Milillo](https://www.instagram.com/reel/Dc3GXOduiiF/) shows the leader equivariant of (half of) this sequence: from **X-1** he puts a gancha on his own left shoulder (**X+Lga-1**), does a bájate of the other arm over the gancha onto his right hip (**X+Lga,-1**), raises the gancha over his head and does another bájate that ends below the existing hammerlock (**X+L,,-1**) so that a salte on the top arm creates a base hammerlock (**X-L,+1**) which he undoes with a giro to finish (**X+1**).

[Claudio Levis](https://www.instagram.com/reel/DSS8l27D_Ib/) shows that you can do an **X+Fga-1** gancha and then bájate your other arm, but I don't think there is anything else that can follow from this except a moño. (His walk around the follower doesn't seem to end in anything noteworthy.)

## **X**-gancha on X-frontlock
Just like **II**-corona and **II**-frontlock could be combined, the same is true in **X** holds; of course, this time the leader and follower will not be facing each other but rather be facing the same way, exactly as is the case for arms being parallel (in **II** holds you just face each other; in **X** holds one of the two has to walk to the backside of the other, Cubanita/Cubanito).

[Claudio](https://www.instagram.com/reel/DavsaJ6vOYp/) starts with a clockwise frontlock (**X+,F+1**), then puts his free hand on her right shoulder to create a gancha (**X+,F-Fga+1**). He keeps his elbow up in this case so that she can pal piso inverso under it, which creates something like a counterclockwise frontlock overtop a gancha on the right shoulder (X-,F+Fga+something), which is too complex to hold and so they release. 

Jorge Luis does the same thing at the end of [this video](https://www.instagram.com/reel/DYH4S1rsDki/) except in reverse: he starts with the uncomfortable hold, and so he can transition to more comfortable holds without letting go. From **X+1**, he does a gancha (**X-Fga+1**), then turns Indira a half turn counterclockwise (kind of like an enchufla doble) so he can frontlock her with his right hand overtop the gancha (**X-Fga+,F+something**). Then she turns back from the half turn and does an entire pal piso (the turn looks fast because it is, since she is rotating 180⁰ + 360⁰ rather than 360⁰), which ends up in a gancho'd **X+3**.

[Adonis Santiago](https://youtu.be/o5EXErH74yg?t=80) at 1:20, finally, does a peínala from **X-1** into **X-,F-1** and then puts a gancha on her left shoulder to make **X-,F+Fga-1**. He then walks around in the same way we saw for a **II+'F,** coronala, except offset from her rather than aligned with her since this is **X** and not **II**. Adonis chooses to release from there, although he could have done a salgo into **X-3**.

## Hard coronala
You may wonder why we didn't use **+'F** for the previous two flavours of **X**-coronala. The reason is that there are 8 of them, for each valence. With **+**/**-** and **F**/**L** and **go**/**ga** there are 8 variations, whereas **+'F** and **-'F** only has two.

Now, because the third flavour of **X**-coronas is not related to ganchos and we can count its variations with valence, it is the one that will get the **+'F** notation.

From **X+Fga-1** (gancha on the near shoulder in caída), just exhibela. Your right hand will become uncomfortably trapped behind her neck. This is the hard coronala **X+F'+1**. You can either [decoronala](https://www.instagram.com/reel/DaPzoyvI4Bb/) to get into **X+1** or bájate first to put you in **X+L,+'F-1** which becomes a normal **X+L,-1** hammerlock after decoronala.

Similarly, from **X+Fga+1** (same shoulder but now the gancha is coming from the armpit), exhibela creates an even more uncomfortable trap which is **X+'F+3**. From here, you can either decoronala to get into **X+3** or bájate first to put you in **X+L,+'F+1** which becomes **X+L,+1** after decoronala.

Obviously the same logic holds for counterclockwise turns and trapping the left hand. 

<figure class="center-figure">
<img class="lightbox-feathered" src="/cdn/img/svg/2026/qt/diagram-14.svg"/>
</figure>
Hard **X**-coronalas and bájates.
{:.figcaption}

Theoretically there exists a manually trapped left hand **X-'F+1** and a **X-'F+3**, but practically these are so uncomfortable, forcibly entered and have no cool exits (no freedom to bájate) that I won't put them on the diagrams.

## What about II holds?
It would be weird if a type of hold that exists in **X** wouldn't exist in **II**. Indeed, if **II** holds and **X** holds only differ by half a turn, then there should exist floating ganchos in **II** as well. Actually, we did see a floating gancho in **II** holds, in preparation for a candado. And additionally, secretly we also saw a **II**-gancha done by the follower from behind the leader, but we collapsed all of this richness into just _candado/juego_ and the "**+1**" notation.


<!--
v1 of X-coronalas (bro was so close):
Crossed coronalas almost never happen because they are much more brittle. Imagine the couple in **caX-1**. The leader can put his right hand on the follower's near shoulder, which puts her right elbow on her chest. The movement required for this doesn't even involve an arm moving over her head and is easily undone, but it is the (right-over-left) crossed equivalent of **caII+'F** which we may call **X+'F-1**. After one exhibela, he can put his left hand on her far shoulder to create the equally brittle **X+'F+1**.

Valence normally doesn't change the side of the body so in that sense it's quite strange that +'F+1 is on the right shoulder but +'F-1 is on the left shoulder. Better idea: refuse to accept that +'F-1 can exist. It's just +'F+1 and -'F-1.

I think actually that the _toalla_ hold can be seen as an X-coronala. The valence checks out.

The Manolo y Lorenis video is good inspiration and shows that putting a hand on the shoulder is related to corona, maybe even is one, but then it goes around the neck after exhibela and idk it looks so un-casino

Interestingly, just like **X** holds have double hammerlocks, they also have a _double coronala_: in **X+'F+1**, it is possible to take the right hand and drape it around her head on top of the other hand which is already on the far shoulder. This is no longer brittle, although after one more exhibela, it degenerates into **X+3**. We may call this double coronala **X+''F+1**.
-->

# Supersymmetry
It should be clear from this article that symmetry (left/right and clockwise/counterclockwise) is a powerful tool to identify what is possible based on existing knowledge within the same hold family: **II+F,-2** implies the existence of **II-F,+2** and **X+'F-1** implies **X-'F+1** and so on. 

However, we also saw broader _supersymmetries_ across the families: phenomena in one family that had an analogue in the other. Fundamentally, these can be reduced to two causes, namely that (1) obviously the four points of QT (lower back, abdomen, chest, neck) will block an arm regardless of which arm it is holding, and that (2) if humans had a face on the back of their head, **X** holds would actually just be **II** holds where one person turned 180° at the start.

As a result of (1), we did not need to repeat all the possible transformations for **X**-hammerlocks because pal piso (**+2**), enchufla abajo (**-2F,+2**), salgo (**-F,+2**) and even passbehinds (**-2F,**) all behaved the exact same mathematically as in **II**. As a result of (2), we also noted that it is always true that either a passbehind or an enchufla abajo causes extra entanglement, whilst the other simply transitions between base hammerlocks: in **II** it is the passbehind which is simple, in **X** it is the enchufla abajo (Cubanita).

Another result of (2) is that the joint hammerlock and joint cuerno always share the way the dancers are looking: a joint **X**-hammerlock and joint **X**-cuerno (crown) both have the two dancers facing the same way, whereas in a joint **II**-hammerlock and joint **II**-cuerno (disco) the dancers are facing each other. 

And finally, again as a result of (2), we saw how full ganchos and coronalas are secretly made up of two parts each, which get offset from **II** to **X**.

# Conclusion
## Does this cover all holds?
This article technically does not list every possible hold, although the given examples already cover more than you will ever need to become a master of arm complexity. 

I don't know if there exist fundamentally unique phenomena (holds/transitions) in casino which I have not mentioned in this article. Funnily enough, originally this outro had a list of many phenomena which I could not model with QT, but I accidentally solved them one-by-one by going down many rabbit holes: disco, gancho, candado, juego, double hammerlock, ... They were all classified as "unimportant decorations that don't need notation" originally, but since they showed structure, I chased the rabbit.

We have some guarantees though. I believe that the Macarena method actually does identify all the points on the body that can trap an arm (back/abdomen/chest/neck, plus gancho/gancha holds, plus center holds of course) which means that there should be QT notation for every arm hold you can come up with.

## The purpose of a model
A model is a machine whose behaviour matches a full set of observations and predicts novel observations before they occur. In the case of QT, it is quite useful for a leader to be able to predict what will happen to his arms and the follower's even before he actually executes a figure, so he can set up the position he wants. This is true both for the invariant holds as well as hammerlocks. I found that being able to reason about holds while dancing has greatly ameliorated my casino, because I am now _aware of where the couple is_.

Having a model has also really helped me analyse complex sequences in videos. This is huge. When you watch a video of something you haven't done yourself, ordinarily you have two options: either you are so bewildered that you don't even know where to begin trying to reproduce what you saw (and so it stays completely unaccessible to you because you genuinely cannot fathom what is happening, as if momentarily your vision went blurry) or alternatively you try to mimic the video frame-by-frame, from start to end, as if it is some big opaque blob. But with a model, you can identify the individual 4-count parts of the video, and if you've trained how to execute those, you can execute the sequence.

For example, let us take a moment to dissect two sequences by Jorge Luis that were mentioned above -- sequences which would ordinarily make your brain explode without QT.

The sequence [in this video](https://www.instagram.com/reel/DX4TdZzsD2Q/) at 1:35 is as follows:
- Start in **II**
- Vacilala into **II+F,**
- Salgo into **II+2**
- Rodeo into **II** (decorated with **+go**)
- Coronala into **II+'F**
- Exhibela into **II+'F+2**
- Bajo into **II+F,**
- Pal piso into **II+F,+2**
- Bájate into **II+F,+2+L,**
- Rodeo into **II+F,**
- Enchufla into **II**
- Vacilala into **II+F,**
- Enchufla into **II**
- End with a double gancha to close the position.

The sequence [in this video](https://www.instagram.com/reel/DZc6sfgNvR2/?igsh=MTVqaDQ3azVremE5dw==) at 0:15 is as follows:
- Start in **X-1** (right over left)
- Giro into **X+1** (decorated with **+go** on the lower arm)
- Bajo into **X+F,-1** (since **X+1** = **X+2-1**)
- Salgo into **X+1**
- Rodeo into **X-1**
- Vacilala loco into **X-1**
- Vacilala into **X+F,-1**
- Enchufla abajo (a.k.a. Cubanita) into **X-F,+1**
- Peínala inverso into **X+1**
- Enchufla into **X-1**
- Peínala into **X-3**
- Bajo into **X-F,-1** (since **X-3** = **X-2-1**) by moving the right arm into a hammerlock on the left hip, while his left arm is still under it. 
- Enchufla abajo into **X+F,-3** (i.e. increased valence on the other hip)
- Pal piso into **X+F,-1** automatically due to **X+F,-3** being so uncomfortable like **II+F,-2** is. It happens very quickly, but notice that first the hip switches and then the pal piso happens. She bends forwards but this is not strictly necessary.
- Enchufla into **X-1**
- Giro into **X+L,-1** 
- End by letting go with left and just an **R** enchufla.

## The purpose of diagrams
It should be obvious by now that every casino dance is just a transition sequence through a [finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine), or equivalently, a path through a [directed graph](https://en.wikipedia.org/wiki/Directed_graph).

I showcased about a dozen diagrams in this article, with some holds appearing in multiple diagrams -- although of course, I organised the diagrams such that every state only appears once per diagram. You would have to intersect all **II** diagrams to get the complete **II** finite-state machine and idem for the **X** diagrams, but these would be impossible to display in 2D without excessively many crossings. 

There is no point displaying the entire finite-state machine at once anyway, since the couple can only be in one state at a time. On the other hand, drawing in-out diagrams for each hold would not show the structure that exists in the neighbourhood around multiple holds. My diagrams live in the middle: they collect a subset of holds and transitions to make you understand patterns. They are not meant to be memorised. They are there to show you that the dance is not just a soup of holds that each have completely unique behaviour.

## The purpose of notation
It is true that you don't actually need _notation_ for modelling or diagramming: for example, in the case of a crossed-hands hammerlock on the follower's right hip, it suffices to keep a four-stage counter in mind. A single number. Your eyes and muscles already remind you that it's a crossed right-hip follower hammerlock. The important part is knowing how many turns you can do in such a scenario: two clockwise or one counterclockwise.

I have personally found two benefits specifically from having notation to describe arm holds: the first is that whenever I take notes (I learn something new in class, I see something in a video, I have an idea about a potentially interesting sequence, I write out a to-do list of figures for the week, I record a practice video with a dance partner, ...) my communication has become very short but very precise. I don't have to fiddle around with vague and verbose descriptions anymore.

The second benefit of having notation is that it summarises a lot of related holds better than a name. For example, there are four different crowns. Without notation, to remember this, I would have to represent these crowns with four "things": four blocks in a diagram, four video links, four names of rueda figures in which they appear, and so on. Yet, with notation like "**X+FL'-1**" for just one of the four crowns, it is immediately obvious that there are three other crowns (**+/+** and **-/+** and **-/-**). And because the notation is quite easy to read, we don't even need a video to figure out what to do to get into those other holds.

<!--
Creating it required exploring all possible holds that could exist. In other words: having a complete catalogue of hold names implies having a complete catalogue of holds, pushed outward to the limits (**II+2** and **X+3**) and covering all symmetries and equivariances. I would have never realised there actually existed three parallel hammerlocks on the follower's left hip (right from leader's perspective) if I had not mapped out that there is indeed a **II+2**, **II+0** and **II-2**.
-->

## Acknowledgements
I would like to thank my teachers [Francesco & Julie](https://www.instagram.com/baila_francescoyjulie/) for having introduced me to armwork sequences. It was literally the very first class I had from them, in February 2025, five months into my casino journey, which triggered my curiosity to figure out a way to understand and efficiently write down armwork.

I could not have figured out any of this without experimental subjects; in particular, I was helped a lot by [Alana](https://www.instagram.com/reel/DY3-qi-NVk8/), the top casinera in my city, and by my own mother. The many practice sessions with these two women are how I gathered the observations that allowed me to connect the dots.



[^1]: In other articles I have adopted Salsaficion's conventions to call these "enchufate arriba" and "enchufate atrás", but I will not do this anymore because it uses more words than necessary.

[^2]: Leader-follower equivariance is another way of discovering figures through paradigm filling that is distinct from symmetry, and I will explore this in a future article.

[^3]: It's quite likely that the name "_setenta pal piso_" refers to the fact that the _leader_ goes _to the floor_ to undo the **II+F,+2** back into **II+F,** with a rodeo. Nevertheless, since we already have a name for rodeo, I have adopted the name _pal piso_ to refer to the clockwise turn of the follower when she is already in a hammerlock. Since she has to crouch down during her turn for this to work properly, you can think of this as the "pal piso" part.

[^4]: I won't go into detail here about why I don't use notation like "**II-2F,**" instead.

[^5]: Both sequences can be alternated indefinitely, tracing a kind of hysteresis curve in the space of parallel holds: that is, the path from left hip to right hip is different from the path from right hip to left hip. The cause for this asymmetry is that when the leader performs an enchufla abajo in a hammerlock of _parallel_ hands, the follower's arms are _crossed_ if you freeze time while you are behind her back. So, behind her back, you find the left-right asymmetry reminiscent of **X+1** vs. **X-1**.

[^6]: Forgetting about the arms, there is no canonical name for the movement of the follower in _échala_ even without the arms. In particular, there is no name for only the 2° part of a Cubanita. An échala has the 180° rotation of an enchufla, but enchuflas happen in 1° by definition. It has the clockwise rotation of a vuelta and vueltas happen in 2°, but the signal is markedly different from a vuelta and it is not a full turn. The latter is also why _peínala inverso_ probably doesn't fit. It is not a salgo movement either because there is definitely a turn involved. So, we give it its own name.

[^7]: Actually, I should note that I have seen it done once by [Oscar Cuspineda](https://www.instagram.com/reel/DbRgJsYOSXv) and once by [Lucas Flemming](https://www.instagram.com/reel/DHN2K6gtSbc/), but the resulting hold is more like a **II+'F+4** rather than a true **II+4** in both cases.

[^8]: Note that QT _does not_ consider "being behind the other person" a valid position nor a valid hold. Somebody could invent a system where "Cubanita position" is a separate thing, but in QT it is purely transitional. When the leader walks forwards properly, this is basically true anyway.

[^9]: We isolated a **-2** here. What doesn't work is isolating a **+2**, as this would imply bajo(**X-3**) = bajo(**X+2-5**) = **X+F,-5** which of course could never exist.

[^10]: Since the leader is on whatever side the follower's hammerlocked arm appears, the **-F** variant is similar to a crown in caída, while the **+F** variant is like an abierta crown. 

[^11]: In principle, there are no double hammerlocks in **II** holds. Of course, it is technically possible to torture the anatomy of you and/or your follower, to create holds like [Gastón Carvallo](https://www.instagram.com/reel/DbGCH2Vs37S/?igsh=MTB6MndhZ2JnaXozeQ==) sometimes does; in that sense, you could say that there exists e.g. a bajo from **II+F,** into **II-F,,** (here with a pal piso inverso to get into some other uncomfortable hold, which he exits with what looks like an échala).

[^12]: Choosing the signs of the **F,,** is a design choice. You could instead follow the convention that the arm underneath determines the sign, so that you would know which hammerlock you started from. Let's call this the _retroactive_ sign convention. This is a real benefit to reproduce a hold. I chose to go with a _proactive_ sign convention that better predicts the effects of transformations on these holds: for salgos, the sign matches the effect on valence (salgo on **+F,,** causes **+2** valence) and for clockwise pal pisos, the sign matches the resulting hammerlock hip (clockwise pal piso on **+F,,** causes **+F,**). I chose to add a valence (**+F,,-1** rather than just **+F,,**) because it allows predicting salgos and because it is already the result of both pal piso directions (that is: salgo on **+F,,-1** yields **-F,+1** whilst clockwise pal piso yields **+F,-1** and [counterclockwise pal piso yields **-F,-1**](https://www.instagram.com/reel/DbIJgqds-6a/)).

[^13]: There are two reasons we use **+'F** rather than **-'F** here: firstly, because it is more intuitive to use **+** when something is added on top of a hold and we would like the most common case to receive that more intuitive notation, and secondly, because the only time a coronala is combined with another hold and outlives that other hold is with a frontlock. A hammerlock decorated with a coronala will always gain the coronala last and lose the coronala first, so the sign of the hammerlock is what matters. A frontlock decorated with a coronala, however, can lose the frontlock first, and when this happens, we start with the sign of the frontlock and end with the sign of the coronala. Since a right-armed coronala implies a clockwise frontlock, and since we would like the sign not to change, this again means using a **+** for right-armed coronalas. (In the case of the frontlock, you transition from **II+,F** to **II+'F** this way.)

[^14]: _Chirality_ means you can tell whether or not you are looking at a mirror image, e.g. when you are watching a casino video. The reason for the chirality of casino traces back to the chirality of _danzón_ (the man uses his **right** elbow to make his frame in _posición cerrada_, not his left elbow) which gave rise to the chirality of the extra positions in _son_ (the man holds the woman's right hand in _posición abierta_) and _casino_ (_posición caída_, from which DQN starts, is on the leader's right arm since making a circle with leaders holding their follower in their left hand with everyone facing the centre causes the closest neighbouring follower to be on the right). Where did the ancestors of danzón get the convention that the man should put his right hand on the woman's back? Probably because most humans are right-handed and are thus stronger with their right hand. This suggests that (1) the man should apply this strength where he has the most control over the woman's position, which is the connection with her back, and (2) the man should not apply this strength where he is touching the woman's hand, because he will greatly overpower her, and thus the frame opens on his left.

[^15]: For the Spanish-speaking world, it may be good to translate "crown" as _coronanse_ rather than _corona_ because we are already using the name _corona/coronala/coronate_.

[^16]: Technically she does a **-Fgo** gancho instead of a cuerno, but the difference is minimal and it leads us too far at this point. See the section on **X**-coronalas for details.

[^17]: I am aware that the name _candado_ is used for two (and [possibly](https://salsaselfie.com/2019/11/04/cuban-salsa-candado/) more) other figures already: [this one-armed figure]() by Salsaficion adopted by e.g. [these people](https://www.youtube.com/shorts/vnIWBVFBKZk), and some two-armed figure that looks like Kentucky except without the coronala, only the frontlock (e.g. [here](https://www.youtube.com/watch?v=ZNLygn4HaZA) and [here](https://www.youtube.com/shorts/gaLQyyQmOSQ) and [here](https://www.youtube.com/watch?v=_xxdw1hn-2U)). I am also aware that some people have called the movement I am describing a "juego" and some other have called it "nudo". Unfortunately, I do not care about any of the aforementioned people's opinions with regards to naming, whilst [Xavi](https://www.instagram.com/reel/DWBMqpbDOq7/?igsh=MW5kOXVxNXl4bnY2dw%3D%3D), a nudo expert, actually does call this movement _candado_ ("padlock"), and I agree with him since putting the cuerno in place and then undoing it actually looks like locking and unlocking a padlock. 

[^18]: You can even do it without her walking the whole bar in **II**. All that matters is that she reaches caída in **II** at the end of the second bar. So, you could also start in **II** and enchufla into **II-2** which you undo with a giro, just in time to reach **II** and still catch her with a gancho.

[^19]: Because you need her to be in caída and you to do a half turn, it is also possible to make her walk to your left, but by doing your half turn, it becomes your right, like David Jascha does [here](https://www.youtube.com/shorts/STEWYU5RinU).
