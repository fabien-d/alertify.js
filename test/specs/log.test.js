/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual,
    ok = QUnit.ok;

module("log", {
    setup: function () {
        this.log = alertify.log("Test");
    }
});

test("log returns alertify object", function () {
    expect(1);
    deepEqual(this.log, alertify, "should be equal");
});
