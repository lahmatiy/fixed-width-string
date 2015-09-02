[![NPM version](https://img.shields.io/npm/v/fixed-width-string.svg)](https://www.npmjs.com/package/fixed-width-string)
[![Build Status](https://travis-ci.org/lahmatiy/fixed-width-string.svg?branch=master)](https://travis-ci.org/lahmatiy/fixed-width-string)

Terminal ANSI-aware string fit to fixed width:

- pad or truncate string if needed
- align string
- ANSI-aware (works right with colored strings)

## Install

```
$ npm install --save fixed-width-string
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

Where:

### options.padding

String to padding with.

Default: ` ` (one space)

```js
console.log(fixedWidthString('test', 10));
// "test      "

console.log(fixedWidthString('test', 10, { padding: '.' }));
// "test......"
```

### options.align

Side to align.

Values: `left` or `right`

Default: `left`

```js
console.log(fixedWidthString('test', 10));
// "test      "

console.log(fixedWidthString('test', 10, { align: 'right' }));
// "      test"
```

### options.ellipsis

String to be placed when string trancate.

Default: `…`

```js
console.log(fixedWidthString('hello world', 8));
// "hello w…"

console.log(fixedWidthString('hello world', 8, { ellipsis: '~' }));
// "hello w~"

console.log(fixedWidthString('hello world', 8, { ellipsis: '...', align: 'right' }));
// "...world"
```

### options.truncate

Side should be truncated.

Values: `left` or `right`

Default: `right` when `align: 'left'` or `left` when `align: 'right'`

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

MIT © Roman Dvornov
