# is
A data type checker and validator for node (typescript compatible).

- [Installation](#installation)
- [Test](#test)
- [API](#API)
  - [is.object](#object)
  - [is.null](#null)
  - [is.undefined](#undefined)
  - [is.number](#number)
  - [is.array](#array)
  - [is.string](#string)
  - [is.boolean](#boolean)
  - [is.uuid](#uuid)
  - [is.integer](#integer)
  - [is.float](#float)
  - [is.positive](#positive)
  - [is.negative](#negative)
  - [is.zero](#zero)
  - [is.between](#between)
  - [is.alpha](#alpha)
  - [is.digit](#digit)
  - [is.function](#function)
  - [is.asyncFunction](#asyncFunction)
  - [is.promise](#promise)
  - [is.empty](#empty)
  - [is.regexp](#regexp)
  - [is.ip](#ip)
  - [is.port](#port)
  - [is.date](#date)
  - [is.time](#time)
  - [is.dateTime](#dateTime)
  - [is.dateISO](#dateISO)
  - [is.dateInstance](#dateInstance)
  - [is.dateValid](#dateValid)
  - [is.type](#type)
  - [is.error](#error)
  - [is.jwt](#jwt)
  - [is.jsonwebtoken](#jwt) - alias for ``is.jwt``.
- [Contributors](#Contributors)
- [License](#License)

## Installation

As a node.js module

```shell
$ npm install @ncardez/is
```

## API

```js
const is = require('@ncardez/is');
```

## Test

```shell
npm run test
```

### object
- ``is.object`` (value``: object``) ``:boolean``

```js
  // Example:

  expect(is.object({})).toBe(true);
```

### null
- ``is.null`` (value``: null``) ``:boolean``

```js
  // Example:

  expect(is.null(null)).toBe(true);
```

### undefined
- ``is.undefined`` (value``: undefined``)``: boolean``

```js
  // Example:

  expect(is.undefined()).toBe(true);

  expect(is.undefined(undefined)).toBe(true);
```

### number
- ``is.number`` (value``: number|string``, parse``: boolean``)``: boolean``
  
```js
  // Example:

  expect(is.number(12)).toBe(true);

  expect(is.number(-23)).toBe(true);

  expect(is.number('13', true)).toBe(true);
```

### array
- ``is.array`` (value``: array``)``: boolean``

```js
  // Example:

  expect(is.array([])).toBe(true);
```

### string
- ``is.string`` (value``: string``)``: boolean``

```js
  // Example:

  expect(is.string('')).toBe(true);
```

### boolean
- ``is.boolean`` (value``: boolean|string``, parse``: boolean``)``: boolean``

```js
  // Example:

  expect(is.boolean(true)).toBe(true);
  
  expect(is.boolean(false)).toBe(true);

  expect(is.boolean('true', true)).toBe(true);

  expect(is.boolean('false', true)).toBe(true);
```

### uuid
- ``is.uuid`` (value`: string`, version`: string`)``: boolean``

  value: must be a valid UUID.

  version:  `'v1'|'v2'|'v3'|'v4'|'v5'`

```js
// Example:

expect(is.uuid('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'v4')).toBe(true);
```

### integer
- ``is.integer`` (value``: number|string``)``: boolean``

```js
// Example:

expect(is.integer(23)).toBe(true);

expect(is.integer('43')).toBe(true);
```

### float
- ``is.float`` (value``: number|string``)``: boolean``

```js
// Example:
expect(is.float(.23)).toBe(true);

expect(is.float('2.43')).toBe(true);
```

### positive
- ``is.positive`` (value``: number|string``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.positive(23)).toBe(true);

expect(is.positive('2.43')).toBe(true);
```

### negative
- ``is.negative`` (value``: number|string``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.negative(-23)).toBe(true);

expect(is.negative('-2.43')).toBe(true);
```

### zero
- ``is.zero`` (value``: number|string``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.zero(0)).toBe(true);

expect(is.zero('0')).toBe(true);
```

### between
- ``is.between`` (min``: number|string|date``, max``: number|string|date``, value``: number|string|date``, parse``: boolean``)``: boolean``

```js
// Example:

expect(is.between(0, 10, 5)).toBe(true);
expect(is.between('0', '6', '2')).toBe(true);
expect(is.between('2010-02-01', '2010-02-20', '2010-02-10')).toBe(true);
expect(is.between(new Date('2010-02-01'), new Date('2010-02-20'), new Date('2010-02-10'))).toBe(true);
```

### alpha
- ``is.alpha`` (value``: string``)``: boolean``

```js
// Example:

expect(is.zero('aknd23')).toBe(true);

expect(is.zero('0ksjdn =13')).toBe(false);
```

### digit
- ``is.digit`` (value``: number|string``)``: boolean``

```js
// Example
expect(is.zero('2')).toBe(true);

expect(is.zero(3)).toBe(true);
```

### function
- ``is.function`` (value``: function``)``: boolean``

```js
// Example:

expect(is.function(() => {})).toBe(true);

expect(is.function(function() {})).toBe(true);
```

### asyncFunction
- ``is.asyncFunction`` (value``: Async Function``)``: boolean``

```js
// Example:

expect(is.asyncFunction(async () => {})).toBe(true);

expect(is.asyncFunction(async function() {})).toBe(true);
```

### promise
- ``is.promise`` (value``: Promise``)``: boolean``

```js
// Example:

expect(is.promise(Promise.resolve(2))).toBe(true);
```

### empty
- ``is.empty`` (value``: string|array|object|function``)``: boolean``

```js
// Example:

expect(is.promise('')).toBe(true);

expect(is.promise([])).toBe(true);

expect(is.promise({})).toBe(true);

expect(is.promise(() => {})).toBe(true);

expect(is.promise(function () {})).toBe(true);
```

### regexp
- ``is.regexp`` (value``: RegExp``)``: boolean``

```js
// Example:

expect(is.regexp(/\d/)).toBe(true);
```

### ip
- ``is.ip`` (value``: string``)``: boolean``

```js
// Example:

expect(is.ip('192.168.0.1')).toBe(true);
```

### port
- ``is.port`` (value``: number``)``: boolean``

```js
// Example:

expect(is.port(8080)).toBe(true);
```

### date
- ``is.date`` (value``: string``)``: boolean``

```js
// Example:

expect(is.date('2010-02-03')).toBe(true);
```

### time
- ``is.time`` (value``: string``)``: boolean``

```js
// Example:

expect(is.time('03:20:14')).toBe(true);
```

### dateTime
- ``is.dateTime`` (value``: string``)``: boolean``

```js
// Example:

expect(is.dateTime('2010-02-03 03:20:14')).toBe(true);
```

### dateISO
- ``is.dateISO`` (value``: string``)``: boolean``

```js
// Example:

expect(is.dateISO('2010-02-03 03:20:14.290z')).toBe(true);

expect(is.dateISO('2010-02-03 03:20:14')).toBe(true);

expect(is.dateISO('2010-02-03T03:20:14')).toBe(true);

expect(is.dateISO('2010-02-03 03:20:14.290Z')).toBe(true);

expect(is.dateISO('2018-02-11T02:10:14.210Z')).toBe(true);
```

### dateInstance
- ``is.dateInstance`` (value``: Date``)``: boolean``

```js
// Example:

expect(is.dateInstance(new Date())).toBe(true);

expect(is.dateInstance(new Date('2018-02-11T02:10:14.210Z'))).toBe(true);
```

### dateValid
- ``is.dateValid`` (value``: Date``)``: boolean``

```js
// Example:

expect(is.dateValid('2010-02-03')).toBe(true);

expect(is.dateValid('2010-02-03 11:11:11')).toBe(true);

expect(is.dateValid('2010-02-03 11:11:11.000Z')).toBe(true);

expect(is.dateValid('2010-02-03T11:11:11.000Z')).toBe(true);

expect(is.dateValid(new Date())).toBe(true);

expect(is.dateValid(new Date(2020, 10, 12))).toBe(true);

expect(is.dateValid(new Date('2010-02-03'))).toBe(true);
```

### type
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

### error
- ``is.error`` (value``: Error``)``: boolean``

```js
// Example:

expect(is.error(new Error('Ouch!'))).toBe(true);

expect(is.error({ stack: 'aa', message: 'sss' })).toBe(true);
```

### jwt
- ``is.jwt`` (value``: string``)``: boolean``
- ``is.jsonwebtoken`` (value``: string``)``: boolean``

```js
// Example:

const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
  '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' +
  '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

expect(is.jwt(token)).toBe(true);

expect(is.jsonwebtoken(token)).toBe(true);
```

## Contributors

- Norman Carcamo <normancarcamo@gmail.com>

## License

© Norman Carcamo, Software Developer

Licensed under the [MIT](LICENSE).
