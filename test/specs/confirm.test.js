/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual,
    ok = QUnit.ok;

module("confirm", {
    setup: function () {
        alertify.okBtn("OK").cancelBtn("Cancel").confirm("Test");
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

test("confirm buttons", function () {
    expect(2);
    ok(this.ok, "OK button exists");
    ok(this.cancel, "Cancel button exists");
});
