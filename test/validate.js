var assert = require("assert"),
    _ = require("underscore"),
    L = require("lemonad"),
    h = require("./helper"),
    j = require("../src/jsure");

var t = h.t,
    f = h.f;

suite("validate", function () {
  test("without predicates", function () {
    assert.strictEqual(j.validate(undefined), true);
    assert.strictEqual(j.validate(undefined, false), true);
    assert.strictEqual(j.validate([]), true);
    assert.strictEqual(j.validate([[], []]), true);
  });
  suite("conjunction", function () {
    test("false", function () {
      assert.strictEqual(j.validate(f), false);
      assert.strictEqual(j.validate([f]), false);
      assert.strictEqual(j.validate([[f]]), false);
      assert.strictEqual(j.validate([[[f]]]), false);
      assert.strictEqual(j.validate([f, f]), false);
      assert.strictEqual(j.validate([t, f]), false);
    });
    test("true", function () {
      assert.strictEqual(j.validate(t), true);
      assert.strictEqual(j.validate([t]), true);
      assert.strictEqual(j.validate([[t]]), true);
      assert.strictEqual(j.validate([[[t]]]), true);
      assert.strictEqual(j.validate([t, t]), true);
    });
  });
  suite("disjunction", function () {
    test("false", function () {
      assert.strictEqual(j.validate([[f], [f]]), false);
      assert.strictEqual(j.validate([[f], f]), false);
      assert.strictEqual(j.validate([f, [f]]), false);
    });
    test("true", function () {
      assert.strictEqual(j.validate([[f], [t]]), true);
      assert.strictEqual(j.validate([[t], [f]]), true);
      assert.strictEqual(j.validate([[t], f]), true);
      assert.strictEqual(j.validate([f, [t]]), true);
    });
  });
  suite("short-circuit evaluation", function () {
    test("conjunction", function () {
      j.validate([f, _.partial(h.fail)]);
    });
    test("disjunction", function () {
      j.validate([[t], [_.partial(h.fail)]]);
      j.validate([[[f], [t]], [_.partial(h.fail)]]);
    });
  });
});
