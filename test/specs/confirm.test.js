/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual,
    ok = QUnit.ok;

module("confirm", {
    setup: function () {
        alertify.set({labels: {ok: "OK", cancel: "Cancel"}});
        this.dialog = alertify.confirm("Test");
        this.ok = document.getElementById("alertify-ok");
        this.cancel = document.getElementById("alertify-cancel");
    },
    teardown: function () {
        // trigger OK click to close the dialog
        var event = document.createEvent("HTMLEvents");
        event.initEvent("click", true, true);
        this.ok.dispatchEvent(event);
    }
});

test("confirm returns alertify object", function () {
    expect(1);
    deepEqual(this.dialog, alertify, "should be equal");
});

test("confirm buttons", function () {
    expect(2);
    ok(this.ok, "OK button exists");
    ok(this.cancel, "Cancel button exists");
});

test("confirm parameters", function () {
    expect(2);
    try {
        alertify.confirm();
    } catch (error) {
        deepEqual(error.message, "message must be a string", "parameter error");
    }
    try {
        alertify.confirm("test", {});
    } catch (error) {
        deepEqual(error.message, "fn must be a function", "parameter error");
    }
});