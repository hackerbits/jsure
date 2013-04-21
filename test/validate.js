var assert = require("assert"),
    j = require("../src/jsure");

var alwaysTrue = function () { return true; };

var alwaysFalse = function () { return false; };

suite("validate", function () {
  test("false", function () {
    assert.strictEqual(j.validate(alwaysFalse), false);
    assert.strictEqual(j.validate([alwaysFalse]), false);
    assert.strictEqual(j.validate([alwaysFalse, alwaysFalse]), false);
    assert.strictEqual(j.validate([alwaysTrue, alwaysFalse]), false);
    assert.strictEqual(j.validate([[alwaysFalse]]), false);
    assert.strictEqual(j.validate([[[alwaysFalse]]]), false);
  });
  test("true", function () {
    assert.strictEqual(j.validate(alwaysTrue), true);
    assert.strictEqual(j.validate([]), true);
    assert.strictEqual(j.validate([alwaysTrue]), true);
    assert.strictEqual(j.validate([alwaysTrue, alwaysTrue]), true);
    assert.strictEqual(j.validate([[alwaysTrue]]), true);
    assert.strictEqual(j.validate([[[alwaysTrue]]]), true);
    assert.strictEqual(j.validate([[alwaysFalse], [alwaysTrue]]), true);
  });
  test("logic", function () {
    j.validate([alwaysFalse, function () { throw new Error("logic"); }]);
    j.validate([[alwaysTrue], [function () { throw new Error("logic"); }]]);
  });
});
