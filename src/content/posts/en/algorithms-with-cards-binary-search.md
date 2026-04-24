---
title: "Algorithms with cards: Binary search"
pubDate: "2024-07-11T00:00:00.000Z"
tags: [Learn to program]
description: "The binary search algorithm, or \"Binary Search\", is an efficient method for finding an element in an ordered list. It repeatedly divides the search range in half, significantly reducing the number of comparisons needed."
heroImage: "/covers/intertwined-tree-branches-with-green-leaves.jpg"
languageVersions:
  - language: "es"
    url: "/es/posts/algoritmos-con-naipes-busqueda-binaria"
relatedPosts:
  - algorithms-with-cards-bubble-sort
  - designing-an-algorithm
  - what-is-an-algorithm
---

> 🤿 This is part of the illustrated series "**Algorithms with cards**", you can find the first article [here](/posts/algorithms-with-cards-bubble-sort/) where we talk about _bubble sort_.

The binary search algorithm, known in English as "Binary Search", is an efficient method for finding an element in an ordered list.

This algorithm works by repeatedly dividing in half the range of possible numbers and then selecting the interval in which the searched element must be, which significantly decreases the number of comparisons needed.

It's especially useful in large lists, as it drastically reduces search time compared to a linear approach.

### The binary search algorithm

```javascript
Start
  Deck of cards = [Ordered, Ace♥, 2♥, 3♥, 4♥, 5♥, ... King♥]
  Card searched = 6♥

  Step 1:
    Set two limits, 'start' at the first card and 'end' at the last card:
      Start = position of Ace♥
      End = position of King♥

  Step 2:
    Find the position of the card in the middle of the 'start' and 'end' limits.
    If the card at this middle position is the 'Card searched':
      Success! You found the card. Indicate the position of this card and proceed to End.

    Step 3:
      If the card at the middle position has a value less than the 'Card searched':
        Adjust the 'start' limit to start just after the middle card:
          Start = After the middle card
        Return to Step 2.

    Step 4:
      If the card at the middle position has a value greater than the 'Card searched':
        Adjust the 'end' limit to end just before the middle card:
          End = Before the middle card
        Return to Step 2.

End
```

At the end, you should have the card you were looking for in the deck of cards.

### A step-by-step example of binary search
To illustrate how the binary search algorithm works, let's perform a step-by-step example with a deck of cards.

Following the described process, we'll see how we find the searched card, **6 of hearts**, making the search set smaller each time.

> 🃏 Remember that for binary search to work **the set of elements has to be ordered from the beginning**. But, this is not a requirement for all search algorithms, like linear search for example.

![Figure 1: Hand pointing to the middle (Seven of hearts) of an ordered deck of cards.](/images/posts/es/algoritmos-con-naipes-busqueda-binaria/paso-1.jpg)_**Figure 1**: Hand pointing to the middle (Seven of hearts) of an ordered deck of cards._
We define the limits, the first card will be the **Start**, the last one the **End**, and finally the middle card will be the one we'll verify as the card we're looking for.

![Figure 2: Deck of cards divided in the middle, discarding the right section.](/images/posts/es/algoritmos-con-naipes-busqueda-binaria/paso-2.jpg)_**Figure 2**: Deck of cards divided in the middle, discarding the right section._
Since the middle card was the **seven of hearts**, having a greater value, we'll discard the entire right half.

![Figure 3: Hand pointing to the middle (Three of hearts) of the previous left section.](/images/posts/es/algoritmos-con-naipes-busqueda-binaria/paso-3.jpg)_**Figure 3**: Hand pointing to the middle (Three of hearts) of the previous left section._
We'll establish the limits again, this time the end becomes **six of hearts**, and again we'll look for the middle card.

> 🃏 When we had 13 cards in total, to find the middle card we divided 13 by 2. The result gives us 6.5, but since card 6.5 doesn't exist as we're working with integer values, we must decide whether to round down or up. For this occasion we decided to always round up and that's why we took the **7 of hearts**.

![Figure 4: Deck of cards divided in the middle, discarding the previous right section.](/images/posts/es/algoritmos-con-naipes-busqueda-binaria/paso-4.jpg)_**Figure 4**: Deck of cards divided in the middle, discarding the previous right section._
The middle card is the **3 of hearts**, since this is less than the searched card, we'll discard the entire left half.

![Figure 5: Hand pointing to the middle (Five of hearts) of the previous right section.](/images/posts/es/algoritmos-con-naipes-busqueda-binaria/paso-5.jpg)_**Figure 5**: Hand pointing to the middle (Five of hearts) of the previous right section._
We establish the limits again, the end stays the same but the start becomes the new first card, in this case the **4 of hearts**.

![Figure 6: Hand showing the found card, Six of hearts.](/images/posts/es/algoritmos-con-naipes-busqueda-binaria/paso-6.jpg)_**Figure 6**: Hand showing the found card, Six of hearts._
Finally, the middle card will be less than the searched card, we discard the entire left half again.

Since this time only one card remains, we only need to ask if that card is the **6 of hearts**, and indeed it is!

## Why do we need algorithms?
Although humans can perform these tasks intuitively, algorithms break down the process into precise and repeatable steps, guaranteeing exact results.

From sorting data in a spreadsheet to managing large volumes of information on servers, algorithms are fundamental to modern computing and show us how the combination of simplicity and precision can solve problems that would otherwise be overwhelming.

By applying these concepts with something as everyday as a deck of cards, we can visualize how they might work in more complex contexts.
