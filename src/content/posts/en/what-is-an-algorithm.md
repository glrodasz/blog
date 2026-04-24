---
title: What is an Algorithm?
pubDate: "2024-04-02T00:00:00.000Z"
updatedDate: "2025-07-24T00:00:00.000Z"
tags: [Learn to program]
description: "An algorithm is a set of instructions or steps that are followed to solve a problem or carry out a particular task. So, a manual for assembling a prefabricated piece of furniture or a cooking recipe could be considered algorithms."
heroImage: "/covers/open-cookbook-with-sourdough-recipe.jpg"
languageVersions:
  - language: "es"
    url: "/es/posts/que-es-un-algoritmo"
relatedPosts:
  - designing-an-algorithm
  - algorithms-with-cards-binary-search
  - algorithms-with-cards-bubble-sort
---

Have you tried assembling an IKEA piece of furniture following the steps in the manual? *And yes... there's usually a screw left over and you're left wondering if something went wrong. 🙃* What about the Rubik's cube? Maybe you've seen people turning it over and over, as if the movements didn't make sense, until suddenly all the faces are perfect.

In both cases, **precise instructions** are followed to solve a problem: assembling furniture or completing the cube. In fact, there's an algorithm[^1] that, if you follow it step by step, solves the cube no matter how it's mixed.

> 🔍 We also hear that "the algorithm" decides what we see on social networks, although that phrase falls short to describe how **recommendation systems** work.

The truth is that the concept of **algorithm** is present in many everyday situations, even when we don't call it by its name.

> 🍔 An algorithm is a set of instructions or steps that are followed to solve a problem or carry out a particular task. So a manual for assembling a prefabricated piece of furniture or a cooking recipe could be considered algorithms.

Let's see how we could transform a legitimate recipe for preparing hamburgers into what would be a version more appropriate for a programming language.

## Apple hamburger recipe

### Ingredients

- 500g ground meat and 100g bacon
- 1 apple, 1 onion, 1 tomato, and 1 garlic clove
- 1 Halloumi block (2 portions)
- Port Slut cheese in slices (Cheddar can be used)
- 2 hamburger buns
- Special hamburger sauce
- Salt, pepper, and 1 tablespoon of sugar

### Preparation

1. Grate an apple and chop an onion into 2 halves: in slices and in small cubes. Finely chop the garlic. In a medium pan, toast the hamburger buns, remove them and fry the bacon until golden. Remove the bacon on a plate with paper towels, but save the oil in the pan.
2. Mix the apple, ground meat, onion in small cubes, and garlic. Season with salt and pepper, and form two hamburgers. Fry them in the reserved bacon oil for 3-5 minutes per side over high heat.
3. In another pan, caramelize the onion slices with 2 tablespoons of water and a tablespoon of sugar for 5 minutes over medium heat. Remove the caramelized onion and use the same pan to roast the Halloumi for 5-10 minutes per side.
4. When the hamburgers finish cooking, place a slice of cheese on each one and let it melt with residual heat. Meanwhile, cut 4 slices of half a centimeter each of tomato.
5. Assemble the hamburgers: on the base of the bun, place the hamburger with cheese, add the bacon, the special hamburger sauce, the caramelized onion, the roasted Halloumi, and two tomato slices. Cover with the other bun.
6. Gently compact the hamburger with your hands. Ready to enjoy!

You might be wondering, maybe with some hunger: how can this be an algorithm?

And with good reason! For the computer to understand it, we need to write it differently than how we would speak to a person.

> 🤖 This is not always the case, if Natural Language Processing (NLP) techniques are used, it's possible to take instructions just like this recipe for the computer to understand it through an artificial intelligence model. However, the program of that model will be written in the form of algorithms.

## The code that didn't quite become code: pseudocode

Let's explore below the same recipe, but this time written in pseudocode, that is, something similar to a programming language but without having a specific syntax, code that someone who doesn't know how to program could easily understand.

> 🧠 Pseudocode is used to plan and visualize the logic of an algorithm before coding it in a specific programming language, like Python or JavaScript.

## The recipe expressed in Pseudocode

Let's see how we could then translate a recipe written in natural language to pseudocode so that it has a structure closer to what we would use in a programming language:

```javascript
Start

  meats = ["ground meat", "bacon"]
  vegetables = ["apple", "onion", "tomato", "garlic"]
  cheeses = ["Halloumi", "Cheddar cheese"]
  others = ["hamburger bun", "special sauce", "salt", "pepper", "sugar"]

  Prepare(vegetables)
  Toast(others)
  Cook(meats)

  Mix(meats, vegetables, others)
  hamburgers = FormHamburgers(2)

  Cook(hamburgers)
  Caramelize(vegetables, others)
  Cook(cheeses)

  Melt(cheeses)
  Cut(vegetables)

  Assemble(others, hamburgers, vegetables, cheeses)

  Compact()
  Enjoy()

End
```

As we can observe, the recipe written in pseudocode has a structure that's easy to replicate in other recipes:

1. We define a beginning and an end of the recipe.
2. We declare a list of ingredients grouped by their category.
3. We specify a list of steps and the use of each ingredient.
4. We make sure to hide the details of each step, and use something more pragmatic like `"Prepare"`, `"Toast"`, `"Caramelize"`, etc.

## The versatility of algorithms

What's interesting about having the recipe structured in pseudocode is that now we can change the ingredients to make the recipe vegetarian:

```javascript
meats = ["vegetable meat", "vegetable bacon"]
```

What's interesting is that the rest of the pseudocode remains exactly the same, and that's one of the pillars of programming: how can we write code that's easy to change and maintain over time?

Think how simple it would be to change the recipe to make it vegan, that is, without meats, cheeses, or any ingredient of animal origin.

## They're not just recipes and manuals

Although as a principle both recipes and manuals can be considered algorithms, in practice algorithms are used to solve complex problems that would take a human a long time to solve, some of those applications are the following:

- In mathematics, algorithms are used to perform calculations and solve problems.
- In physics, algorithms are used to model and simulate physical systems.
- In chemistry, algorithms are used to predict and model the structure and behavior of molecules. Thanks to artificial intelligence, in 2020 more than 200 million proteins were discovered[^2].
- In biology, algorithms are used to analyze and process large amounts of genomic and proteomic data.

In the next post we'll see a couple of algorithms applied to computer science that can help us understand more how computers help us in daily life with tasks that require computing power.

[^1]: The Official Rubik's Cube Solution Guides - https://www.rubiks.com/solution-guides
[^2]: AlphaFold - The Most Useful Thing AI Has Ever Done - https://www.youtube.com/watch?v=P_fHJIYENdI
