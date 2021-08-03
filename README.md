# → dotspace

Do vector math in JavaScript.

## Install
This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c). Its contents must be `import`ed.

[npm](https://docs.npmjs.com/cli/install):
```
npm install dotspace
```

[yarn](https://yarnpkg.com/cli/add):
```
yarn add dotspace
```

## Usage

When using dotspace all vectors are represented by arrays of numbers:

```ts
const newVector = add([1, 0], [0, 1]); // => [1, 1]
```

This package exports:

* equals
* add
* subtract
* dotProduct
* crossProduct
* magnitude
* normalize
* multiplyByComponents
* multiplyByScalar
* invert

There are no default exports.
