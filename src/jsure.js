// Utilities
// ---------

var partial = function (fun /* , args */) {
  var args = slice(arguments, 1);
  return function() {
    return fun.apply(this, args.concat(slice(arguments)));
  };
};

var slice = function (x, start, stop) {
  return Array.prototype.slice.call(x, start, stop);
};

var toString = function (x) {
  return Object.prototype.toString.call(x);
};

// Miscellaneous
// -------------

exports.validate = function (coll, x) {
  coll = exports.nil(coll) ? [] : coll;
  coll = Array.isArray(coll) ? coll : [coll];
  if (coll.some(Array.isArray)) {
    return coll.reduce(function (p, c) {
      return p.concat(p.some(exports.truthy) ? p : exports.validate(c, x));
    }, []).some(exports.truthy);
  } else {
    return coll.reduce(function (p, c) {
      return p.concat(p.some(exports.falsey) ? p : c(x));
    }, []).every(exports.truthy);
  }
};

// Predicates
// ----------

exports.array = function (itemPreds, arrayPreds) {
  return function (x) {
    return Array.isArray(x) &&
           exports.validate(arrayPreds, x) &&
           x.map(partial(exports.validate, itemPreds)).every(exports.truthy);
  };
};

exports.boolean = exports.bool = function (x) {
  return x === true || x === false || toString(x) === "[object Boolean]";
};

// TODO: Make polymorphic.
exports.empty = function (x) {
  return x.length === 0;
};

exports.falsey = function (x) {
  return x == null || x === false;
};

exports.function = exports.fun = function (x) {
  return toString(x) === "[object Function]";
};

exports.nil = function (x) {
  return x == null;
};

exports.number = function (x) {
  return toString(x) === "[object Number]";
};

exports.string = function (x) {
  return toString(x) === "[object String]";
};

exports.truthy = function (x) {
  return !exports.falsey(x);
};
