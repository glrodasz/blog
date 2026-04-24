---
title: Types of programming languages
pubDate: "2024-11-24T00:00:00.000Z"
tags: [Learn to program]
description: "Just as people speak various languages, in programming there are multiple languages, each with specific characteristics and purposes. Programming languages can be categorized into several paradigms, such as imperative, declarative, object-oriented, functional, procedural, and logical."
heroImage: "/covers/architect-desk-with-tools-and-blueprints.jpg"
languageVersions:
  - language: "es"
    url: "/es/posts/tipos-de-lenguajes-de-programacion"
relatedPosts:
  - how-does-a-programming-language-work
  - expressions-and-sentences-whats-next
  - javascript-history
---

Just as people communicate in different languages, usually from the place where we are, in programming there are also various languages. For an experienced programmer, it can be relatively easy to understand multiple programming languages, similar to mutual understanding between speakers of Romance languages like Spanish, Italian, or Portuguese.

However, some programming languages can be more difficult to learn, similar to how a Spanish speaker might find it challenging to learn Mandarin or Arabic. This is because some languages belong to different categories or have different purposes.

Below, we'll explore some of these categories.

> ℹ️ This is just a sample of the most popular categories and languages. There are hundreds of programming languages created, some even just for fun, like the curious case of [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck).

> ⚠️ Some languages can belong to multiple categories. Here we'll focus on the category that best defines their main use.

## Programming Paradigms
The paradigm is related to the purpose of the language. Generally, when a very specific problem arises, general-purpose languages are usually not efficient. That's why it's common for specialized languages to be developed, optimized to solve those problems, accompanied by writing styles more suitable for their purposes.

### Imperative
This is probably the most common category and the one most people start with, because they resemble the lists of instructions we follow in daily life. They are languages that execute through [step-by-step instructions, like a recipe](/posts/what-is-an-algorithm/). These languages are useful because they allow detailed control of how tasks are executed, which is particularly important in applications that need a high degree of precision.

**Examples:** Python, Java, PHP, JavaScript.
```python
nombres = ["Ana", "Juan", "María"]
for nombre in nombres:
    print("Hola " + nombre)
```

### Declarative
As their name indicates, in these languages you don't write step-by-step instructions, but rather declare what you want to achieve, letting the language decide the execution order. They are popular in databases and focus on the *what*, not the *how*.

**Examples:** SQL, YAML, CSS.
```sql
SELECT nombre FROM usuarios WHERE edad > 18;
```

### Object-Oriented
They allow representing real-world objects in code. Just as physical objects have properties and functions, these languages facilitate defining properties and methods. They also allow implementing concepts like inheritance, similar to the transmission of characteristics in nature, and creating "blueprints" or classes that give guidelines for creating objects, analogous to how an architect uses blueprints to build buildings.

**Examples:** Java, C#, JavaScript.
```java
class Perro {
    String nombre;
    void ladrar() {
        System.out.println("¡Guau!");
    }
}
```

### Functional
They are based on functions and composition, resembling the way mathematical equations are written. Each function is a unit of computation that can be combined with others to solve complex problems. The main objective of this approach is to minimize side effects and make code more predictable and easy to maintain.

**Examples:** Haskell, Clojure, Elixir.
```clojure
(def numeros [1 2 3 4 5]) (def duplicados (map #(* 2 %) numeros))
```

### Procedural
They are closer to the mathematical field and are usually used in scientific and numerical calculations. Their name comes from the sequential execution of procedures. These languages are essential in applications where precision and accuracy are fundamental. Often, they are implemented in engineering and computational physics contexts, where large-scale calculations must be performed efficiently and quickly.

**Example:** Fortran, Pascal.
```pascal
function Fibonacci(n: integer): integer;
begin
    if n <= 1 then
        Fibonacci := n
    else
        Fibonacci := Fibonacci(n-1) + Fibonacci(n-2);
end;
```

### Logical
Similar to declarative languages, they focus on the *what* and not the *how*, but are usually written as a set of logical rules that the language tries to fulfill. They are common in artificial intelligence.

**Examples:** Prolog, CLIPS.
```prolog
padre(juan, pedro).
padre(pedro, ana).
abuelo(X, Y) :- padre(X, Z), padre(Z, Y).
```

## Type of Execution
In addition to how they are written, languages vary in how they are executed. Although they have syntax understandable to humans, they must be "translated" to the language of machines: zeros and ones.

### Compiled
They require a previous process where the code is transformed into machine language before being executed. The more extensive the code, the more time its compilation takes. This resembles the rendering process in video editing: it takes time, but the result is more efficient.

**Examples:** C++, Java.
```java
// Compilation result
CA FE BA BE 00 00 00 34 00 22 0A 00 06 00 0F 09 
00 10 00 11 08 00 12 0A 00 13 00 14 07 00 15 07 
00 16 01 00 06 3C 69 6E 69 74 3E 01 00 03 28 29 
56 01 00 04 43 6F 64 65 01 00 0F 4C 69 6E 65 4E 
75 6D 62 65 72 54 61 62 6C 65 01 00 12 4C 6F 63 
61 6C 56 61 72 69 61 62 6C 65 54 61 62 6C 65 ...
```

### Interpreted
This is a very interesting concept, since instead of transforming all the code to machine code at once, the "transformation" occurs line by line, that is, as needed, similar to a translator who translates what you tell them. Hence its name "Interpreter". The great advantage is that it's not necessary to wait for a compilation process to execute the language, but they can be inefficient for exhaustive tasks where compiled languages can be better.

**Examples:** PHP, Ruby
```php
// Interpretation process of $precio = 100;

1. Tokenization:
	[T_VARIABLE, T_EQUAL, T_NUMBER, T_SEMICOLON]

2. Syntactic analysis:
	ASSIGNMENT(target:$precio, value:100)
```

> 💥 Some languages, in addition to being interpreted, can also be compiled, like Python. Other languages have a hybrid solution, like the "Just-in-time compile" technique, which compiles pieces of code that are called multiple times, while others continue to be interpreted.

## Level of Abstraction
Although we've talked about how their execution can work to get closer to machine language, not all languages were designed to be human-friendly; on the contrary, they are more optimal for machine understanding.

When the compilation or interpretation process happens, that output is usually a language of a less abstract level, that is, closer to the machine, and in turn, that language can be transformed again to a level closer to the machine and so on.

### High level
These are languages whose syntax and purpose is to be easy to read and maintain by humans, and it doesn't specify how technical aspects like our computers' memory should be managed.

**Examples:** Python, Prompt Engineering.
```text
I bought 10 apples, gave 2 apples to the neighbor and ate one.
How many apples do I have left?
```

### Low level
These languages, on the contrary, exist to give direct instructions to our machines about how to manage memory spaces and other elements of our hardware in detail, being more efficient but less understandable for humans.

**Example:** Assembly.
```bash
MOV AX, 5    ; Move value 5 to register AX
ADD AX, 3    ; Add 3 to value in AX
```

# Is HTML a programming language?
> 🏗️ **HTML** (HyperText Markup Language) is a markup language used to structure and present information on a web page.

This is a very popular and controversial question, but the reality is that HTML itself doesn't work as a programming language. However, with certain advanced controls, it may seem like it is. HTML is a markup language, which means it's used to mark how certain information should be interpreted, similar to XML or Markdown. If beyond presenting information you need to create user interaction, like submitting a form, it's very likely that you'll need JavaScript or a server-side programming language to process that submitted information.

# Is CSS a programming language?
> 💅 **CSS** (Cascading Style Sheets) is a style language used to define the visual appearance of a web page, such as colors, sizes, and positions.

This is a question that, although equally popular, can be more controversial, due to the fact that in recent years CSS has grown in countless features that have allowed less use of JavaScript in our web applications. But, similar to HTML, CSS is a language that describes how the styles of a website should be interpreted and doesn't usually work on its own, although incredible things have been demonstrated with the use of [a single HTML tag](https://a.singlediv.com/) and [functional games with only HTML and CSS](https://codepen.io/collection/AKkZro).

# What paradigm, execution, or level is better?
Something I hope you learn is that there's usually no better or worse, but everything depends on its purpose or situation.

It's most common to start working with **imperative languages** and when we have to approach a relational database we must use **declarative languages**.

If our field is artificial intelligence, it's possible that we'll encounter some **logical language**, although nowadays the most common is a **natural language** like LLMs (Large Language Models), that is, a language that understands our literal human language, just like we talk to ChatGPT from OpenAI, Gemini from Google, or Claude from Anthropic.

Regarding execution, this comes very tied to the language, so it's usually not a concern at the beginning and many modern languages are versatile in being able to execute one way or another.

If we're not working with hardware, it will be extremely rare to see **low-level languages**, but we can end up using languages of a lower level than others, like Rust compared to Python.
