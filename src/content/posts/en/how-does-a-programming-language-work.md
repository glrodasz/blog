---
title: How does a programming language work?
pubDate: "2024-11-11T00:00:00.000Z"
tags: [Learn to program]
description: "Programming languages process data and manage flow through expressions and statements. Expressions combine values, operators, and variables to produce results, while statements perform actions. These components transform instructions into practical solutions, ranging from simple calculations to complex systems."
heroImage: "/covers/vintage-punched-card-on-wooden-table.jpg"
languageVersions:
  - language: "es"
    url: "/es/posts/como-funciona-un-lenguaje-de-programacion"
relatedPosts:
  - types-of-programming-languages
  - expressions-and-sentences-whats-next
  - what-you-need-to-know-before-programming
---

If you think about it, programming languages aren't so different from any human language: each language has its own set of rules, what we know as **grammar**, so that what we say makes sense.

Although each language has its nuances, in most Romance languages (English, Spanish, French, Italian, and Portuguese) the basic sentence follows the pattern **subject** + **verb** + **complement**.

In code something very similar happens: we use sequences of **expressions** and **statements** that organize the program flow and make instructions clear and easy to follow sequentially. This organization not only facilitates reading and understanding, but also helps keep code understandable and easier to improve over time. 🤖

## Expressions

An expression is a combination of certain **elements** that are **evaluated** to produce a result.

Let's see some examples of expressions:

1. The _expression_ `5 + 3` uses the addition _operator_ to operate the numeric _values_ `5` and `3`. This operation returns as result the numeric _value_ `8`.
2. The _expression_ `x * y` uses the multiplication _operator_ to operate the _variables_ `x` and `y`, whose values are unknown. Once concrete _values_ are assigned to these _variables_, we can determine the resulting _value_ of the operation.
3. The _expression_ `"Hello " + name` makes use of the concatenation _operator_ to join the string _value_ `"Hello "` with the _variable_ `name`. The result of this operation is unknown until a specific _value_ is assigned to the _variable_ `name`.
4. The _expression_ `f(x) = x^2` uses the power _operator_ to square the _variable_ `x`. Although the result of this _expression_ is a numeric _value_, it remains unknown until a specific _value_ is provided for `x`. It's important to mention that this _expression_ is actually a _function_ that can _evaluate_ various values for `x`. For example, if `x = 3`, then `f(3) = 9`.

> 🚜 A _function_ is a process that takes certain values and transforms them into outputs of other values according to specific rules.

Let's look in detail at each of the possible elements that an expression can contain: **values**, **variables**, **operators**, and **functions**.

### Values and types

In programming, information is represented through _values_, and each value belongs to a specific _type_. These _types_ determine how values are manipulated and stored in memory.

Let's see some examples of the most commonly used values:

- When performing mathematical operations, numeric type _values_ are used, similar to those we use daily: `6`, `32`, `0`, `-13`, `π` (the value of Pi), `9.99`, and even `∞` (infinity).
- To print a value on screen, string type _values_ are used, which are written in quotes. For example `"A"`, `"Hello"`, `"10"` (which is different from the number `10`), `"🥸"` (emojis), and special characters like the letter `"ñ"` or symbols `"©"` (copyright).
- When making decisions within a program, boolean type _values_ are used. These can only have two states: `true` or `false`.

> 📫 Boolean _values_ are usually called **flags** (flags) where a flag up indicates `true`, (activated) while a flag down indicates `false` (deactivated).

> ℹ️ Each programming language handles a variety of values and types. Later we'll delve into the specific types that JavaScript supports.

### Variables

_Variables_ in programming help us manage and organize information. Imagine they're like folders on a desk. Each folder has a label with a unique name to identify what it contains. These folders, in turn, can house one or several documents, which would represent our _values_.

> 📁 Think of a variable as a folder labeled with a unique name, ready to store a value.

_Variables_ have multiple functions, but for now, we'll focus on two main aspects:

1. **Data storage**: As we mentioned before, _variables_ are like folders where you can save and access essential data, such as total sales or inventory summary. This way, you'll always have that information at hand when you need it.
2. **Dynamic data handling**: Imagine you have a document that's constantly updated, it could be a report of events from the last seven days. _Variables_ allow you to "capture" that changing data and adapt to different circumstances.

Let's see some examples:

1. The _variable_ `age` stores numeric _values_ that represent a person's `age`. For example, if we assign `age = 25`, the _variable_ age contains the _value_ `25`.
2. The _variable_ `name` could store string type _values_. By setting `name = "Lucía"`, we're assigning to `name` the text _value_ `"Lucía"`.
3. The _variable_ `isStudent` is of boolean type, which means it can only have two possible _values_: `true` or `false`. So, if we determine that a person is a student, we would assign the value `isStudent = true`; if not, it would be `isStudent = false`.

What's valuable about _variables_ is that, once assigned, they preserve the _values_ for later use. Simply by referencing the _variable_ name, we can access its content. For example, when referring to the _variables_ `age`, `name`, and `isStudent`, we know we're talking about Lucía, who is 25 years old and is a student.

### Operators

For _values_ and _variables_ to be useful, it's necessary to be able to manage _operations_ that allow us to obtain a result.

> _Operators_ are usually represented through **symbols** or **reserved words**.
> Depending on the types of _values_, we can perform certain types of _operations_.

At this point it's important to clarify that a _variable_ will always contain a _value_. Therefore, _operations_ are performed regardless of whether those values are represented in _variables_ or not.

For example, the addition _operator_ (+) performs the sum of two numeric values, like `2 + 3`, whose result would be the numeric value `5`. But this same _operator_, used on string values, creates a concatenation. For example, `"Hello" + " world"`, would give as result the string: `"Hello world"`.

Let's see below some operators, keeping in mind that each programming language has extensive collections of _operators_:

#### Arithmetic operators

1. The addition operator `+`: Used to add two values, like in `2 + 3`, resulting in `5`.
2. The multiplication operator `*`: Used to multiply two values, like in `4 * 6`, obtaining `24` as result.

In this category are the most common mathematical operators like subtraction, division, power, modulo, among others.

#### Assignment operators

1. The simple assignment operator `=`: Sets a value to a variable. For example, `x = 5` means that the value of `x` is now `5`.
2. The compound assignment operator `+=`: Adds the provided value to the previous value of the variable. In the case of `x += 3`, it's equivalent to `x = x + 3`, incrementing the value of `x` by `3`.

> ⚠️ The assignment operator should not be confused with equality or equivalence in mathematics. The expression `x = x + 1` mathematically doesn't make sense, while in programming we're incrementing the value of `x` by 1.

#### Comparison operators

1. The equality operator `==`: checks if two values are equal. For example, `x == 2`, which would be true as long as the value of `x` is `2`.
2. The `>=` operator checks if the value on the left is greater than or equal to the value on the right. For example `x >= 5`, would be true for the number `5` and any number greater than `5`.

Here would be the rest of comparison operators such as "greater than", "less than", "less than or equal to", etc.

These operators make sense when used with _variables_, since it's in this way that algorithms could behave one way or another depending on the value these take.

#### Logical operators

1. The conjunction operator `&&`: returns `true` if both expressions are true. It's usually used together with comparison operators, for example: `x > 5 && y < 10` this expression would be true as long as `x` is greater than `5` and `y` is less than `10`.
2. The negation operator `!`: returns the opposite value of a boolean expression. If for example `x > 5` were `true`, that is `x` is greater than 5, then `!(x > 5)` would be false. This is very useful when we want to make a decision based on an opposite result, in the previous example `!(x > 5)` would only be `true` if `x` is `5` or less than `5`.

Here we would have other operators, like conjunction and a series of binary or exclusion logical operators that we'll review later.

### Functions

Although functions are a mathematical term that takes _variables_ and transforms them into outputs, they are also usually used in programming to encapsulate a piece of code and reuse it more easily.

The first use is more related to expressions while the second use represents a statement, that is, functions can be represented both as expressions and statements.

Let's see some examples of **function expressions**.

1. The function _expression_ `f(x) = x + 2` uses the addition _operator_ to increment the _variable_ `x` by 2. This function will return a numeric value, as long as the value of `x` is also numeric.
2. The function _expression_ `f(a, b) = (a - b) * 5` uses multiple operators and also defines two parameters `a` and `b`. It will perform a subtraction of `a` and `b` and multiply that result by 5. As long as `a` and `b` are numeric values, this function will return a numeric value.

> 🪂 Unlike other expressions, the _variables_ that are listed in the definition of a function, for example, `x`, `a`, and `b` are called **parameters**.

> ⚙️ When we evaluate a function and replace its **parameters** with values, we call those values **function arguments**.

In general, the purpose of a function is to be able to reuse them to be called with different **arguments**, that is, so that their **parameters** have different values.

In our first example, if we give as argument the number `3`, then the parameter `x` would be replaced by that value, and thus the function would be evaluated as `f(3) = 5`, giving as result the number `5`.

Also, we could call the same function this time with the argument of the number `10`, making the evaluation this time be `f(10) = 12`, returning the number `12`.

> 🏭 Functions can become much more complex than the examples shown so far, they can contain from simple expressions, to even other functions with multiple arguments or no arguments and return values that don't match the parameter values or even not return a value.

### Let's analyze an expression

Now that we understand everything that can compose an expression: **values**, **variables**, **operators**, and **functions**, let's do an analysis of the following expressions:

1. `life = 42`
   - **Values**: The number `42` is a numeric value.
   - **Variables**: `life` is a variable that will store the value.
   - **Operators**: `=` is an assignment operator.
2. `f(x) = 2x + b`
   - **Values**: The number `2` is a numeric value
   - **Variables**: `x` is a variable that acts as a parameter, `b` is an external variable.
   - **Operators**: `=` is an assignment operator, `*` (implicit in `2x`) is a multiplication operator, `+` is an addition operator.
   - **Functions**: `f(x)` is a function that takes a parameter `x`.
3. `"👩" + "\u200d" + "🚀"`
   - **Values**: `"👩"`, `"\u200d"`, and `"🚀"` are string type values.
   - **Operators**: `+` is a text concatenation operator.

## Statements

Let's remember again the definition of expression:

> 🧠 An expression is a combination of certain **elements** that are **evaluated** to produce a result.

But we've seen that there are operators that don't necessarily produce a result like the **assignment operator**.

Also, in the example of our function `f(a, b) = (a - b) * 5` its body `(a - b) * 5` actually contains 2 expressions:

1. The arithmetic expression `a - b` that produces a numeric result.
2. The arithmetic expression that uses the product operator to multiply the result of the previous expression `(a - b)` with the number `5`, thus generating a new numeric result.

> 🤯 Statements are nothing more and nothing less than a set of one or multiple expressions, which may or may not produce a value.

Let's analyze the following statement and the expressions that compose it: `a = b * 2`

1. `2` is a **literal value expression**.
2. `b` is a **variable expression**.
3. `b * 2` is an **arithmetic expression**.
4. `a = b * 2` is an **assignment expression**.

### Expressions in a statement

Since we know that a statement is a set of expressions, let's analyze some examples of statements that contain them. It's important to remember that each programming language allows certain types of expressions within a statement.

Below, let's review the most common ones:

1. **Literal value expression**:
   Represents constant and fixed values, like numbers, text strings, or boolean values. These expressions don't depend on _variables_ or additional calculations.

```javascript
42;
("Hello world");
```

2. **Variable expression**:
   Involves a variable that stores data and can be used to access those values.

```javascript
age = 33;
age;
```

3. **Arithmetic expression**:
   Performs mathematical operations using arithmetic operators like `+`, `-`, `*`, `/`, and `%`.

```javascript
3 + 7;
15 / 3;
```

4. **Logical expression**:
   Evaluates conditions using logical operators like `&&`, `||`, and `!`. The result is always a boolean value (`true` or `false`).

```javascript
true && false;
!true;
```

5. **String expression**:
   Allows concatenating, manipulating, or evaluating operations with text strings.

```javascript
"Hello" + " world";
```

6. **Relational expression**:
   Compares two values using operators like `<`, `>`, `<=`, `>=`, `==`, and `!=`. Returns a boolean result.

```javascript
5 < 10;
4 != 7;
```

7. **Conditional expression**:
   Uses the ternary operator (`? :`) to evaluate a condition and return a value depending on whether the condition is true or false.

```javascript
age = 20;
result = age > 18 ? "Adult" : "Minor";
```

8. **Function call expression**:
   Executes a function and returns the result it generates, if any.

```javascript
console.log("Hello world");
```

9. **Assignment expression**:
   Assigns a value to a variable using the assignment operator (=).

```javascript
x = 5;
y = x + 3;
```

### Statements that don't return a value

In programming, there are statements that execute a series of instructions without directly producing an output value.

Even so, they are essential for controlling the program execution flow, some examples are:

1. **`if` statement**: Evaluates a condition and executes a block of code if the condition is true.

```javascript
if (age > 18) {
  console.log("👵");
}
```

2. **`return` statement**: Used within a function to end its execution and, optionally, return a value.

```javascript
function f(x) {
  return;
};
```

### Function statements

In some programming languages, functions can exist both as statements and expressions.

#### Functions as statements:

A function declaration is normally defined as a statement. Example:

```javascript
function f(x) {
  return x + 2;
}
```

#### Functions as expressions:

Functions can also be expressions and can be assigned to variables. Example:

```javascript
g = (x) => x * 2;
```

Here, `g` is an anonymous function assigned to a variable.

## Programming languages are more than syntax

Although initially _values_, _variables_, _operators_, and _functions_ may seem like just symbols and syntax rules, in practice these fundamental elements allow us to build solutions to complex problems.

They are the basic pieces with which we can create from simple calculators to sophisticated artificial intelligence systems.

Understanding how these elements work is the first step to unleashing the true potential of any programming language.
