/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual,
    ok = QUnit.ok;

module("alert", {
    setup: function () {
        alertify.set({labels: {ok: "OK"}});
        this.dialog = alertify.alert("Test");
        this.ok = document.getElementById("alertify-ok");
    },
    teardown: function () {
        // trigger OK click to close the dialog
        var event = document.createEvent("HTMLEvents");
        event.initEvent("click", true, true);
        this.ok.dispatchEvent(event);
    }
});

test("alert returns alertify object", function () {
    expect(1);
    deepEqual(this.dialog, alertify, "should be equal");
});

test("alert ok button", function () {
    expect(1);
    ok(this.ok, "OK button exists");
});

test("alert parameters", function () {
    expect(2);
    try {
        alertify.alert();
    } catch (error) {
        deepEqual(error.message, "message must be a string", "parameter error");
    }
    try {
        alertify.alert("test", {});
    } catch (error) {
        deepEqual(error.message, "fn must be a function", "parameter error");
    }
});