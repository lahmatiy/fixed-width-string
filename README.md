[![NPM version](https://img.shields.io/npm/v/fixed-width-string.svg)](https://www.npmjs.com/package/fixed-width-string)
[![Build Status](https://travis-ci.org/lahmatiy/fixed-width-string.svg?branch=master)](https://travis-ci.org/lahmatiy/fixed-width-string)
[![Coverage Status](https://coveralls.io/repos/github/lahmatiy/fixed-width-string/badge.svg?branch=master)](https://coveralls.io/github/lahmatiy/fixed-width-string?branch=master)


Fit a string to the fixed width (length) with aware of [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code).

Features:

- Works well with strings with ANSI escape codes, i.e strings styled with a lib like [chalk](https://github.com/chalk/chalk)
- Pad or truncate string if needed
- Align string

## Install

```
$ npm install fixed-width-string
```

## Usage

```js
var fixedWidthString = require('fixed-width-string');

console.log(fixedWidthString('test', 10));
// "test      "

console.log(fixedWidthString('very long string', 10));
// "very long…"

console.log(fixedWidthString('very long string', { align: 'right' }));
// "…ng string"

var chalk = require('chalk');

console.log(fixedWidthString(chalk.green('hello') + ' ' + chalk.red('world'), 8));
// "\u001b[32mhello\u001b[39m \u001b[31mw…\u001b[39m"
//
// but in terminal you'll see colored
// "hello w…"
```

## API

```js
fixedWidthString(str, width[, options])
```

### options.padding

String to padding with.

Default: `' '` (one space)

```js
console.log(fixedWidthString('test', 10));
// "test      "

console.log(fixedWidthString('test', 10, { padding: '.' }));
// "test......"
```

### options.align

Side to align.

Values: `'left'` or `'right'`  
Default: `'left'`

```js
console.log(fixedWidthString('test', 10));
// "test      "

console.log(fixedWidthString('test', 10, { align: 'right' }));
// "      test"
```

### options.ellipsis

String to be placed when string is truncating.

Default: `'…'`

> Note: To omit ellipsis, pass an empty string or falsy value for the option.

```js
console.log(fixedWidthString('hello world', 8));
// "hello w…"

console.log(fixedWidthString('hello world', 8, { ellipsis: '~' }));
// "hello w~"

console.log(fixedWidthString('hello world', 8, { ellipsis: '...', align: 'right' }));
// "...world"

console.log(fixedWidthString('hello world', 8, { ellipsis: false, align: 'right' }));
// "lo world"
```

### options.truncate

Side should be truncated.

Values: `'left'` or `'right'`  
Default: `'right'` when `align: 'left'` or `'left'` when `align: 'right'`

```js
console.log(fixedWidthString('hello world', 8));
// "hello w…"

console.log(fixedWidthString('hello world', 8, { truncate: 'left' }));
// "…o world"

console.log(fixedWidthString('hello world', 8, { align: 'right' }));
// "hello w…"

console.log(fixedWidthString('hello world', 8, { align: 'right', truncate: 'left' }));
// "…o world"
```

## License

MIT
