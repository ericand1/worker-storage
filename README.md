# Worker Storage

This is a simple library that acts similarly to localStorage or sessionStorage but stores data in web worker. It will make it more difficult for a bad actor to access sensitive data through a vulnerable library or other code executing in your browser app. Since you interact with Workers through events the public functions of `WorkerStorage` are wrapped in Promises to ensure any interactions are complete as long as you `await` or `.then(xx)` the calls.

## Installation

```
# With npm
npm install --save worker-storage

# With Yarn
yarn add worker-storage
```

## Usage

```javascript
import { WorkerStorage }from 'worker-storage';

const storage = new WorkerStorage();

await storage.setItem('some-key', {hello: 'world'});

const item = await storage.getItem('some-key');

await storage.removeItem('some-key');

// Clear all items from storage
await storage.clear();

```

## Notes

Much like local or session storage you can store any data types in WorkerStorage with an associated key. Also since a web worker is only persisted as long as a user is on a specific page anything that is stored in the worker will be lost if a user is redirected or their location changes. Thus it is maily useful in Single Page Applications (SPAs) such as those written in React, Angular, Vue.js, etc. It is framework agnostic and shouldn't matter which your app is written in as long as it isn't using server side rendering. The public WorkerStorage class is written in TypeScript and typings are included in the package for convenience (but TypeScript is not required to use it).