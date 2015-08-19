/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual,
    ok = QUnit.ok;

module("alert", {
    setup: function () {
        alertify.okBtn("OK");
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

test("alert ok button", function () {
    expect(1);
    ok(this.ok, "OK button exists");
});
