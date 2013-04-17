var assert = require("assert"),
    _ = require("underscore"),
    L = require("lemonad"),
    j = require("../src/jsure");

var truth = function (fun /* , xs */) {
  var xs = _.rest(arguments);
  return function () {
    _.each(xs, function (x) {
      assert.strictEqual(fun(x), true);
    });
  };
};

var falsehood = function (fun /* , without */) {
  var without = _.rest(arguments),
      types = _.filter([[],
                        false,
                        new Date(),
                        function () {},
                        NaN,
                        null,
                        undefined,
                        0,
                        {},
                        /(?:)/,
                        ""],
                       function (t) {
                         return !_.any(_.map(without, function (fun) { return fun(t);}));
                       });
  return function () {
    _.each(types, function (t) {
      assert.strictEqual(fun(t), false);
    });
  };
};

suite("predicates", function () {
  suite("types", function () {
    suite("boolean", function () {
      test("aliases", function () {
        assert.equal(j.boolean, j.bool);
      });
      test("false", falsehood(j.boolean, _.isBoolean));
      test("true", truth(j.boolean, false, true));
    });
    suite("function", function () {
      test("aliases", function () {
        assert.equal(j.function, j.fun);
      });
      test("false", falsehood(j.function, _.isFunction));
      test("true", truth(j.function, function () {}));
    });
    suite("nil", function () {
      test("false", falsehood(j.nil, _.isNull, _.isUndefined));
      test("true", truth(j.nil, null, undefined));
    });
    suite("number", function () {
      test("false", falsehood(j.number, _.isNumber));
      test("true", truth(j.number, 0, 0.5, 1));
    });
    suite("string", function () {
      test("false", falsehood(j.string, _.isString));
      test("true", truth(j.string, "", "foo"));
    });
  });
});
