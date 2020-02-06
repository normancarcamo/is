type tBetween = number | string | Date | any;

class Is {
  object(value?: any): boolean {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      return true;
    } else {
      if (
        (value === null && typeof value === 'object') ||
        (value === undefined && typeof value === 'undefined')
      ) {
        return false;
      } else {
        const prototype = Object.getPrototypeOf(value);
        return prototype === null || prototype === Object.prototype;
      }
    }
  }

  null(value?: any): boolean {
    return value === null && typeof value === 'object';
  }

  undefined(value?: any): boolean {
    return value === undefined && typeof value === 'undefined';
  }

  number(value?: any, parse?: boolean): boolean {
    if (parse) {
      return (
        typeof value === 'number' ||
        /^(\-?)(\.?|[0-9]+\.?)[0-9]+/gim.test(value)
      );
    } else {
      return typeof value === 'number';
    }
  }

  array(value?: any): boolean {
    const prototype: string = Object.prototype.toString.call(value);
    return prototype === '[object Array]' || Array.isArray(value);
  }

  string(value?: any): boolean {
    return typeof value === 'string';
  }

  boolean(value?: any, parse?: boolean): boolean {
    return (
      typeof value === 'boolean' || !!(parse && /^(false|true)/.test(value))
    );
  }

  uuid(value?: any, version?: string): boolean {
    const versions = [
      /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v1
      /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v2
      /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v3
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v4
      /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, // v5
    ];

    if (version) {
      if (version === 'v1' && versions[0].test(value)) {
        return true;
      }
      if (version === 'v2' && versions[1].test(value)) {
        return true;
      }
      if (version === 'v3' && versions[2].test(value)) {
        return true;
      }
      if (version === 'v4' && versions[3].test(value)) {
        return true;
      }
      if (version === 'v5' && versions[4].test(value)) {
        return true;
      }
    } else {
      for (const v of versions) {
        if (v.test(value)) {
          return true;
        }
      }
    }

    return false;
  }

  integer(value?: any): boolean {
    return /^([0-9]|\-[0-9])+$/g.test(value as string);
  }

  float(value?: any): boolean {
    return /(^[0-9]+|^\-[0-9]+)?\.+[0-9]+/.test(value as string);
  }

  positive(value?: any, parse?: boolean): boolean {
    return this.number(value, parse) && value > 0;
  }

  negative(value?: any, parse?: boolean): boolean {
    return this.number(value, parse) && value < 0;
  }

  zero(value?: any, parse?: boolean): boolean {
    return this.number(value, parse) && Number(value) === 0;
  }

  alpha(value?: any): boolean {
    if (!!value && typeof value === 'string') {
      return /^([a-z]|[0-9])+([a-z]|[0-9])?$/gim.test(value);
    }
    return false;
  }

  digit(value?: any): boolean {
    return /^\d{1,1}$/.test(value);
  }

  function(value?: any): boolean {
    return Object.prototype.toString.call(value) === '[object Function]';
  }

  asyncFunction(value?: any): boolean {
    if (value && !(value instanceof Promise)) {
      if (value.constructor && value.constructor.name === 'AsyncFunction') {
        return true;
      }
    }
    return false;
  }

  promise(value?: any): boolean {
    if (value && value instanceof Promise) {
      return true;
    } else {
      return false;
    }
  }

  empty(value?: any): boolean {
    if (this.undefined(value) || !arguments.length) {
      return false;
    }

    if (this.function(value)) {
      const start = value.toString().search(/\{/i) + 1;
      const content = value
        .toString()
        .substr(start)
        .trim();
      const end = content.search(/\}/g) - 1;
      return !content.substr(0, end).length;
    }

    if (this.array(value)) {
      return value.length === 0;
    } else if (this.object(value)) {
      return Object.keys(value).length === 0;
    } else if (this.string(value)) {
      return value.length === 0;
    } else {
      return false;
    }
  }

  regexp(value?: any): boolean {
    return (
      value instanceof RegExp ||
      Object.prototype.toString.call(value) === '[object RegExp]'
    );
  }

  ip(value?: any): boolean {
    if (this.string(value)) {
      const parts = value.split('.').map((x: number) => x >= 0 && x <= 255);
      if (parts.length === 4) {
        return parts.indexOf(false) < 0;
      }
    }
    return false;
  }

  port(value?: any): boolean {
    return !!value && typeof value === 'number' && value > 0 && value <= 65535;
  }

  between(
    min?: tBetween,
    max?: tBetween,
    val?: tBetween,
    parse?: boolean,
  ): boolean {
    if (
      this.number(min, parse) &&
      this.number(max, parse) &&
      this.number(val, parse)
    ) {
      return val >= min && val <= max;
    }

    if (this.string(min) && this.string(max) && this.string(val)) {
      return val >= min && val <= max;
    }

    if (this.dateValid(min) && this.dateValid(max) && this.dateValid(val)) {
      return val >= min && val <= max;
    }

    return false;
  }

  date(value?: any): boolean {
    const y: string = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/.source;
    const m: string = /([0-0][1-9]|[1-1][0-2])/.source;
    const d: string = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/.source;
    return new RegExp(`^${y}(\/|\-)${m}(\/|\-)${d}$`).test(value);
  }

  time(value?: any): boolean {
    const hh: string = /([0-1][0-9]|[2-2][0-3])/.source;
    const mm: string = /([0-5][0-9])/.source;
    const ss: string = /([0-5][0-9])/.source;
    return new RegExp(`^${hh}\:${mm}(\:${ss})?$`).test(value);
  }

  dateTime(value?: any): boolean {
    const y: string = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/.source;
    const m: string = /([0-0][1-9]|[1-1][0-2])/.source;
    const d: string = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/.source;
    const date: string = new RegExp(`${y}(\/|\-)${m}(\/|\-)${d}`).source;

    const hh: string = /([0-1][0-9]|[2-2][0-3])/.source;
    const mm: string = /([0-5][0-9])/.source;
    const ss: string = /([0-5][0-9])/.source;
    const time: string = new RegExp(`${hh}\:${mm}\:${ss}`).source;

    return new RegExp(`^${date}(\ |\T)${time}$`).test(value);
  }

  dateISO(value?: any): boolean {
    const y: string = /([1-1][9-9][7-9][0-9]|[2-2][0-9][0-9][0-9])/.source;
    const m: string = /([0-0][1-9]|[1-1][0-2])/.source;
    const d: string = /([0-0][1-9]|[1-1][0-9]|[2-2][0-9]|[3-3][0-1])/.source;
    const date: string = new RegExp(`${y}(\/|\-)${m}(\/|\-)${d}`).source;

    const hh: string = /([0-1][0-9]|[2-2][0-3])/.source;
    const mm: string = /([0-5][0-9])/.source;
    const ss: string = /([0-5][0-9])/.source;

    const suffix: string = /(\.\d{3,3}(z|Z))?/.source;
    const time: string = new RegExp(`${hh}\:${mm}\:${ss}${suffix}`).source;

    return new RegExp(`^${date}(\ |\T)${time}$`).test(value);
  }

  dateInstance(value?: any): boolean {
    const prototype: string = Object.prototype.toString.call(value);
    const res: boolean = prototype === '[object Date]' && !isNaN(value);
    return (value && res) || value instanceof Date;
  }

  dateValid(value?: any): boolean {
    if (!!value && typeof value === 'string') {
      return !isNaN(new Date(value).getDate());
    } else {
      return (
        this.dateInstance(value) ||
        this.dateISO(value) ||
        this.date(value) ||
        this.dateTime(value)
      );
    }
  }

  type(value?: any, parse?: boolean): string {
    // The order matters because in "date" type it also checks string,
    // so it is used before the "string" type to avoid inconvients.
    if (this.number(value, parse)) return 'number';
    if (this.boolean(value, parse)) return 'boolean';
    if (this.object(value)) return 'object';
    if (this.array(value)) return 'array';
    if (this.null(value)) return 'null';
    if (this.undefined(value)) return 'undefined';
    if (this.regexp(value)) return 'regexp';
    if (this.dateInstance(value)) return 'date';
    if (this.string(value)) return 'string';
    if (this.function(value)) return 'function';
    return 'unknown';
  }

  error(value?: any): boolean {
    if (Object.prototype.toString.call(value) === '[object Error]') {
      return true;
    }

    if (value && value.stack && value.message) {
      if (
        typeof value.stack === 'string' &&
        typeof value.message === 'string'
      ) {
        return true;
      }
    }

    return false;
  }

  jwt(value?: string|any): boolean {
    if (this.string(value) && 
    !this.empty(value) && 
    value.includes('.') && 
    value.match(/\./g).length === 2) {
      const groups = value.split('.');
      if (this.array(groups) && !this.empty(groups) && groups.length === 3) {
        if (value.length > 100) {
          return true;
        }
      }
    }

    return false;
  }

  // Aliases:
  jsonwebtoken = this.jwt;
}

export default new Is();
