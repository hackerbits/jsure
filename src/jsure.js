// Utilities
// ---------

var toString = function (x) {
  return Object.prototype.toString.call(x);
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
