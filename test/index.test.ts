import is from '../src/index';

describe('is', () => {
  it('should be a javascript object literal', () => {
    expect(is).toBeObject();
  });
  
  describe('object', () => {
    it('should be a function', () => {
      expect(is.object).toBeFunction();
    });
    it('should be true when value is a javascript object literal', () => {
      expect(is.object({})).toBe(true);
    });
    it('should be false when value is not a javascript object literal', () => {
      [
        "{}",
        [],
        1,
        0,
        -1,
        [{}],
        function(){},
        () => {},
        true,
        false,
        /\d/g,
        null,
        undefined
      ].forEach(value => expect(is.object(value)).toBe(false));
    });
  });

  describe('null', () => {
    it('should be a function', () => {
      expect(is.null).toBeFunction();
    });
    it('should be true when value is null', () => {
      expect(is.null(null)).toBe(true);
    });
    it('should be false when value is not null', () => {
      [
        "{}",
        [],
        1,
        0,
        -1,
        [{}],
        function(){},
        () => {},
        true,
        false,
        /\d/g,
        undefined
      ].forEach(value => expect(is.null(value)).toBe(false));
    });
  });

  describe('undefined', () => {
    it('should be a function', () => {
      expect(is.undefined).toBeFunction();
    });
    it('should be true when value is undefined', () => {
      expect(is.undefined(undefined)).toBe(true);
    });
    it('should be false when value is not undefined', () => {
      [
        "{}",
        [],
        1,
        0,
        -1,
        [{}],
        function(){},
        () => {},
        true,
        false,
        /\d/g,
        null
      ].forEach(value => expect(is.undefined(value)).toBe(false));
    });
  });

  describe('number', () => {
    it('should be a function', () => {
      expect(is.number).toBeFunction();
    });
    it('should be true when value is a number', () => {
      expect(is.number(12)).toBe(true);
      expect(is.number(-23)).toBe(true);
    });
    it('should be true when value is a string number and regexp expects true', () => {
      expect(is.number('13', true)).toBe(true);
    });
    it('should be true when value is a number but regexp expects false', () => {
      expect(is.number(13, false)).toBe(true);
    });
    it('should be true when value is a number but regexp expects true', () => {
      expect(is.number(13, true)).toBe(true);
    });
    it('should be false when value is a string number but regexp expects false', () => {
      expect(is.number('13', false)).toBe(false);
    });
    it('should be false when value is not a valid number', () => {
      [
        "{}",
        [],
        '1',
        [{}],
        function(){},
        () => {},
        true,
        false,
        /\d/g,
        null,
        undefined
      ].forEach(value => expect(is.number(value)).toBe(false));
    });
  });

  describe('array', () => {
    it('should be a function', () => {
      expect(is.array).toBeFunction();
    });
    it('should be true when value is an array', () => {
      expect(is.array([])).toBe(true);
    });
    it('should be false when value is not an array', () => {
      [
        "{}",
        '1',
        function(){},
        () => {},
        true,
        false,
        /\d/g,
        null,
        undefined,
        1,
        -1,
        0,
        {}
      ].forEach(value => expect(is.array(value)).toBe(false));
    });
  });

  describe('string', () => {
    it('should be a function', () => {
      expect(is.string).toBeFunction();
    });
    it('should be true when value is string', () => {
      expect(is.string('')).toBe(true);
    });
    it('should be false when value is not string', () => {
      [
        function(){},
        () => {},
        true,
        false,
        /\d/g,
        null,
        undefined,
        1,
        -1,
        0,
        {},
        []
      ].forEach(value => expect(is.string(value)).toBe(false));
    });
  });

  describe('boolean', () => {
    it('should be a function', () => {
      expect(is.boolean).toBeFunction();
    });
    it('should be true when value is boolean', () => {
      expect(is.boolean(true)).toBe(true);
      expect(is.boolean(false)).toBe(true);
    });
    it('should be true when value is string boolean but parse option is true', () => {
      expect(is.boolean('true', true)).toBe(true);
      expect(is.boolean('false', true)).toBe(true);
    });
    it('should be false when value is string boolean but parse option is false', () => {
      expect(is.boolean('true', false)).toBe(false);
      expect(is.boolean('false', false)).toBe(false);
    });
    it('should be false when value is not boolean', () => {
      [
        function(){},
        () => {},
        /\d/g,
        null,
        undefined,
        1,
        -1,
        0,
        {},
        [],
        'true',
        'false'
      ].forEach(value => expect(is.boolean(value)).toBe(false));
    });
  });

  describe('uuid', () => {
    it('should be a function', () => {
      expect(is.uuid).toBeFunction();
    });
    it('should be true when value is a valid uuid', () => {
      expect(is.uuid('df54c626-4797-11ea-b77f-2e728ce88125', 'v1')).toBe(true);
      expect(is.uuid('df54c626-4797-21ea-b77f-2e728ce88125', 'v2')).toBe(true);
      expect(is.uuid('9125a8dc-52ee-365b-a5aa-81b0b3681cf6', 'v3')).toBe(true);
      expect(is.uuid('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'v4')).toBe(true);
      expect(is.uuid('fdda765f-fc57-5604-a269-52a7df8164ec', 'v5')).toBe(true);

      // automatic version guess:
      expect(is.uuid('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed')).toBe(true);
    });
    it('should be false when value is not a valid uuid', () => {
      const values = [
        function(){},
        () => {},
        /\d/g,
        null,
        undefined,
        1,
        -1,
        0,
        {},
        [],
        'true',
        'false',
        true,
        false,
        '1',
        '-2',
        '0',
        '9125a8dc-52ee-365b-a5aa-81b0b3681cf6$$$$$$',
        '9125a8dc-52ee-365b-a5aa6$$$$$$',
        '9125a8dc-52ee- -a5aa6$$$$$$',
        '9125a8dc-52ee- -a5aa6',
        '9125a8dc-52ee-365b-a5aa-81b0b3681cf'
      ];

      values.forEach(value => expect(is.uuid(value, 'v1')).toBe(false));
      values.forEach(value => expect(is.uuid(value, 'v3')).toBe(false));
      values.forEach(value => expect(is.uuid(value, 'v4')).toBe(false));
      values.forEach(value => expect(is.uuid(value, 'v5')).toBe(false));
      values.forEach(value => expect(is.uuid(value)).toBe(false));
    });
  });

  describe('integer', () => {
    it('should be a function', () => {
      expect(is.integer).toBeFunction();
    });
    it('should be true when value is a valid integer', () => {
      expect(is.integer(65)).toBe(true);
      expect(is.integer(-65)).toBe(true);
      expect(is.integer(0)).toBe(true);
      expect(is.integer('0')).toBe(true);
      expect(is.integer('65')).toBe(true);
      expect(is.integer('-65')).toBe(true);
    });
    it('should be false when value is not a valid integer', () => {
      [
        function(){},
        () => {},
        /\d/g,
        null,
        undefined,
        1.23,
        -1.2,
        0.3,
        '1.23',
        '-1.2',
        '0.3',
        {},
        [],
        'true',
        'false',
        true,
        false
      ].forEach(value => expect(is.integer(value)).toBe(false));
    });
  });

  describe('float', () => {
    it('should be a function', () => {
      expect(is.float).toBeFunction();
    });
    it('should be true when value is a valid float', () => {
      expect(is.float(.65)).toBe(true);
      expect(is.float(-.65)).toBe(true);
      expect(is.float(0.2)).toBe(true);
      expect(is.float('.3')).toBe(true);
      expect(is.float('.65')).toBe(true);
      expect(is.float('-.65')).toBe(true);
    });
    it('should be false when value is not a valid float', () => {
      [
        function(){},
        () => {},
        /\d/g,
        null,
        undefined,
        1,
        -1,
        0,
        '1',
        '-1',
        '0',
        {},
        [],
        'true',
        'false',
        true,
        false
      ].forEach(value => expect(is.float(value)).toBe(false));
    });
  });

  describe('positive', () => {
    it('should be a function', () => {
      expect(is.positive).toBeFunction();
    });
    it('should be true when value is a valid positive', () => {
      expect(is.positive(.65)).toBe(true);
      expect(is.positive(5)).toBe(true);
      expect(is.positive(0.2)).toBe(true);
      expect(is.positive('.3', true)).toBe(true);
      expect(is.positive('.65', true)).toBe(true);
    });
    it('should be false when value is not a valid positive', () => {
      [
        function(){},
        () => {},
        /\d/g,
        null,
        undefined,
        -1,
        0,
        '-1',
        '0',
        {},
        [],
        'true',
        'false',
        true,
        false
      ].forEach(value => expect(is.positive(value)).toBe(false));
    });
  });

  describe('negative', () => {
    it('should be a function', () => {
      expect(is.negative).toBeFunction();
    });
    it('should be true when value is a valid negative', () => {
      expect(is.negative(-.65)).toBe(true);
      expect(is.negative(-5)).toBe(true);
      expect(is.negative(-0.2)).toBe(true);
      expect(is.negative('-.3', true)).toBe(true);
      expect(is.negative('-.65', true)).toBe(true);
    });
    it('should be false when value is not a valid negative', () => {
      [
        function() {},
        () => {},
        /\d/g,
        null,
        undefined,
        1,
        0,
        '1',
        '0',
        {},
        [],
        'true',
        'false',
        true,
        false
      ].forEach(value => expect(is.negative(value)).toBe(false));
    });
  });

  describe('zero', () => {
    it('should be a function', () => {
      expect(is.zero).toBeFunction();
    });
    it('should be true when value is a valid zero', () => {
      expect(is.zero(0)).toBe(true);
      expect(is.zero('0', true)).toBe(true);
    });
    it('should be false when value is not a valid zero', () => {
      [
        function() {},
        () => {},
        /\d/g,
        null,
        undefined,
        1,
        1.3,
        -1,
        -1.3,
        -0.3,
        '1',
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        {},
        [],
        'true',
        'false',
        true,
        false
      ].forEach(value => expect(is.zero(value)).toBe(false));
    });
  });

  describe('alpha', () => {
    it('should be a function', () => {
      expect(is.alpha).toBeFunction();
    });
    it('should be true when value is a valid alpha', () => {
      expect(is.alpha('kj23')).toBe(true);
    });
    it('should be false when value is not a valid alpha', () => {
      [
        function() {},
        () => {},
        /\d/g,
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        {},
        [],
        true,
        false
      ].forEach(value => expect(is.alpha(value)).toBe(false));
    });
  });

  describe('digit', () => {
    it('should be a function', () => {
      expect(is.digit).toBeFunction();
    });
    it('should be true when value is a valid digit', () => {
      expect(is.digit('2')).toBe(true);
      expect(is.digit(3)).toBe(true);
    });
    it('should be false when value is not a valid digit', () => {
      [
        function() {},
        () => {},
        /\d/g,
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        '43',
        '-43',
        {},
        [],
        true,
        false
      ].forEach(value => expect(is.digit(value)).toBe(false));
    });
  });

  describe('function', () => {
    it('should be a function', () => {
      expect(is.function).toBeFunction();
    });
    it('should be true when value is a valid function', () => {
      expect(is.function(() => {})).toBe(true);
      expect(is.function(function() {})).toBe(true);
    });
    it('should be false when value is not a valid function', () => {
      [
        /\d/g,
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        '43',
        '-43',
        {},
        [],
        true,
        false
      ].forEach(value => expect(is.function(value)).toBe(false));
    });
  });

  describe('promise', () => {
    it('should be a promise', () => {
      expect(is.promise).toBeFunction();
    });
    it('should be true when value is a valid promise', () => {
      expect(is.promise(Promise.resolve(2))).toBe(true);
    });
    it('should be false when value is not a valid promise', () => {
      [
        /\d/g,
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        '43',
        '-43',
        {},
        [],
        true,
        false,
        () => {},
        function() {}
      ].forEach(value => expect(is.promise(value)).toBe(false));
    });
  });

  describe('empty', () => {
    it('should be a empty', () => {
      expect(is.empty).toBeFunction();
    });
    it('should be true when value is a valid empty', () => {
      expect(is.empty( () => {} )).toBe(true);
      expect(is.empty( function() {} )).toBe(true);
      expect(is.empty( {} )).toBe(true);
      expect(is.empty( [] )).toBe(true);
      expect(is.empty( '' )).toBe(true);
    });
    it('should be false when value is not a valid empty', () => {
      [
        /\d/g,
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        '43',
        '-43',
        {a: true},
        [23],
        true,
        false,
        () => { let x = 2; },
        function() { let y = 5; },
      ].forEach(value => expect(is.empty(value)).toBe(false));
    });
  });

  describe('regexp', () => {
    it('should be a regexp', () => {
      expect(is.regexp).toBeFunction();
    });
    it('should be true when value is a valid regexp', () => {
      expect(is.regexp(/\d/)).toBe(true);
    });
    it('should be false when value is not a valid regexp', () => {
      [
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        '43',
        '-43',
        {},
        [],
        true,
        false,
        () => {},
        function() {}
      ].forEach(value => expect(is.regexp(value)).toBe(false));
    });
  });

  describe('ip', () => {
    it('should be a function', () => {
      expect(is.ip).toBeFunction();
    });
    it('should be true when value is a valid ip', () => {
      expect(is.ip('192.168.0.1')).toBe(true);
    });
    it('should be false when value is not a valid ip', () => {
      [
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '-1',
        '-1.3',
        '0.3',
        '43',
        '-43',
        {},
        [],
        true,
        false,
        () => {},
        function() {}
      ].forEach(value => expect(is.ip(value)).toBe(false));
    });
  });

  describe('port', () => {
    it('should be a function', () => {
      expect(is.port).toBeFunction();
    });
    it('should be true when value is a valid port', () => {
      expect(is.port(2334)).toBe(true);
    });
    it('should be false when value is not a valid port', () => {
      [
        null,
        undefined,
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '0.3',
        '43',
        '-1',
        '-1.3',
        '-43',
        {},
        [],
        true,
        false,
        () => {},
        function() {},
        65536,
        '65536',
      ].forEach(value => expect(is.port(value)).toBe(false));
    });
  });

  describe('date', () => {
    it('should be a function', () => {
      expect(is.date).toBeFunction();
    });
    it('should be true when is a valid date', () => {
      expect(is.date('2010-02-03')).toBe(true);
    });
    it('should be false when is not a valid date', () => {
      [
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '0.3',
        '43',
        '-1',
        '-1.3',
        '-43',
        '65536',
        Date.now(),
        null,
        undefined,
        {},
        [],
        true,
        false,
        () => {},
        function() {},
        65536,
        '2010-02-03 03:20:14'
      ].forEach(value => expect(is.date(value)).toBe(false));
    });
  });

  describe('time', () => {
    it('should be a function', () => {
      expect(is.time).toBeFunction();
    });
    it('should be true when is a valid date', () => {
      expect(is.time('03:20:14')).toBe(true);
    });
    it('should be false when is not a valid date', () => {
      [
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '0.3',
        '43',
        '-1',
        '-1.3',
        '-43',
        '65536',
        Date.now(),
        null,
        undefined,
        {},
        [],
        true,
        false,
        () => {},
        function() {},
        65536,
        '2010-02-03',
        '2010-02-03 12:23:21',
      ].forEach(value => expect(is.time(value)).toBe(false));
    });
  });

  describe('dateTime', () => {
    it('should be a function', () => {
      expect(is.dateTime).toBeFunction();
    });
    it('should be true when is a valid date', () => {
      expect(is.dateTime('2010-02-03 03:20:14')).toBe(true);
    });
    it('should be false when is not a valid date', () => {
      [
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '0.3',
        '43',
        '-1',
        '-1.3',
        '-43',
        '65536',
        Date.now(),
        null,
        undefined,
        {},
        [],
        true,
        false,
        () => {},
        function() {},
        65536,
        '2010-02-03'
      ].forEach(value => expect(is.dateTime(value)).toBe(false));
    });
  });

  describe('dateISO', () => {
    it('should be a function', () => {
      expect(is.dateISO).toBeFunction();
    });
    it('should be true when is a valid date', () => {
      expect(is.dateISO('2010-02-03 03:20:14')).toBe(true);
      expect(is.dateISO('2010-02-03 03:20:14.290z')).toBe(true);
      expect(is.dateISO('2010-02-03 03:20:14.290Z')).toBe(true);
      expect(is.dateISO('2018-02-11T02:10:14.210Z')).toBe(true);
    });
    it('should be false when is not a valid date', () => {
      [
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '0.3',
        '43',
        '-1',
        '-1.3',
        '-43',
        '65536',
        Date.now(),
        null,
        undefined,
        {},
        [],
        true,
        false,
        () => {},
        function() {},
        65536,
        '2010-02-03',
        new Date().toString(),
      ].forEach(value => expect(is.dateISO(value)).toBe(false));
    });
  });

  describe('dateInstance', () => {
    it('should be a function', () => {
      expect(is.dateInstance).toBeFunction();
    });
    it('should be true when is a valid date', () => {
      expect(is.dateInstance(new Date())).toBe(true);
      expect(is.dateInstance(new Date('2018-02-11T02:10:14.210Z'))).toBe(true);
    });
    it('should be false when is not a valid date', () => {
      [
        '1.3d',
        'nw-1',
        -1.3,
        -0.3,
        '1.3',
        '0.3',
        '43',
        '-1',
        '-1.3',
        '-43',
        '65536',
        Date.now(),
        null,
        undefined,
        {},
        [],
        true,
        false,
        () => {},
        function() {},
        65536,
        '2010-02-03',
        '2010-02-03 12:11:12',
        '2010-02-03T12:11:12',
        new Date().toString()
      ].forEach(value => expect(is.dateInstance(value)).toBe(false));
    });
  });

  describe('dateValid', () => {
    it('should be a function', () => {
      expect(is.dateValid).toBeFunction();
    });
    it('should be true when value is a valid date', () => {
      expect(is.dateValid('2010-02-03')).toBe(true);
      expect(is.dateValid(new Date())).toBe(true);
      expect(is.dateValid(new Date(2020, 10, 12))).toBe(true);
      expect(is.dateValid(new Date('2010-02-03'))).toBe(true);
    });
    it('should be false when value is not a valid date', () => {
      [
        Date.now(),
        null,
        undefined,
        {},
        [],
        true,
        false,
        () => {},
        function() {},
        65536,
      ].forEach(value => expect(is.dateValid(value)).toBe(false));
    });
  });

  describe('type', () => {
    it('should be a function', () => {
      expect(is.type).toBeFunction();
    });
    it('should return "number" when a number is passed', () => {
      expect(is.type(3)).toEqual('number');
      expect(is.type(3.2)).toEqual('number');
      expect(is.type(-3.2)).toEqual('number');
      expect(is.type(0)).toEqual('number');
      expect(is.type(.2)).toEqual('number');
      expect(is.type('3', true)).toEqual('number');
      expect(is.type('3.2', true)).toEqual('number');
      expect(is.type('-3.2', true)).toEqual('number');
      expect(is.type('0', true)).toEqual('number');
      expect(is.type('.2', true)).toEqual('number');
      expect(is.type(3, true)).toEqual('number');
      expect(is.type(3.2, true)).toEqual('number');
      expect(is.type(-3.2, true)).toEqual('number');
      expect(is.type(0, true)).toEqual('number');
      expect(is.type(.2, true)).toEqual('number');
    });
    it('should return "boolean" when a valid boolean value is passed', () => {
      expect(is.type(true)).toEqual('boolean');
      expect(is.type(false)).toEqual('boolean');
      expect(is.type('true', true)).toEqual('boolean');
      expect(is.type('false', true)).toEqual('boolean');
      expect(is.type(true, true)).toEqual('boolean');
      expect(is.type(false, true)).toEqual('boolean');
      expect(is.type(true, false)).toEqual('boolean');
      expect(is.type(false, false)).toEqual('boolean');
    });
    it('should return "object" on valid javascript object literal', () => {
      expect(is.type({})).toEqual('object');
    });
    it('should return "array" on valid value', () => {
      expect(is.type([])).toEqual('array');
      expect(is.type([2,3,4,'2',{}])).toEqual('array');
    });
    it('should return "null" on valid value', () => {
      expect(is.type(null)).toEqual('null');
    });
    it('should return "undefined" on valid value', () => {
      expect(is.type()).toEqual('undefined');
      expect(is.type(undefined)).toEqual('undefined');
    });
    it('should return "regexp" on valid value', () => {
      expect(is.type(/\d/)).toEqual('regexp');
    });
    it('should return "date" on valid instance value', () => {
      expect(is.type(new Date())).toEqual('date');
    });
    it('should return "string" on valid value', () => {
      expect(is.type('djsnfkjsndfkjn')).toEqual('string');
    });
    it('should return "function" on valid value', () => {
      expect(is.type(function(){})).toEqual('function');
      expect(is.type(() => {})).toEqual('function');
      expect(is.type(async () => {})).toEqual('function');
    });
    it('should return "unknown" on invalid value', () => {
      expect(is.type(Symbol())).toEqual('unknown');
    });
  });

  describe('between', () => {
    it('should be a function', () => {
      expect(is.between).toBeFunction();
    });
    it('should return true when value is between min & max', () => {
      // using numbers:
      expect(is.between(10, 20, 14)).toBe(true);
      expect(is.between(110.23, 200.39, 114.1)).toBe(true);

      // using strings:
      expect(is.between('110.23', '200.39', '114.1')).toBe(true);
      expect(is.between('110.23', '200.39', '114.1', true)).toBe(true);
      expect(is.between('110.23', '200.39', '114.1', false)).toBe(true);

      // using dates:
      expect(is.between('2010-05-01', '2010-05-30', '2010-05-12')).toBe(true);
      expect(is.between('2010-05-01 10:00:00', '2010-05-30 12:00:00', '2010-05-12 11:00:00')).toBe(true);
      expect(is.between(new Date('2010-05-01'), new Date('2010-05-30'), new Date('2010-05-12'))).toBe(true);
      expect(is.between(new Date('2010-05-01').toISOString(), new Date('2010-05-30').toISOString(), new Date('2010-05-12').toISOString())).toBe(true);
    });
    it('should return false when value is not between min & max', () => {
      // using numbers:
      expect(is.between(10, 20, 23)).toBe(false);
      expect(is.between(110.23, 200.39, 214.1)).toBe(false);

      // using strings:
      expect(is.between('110.23', '200.39', '314.1')).toBe(false);
      expect(is.between('110.23', '200.39', '314.1', true)).toBe(false);
      expect(is.between('110.23', '200.39', '314.1', false)).toBe(false);

      // using dates:
      expect(is.between('2010-05-01', '2010-05-30', '2012-05-12')).toBe(false);
      expect(is.between('2010-05-01 10:00:00', '2010-05-30 12:00:00', '2013-05-12 11:00:00')).toBe(false);
      expect(is.between(new Date('2010-05-01'), new Date('2010-05-30'), new Date('2012-05-12'))).toBe(false);
      expect(is.between(new Date('2010-05-01').toISOString(), new Date('2013-05-30').toISOString(), new Date('2016-05-12').toISOString())).toBe(false);

      // unknown types:
      expect(is.between('dsjn', 'ndnnd', '314.1')).toBe(false);
      expect(is.between(true, false, [])).toBe(false);
    });
  });
});