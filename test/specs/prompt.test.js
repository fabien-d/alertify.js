/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual,
    ok = QUnit.ok;

module("prompt", {
    setup: function () {
        alertify.okBtn("OK").cancelBtn("Cancel");
        this.dialog = alertify.prompt("Test");
        this.ok = document.getElementById("alertify-ok");
        this.cancel = document.getElementById("alertify-cancel");
        this.text = document.getElementById("alertify-text");
    },
    teardown: function () {
        // trigger OK click to close the dialog
        var event = document.createEvent("HTMLEvents");
        event.initEvent("click", true, true);
        this.ok.dispatchEvent(event);
    }
});

test("prompt elements", function () {
    expect(3);
    ok(this.ok, "OK button exists");
    ok(this.cancel, "Cancel button exists");
    ok(this.text, "Textfield exists");
});

module("prompt parameters", {
    setup: function () {
        alertify.defaultValue("Default Message");
        alertify.prompt("Test", function () {});

        this.ok = document.getElementById("alertify-ok");
        this.text = document.getElementById("alertify-text");
    },
    teardown: function () {
        // trigger OK click to close the dialog
        var event = document.createEvent("HTMLEvents");
        event.initEvent("click", true, true);
        this.ok.dispatchEvent(event);
    }
});

test("test prompt parameters", function () {
    expect(1);
    deepEqual(this.text.value, "Default Message", "Default prompt message should be \"Default \"Message");
});
