---
title: JavaScript History and Evolution
description: "JavaScript was born in haste in 1995 and grew up in the middle of the web's chaos. In this post we go over how an improvised language meant to bring pages to life ended up expanding to servers, mobile devices, and distributed environments, from Netscape and V8 to Node.js, TypeScript, Deno, and Bun."
pubDate: "2025-11-09T00:00:00.000Z"
tags: [Learn to program]
heroImage: "/covers/cardboard-with-eggs-and-js-egg.jpg"
languageVersions:
  - language: "es"
    url: "/es/posts/historia-de-javascript"
relatedPosts:
  - types-of-programming-languages
  - how-does-a-programming-language-work
  - expressions-and-sentences-whats-next
---

JavaScript's history is the history of the web itself: born in haste, it grew in the midst of chaos and matured through experimentation. What began as an improvised language to bring web pages to life ended up expanding to servers, mobile devices, and distributed environments. Its path has not been linear or predictable, but that's precisely its charm: it managed to evolve without losing its essence. That's why it's one of the most loved and hated[^1] languages at the same time, but undoubtedly **impossible to ignore**.

## Brief History of JavaScript
In 1995, JavaScript was born at the hands of **Brendan Eich**, who developed the first functional prototype of the language in just **10 days**, although he had to continue working for almost a year before its official public release in the **Netscape Navigator 2**[^2] web browser.

It was conceived as the first **client-side** programming language in web browsers, extending the web beyond the static capabilities of pages and adding interactivity.

In 2003, Apple introduced **JavaScriptCore** as Safari's JavaScript engine, dedicated to executing JavaScript efficiently in its browser.

> ⚙️ A **JavaScript Engine** is the software that interprets or compiles and executes JavaScript code within a browser or runtime environment.

Later, in 2008, Google launched its Chrome browser along with the new **V8** engine, notably faster than the alternatives of the time: Firefox had **SpiderMonkey**, Internet Explorer had **Chakra**, and of course Safari continued using **JavaScriptCore**.

The revolutionary performance of **V8** enabled developer **Ryan Dahl** to create **Node.js** in 2009, a server-side JavaScript runtime environment based on V8.

> 🌵 A **runtime environment** is the set of tools and resources, such as the engine, APIs, and the operating system, that allow executing and supporting JavaScript code.

> 🕹️ An **API** (Application Programming Interface) is a bridge that allows different applications to communicate with each other and share data in an organized way.

The growing popularity of JavaScript on the server also drove the creation of frameworks: in **2010**, **Express.js** was born, a minimalist web framework for **Node.js** that soon became one of the most popular in the JavaScript ecosystem.

In **2012**, Microsoft Corporation launched **TypeScript**, a typed superset of JavaScript designed to improve scalability and maintainability in large projects. Although some purists might say it obscures part of the original charm of the language, the reality is that TypeScript has proven very useful in teams and extensive codebases.

Three years later, JavaScript became much more robust and mature with the **ES2015** specification, which introduced some of the most important changes and modernized it into the language we know today.

In 2018, **Ryan Dahl** decided to redeem his mistakes with Node.js and created a new runtime environment that works with TypeScript by default, which he called **Deno**, intentionally an anagram of the word "Node".

By 2021, the ecosystem surprised us again with a proposal that not only aims to be a new runtime environment, but also uses a different engine than **V8**, the mystical **JavaScriptCore**, giving rise to **Bun**, which promises to be an all-in-one solution optimized for JavaScript.

Since then, JavaScript has not stopped expanding, new runtime environments have emerged, shared standards, and increasingly faster and more compatible tools, consolidating its place as one of the most versatile languages in the world.

![](/images/posts/es/historia-de-javascript/javascript-timeline.jpg)
**1995–2021, the evolution of the JavaScript ecosystem:** JSCore, V8, Node.js, Express, TypeScript, Deno, and Bun.

## Why Was JavaScript Necessary?
In the mid-90s, web browsers were static environments. The most popular, **Netscape Navigator**, displayed HTML documents with text and images, but there was practically **no way to program interactivity directly in the browser**.

Any dynamic logic had to be implemented on the server (for example, through CGI, PHP, etc.), making **every user interaction require reloading the page from the server**. The "flat" web of that time needed to change: HTML and CSS were not enough to offer rich experiences.

Because of this, **Netscape** decided to integrate a scripting language into the browser to **extend functionality beyond HTML**.

Instead of using Java, the trendy language at the time, they saw the need to create an **easy-to-learn and use language**, aimed at **web designers or beginner developers** who could insert small pieces of code into HTML pages.

In fact, within Netscape it was argued that *two* languages were needed: one "professional" like Java or C++ for complex components, and another simpler one for "layout designers" who would add behavior directly to pages. Thus was born the idea of "**Java**, but easy", initially called **Mocha** and later **LiveScript**, which ended up being marketed as **JavaScript** in a marketing move alongside Sun Microsystems, the original creators of Java.

> 🟨 **JavaScript** as a name is actually a licensed term. In fact, "**JavaScript**" is a trademark registered by Oracle (which acquired Sun), and therefore the official standard of the language is called **ECMAScript**.

> ⛱️ In 2024, the community sent an open letter asking Oracle to free the JavaScript trademark[^3], signed even by Eich himself and other ecosystem leaders.

## ECMAScript and Its Evolution
As we mentioned before, **Brendan Eich** had very little time to create the first prototype and launch the initial version of JavaScript to the public. This time pressure gave rise to a fairly basic language in its beginnings. Eich took **influences from Java in syntax**, but also incorporated ideas from **Scheme** (first-class functions) and **Self** (prototype inheritance).

That's why JavaScript, while object-oriented, implements a **prototypal inheritance** model instead of traditional classes, something that, according to Eich, can be *more powerful* than classical class-based inheritance.

With such little gestation time, the first versions of JavaScript had several **peculiarities and design flaws**. For example, **weak comparison** with `==` (which performs implicit type conversions) was included, which soon proved to be error-prone; years later strict comparison `===` was introduced to remedy this.

Similarly, a famous *bug* remained for posterity: `typeof null` returns `"object"` instead of `"null"`, an erroneous behavior recognized from the beginning, caused by internal implementation details, but impossible to fix now without **breaking compatibility**. Despite these initial defects, JavaScript fulfilled its goal of being simple and was "ready" at just the right moment for the web explosion.

In its early years, the evolution of the language was **slow**. Browsers of the 90s and early 2000s operated on users' machines with limited resources (CPU, memory), compared to servers, so JavaScript was only used for small tasks on the client. However, as **client devices** (PCs, mobiles) became more powerful, the door opened to do more calculations and logic in the browser.

> 📠 **Client vs. Server:** On the web, the *client* (usually the browser) displays information to the user, while the *server* processes data and responds to their requests. In this model, **clients** communicate with centralized **servers** to obtain resources, not with each other.

A turning point came with **ECMAScript 6 (ES2015)**, published in **2015**. This version introduced an enormous amount of improvements to the language, from module and class syntax to lambda functions, `let`/`const`, and promises, forming the basis of modern JavaScript.

From then on, an **annual update cycle** of the standard (ES2016, ES2017, etc.) was adopted instead of the previous numeric system.

## TC39: The Committee That Decides JavaScript's Future
Since 1996, **TC39** (*Technical Committee 39*) of **Ecma International** has been the group responsible for defining and maintaining the **ECMAScript** (ECMA-262) language specification, the standard on which **JavaScript** is based.

The committee is made up of representatives from the main companies and institutions in the industry: language implementers (such as the **Chrome**, **Firefox**, **Safari**, **Edge** browsers), runtime environments (**Node.js**, **Deno**), and large organizations that use JavaScript intensively.

In essence, **TC39** is who **discusses, designs, and approves** what new features are officially incorporated into the language.

Although only official delegates have voting rights, the process is relatively **open**: anyone can propose ideas and participate in discussions through **GitHub** or public forums. Proposals usually begin as simple informal conversations and, if they catch the attention of some committee member (who acts as their **"champion"** or sponsor), they can begin the formal path toward standardization.

With the arrival of **ES2015**, TC39 **modernized its work process**, adopting a system based on **maturity stages** that allows evaluating the progress of each proposal more clearly. This change marked the beginning of the **continuous evolution model** of the language, which today is officially updated every year.

## JavaScript's Maturity Stages
These **stages** represent the journey a proposal follows from its initial idea to its definitive inclusion as a standard. Traditionally, there are **five stages numbered 0 to 4** (with stage 0 being an initial unofficial phase). However, in 2024 an **intermediate stage called "Stage 2.7"** was introduced, raising the total to **six stages**[^4] in the current process.

### Stage 0, known as "Strawman"
This is the informal sketching phase; any proposal starts here, as an idea that has not yet been officially presented or passed initial filters. It has no acceptance criteria other than the interest of some member in exploring it, and anyone can do it.

### Stage 1, known as "Proposal"
At this stage, it implies that the committee shows interest in the problem to be solved. A formal document is presented describing the problem and an approximate solution. The proposal is under active exploration, and here it will be determined whether it is discarded or moves forward.

### Stage 2, known as "Draft"
The proposal is considered on track and its detailed technical specification begins to be written (in ECMA-262 standard language). It can still change significantly, but the committee believes it **should** eventually be included.

### Stage 2.7, known as "Approved"
Indicates that the design is essentially complete and reviewed, **approved in principle** by the committee, without requiring more substantial changes except those that arise from implementation and testing.

The intention is to ensure that the proposal text is polished and validated by experts, pending verification of its feasibility through experimental implementations.

> 🛟 This stage was added to reinforce the quality of proposals before declaring them final candidates.

### Stage 3, known as "Candidate"
The proposal is ready to be implemented and tested. It is supposed to have no more design changes unless experimentation reveals problems. Authors call for JavaScript engines to begin implementing it and for the community to test it to detect any incompatibilities or missing details.

### Stage 4, known as "Completed"
The functionality is finalized and **ready to be included in the ECMAScript standard**. It requires at least two independent implementations and tests (Test262) that verify its behavior.

At this stage, the proposal is merged into the final draft of the next annual edition of the standard. In practice, this means developers can trust that the feature will be part of the language. Although its support in browsers or environments may take a while to arrive, it is usually included with a transpiler like Babel or a polyfill.

> 🗼 **Babel** is a transpiler that converts modern JavaScript code into versions compatible with older browsers or environments, ensuring that new language features can run everywhere.

## A Language in Motion
Each year, around mid-year, **TC39** gathers all proposals that have reached Stage 4 and publishes a new edition of the standard (ES2024, ES2025, etc.). This continuous process, based on consensus and collaboration, keeps JavaScript in constant evolution, balancing innovation with stability.

Far from being that improvised experiment of 1995, today the language reflects the maturity of an entire community: thousands of developers, companies, and projects that contribute to its growth. And if JavaScript has proven anything over all these years, it's that it knows how to adapt; that's why it stays current in an ecosystem that never stops changing.

[^1]: What's Your Least Favourite Programming Language? - [https://youtu.be/03lRzf7iSiU](https://youtu.be/03lRzf7iSiU)
[^2]: Netscape Navigator 2 - [https://en.wikipedia.org/wiki/Netscape_Navigator_2](https://en.wikipedia.org/wiki/Netscape_Navigator_2)
[^3]: Oracle, it's time to free JavaScript - https://javascript.tm/letter
[^4]: The TC39 Process - [https://tc39.es/process-document/](https://tc39.es/process-document/)

