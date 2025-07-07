---
layout: post
title: A Matrix Algebra that Models Dancing with Two Arms
description: And you thought I was done systematising.
last_modified_at: 2025-07-07
tags:
  - salsa
  - casino
---

I have written in the past about the [positional system](https://bauwenst.github.io/posts/tutorials/dancing/2024-12-29-Casino-positional-systems/) that underlies casino dancing and [why it works so well](https://bauwenst.github.io/posts/tutorials/dancing/2025-04-07-Casino-caida-substitutes/) as a model that predicts what works and doesn't work. Such modelling [had already been done](https://youtu.be/vPlTwKLdgDI?t=37) even before I knew casino existed, probably because positions are mainly *footwork*, and footwork is what everyone, beginner or not, needs a good understanding of before anything else. Conversely, at higher levels, not much new footwork is learnt, and **armwork** becomes the focus. Since arms can move so freely, it would seem impossible to model them discretely at first glance, and so nobody has managed to do so. I will do exactly that, and integrate it into positional theory. Introducing *bibrachial theory*.

1. dummy
{:toc}

By the end of this article, you should have a fundamentally deeper insight into what you can and can't do when holding a follower's two hands at any given time.

# Related work
As far as I have found, exactly two people have explored this otherwise uncharted territory of modelling armwork, but both created incomplete sets of holds and both failed to put them into an ordered space, making the relationship between these holds much muddier than they should be.

One thing they both got right, however, is the observation that *arms rest in a finite amount of **holds***. This is exactly equivalent to how **positions** delimit footwork, and it means that every possible way two people could hold both hands is discretisable. Of course, whereas footwork between positions is [discretisable in 2D](https://bauwenst.github.io/posts/tutorials/dancing/2024-12-11-Casino-101/), transitions between handholds are not, but we don't need detailed descriptions of these transitions because (1) the path travelled by an arm is much less important than the direction stepped by a foot, and (2) holding both hands severely restricts what the arms can do.

## M. Blais (2004)
In chapter 6 of [Martin Blais's 2004 *Latin Dance Study Guide*](https://furius.ca/salsa-book/), he coins 10 types of two-armed holds:
1. *Double, open*: both hands held without any arms crossing.
2. *Double, crossed (and its reverse)*: one person crosses their arms and connects, but not the other.
3. *Doubly-crossed (and its reverse)*: both people cross their arms and connect. Can be obtained from "double open" by having either person turn 360° clockwise or counterclockwise under both arms.
4. *Wrapped*: like in Kentucky.
5. *Front-to-back crossed*: like in Cubanito/-a.
6. *Sombrero ("for leader" and "for follower")*: the crown after a sombrero and a montaña respectively.
7. *Setenta (70)*: "double open" but after a hammerlock.
8. *Cero-siete (07)*: the preparation for [Coca-Cola enroscala](https://www.youtube.com/watch?v=vmrwc_Vej24).
9. *Back-to-back*: both people spread their arms, turn around to face away, and connect. I've only seen this happen momentarily in [Santiago](https://www.youtube.com/shorts/vlSqi-msy60).
10. *Double backcrossed (and its reverse)*: like back-to-back, except one person crosses their arms. I have never seen this.

Several things stand out from this list: firstly, some of these holds are very rare and/or transitional, so they can be removed. Secondly, the keyword "crossed" shows up whenever a right hand is connected to a right hand, which will turn out to be very important for us. Thirdly, some allusion is made to how many times the hands are crossed (open, crossed, doubly-crossed), which is a good start towards formalising arms numerically, although this angle is not quite right since the dance consists of *turns* rather than *crossing hands*. Lastly, note that basically all remaining holds have a mirror image, so there is some duality/symmetry in holds, which for footwork is not always the case (but, as we will see, the cases where there is duality in footwork can be viewed from the perspective of duality in armwork). 

Notably however, in Martin's terminology, "reverse" has inconsistent meaning: for the double crossed hold, "reverse" means "left hand on top", whereas for the doubly-crossed hold, "reverse" means "right hand on top".

## M. Enchufa (2020)
One other person, Marisol Enchufa,[^1] has since [published an actual book](https://www.amazon.com/Handbook-Salsa-Patterns-Marisol-Enchufa/dp/B093MQL6MV) on movement patterns in LA-style salsa. Because people who dance LA-style and people who dance casino (and bachata, and all other partner dances) have the same anatomy, holds defined in her book apply just as well to casino. Lucky for us, she explains them in a blog post [here](https://salsahandbook.github.io/output/salsa-handholds.html).

She introduces naming, and letter-based shorthands to distinguish mirror images:
1. *Parallel Hold: Martin's "double open".
2. *Crosshold (`LRH/LLH` variant)*: Martin's "double crossed".
3. *Reverse Crosshold (`LLH/LRH` variant)*: Martin's "reverse double crossed".
4. *Reverse parallel hold (`LLH/LRH` variant)*: Martin's "doubly-crossed".

A fraction "LRH/LLH" means "Leader Right Hand *over* Leader Left Hand" and so on.

Note that both aspects of her system fall short: the naming falls short because there is no name for Martin's "reverse doubly-crossed" because she still calls the doubly-crossed hold "parallel" (because they are indeed connected, but the intuition is applied incorrectly), and the shorthands fall short because apart from being constructed redundantly (the letters in `LLH/LRH` can be reduced to just `L/R`), they can't stand on their own and are more or less overridden by the term "reverse".

I can do better.

# Bibrachial theory
Let me now introduce a new, arithmetical way of thinking about two-handed handholds.

## Hands
Firstly, I will borrow terminology from organic chemistry to describe how the *hands* are connected, not yet how the arms are positioned.
<p style="display:inline-block; white-space: nowrap; width:100%; text-align: center;">
    <span style="display:inline-block; vertical-align:middle;">
        <img src="/cdn/img/svg/2025/cis-vs-trans.svg" style="height: 25cqw;"/>
    </span>
</p>
Geometric isomerism in organic chemistry.
{:.figcaption}

As observed by both sources above, there is some notion of hands being "crossed". This makes two fundamental families of holds, which I call **cis** holds and **trans** holds.
- In a **cis hold**, each left hand is connected to the other's right hand (LoR and RoL), like Martin Blais's "double open" hold, or the starting position in bachata. 
- In a **trans hold**, lefts are connected and rights are connected (LoL and RoR), like giving a normal handshake and then connecting the other hands after.

As long as no regrip is done, the hold family stays the same throughout a sequence, no matter the figures. Cis and trans never turn into each other.
{:.note title="First law of inertia" .filled}

## Arms
In this article, I will assume we are only concerned with holds where leader and follower are facing each other. (This is the case the majority of the time, and will lead to a model that easily extends to the rest of cases.) That means figures like Kentucky and Cubanita/-o are not modelled here. Also, since hammerlocks are also much more complicated, I will not cover them here either, but I will do it elsewhere eventually.

### Cis holds
There are three possible cis holds, not counting hammerlocks:
- Open: LoR and RoL (**C**) with no crossing.
- Double-crossed: LoR over RoL (**C-2**) and RoL over LoR (**C+2**).

Although there is usually duality in holds (every hold has a mirror image), there is no dual for **C** (which would be "RoL and LoR"). This is related to the fact that leader and follower always have the same upper hand: when a leader's right is over his left and follower's left is over her right, or when leader's left is over his right and follower's right is over her left, there is no knot and you end up with **C** (try it).

### Trans holds
Meanwhile, trans holds can never be open, but can still be double-crossed. So, there are four possible trans holds, not counting hammerlocks:
- Single-crossed: LoL over RoR (**T-1**) and RoR over LoL (**T+1**). 
- Double-crossed: LoL over RoR (**T-3**) and RoR over LoL (**T+3**). These are harder to hold, but just feasible.

### Why numbers?
The reason for all of the above names is the fundamental insight that *the resting position of two connected arms is a counter of (counter)clockwise entanglement.* Just like you can count to 10 on your fingers, you can count within a certain range by entangling and disentangling your arms. The counter can go up and down within limits. Figures (or half-figures) are operations on this counter.

This number-based + position-aware version of the theory was not the first one I came up with. I've been trying to formalise arms since January 2025, at which point I thought most figures were unique transformations. it took two months to realise that there was a much simpler pattern. Originally, I had only modelled a "TL" and "TR" alongside "CL2", "C" and "CR2". But then, one night mid-March -- about a week after I had come up with this shiny new letter-based model -- I was practicing figures on my mum and noticed that when doing a *sombrero de Manny* with two hands held, it started in a hold that didn't fit the model when wrangling myself through, yet it worked after one enchufla. The theory will need one more version update to describe holds where leader and follower are facing the same direction, and another to describe the many hammerlocks that exist (at least 2 T-hammerlocks for followers on her left and right hip, and another 4 for leaders, and probably even more considering what happens in [*setenta pal piso*](https://salsaselfie.com/2020/02/24/cuban-salsa-setenta-para-el-piso/)).
{:.note title="Historical note" .filled}

# Figures
Figures are operations on the counter. Indeed, here are some two-handed transitions:

- **DQN** is +0. The arms move in a plane.
- **Coronala** as done e.g. in the [middle of preciosa](https://www.youtube.com/watch?v=L_iLcsZlxik), is +0. You just wrap your arm around her neck, but that's merely styling. Any turn afterwards will at some point lift out of the coronala so it's just **C**.

Basic clockwise turns:
- **Vuelta** with leader left and right high (LHRH) is a -2: it turns **C+2** into **C**, **C** into **C-2**, and **T+3** into **T+1**, **T+1** into **T-1**, and **T-1** into **T-3**.
	- **Vuelta** with leader left high and right low (LHRL) turns **C** into a **C** hammerlock.
- **Exhibela** is -2 since it's just a walking vuelta.
- **Preciosa** is -4 since it's a double exhibela. You have to come in with **C+2** and end in **C-2**.
- **Vacilala** is handhold-wise identical to a vuelta. 
    - The footwork is slightly different, since the turn happens in the first bar and not the second, and it ends in caída rather than ending in abierta. (Because of this, it also allows doing a finta, unlike a vuelta.)
    - **Vacilala** LHRH where you pin her other hand to her shoulder with your right hand in the first bar, is equivalent to the above. The difference is purely styling. In one she rotates around her centre, in the other she rotates around her shoulder. The shoulder gives a slightly tighter caída where you can more easily do a finta + rodeo, rather than having the hands low for an easier enchufla.
- **Vacilala loco** as done in siete loco, i.e. where leader rotates back-to-back with the follower by swinging both arms to the left during the vacilala, is ab-ca +0. It can be done from any hold, like a DQN.
- **Sombrero** before the crown is a RHLH vacilala, so it can be seen as the T equivalent of a vuelta. It starts in **T+1** abierta (right on top) and ends in **T-1** caída (left on top).
- **Rodeo inverso** is a -2 from caída to abierta, despite being a counterclockwise walk for the follower. 
    - The reason is that when the follower walks around the leader, the same hand always traces the body of the leader and the other traces the outside. The leader's hands go around his head tracing the same two circles and this causes the cross. 
    - You can undo the -2 with a peinala on the rodeo inverso.
- **Enchufate atras** RHLH, as done by the leader in montaña, is -2.
    - Interestingly, this means that a clockwisse 360° turn is -2 no matter if it is the leader or the follower receiving it.
- **Bayamo arriba** is (or depending on your definition, starts with) the T equivalent of a rodeo inverso, i.e. it's a caT-abT -2 operator. It most often turns caT+1 into abT-1 (and caT+3 into abT+1). So it's like sombrero, except the positions are switched. You can put a peinala on the Bayamo to turn it into abT+1, from which you can do a sombrero that turns it into caT-1.

Basic counterclockwise turns:
- **Enchufla** LHRH is a +2.
- **Peinala** on DQN is +2. In a rodeo inverso, it compensates the -2. An enchufla with peinala is +4.
- **Rodeo** is also +2. The existence of peinala to compensate rodeo inverso implies that there exists a -2 "peinala inverso" (i.e. a vuelta) that compensates a rodeo in its second bar, and this is exactly what happens in [setenta romantica](https://youtu.be/-kg-vC9k42c): from hammerlock, enchufla (b1),  hold the right-handed enchufate (b2) in rodeo (b1), vuelta+coronala on the rodeo (b2), DQN. (The coronala is done "in" the vuelta, and is possible because the vuelta creates C by undoing the rodeo's +2 while happening in the second bar.)
- Setenta's **enchufate arriba**, i.e. cis right-handed enchufate arriba without letting go of the left hand, is +2. (This is because that enchufate becomes a rodeo in setenta romantica by delaying your own rotation, and since rodeo is +2, the enchufate is too.)

Some sequences are kept stable by alternating between incrementing and decrementing the counter:
- **Montaña** is +0: starting in T+1, you do -2 sombrero, +2 enchufla, -2 enchufate, +2 enchufla. You end in T+1 and crown. As noted below, this crown is different from The crown after sombrero.
- **Balsero** is -2: starting in T+1, you do -2 sombrero, +2 rodeo, -2 sombrero. 
	- **[Helicoptero](https://www.youtube.com/shorts/mAZoSMjFsxs)** is the RLLH version of balsero. Analogous to how *Bayamo abajo* is the hammerlocking version of Bayamo arriba, you could call helicoptero a *balsero abajo*. (But once again, hammerlocks are more complex.)

## Mathematically
First, here is a summary of the above in more compact form. All figures can be described with scientific notation `x.yZ+w` where the integer part `x` is the starting position, the fractional part `y` is the end position, `Z` is the hold family, and `w` is the increment to the turn counter.

| Figure | Family | Operator |
| --- | --- | --- |
| Coronala | / | +0 |
| DQN | / | ca.ab+0 |
| Vacilala loco | / | ab.ca+0 |
| Vuelta | / | ab.ab-2 |
| Exhibela | / | ca.ca-2 |
| Preciosa | / | ca.ca-4 |
| Vacilala | / | ab.ca-2 |
| Sombrero | T | ab.caT-2 |
| Balsero (full) | T | ab.caT-2 |
| Montaña | T | ab.caT+0 |
| Enchufla (common) | / | ab.ca+2 |
| Enchufla (uncommon) | / | ca.ca+2 |
| Peinala | / | +2 |
| Rodeo | C | ca.caC+2 |
| Rodeo inverso | C | ab.abC-2 |
| Balsero (essence) | T | ca.abT+2 |
| Bayamo arriba (essence) | T | ca.abT-2 |
| Enchufate arriba (setenta) | C | ca.abC+2 |
| Enchufate atras (montaña) | T | ca.abT-2 |

To find out which position and hold a sequence of figures ends in (or to verify mathematically whether a sequence ends as predicted) we convert each figure expression of the above form into a matrix product

$$F = X^{-1} Y\, e^{w\, z}$$

where $$X, Y \in \mathbb{R}^{m\times m}$$ are invertible non-commuting matrices[^2] (of some arbitrary dimension $$m$$) representing the start and end position respectively, $$w \in \mathbb{Z}$$ represents the turn counter increment, $$e$$ is Euler's number, and $$z \in\{1, i\}$$ indicates the cis and trans holds respectively. In practice, since it is pointless to have two-arm theory for *posicion cerrada*, there will only ever be two matrices in play, namely $$A$$ for *abierta* and $$C$$ for *caída*, which are chosen such that no product consisting of any amount of $$A$$, $$C$$, $$A^{-1}$$ and $$C^{-1}$$ equals those inverses, unless the product trivially has them as the only factor.

For example, say we start in abierta with a cis hold. First we do an enchufla, followed by one exhibela with a coronala. Then we do a DQN where we first decoronala but then also peinala. We then do a vacilala with a vuelta in the second bar. *Can we do an exhibela from this position?* Let's check:

$$\begin{aligned}\text{end} &= A F_\text{enchufla} F_\text{exhibela} F_\text{coronala} F_\text{DQN} F_\text{peinala} F_\text{vacilala} F_\text{vuelta} \\
    &= A (A^{-1}C\, e^{+2}) (C^{-1}C\, e^{-2}) (e^0) (C^{-1}A\, e^0) (e^{+2}) (A^{-1}C\, e^{-2}) (e^{-2}) \\
    &= AA^{-1}CC^{-1}CC^{-1}AA^{-1}C\, (e^{+2}e^{-2}e^0e^0e^{+2}e^{-2}e^{-2}) \\
    &= C\, e^{-2}
\end{aligned}
$$

According to the operators, we end in caída ($$C$$) with the left arm over the right arm ($$e^{-2}$$), i.e. **C-2**. Doing an exhibela on this:

$$
    C\, e^{-2}\, F_\text{exhibela} = C\, e^{-2} (C^{-1}C\, e^{-2}) = C\,e^{-4}
$$

Since `C-4` doesn't exist, the answer is *no*, it is impossible to do an exhibela after this sequence.

# Crowns
**Crowns** are only possible from trans holds, never cis holds.

You can crown from **T-1** and **T+1**.
- Sombrero and exhibela cause a **T-1** (left over right) crown.
- Montaña and Cubanita cause a **T+1** (right over left) crown. A good rule of thumb is that when the last figure you did was an enchufla, you end in a **T+1** crown.

The difference between the two is that **T+1** crowns (crowns starting from your right arm over your left arm) don't allow interesting figures like [*Juana la Cubana*](https://www.youtube.com/shorts/4tDKLXTxrto), nor the [*sombrero de Manny*](https://www.youtube.com/watch?v=wAKFXb7BJyE) approach of dropping your right arm for a regrip that starts a peinala on the DQN that follows (see below).

You can turn such an impoverished **T+1** crown into a **T-1** crown by uncrowning, doing an exhibela, and re-crowning.

# Hook turns
**Hook turns** are only possible from cis holds, never trans holds. Indeed, you can't hook turn from Cubanita, Cubanito, sombrero, ... Like crowns, they only happen on second bars, which means the hooking is always done with the right foot. Unlike crowns, hook turns are chiral, i.e. it is possible that a hook turn is made impossible by the hold.

Basically all hook turns are clockwise, i.e. an enchufate atras, hooking *behind* your left leg. These start in **C+2**. You cannot do them from **C** nor from **C-2**. As one example: if you cut out the back-and-forth part of Kentucky, it is essentially just an enchufla (**C** into **C+2**), followed by a hook. Correct styling for the arms is to put your right arm on your left shoulder with your elbow on your chest, move your left arm from your left shoulder to your right shoulder, and then to either let go of the right hand or move it from your left shoulder to your right shoulder after the other arm has moved.

Counterclockwise hook turns, where you hook in front of your left leg, must necessarily start in **C-2**, but I have not found a good use for this.

# Regrips
## Starting with two hands
There is a looser law of inertia that holds.

As long as the leader's hands don't touch the same follower hand, letting go of exactly one hand preserves the hold family if it reconnects later on.
{:.note title="Second law of inertia" .filled}

A good example of this happens in *doce*, which starts with a Cubanita (a trans hold), after which the leader lets go of the left hand to get to the front and reconnect in Cubanito (a trans hold).

**Regrips** are useful to quickly make the counter jump to a new value: for example, let's look at **T-1** crowns (i.e. sombrero/exhibela crowns).
- If you let go of your **right** hand, slide it down across her back and stick it out in front of her to grab, you have turned the hold from **T-1** into **T-3**. (It may not look like it, but if you don't believe me, you can verify this with a partner by doing this hand switch, and then, while facing each other, wrangling your head such that your arms extend in front of you, followed by one enchufla.) Then you do a DQN, and it will feel natural to do a peinala in its second bar (which is a *sombrero de Manny* without the rodeo inverso afterwards) to get into `abT-1`.
- If you let go of your **left** hand and let *her* slide down *your* back to regrip, you turn **T-1** into **T+1**. It feels natural to do any Bayamo on the DQN after this: Bayamo arriba will take **T+1** caída into **T-1** abierta. Bayamo arriba with a gets you into `abT+1`.

The following trans sequence is infinitely repeatable: 
- Sombrero (abT+1 -> caT-1) 
- Left regrip (caT-1 -> caT+1)
- Bayamo arriba with peinala (caT+1 -> abT+1).

Alternatively, you can replace the left regrip with 
- Right regrip (caT-1 -> caT-3)
- DQN with peinala (caT-3 -> abT-1)
- Enchufla (abT-1 -> caT+1).

Either way: this means that the natural follow-up to a Bayamo+peinala is a sombrero. That also means that on the 8 of a Bayamo+peinala, you should swivel clockwise to open up the position immediately and create tension towards yourself.

## Starting with one hand
It can be interesting to create a two-handed hold in the middle of a sequence rather than at the start in open position.

After a one-handed first bar, you can grab a hand to have **C** in the second bar, equivalent to an enchufla after a **C** hammerlock. I know at least one rueda group where this is how "corona(la)" is called: one-handed enchufla in the first bar, and then grabbing the other hand in the second bar to do a coronala, followed by an exhibela and a coronate. I never do these kinds of regrips myself because they are not useful and have some risk of elbowing the follower.

In RoR caída, you can offer your left hand (always underhanded) to create caT+1. This is my favourite way of doing exhibela, because it's a cheap way to get into a useful caT-1 crown.

# Showcase
I have compiled several videos which should not be so difficult to understand now that you know the above. Let's start slow: David Jascha absolutely understands arm theory, whether the understanding is in his mind or in his muscle. See [this video](https://youtube.com/shorts/YBUfTeb5QSw) and the second half of [this video](https://youtube.com/shorts/8uDyarmcRxM).

Let's speed up a little. Erick Berninzon, perhaps my personal favourite casual street dancer, also gets it. [Here](https://youtu.be/XN3FOksscro) is a video where on [two](https://youtu.be/XN3FOksscro?t=58) [occasions](https://youtu.be/XN3FOksscro?t=159), he does a long two-armed sequence. No letting go. No confusion, no hesitation.

For [this last video](https://www.youtube.com/shorts/BprvXUEGzNE), we're going to need heavier machinery.


# Why models work
Like everything I preach, consciously dancing with models in mind -- positional theory and bibrachial theory -- is a good way to practice, with the goal of having the models migrate from the mind into the muscle. And, apart from being good training tools, these models are also good tools of analysis: once you understand the fundamentals of bibrachial theory, you will stop being flabbergasted by sequences whose armwork used to baffle you and you will start understanding what you would have to do to reproduce them. You'll have an entry point. Opaque figures become transparent. I hope I proved this with the above showcase.

People often tell me that I "think too much". People tell me equally often how surprised they are at my progression. They fail to see the link. I doubt that any of the dancers I showcased have written down a formalised version of what their bodies eventually started to intuit, *but* it also likely took them much, much longer to create this intuition. (And those who did not create this intuition, they may have just quit altogether, wasting potential talent.) Compare it to learning a language (because it is): you can learn a language by just staying tediously submerged in it for long enough, *or* you can rapidly accelerate your learning with access to a dictionary. Bibrachial theory is the dictionary of arm holds. Use it.


[^1]: It seems slightly too coincidental for someone writing about salsa, albeit LA style, to have the last name "enchufa", but I'll go with it.
[^2]: It is left as an exercise to the reader to find suitable matrices as described here.
