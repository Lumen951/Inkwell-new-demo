# tree-sitter-wasm

Prebuilt WebAssembly binary for tree-sitter.

## Build

Firstly, you need to ensure that you have `docker` installed.

and then install `tree-sitter-cli`:

```sh
npm install -g tree-sitter-cli
```

and run `build-wasm` script:

```sh
yarn
yarn build-wasm
```

## Publish

```sh
yarn run release
```
