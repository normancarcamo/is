# is
A data type checker and validator.

- [Installation](#installation)
- [API](#API)
  - [is.object](#is.object)
  - [is.null](#is.null)
  - [is.undefined](#is.undefined)
  - [is.number](#is.number)
  - [is.array](#is.array)
  - [is.string](#is.string)
  - [is.boolean](#is.boolean)
  - [is.uuid](#is.uuid)
  - [is.integer](#is.integer)
  - [is.float](#is.float)
  - [is.positive](#is.positive)
  - [is.negative](#is.negative)
  - [is.zero](#is.zero)
  - [is.between](#is.between)
  - [is.alpha](#is.alpha)
  - [is.digit](#is.digit)
  - [is.function](#is.function)
  - [is.async_function](#is.async_function)
  - [is.promise](#is.promise)
  - [is.empty](#is.empty)
  - [is.regexp](#is.regexp)
  - [is.ip](#is.ip)
  - [is.port](#is.port)
  - [is.date](#is.date)
  - [is.date.only](#is.date.only)
  - [is.date.time](#is.date.time)
  - [is.date.time.only](#is.date.time.only)
  - [is.date.iso](#is.date.iso)
  - [is.date.instance](#is.date.instance)
  - [is.type](#is.type)

## Installation

As a node.js module

```shell
$ npm install @ncardez/is
```

## API

```js
const is = require('@ncardez/is');
```

### is.object
- ``is.object`` (value``: object``) ``:boolean``

```js
  // Example:

  expect(is.object({})).toBe(true);
```

### is.null
- ``is.null`` (value``: null``) ``:boolean``

```js
  // Example:

  expect(is.null(null)).toBe(true);
```

### is.undefined
- ``is.undefined`` (value``: undefined``)``: boolean``

```js
  // Example:

  expect(is.undefined()).toBe(true);

  expect(is.undefined(undefined)).toBe(true);
```

### is.number
- ``is.number`` (value``: number|string``, parse``: boolean``)``: boolean``
  
```js
  // Example:

  expect(is.number(12)).toBe(true);

  expect(is.number(-23)).toBe(true);

  expect(is.number('13', true)).toBe(true);
```

### is.array
- ``is.array`` (value``: array``)``: boolean``

```js
  // Example:

  expect(is.array([])).toBe(true);
```

### is.string
- ``is.string`` (value``: string``)``: boolean``

```js
  // Example:

  expect(is.string('')).toBe(true);
```

### is.boolean
- ``is.boolean`` (value``: boolean|string``, parse``: boolean``)``: boolean``

```js
  // Example:

  expect(is.boolean(true)).toBe(true);
  
  expect(is.boolean(false)).toBe(true);

  expect(is.boolean('true', true)).toBe(true);

  expect(is.boolean('false', true)).toBe(true);
```

### is.uuid
- ``is.uuid`` (value`: string`, version`: string`)``: boolean``

  value: must be a valid UUID.

  version:  `'v1'|'v2'|'v3'|'v4'|'v5'`

```js
// Example:

expect(is.uuid('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'v4')).toBe(true);
```

### is.integer
- ``is.integer`` (value``: number|string``)``: boolean``

```js
// Example:

expect(is.integer(23)).toBe(true);

expect(is.integer('43')).toBe(true);
```

### is.float
- ``is.float`` (value``: number|string``)``: boolean``

```js
// Example:
expect(is.float(.23)).toBe(true);

expect(is.float('2.43')).toBe(true);
```

### is.positive
- ``is.positive`` (value``: number|string``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.positive(23)).toBe(true);

expect(is.positive('2.43')).toBe(true);
```

### is.negative
- ``is.negative`` (value``: number|string``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.negative(-23)).toBe(true);

expect(is.negative('-2.43')).toBe(true);
```

### is.zero
- ``is.zero`` (value``: number|string``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.zero(0)).toBe(true);

expect(is.zero('0')).toBe(true);
```

### is.between
- ``is.between`` (min``: number|string|date``, max``: number|string|date``, value``: number|string|date``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.between(0, 10, 5)).toBe(true);
expect(is.between('0', '6', '2')).toBe(true);
expect(is.between('2010-02-01', '2010-02-20', '2010-02-10')).toBe(true);
expect(is.between(new Date('2010-02-01'), new Date('2010-02-20'), new Date('2010-02-10'))).toBe(true);
```

### is.alpha
- ``is.alpha`` (value``: string``)``: boolean``

```js
// Example:

expect(is.zero('aknd23')).toBe(true);

expect(is.zero('0ksjdn =13')).toBe(false);
```

### is.digit
- ``is.digit`` (value``: number|string``)``: boolean``

```js
// Example
expect(is.zero('2')).toBe(true);

expect(is.zero(3)).toBe(true);
```

### is.function
- ``is.function`` (value``: function``)``: boolean``

```js
// Example:

expect(is.function(() => {})).toBe(true);

expect(is.function(function() {})).toBe(true);
```

### is.async_function
- ``is.async_function`` (value``: Async Function``)``: boolean``

```js
// Example:

expect(is.function(async () => {})).toBe(true);

expect(is.function(async function() {})).toBe(true);
```

### is.promise
- ``is.promise`` (value``: Promise``)``: boolean``

```js
// Example:

expect(is.promise(Promise.resolve(2))).toBe(true);
```

### is.empty
- ``is.empty`` (value``: string|array|object|function``)``: boolean``

```js
// Example:

expect(is.promise('')).toBe(true);

expect(is.promise([])).toBe(true);

expect(is.promise({})).toBe(true);

expect(is.promise(() => {})).toBe(true);

expect(is.promise(function () {})).toBe(true);
```

### is.regexp
- ``is.regexp`` (value``: RegExp``)``: boolean``

```js
// Example:

expect(is.regexp(/\d/)).toBe(true);
```

### is.ip
- ``is.ip`` (value``: string``)``: boolean``

```js
// Example:

expect(is.ip('192.168.0.1')).toBe(true);
```

### is.port
- ``is.port`` (value``: number``)``: boolean``

```js
// Example:

expect(is.port(8080)).toBe(true);
```

### is.date
- ``is.date`` (value``: Date``)``: boolean`` - alias: ``is.date.valid(value: Date): boolean``

```js
// Example:

expect(is.date(Date())).toBe(true);

expect(is.date(Date(2020, 10, 12))).toBe(true);

expect(is.date(Date('2010-02-03'))).toBe(true);
```

### is.date.only
- ``is.date.only`` (value``: string``)``: boolean``

```js
// Example:

expect(is.date.only('2010-02-03')).toBe(true);
```

### is.date.time
- ``is.date.time`` (value``: string``)``: boolean``

```js
// Example:

expect(is.date.time('2010-02-03 03:20:14')).toBe(true);
```

### is.date.time.only
- ``is.date.time.only`` (value``: string``)``: boolean``

```js
// Example:

expect(is.date.time.only('03:20:14')).toBe(true);
```

### is.date.iso
- ``is.date.iso`` (value``: string``)``: boolean``

```js
// Example:

expect(is.date.iso('2010-02-03 03:20:14.290Z')).toBe(true);

expect(is.date.iso('2018-02-11T02:10:14.210Z')).toBe(true);
```

### is.date.instance
- ``is.date.instance`` (value``: Date``)``: boolean``

```js
// Example:

expect(is.date.instance(new Date())).toBe(true);

expect(is.date.instance(new Date('2018-02-11T02:10:14.210Z'))).toBe(true);
```

### is.type
- ``is.type`` (value``: function|number|boolean|object|array|null|undefined|regexp|date|string|function``, parse``: boolean``)``: string``

```js
// Example:

expect(is.type).toBeFunction();

expect(is.type(3)).toEqual('number');

expect(is.type(true)).toEqual('boolean');

expect(is.type({})).toEqual('object');

expect(is.type([])).toEqual('array');

expect(is.type(null)).toEqual('null');

expect(is.type()).toEqual('undefined');

expect(is.type(undefined)).toEqual('undefined');

expect(is.type(/\d/)).toEqual('regexp');

expect(is.type(new Date())).toEqual('date');

expect(is.type('djsnfkjsndfkjn')).toEqual('string');

expect(is.type(function(){})).toEqual('function');

expect(is.type(() => {})).toEqual('function');
```


## Contributors

- Norman Carcamo <normancarcamo@gmail.com>

## License & copyright

© Norman Carcamo, Software Developer

Licensed under the [MIT](LICENSE).
