/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual,
    ok = QUnit.ok;

module("log", {
    setup: function () {
        this.log = alertify.log("Test");
    }
});
