# 🔍 How Node.js Works: A Look Behind the Scenes

[![Node.js](https://img.shields.io/badge/Node.js-Latest-brightgreen.svg)](https://nodejs.org/)

How **Node.js** actually works behind the scenes (architecture, events and the event loop, streams, modules...)

## 📑 Table of Contents

1. [🔧 Node, V8, Libuv and C++](#-node-v8-libuv-and-c)
2. [🧵 Processes, Threads and the Thread Pool](#-processes-threads-and-the-thread-pool)
3. [🔄 The Node.js Event Loop](#-the-nodejs-event-loop)
4. [📡 Events and Event-Driven Architecture](#-events-and-event-driven-architecture)
5. [📊 Introduction to Streams](#-introduction-to-streams)
6. [📦 How Requiring Modules Really Works](#-how-requiring-modules-really-works)

## 🔧 Node, V8, Libuv and C++

- Node depends on couple of libraries in order to work properly, most Important ones:
  - **V8 JavaScript Engine:**
    - Node is a JavaScript run time based on Google's V8 engine
    - V8 is a fundamental part in the Node architecture.
    - V8 engine is what converts JavaScript code into machine code that a computer can actually understand.
    - V8 itself use **C++** besides JavaScript.

  - **Libvu:**
    - V8 alone is not enough to create a whole server side framework like Node.
    - And so that is why we also have libuv in Node.
    - libuv is an open source library with a strong focus on asynchronous IO (Input/Output).
    - This layer is what gives Node access to the underlying computer operating system, file system, networking...
    - libuv also implements two extremely important features of Node.JS:
      - **Event loop**, Handel easy tasks (call backs, network IO...)
      - **Thred pool**, Handel heay work (file access, compression...)
    - libuv is completely written in **C++** not JavaScript.

- So therefore, Node itself is a program written in **C++** and JavaScript and not just in JavaScript.
- Node.js ties all these libraries together, whether written in C++ or JavaScript, and provides developers access to their functions in pure JavaScript, offering a convenient abstraction layer to simplify development without needing to handle C++ code directly.
- Node.js architecture allows us to write 100% pure JavaScript code, and still access functions like for file reading, which behind the scenes are actually implemented in libuv or other libraries in the C++ language.

- Node also use:
  - **http-parser** for parsing http.
  - **c-ares** for some DNS request stuff.
  - **OpenSSL** for keptography.
  - **zlib** for compression.

## 🧵 PROCESSES, THREADS AND THE THREAD POOL

When we use Node on our computers, it means that there is a Node process running, this process is just a program in execution, basically a C++ program, which will therefore start a process when it's running.

Node.js runs on a **single thread**, which means it processes instructions one after the other (imagine a Thread as a box where our code is executed in a computer's processor).

Node runs in just one thread, which makes it easy to block Node applications. It will run in just a single thread no matter if you have 10 users or 10 million users accessing the application at the same time.

Its so important to be very careful about not blocking that thread.

- What exactly happens in a **single thread** when Node application start:
  - when the program is initialized, all the top level code is executed (all code outside any callback function).
  - All modules the app needs are required/imported.
  - Callbacks are registered.
  - **Event loop** Start running, where most of the work is done, it's the heart of the entire Node architecture.

Some tasks are actually too heavy, they are too expensive to be executed in the event loop because they would then block the single thread. and that's where the **thread pool** comes in.

The thread pool gives us four additional threads that are completely separate from the main single thread (and can configure it up to 128 threads), together formed a **thread pool**, all of this happens automatically behind the scenes.

- Expensive tasks that do get offloaded:
  - operations dealing with files.
  - Cryptography.
  - Compression.
  - DNS lookups.

## 🔄 THE NODE.JS EVENT LOOP

## 📡 EVENTS AND EVENT-DRIVEN ARCHITECTURE

## 📊 INTRODUCTION TO STREAMS

## 📦 HOW REQUIRING MODULES REALLY WORKS
