var toString = Object.prototype.toString;

exports.boolean = exports.bool = function (x) {
  return x === true || x === false || toString.call(x) === "[object Boolean]";
};

exports.function = exports.fun = function (x) {
  return toString.call(x) === "[object Function]";
};

exports.nil = function (x) {
  return x == null;
};

exports.number = function (x) {
  return toString.call(x) === "[object Number]";
};

exports.string = function (x) {
  return toString.call(x) === "[object String]";
};
