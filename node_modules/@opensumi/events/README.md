# @opensumi/events

A simple event emitter.

## Installation

```bash
npm install @opensumi/events
# or
yarn add @opensumi/events
```

## Usage

```ts
import { EventEmitter } from '@opensumi/events';

const emitter = new EventEmitter<{
  foo: [string, string];
}>();

emitter.on('foo', (arg1, arg2) => {
  console.log(arg1, arg2);
});

emitter.emit('foo', 'bar', 'baz'); // => bar baz
```
