---
title: The Hidden JavaScript Ecosystem
description: "Behind JavaScript lies an ecosystem that normally goes unnoticed: the engines that transform code into instructions, the runtime environments that take it beyond the browser, and the platforms that have made it a truly full-stack language."
pubDate: "2026-05-05T00:00:00.000Z"
tags: [Learn to program]
heroImage: "/covers/hidden-mushrooms-inside-a-tree-root.jpg"
languageVersions:
  - language: "es"
    url: "/es/posts/ecosistema-oculto-de-javascript"
relatedPosts:
  - javascript-history
  - types-of-programming-languages
  - how-does-a-programming-language-work
---

When people ask me which is the best language for programming, my answer is almost always "it depends." *I really like JavaScript*, but the choice of a language depends on many factors, and one of the most important is the ecosystem that exists around it.

The ecosystem includes everything that surrounds a language: the community, documentation, testing tools, package and dependency managers, IntelliSense support, and real projects that demonstrate its use in production. All these elements directly influence the development experience, also known as DX.

> 🤿 DX (Developer Experience) is the concept focused on improving the experience of developing software. For example, making writing code fast and comfortable, or being able to automate tasks to validate that your code meets certain quality standards.

Part of that ecosystem is made up of components we normally don't worry about. I call this **"the hidden ecosystem"**: fundamental pieces that make JavaScript so versatile and present practically everywhere, such as engines and runtime environments.

## **JavaScript Engines**
Modern web browsers use different JavaScript engines to interpret or compile code, as we saw in the chapter on [Types of Programming Languages](/posts/types-of-programming-languages). Each engine has its own architecture, optimizations, and design decisions.

JavaScript doesn't run natively in the browser. The code must be transformed into machine code, and the engine is responsible for carrying out that process. Let's look at some of the current engines and what they excel at.

### **V8**
V8 is one of the most popular engines. It was created by Google for its Chrome browser, but it also gave rise to Node.js and is today used by Deno, among other projects.

It is an open-source engine that stands out for its high performance. It uses an interpreter and an optimized *just-in-time* compiler to convert JavaScript to machine code, as well as an advanced garbage collector that helps reduce long pauses.

> ⏱️ **Just-in-time compilation (JIT)**: is a technique in which code is compiled to machine code while the program is running, rather than doing so completely beforehand. This allows applying optimizations based on how the code behaves at runtime.

> 🚛 **Garbage Collector:** is a mechanism used in programming languages to free memory spaces containing objects or data that are no longer needed.

The result is a fast startup and great execution speed once the code is "hot." 🔥

V8 is frequently updated to incorporate the latest ECMAScript features and is easily embeddable in other applications. It is also present in many browsers thanks to the Chromium project.

> 🐤 **Chromium**: is the open-source project on which Chrome is based. In other words, it's the heart of Chrome without the private and proprietary parts that Google adds. Browsers like Microsoft Edge, Opera, and Brave are also based on Chromium.

### **SpiderMonkey**
SpiderMonkey is the engine used by Mozilla Firefox, originally created by Netscape. It uses a base interpreter and multiple levels of *just-in-time* compilation, along with a garbage collector tuned for the browser environment.

It stands out for its strict adherence to the ECMAScript standard and for offering excellent debugging tools.

It can also be embedded in applications that need a complete, standard-conforming JavaScript *runtime environment*. A well-known case was **MongoDB**, a non-relational database engine that used SpiderMonkey to run JavaScript in various internal functionalities, although this use has been reduced over time.

### **JavaScriptCore**
JavaScriptCore, also called Nitro or WebKit JavaScript Engine, is the engine used by Safari.

It evolved from the old SquirrelFish engine toward a multi-tier architecture with an optimized *just-in-time* compiler.

Apple has tuned it especially to maximize memory efficiency and low power consumption, with limited-resource devices in mind. It integrates closely with the native iOS and macOS APIs through the JavaScriptCore framework and prioritizes stability and predictable behavior over radical changes.

### **Chakra**
Chakra was the engine used by Internet Explorer 9 and later, as well as by Microsoft Edge in its legacy version, Edge 18.

Designed by Microsoft, it offered *just-in-time* compilation and was heavily optimized for Windows operating systems.

> 🦋 Microsoft Edge migrated to Chromium and started using V8 in 2020. Even so, Chakra continued to be available as ChakraCore, an open-source project aimed at embedded uses, but Microsoft stopped publishing new versions and the availability of its official downloads was withdrawn in 2024.

## **JavaScript on the Server**
For many years, JavaScript had a very limited place in web development. Until the early years of the new millennium, around 2000, it was seen almost exclusively as a browser language. Its purpose was reduced to adding small doses of interactivity: form validation, showing or hiding elements, reacting to clicks, among other similar tasks.

Anyone who wanted to build a complete web application had to face, at least, two different worlds. On one hand, JavaScript in the browser. On the other, any language of the era capable of running on the server, such as PHP, Python, Java, or Ruby. Two languages, two ecosystems, and often two very different ways of solving problems.

That was the dominant scenario for several years, until 2009 when a turning point occurred. At a conference, **Ryan Dahl presented Node.js**, an idea that at the time seemed crazy: running JavaScript not only in the browser, but also on the server.

Node.js thus became the runtime environment that popularized JavaScript on the server side, built on the V8 engine. Suddenly, the language that for years had been considered slow and unsuitable for "serious" tasks was beginning to show it could compete in the big leagues.

But Node.js didn't just bring JavaScript to the server. It also introduced a non-blocking, event-driven execution model. Unlike many traditional languages and servers, Node.js could handle thousands of concurrent connections efficiently, delegating costly operations to the system and reacting when they finished.

This approach fitted naturally with the reality of the modern web: highly concurrent applications, more focused on coordinating events than on consuming resources constantly.

For the first time, JavaScript could cover the entire journey of a web application. The same language served to build the user interface and interactions, implement business logic, access data, and expose APIs. The boundary between client and server still existed and was clear, but the language connecting them was now the same.

The impact was immediate: JavaScript stopped being just a language and began to consolidate as a complete platform. **npm** emerged, a package system that over time would become one of the largest software repositories in the world. Web frameworks like **Express** appeared, which greatly simplified the creation of servers with just a few lines of code. And, almost without realizing it, the community began building its own tools in JavaScript: linters, bundlers, task runners, and later, compilers and complete development environments.

For the first time, developers could bet on a single language, deepen their knowledge of it, and use it at all levels of an application. JavaScript left behind its secondary role and consolidated itself as something new: a **truly full-stack language**.

## **New Generations of Environments**
The growth of JavaScript brought with it the emergence of alternative runtime environments to Node.js, designed for modern use cases like serverless applications, *edge computing*, or to improve historical decisions that were difficult to change in Node.js without breaking compatibility.

### **Deno**
Deno is a runtime environment created by Ryan Dahl, the same creator of Node.js. It was introduced in 2018 with the intention of correcting some "design mistakes" that Dahl identified in Node.js.

> 🦕 In case you haven't noticed yet, **Deno** is an anagram of **Node**, the name associated with Node.js.

It is open-source, written in Rust, and uses the V8 engine. Unlike Node.js, Deno was designed with security as a starting point: by default, it doesn't allow access to the file system, network, or environment variables unless explicit permissions are granted.

Additionally, it includes native support for TypeScript and adopts module importing via URLs or local files, instead of taking *npm* as the required starting point.

Deno also seeks to offer a more integrated experience. It includes tools such as a formatter, linter, documentation server, and test runner, in addition to prioritizing standard web APIs when possible.

Its community is still smaller than Node.js's, but Deno has made significant progress in compatibility with packages and projects from the Node.js ecosystem.[^1]

A good reason to use Deno is precisely that: it represents a second opportunity to design a modern JavaScript *runtime environment*, learning from more than a decade of experience with Node.js.

### **Bun**
Bun is a *runtime environment* that surprised the community by doing several things out of the ordinary. It was introduced in 2021 and positioned itself as an **ultra-fast** alternative, focused mainly on performance and developer experience.

> 🏎️ **Benchmarking**: in the ecosystem we will always encounter tools, frameworks, or *runtime environments* that claim to be faster than others. But many comparisons tend to use examples that benefit the tool claiming to be the winner. Therefore, it is important to review the context and the code used with your own judgment.

Bun was written in Zig[^2] and, instead of V8, uses **JavaScriptCore**. Its goal is to be a direct replacement for Node.js, but extremely faster.

Bun integrates several tools that would normally require separate configurations: it comes with a package manager, bundler, transpiler, test engine, and native TypeScript support. That's why it can run a React app without extra installations or dependencies[^3].

Bun's philosophy is to reduce friction: start faster, consume fewer resources, and make it easier for developers to have everything in one place. While Bun is still evolving and refining compatibility with all Node packages, it has already generated a lot of expectation in the community for its capabilities and performance numbers.

### **Specialized Runtime Environments**
In addition to Deno and Bun, there are runtime environments oriented toward specific scenarios.

In *edge computing* and next-generation **serverless** functions, for example, V8 isolates are used instead of traditional Node.js processes.

Platforms like **Cloudflare Workers** allow executing JavaScript code in isolated instances almost instantaneously. This enables having thousands of concurrent functions per server and drastically reducing startup time.

In the world of **IoT and embedded devices**, there are also minimalist JavaScript engines like **JerryScript**[^4], designed to run on microcontrollers with very little memory. These engines sacrifice some advanced features but allow running JavaScript scripts on very limited hardware.

What's interesting is that JavaScript no longer depends on a single execution model. The need to start faster, consume fewer resources, and adapt to different environments has given rise to *runtime environments* with very different priorities: servers, development tools, cloud functions, embedded devices, and edge network execution.

All these environments coexist today and show how JavaScript continues to expand without being tied to the browser or the classic Node.js model.

## **Applications Beyond the Browser**
After the Node.js revolution, JavaScript continued extending beyond the browser, reaching **mobile** and **cross-platform desktop** application development.

This has revolutionized the way software products are created, allowing the building of native and desktop apps using only JavaScript knowledge and sharing part of the code between platforms.

### **On Mobile Platforms**
In 2009, hybrid solutions like **PhoneGap** emerged, allowing *"write once, run anywhere"* using HTML, CSS, and JavaScript to create cross-platform mobile apps.

Basically, PhoneGap packaged a web application inside a native container and exposed JavaScript APIs to access device features, such as the camera or sensors.

The approach was revolutionary, but it came with performance and UX limitations: the apps were really *WebViews*, not native interfaces, which sometimes translated into less fluidity.

In 2015, Facebook introduced **React Native**. Unlike PhoneGap, although developers write the logic in JavaScript, the interface is rendered using **native views** on each platform.

This means the resulting app uses real iOS and Android components, achieving an appearance and performance closer to those of a pure native app.

Many other options continued to emerge, such as **Ionic**, **NativeScript**, and **Progressive Web Apps**, which bring web experiences to mobile directly.

### **On the Desktop**
JavaScript also conquered ground through frameworks like **Electron**, launched in 2013 by GitHub.

Electron allows building cross-platform desktop applications for Windows, macOS, and Linux using web technologies, with Chromium for the interface and Node.js for system access.

In practice, Electron enables a web application to be distributed as a desktop application, offering an experience close to native, but built with web technologies.

This approach has had an enormous impact on the industry. Many applications in our daily lives have been built with Electron: **Visual Studio Code, Slack, Discord, WhatsApp Desktop, Notion, Figma**, and **Descript**. Some have migrated, or could migrate in the future, to other technologies, but it's still surprising to see how far JavaScript has been used in desktop applications and in products that compete with native apps. This is the case of Figma, for design, or **Descript**, for video editing: things that before seemed unthinkable outside the native environment.

## **The Future of the Ecosystem**
JavaScript has shown us time and again its versatility, perhaps because it was born alongside the web, as we mentioned in the [JavaScript History and Evolution](/posts/javascript-history).

The web helped position it, but JavaScript also had a particular advantage: it advanced slowly. Like a snail. That slowness, combined with its massive adoption, allowed the language to incorporate lessons learned from other ecosystems without disappearing in the process.

If JavaScript has already reached so many corners, then what's left? My prediction is that in a very short time it will also be an important language in the development of Artificial Intelligence applications.

The community has already started to notice that many natural features of JavaScript, Node.js, and the web — such as *Streams*, asynchronous APIs, and event-driven execution — fit very well with this new scenario. If Artificial Intelligence continues to coexist primarily with web products, JavaScript could gain a much more relevant place in the artificial intelligence ecosystem.

[^1]: Deno is Node-compatible — https://docs.deno.com/runtime/fundamentals/node/
[^2]: Zig Language — https://ziglang.org/
[^3]: Build a React App with Bun — https://bun.com/docs/guides/ecosystem/react
[^4]: JerryScript — https://jerryscript.net
