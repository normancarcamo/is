function $object(x) {
  if (Object.prototype.toString.call(x) === "[object Object]") {
    return true;
  } else {
    if ((x === null && typeof x === 'object') ||
    (x === undefined && typeof x === 'undefined')) {
      return false;
    } else {
      var prototype = Object.getPrototypeOf(x)
      return prototype === null || prototype === Object.prototype;
    }
  }
}

function $null(x) {
  return x === null && typeof x === 'object';
}

function $undefined(x) {
  return x === undefined && typeof x === 'undefined';
}

function $number(x) {
  if (arguments.length > 1) {
    if (typeof arguments[1] === 'boolean') {
      if (arguments[1]) {
        return typeof x === 'number' || 
          /^(\-?)(\.?|[0-9]+\.?)[0-9]+$/gmi.test(x);
      }
    }
  }

  return typeof x === 'number';
}

function $array(x) {
  return Object.prototype.toString.call(x) === "[object Array]" || 
    Array.isArray(x);
}

function $string(x) {
  return typeof x === 'string';
}

function $boolean(x, y) {
  return typeof x === 'boolean' || !!(y && /^(false|true)$/.test(x));
}

function $uuid(x, y) {
  var versions = [
    /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v1
    /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v2
    /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v3
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v4
    /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i  // v5
  ];

  if (y) {
    if (y === 'v1' && versions[0].test(x)) {
      return true;
    }
    if (y === 'v2' && versions[1].test(x)) {
      return true;
    }
    if (y === 'v3' && versions[2].test(x)) {
      return true;
    }
    if (y === 'v4' && versions[3].test(x)) {
      return true;
    }
    if (y === 'v5' && versions[4].test(x)) {
      return true;
    }
  } else {
    for (var i = 0; i < versions.length; i++) {
      if (versions[i].test(x)) {
        return true;
      }
    }
  }

  return false;
}

function $integer(x) {
  return /^([0-9]|\-[0-9])+$/g.test(x);
}

function $float(x) {
  return /(^[0-9]+|^\-[0-9]+)?\.+[0-9]+$/.test(x);
}

function $positive(x, y) {
  return $number(x, y) && x > 0;
}

function $negative(x, y) {
  return $number(x, y) && x < 0;
}

function $zero(x, y) {
  return $number(x, y) && x == 0;
}

function $alpha(x) {
  if (!!x && typeof x == 'string') {
    return /^([a-z]|[0-9])+([a-z]|[0-9])?$/gmi.test(x);
  }
  return false;
}

function $digit(x) {
  return /^\d$/.test(x);
}

function $function(x) {
  return Object.prototype.toString.call(x) === "[object Function]";
}

function $async_function(x) {
  if (x && !(x instanceof Promise)) {
    if (x.constructor && x.constructor.name === 'AsyncFunction') {
      return true;
    }
  }
  return false;
}

function $promise(x) {
  if (x && x instanceof Promise) {
    return true;
  } else {
    return false;
  }
}

function $empty(x) {
  if ($undefined(x, true) || !arguments.length) {
    return false;
  }

  if ($function(x, true)) {
    var start = x.toString().search(/\{/i) + 1;
    var content = x.toString().substr(start).trim();
    var end = content.search(/\}$/g) - 1;
    return !content.substr(0, end).length;
  }

  if ($array(x, true)) {
    return x.length === 0;
  } else if ($object(x, true)) {
    return Object.keys(x).length === 0;
  } else if ($string(x, true)) {
    return x.length === 0;
  }  else {
    return false;
  }
}

function $regexp(x) {
  return (
    x instanceof RegExp ||
    Object.prototype.toString.call(x) === '[object RegExp]'
  );
}

function $ip(x) {
  if ($string(x)) {
    var parts = x.split('.').map(x => x >= 0 && x <= 255);
    if (parts.length === 4) {
      return parts.indexOf(false) < 0;
    }
  }
  return false;
}

function $port(x) {
  return !!x && typeof x == 'number' && x > 0 && x <= 65535;
}

function $between(min, max, val, parse) {
  if ($number(min, parse) && $number(max, parse) && $number(val, parse)) {
    return val >= min && val <= max;
  }

  if ($string(min) && $string(max) && $string(val)) {
    return val >= min && val <= max;
  }

  if ($date.valid(min) && $date.valid(max) && $date.valid(val)) {
    return val >= min && val <= max;
  }

  return false;
}

function $date(x) {
  return $date.valid(x);
}

$date.only = function(x) {
  var y = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/;
  var m = /([0-0][1-9]|[1-1][0-2])/;
  var d = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/;
  var date = new RegExp(`${y.source}(\/|\-)${m.source}(\/|\-)${d.source}`);
  var regexp = new RegExp(`^${date.source}$`);
  return regexp.test(x);
};

$date.time = function(x) {
  var y = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/;
  var m = /([0-0][1-9]|[1-1][0-2])/;
  var d = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/;
  var date = new RegExp(`${y.source}(\/|\-)${m.source}(\/|\-)${d.source}`);

  var sp = /\s/;
  var hh = /([0-1][0-9]|[2-2][0-3])/;
  var mm = /([0-5][0-9])/;
  var ss = /([0-5][0-9])/;
  var time = new RegExp(`${hh.source}\:${mm.source}(\:${ss.source})?`);

  return new RegExp(`^${date.source}${sp.source}${time.source}$`).test(x);
};

$date.time.only = function(x) {
  var hh = /([0-1][0-9]|[2-2][0-3])/;
  var mm = /([0-5][0-9])/;
  var ss = /([0-5][0-9])/;
  var time = new RegExp(`^${hh.source}\:${mm.source}(\:${ss.source})?$`);
  return time.test(x);
};

$date.iso = function(x) {
  var y = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/;
  var m = /([0-0][1-9]|[1-1][0-2])/;
  var d = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/;
  var date = new RegExp(`${y.source}(\/|\-)${m.source}(\/|\-)${d.source}`);

  var sp = /(\s|\T)/;
  var hh = /([0-1][0-9]|[2-2][0-3])/;
  var mm = /([0-5][0-9])/;
  var ss = /([0-5][0-9])/;

  var e = /(\.(\d{3,3}(z|Z?)))/
  var time = new RegExp(
    `${hh.source}\:${mm.source}(\:${ss.source}${e.source})?`
  );

  var regexp = new RegExp(`^${date.source}${sp.source}(${time.source})?$`);

  return regexp.test(x);
};

$date.instance = function(x) {
  var res = Object.prototype.toString.call(x) === "[object Date]" && !isNaN(x);
  return (x && res) || (x instanceof Date);
};

$date.valid = function(x) {
  if (!!x && typeof x == 'string') {
    return !isNaN(new Date(x).getDate());
  } else {
    return $date.instance(x) || $date.iso(x) || $date.only(x) || $date.time(x);
  }
}

function $type(x, y) {
  // The order matters because in "date" type it also checks string,
  // so it is used before the "string" type to avoid inconvients.
  if ($number(x, y)) return 'number';
  if ($boolean(x, y)) return 'boolean';
  if ($object(x)) return 'object';
  if ($array(x)) return 'array';
  if ($null(x)) return 'null';
  if ($undefined(x)) return 'undefined';
  if ($regexp(x)) return 'regexp';
  if ($date.instance(x)) return 'date';
  if ($string(x)) return 'string';
  if ($function(x) || $async_function(x)) return 'function';
  return 'unknown';
}

module.exports = {
  object: $object,
  null: $null,
  undefined: $undefined,
  number: $number,
  array: $array,
  string: $string,
  boolean: $boolean,
  uuid: $uuid,
  integer: $integer,
  float: $float,
  positive: $positive,
  negative: $negative,
  zero: $zero,
  function: $function,
  async_function: $async_function,
  promise: $promise,
  empty: $empty,
  regexp: $regexp,
  date: $date,
  type: $type,
  digit: $digit,
  alpha: $alpha,
  port: $port,
  ip: $ip,
  between: $between,
};
