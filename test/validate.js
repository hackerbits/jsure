var assert = require("assert"),
    L = require("lemonad"),
    j = require("../src/jsure");

var t = L.always(true);

var f = L.always(false);

suite("validate", function () {
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
      assert.strictEqual(j.validate([]), true);
      assert.strictEqual(j.validate([t]), true);
      assert.strictEqual(j.validate([[t]]), true);
      assert.strictEqual(j.validate([[[t]]]), true);
      assert.strictEqual(j.validate([t, t]), true);
    });
  });
  suite("disjunction", function () {
    test("true", function () {
      assert.strictEqual(j.validate([[f], [t]]), true);
    });
  });
  suite("short-circuit evaluation", function () {
    test("conjunction", function () {
      j.validate([f, function () { throw new Error(); }]);
    });
    test("disjunction", function () {
      j.validate([[t], [function () { throw new Error(); }]]);
    });
  });
});
