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

test("extend method", function () {
    expect(2);
    try {
        alertify.extend();
    } catch (error) {
        deepEqual(error.message, "extend method must have exactly one parameter", "parameter error caught");
    }
    alertify.custom = alertify.extend("custom");
    deepEqual(alertify.custom("test"), alertify, "should be equal");
});
