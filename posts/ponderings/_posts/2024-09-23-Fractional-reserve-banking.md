---
layout: post

title: "No, fractional reserve banking doesn't create money"
description: A great example of why you need double-entry bookkeeping and balance sheets.

tags: Economics
---
There are (at least) two claims that have never made sense to me ever since I heard them. One is that [double-entry bookkeeping](https://en.wikipedia.org/wiki/Double-entry_bookkeeping), where you track the capital inside a company by keeping two lists of money amounts that add up to the same total, is actually useful and not a formality that is 50% redundant. The other is that *fractional-reserve banking (FRB)*, whereby a bank is not forced to have at least as much cash on hand as the combined total of all account balances open at that bank, allows banks to create cycles of infinite money. Let's think through that.

1. dummy
{:toc}

# Claim
The argument goes like this: we have a bank that starts with zero capital. Alice goes to the bank and deposits €1. Now, whenever she opens her mobile banking app or goes to an ATM, she sees €1 in her bank account. Bob now goes to the bank and takes out a loan of €1, which the bank can provide since there is indeed €1 at the bank (see Alice's bank account).

Now Bob uses this loan to buy a good from Alice for €1. Alice now goes to the bank. She opens her account and of course, there is still the original €1 in there. She now deposits the €1 she received from Bob, and her bank account now shows €2. Thus, the claim goes, the cycle restarts, and Alice's bank account grows exponentially even though only one real €1 in capital was ever entered into the system.

# What *is* a bank account?
A bank is an institution that wants to manage large amounts of capital such that it generates more capital. For this, they obviously need a large amount of capital. One way a bank gets its hands on capital is with people *lending* it theirs.

A bank account, in short, is a reverse bank loan: the bank "asks" you for money ("put your money here, please"), and you give it to them with the expectation of being paid back the full amount. You may have grown up thinking that the bank was "just being generous" by "gifting" you a small fraction of your account balance every year, but in reality, that's them paying you interest on that loan.

The account balance should not be viewed as *"what you can withdraw now"* (although if any one person withdraws, that's likely possible) but rather *"what you are entitled to receiving from the bank".* It is a loan from you to the bank with no payoff term.

# Same story, but now with balance sheets.
Let us denote toy balance sheets as two tuples $$[($$cash, goods, loans receivable$$),($$equity, debt$$)]$$ representing the assets and financing respectively. Cash is fungible capital, goods are physical materials with value, loans receivable are contracts promising their value in cash from someone else, equity is capital with no strings attached and debt is foreign capital you are liable for paying back.

Alice starts at a balance sheet of $$[(1,1,0), (2,0)]$$, meaning she has €2 in assets (in this case, €1 depositable cash and one item worth €1) which she obtained through €2 she found in the street originally (or profited from her business). The bank and Bob both start at $$[(0,0,0), (0,0)]$$.

Alice goes to the bank and *deposits* her €1 cash. Put differently: she is lending the bank €1 expecting to receive €1 plus interest eventually. Put even more differently: Alice is buying a €1 servicee from the bank that she expects will make her money, like a factory would buy a machine. Her balance sheet is now $$[(0,1,1), (2,0)]$$, as her cash has turned into a note from the bank that promises to make more money and is worth €1. Notably, both sides of the balance still total €2 after this transaction. The bank's balance sheet goes to $$[(1,0,0), (0,1)]$$: they now have €1 in assets (the cash they received from Alice), but are also €1 in debt with her. The balance total has increased by €1.

Bob comes along and takes a €1 loan. In other words, the bank buys a promise from Bob that he will give them €1 plus interest. The bank now has a balance of $$[(0,0,1), (0,1)]$$, which totals the same as before, but importantly, their assets have changed from Alice's €1 cash to a promise from Bob, just like Alice has a promise from the bank as her asset. Bob is now at $$[(1,0,0), (0,1)]$$ balance, consisting of €1 cash and €1 in debt to the bank.

Bob buys an item from Alice for €1. His balance sheet is now $$[(0,1,0), (0,1)]$$ with his assets no longer being cash but the €1 item he bought, although his debt with the bank is still €1. Alice is at a balance of $$[(1,0,1), (2,0)]$$: she lost €1 of her assets to Bob, but gained €1 in cash back. Hence, her balance sheet total has not gone up nor down despite being paid "with her own €1". (We assume this all happens under the table so that the government doesn't tax Alice's sale to death.)

Alice now goes to the bank and deposits this new cash, i.e. lends it to the bank like she did with her other cash. Her balance is now at $$[(0,0,2), (2,0)]$$: she now has two promises from the bank worth €1 (or one big promise worth €2), where one was financed by being found on the street and the other with her revenue from selling to Bob, both giving her equity rather than debt. The bank is at $$[(1,0,1), (0,2)]$$ and has indeed gone up by €1 on either side.

Now we look at our three characters:
- Even though Alice's bank account has gone from €0 to €1 to €2 in the story, she did not gain any capital. She has two promises and no cash.
- The bank is now €2 in debt with Alice, has €1 on hand, and is expecting €1 back from Bob.
- Bob is €1 in debt with the bank and has a €1 item.

**This bank qualifies as a fractional-reserve bank:** if Alice wanted to withdraw all of the money she sees in her bank account, the bank could not give it to her because it only has €1 on hand. 

Also, despite one of the bank's customers (Alice) seeing €2 in her account "at the bank", and despite the bank having €2 in assets, it can obviously only lend out the €1 on hand. The other €1 of its assets is a promise from Bob, and promises are not what people want to receive when they take out a loan. This situation does not change when you replace cash transactions by digital transactions: when the bank lends money, it either gives you a bag of cash from the vault or sends you the amount digitally and hence that amount is subtracted from the bank's bank account. You can't give more cash from the vault than you have nor can you send more than you have in your account.

In our very small example economy, since there are only two actors that can buy and sell goods, eventually Bob will have to sell the item back to Alice so that he can repay his debt to the bank. Alice only has two promises from the bank, however, so she can't yet pay Bob. When she *withdraws* cash from the bank, what she is really doing is exchanging a €1 promise for the €1 cash the bank has on hand. Since the bank were the ones who made the promise, receiving the promise back clears that part of their debt with Alice rather than counting as an asset, so the bank's balance sheet goes back down from $$[(1,0,1), (0,2)]$$ to $$[(0,0,1), (0,1)]$$. 

Alice gives the cash to Bob, Bob gives her the item, Bob gives the €1 back to the bank in exchange for the promise he made that they were holding, and the bank's balance becomes $$[(1,0,0), (0,1)]$$. Now:
- Alice has a €1 item and her original €1 promise from the bank.
- Bob has no item (given to Alice) and no cash (given to the bank).
- The bank is €1 in debt with Alice and has €1 on hand (from Bob).

If Alice now withdraws her other €1, we are back at the start. 

This system was entirely contained: no exponential money was created. If you are concerned by how we went from a situation of balance totals of €2, €0 and €0 to at one point €2, €1 and €2 balance, you should be equally concerned at how Alice gave the bank a €1 promise in return for €1 cash and receiving the €1 made exactly that amount evaporate on the bank's balance sheet.

The bank loans *and* lends liquid assets. It is wrong to think that the bank can lend (give) one person as much as it has *loaned* (received deposits, in our simplified economy) from all people, because it can only lend one person as much as it has loaned from people **minus what is has already lended**.

# Don't forget debt
As you may remember (or not, depending on whether I have published the corresponding blog post before publishing this one), I once angered a couple dozen Marxists online and slaughtered them one by one. One of the fallacies brought up in that context, namely that "landlords are parasites that sit in a chair while having property to their name, getting rich from that fact alone", stems from the same (wilful?) mistake of ignoring that a balance sheet has two sides. The landlord most times doesn't actually "just own" from the perspective of equity, i.e. all of the left side of the balance (assets) minus the foreign capital on the right side (liabilities), also called net worth. "Just owning" looks like $$[(0,10^6,0), (10^6,0)]$$. A landlord's service is that his balance sheet looks like $$[(0,10^6,0), (0,10^6)]$$ so that that of tenants can look like the former. It is the tenants that get the opportunity to "just own" without the strain of being millions in debt.

# Conclusion
No, the bank does not create money. The reason why a bank account in a €1-economy can exceed €1 is because bank accounts are a window onto a **balance sheet** and not onto **money**. Money does not spawn nor evaporate. Balance sheet totals can, as we have seen. The fundamental cause for this is that people can generate promises out of thin air: the bank gives you €1, you generate a €1 promise that didn't exist a moment ago, spawning €1 into the balance sheet world. You give back that €1, and the promise evaporates from the balance sheet world, just as quickly as it appeared.
