/* eslint-env qunit */
/* eslint strict:0 */
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
    QUnit.ok(this.ok, "OK button exists");
});
