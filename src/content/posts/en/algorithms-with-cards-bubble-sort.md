---
title: "Algorithms with cards: Bubble sort"
pubDate: "2024-05-23T00:00:00.000Z"
updatedDate: "2025-07-25T00:00:00.000Z"
tags: [Learn to program]
description: "Bubble sort is one of the simplest algorithms for sorting a list. It compares pairs of neighboring elements and swaps them if they're in the wrong order, until there's nothing left to swap. In this post we apply it step by step with a deck of cards."
heroImage: "/covers/underwater-bubbles-with-sunlight-rays.jpg"
languageVersions:
  - language: "es"
    url: "/es/posts/algoritmos-con-naipes-ordenamiento-burbuja"
relatedPosts:
  - algorithms-with-cards-binary-search
  - designing-an-algorithm
  - what-is-an-algorithm
---

Imagine you shuffle a deck of cards and then without thinking much you start sorting them: first the Ace, then the 2, then the 3... A pretty easy task, right? Our brain uses sight, recognizes each card instantly and knows how to place them in the correct position almost without conscious effort.

Now, doing the same thing on a computer isn't so trivial. To mimic that "simple" task, you'd have to recreate an entire artificial vision system that identifies symbols and colors, plus a "virtual brain" that decides where each card goes. It would be like hiring an aerospace engineer to serve coffee[^1].

That's why in programming, algorithms with more specific steps are usually created; this way the same objective is achieved using minimal resources. The disadvantage is that we must be very explicit about how to perform those tasks and, many times, compensate for the lack of other abilities, like "seeing" or "understanding" with alternative solutions.

Let's see a series of algorithms written in pseudocode that you can apply yourself with real-world objects:

1. Take a complete suit from a deck of cards. (hearts, diamonds, spades, or clubs)
2. Follow the instructions to the letter to get the results of each algorithm.

> 🃏 Although a human can quickly identify a specific card in a deck of cards just by looking at it, algorithms need to operate differently.
> In the context of computing, to do sorting or searching it's necessary to verify each card individually to be able to determine a solution.

## Bubble sort
The bubble sort algorithm is a simple method for sorting a list of elements, in this case, a deck of cards.

It works by repeatedly reviewing the list of cards, comparing adjacent pairs and, if they are in the wrong order, swapping them.

This process is repeated until no more swaps are needed, which indicates that the cards are sorted. It's known for its simplicity and efficiency in small lists.

### The Bubble sort algorithm

```javascript
Start
  Deck of cards = [Random order: 3♥, King♥, 9♥, 5♥, 2♥, Ace♥, ...]
  There were changes = False

  Step 1:
    Take the first card from the Deck of cards.

  Step 2:
    Compare this card with the next one in the deck.

  Step 3:
    If the current card has a greater value than the next one, swap their positions.
    Mark 'There were changes' as True.

  Step 4:
    Move to the next card and repeat from Step 2, until there are no more cards.

  Step 5:
    If 'There were changes' is True, return to Step 1.
    If not, the process has finished.

End
```

At the end, the cards in the Deck of cards will be sorted from lowest to highest value.

### A step-by-step example of bubble sort
To illustrate how the bubble sort algorithm works, let's perform a step-by-step example with a deck of cards.

Following the described process, we'll see how each card finds its correct place through successive comparisons and swaps.

![Figure 1: Hand showing two cards: Three and King of hearts on the left.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-1.jpg) _**Figure 1**: Hand showing two cards: Three and King of hearts on the left._
We take the first card from the deck, the **3 of hearts** and compare it with the next card, the **King of hearts**.

Since the current card, the **3 of hearts**, is not greater than the next card, we don't make any swap and now the **King of hearts** will be compared with the next card.

![Figure 2: Comparison of King of hearts with Nine of hearts.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-2.jpg) _**Figure 2**: Comparison of King of hearts with Nine of hearts._
We compare the **King of hearts** with the next card, the **9 of hearts**.

![Figure 3: Swap of King of hearts with Nine of hearts.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-3.jpg) _**Figure 3**: Swap of King of hearts with Nine of hearts._
Since in this case the current card, the **King of hearts**, is greater than the next card, **9 of hearts**, we make the swap.

Since there was a swap, the **King of hearts** will continue to be the current card that we'll compare with the next card.

![Figure 4: Comparison of King of hearts with Five of hearts.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-4.jpg) _**Figure 4**: Comparison of King of hearts with Five of hearts._
We compare the **King of hearts** again with the next card, the **5 of hearts**.

![Figure 4: Swap of King of hearts with Five of hearts.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-5.jpg) _**Figure 4**: Swap of King of hearts with Five of hearts._
Since again the current card, the **King of hearts**, is greater than the next card, **5 of hearts**, we make the swap.

The process will be very similar since the **King of hearts** will always be greater, and this will then become the last card.

The **King of hearts** will be compared with the **2 of hearts**, there will be a swap and then it will be compared with the **Ace of hearts**, generating a final swap.

![Figure 5: Comparison of Nine of hearts with Five of hearts.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-6.jpg) _**Figure 5**: Comparison of Nine of hearts with Five of hearts._
Since there were swaps in this first cycle, we must start again and continue verifying that the highest card moves to the last position in the following cycles.

For example, in the second cycle we'll initially compare the **3 of hearts** with the **9 of hearts**, not generating a swap, but then we'll compare the **9 of hearts** with the **5 of hearts**, creating a swap.

The **9 of hearts** will continue to be compared and generating swaps until it's right before the **King of hearts**.
![Figure 6: Swap of Ace of hearts with Two of hearts.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-7.jpg) _**Figure 6**: Swap of Ace of hearts with Two of hearts._
After a series of cycles, in the last cycle there will be a final swap between the **2 of hearts** and the **Ace of hearts**.

![Figure 7: Sorted cards: Ace, Two, Three, Five, Nine, and King of hearts.](/images/posts/es/algoritmos-con-naipes-ordenamiento-burbuja/paso-8.jpg) _**Figure 7**: Sorted cards: Ace, Two, Three, Five, Nine, and King of hearts._
There will be one more cycle comparing the current card with the next one, without any swaps, concluding that the cards are already sorted.

### This is how bubbles rise to the surface

After finishing all the comparison and swap cycles, the deck ends up sorted from lowest to highest. That's exactly where the algorithm's name comes from: in each cycle, the highest-value card keeps "rising" to the end, like a bubble rising to the surface. And although it's a simple method (and not exactly the fastest one out there), doing it with the cards in your hand makes it very clear how a computer can achieve a complex goal by following very simple steps, one at a time.

[^1]: The Stove Top Coffee Maker for Perfect Espresso - https://9barista.com/
