/* eslint-env qunit */
/* eslint strict:0 */
test("globals set up", function () {
    expect(1);
    QUnit.ok(alertify, "global alertify object created");
});

test("API options", function () {
    expect(13);
    // methods
    QUnit.deepEqual(typeof alertify.reset, "function", "reset part of the API");
    QUnit.deepEqual(typeof alertify.alert, "function", "alert method part of the API");
    QUnit.deepEqual(typeof alertify.confirm, "function", "confirm method part of the API");
    QUnit.deepEqual(typeof alertify.log, "function", "log method part of the API");
    QUnit.deepEqual(typeof alertify.prompt, "function", "prompt method part of the API");
    QUnit.deepEqual(typeof alertify.success, "function", "success notification part of the API");
    QUnit.deepEqual(typeof alertify.error, "function", "error notification part of the API");
    QUnit.deepEqual(typeof alertify.cancelBtn, "function", "cancelBtn part of the API");
    QUnit.deepEqual(typeof alertify.okBtn, "function", "okBtn part of the API");
    QUnit.deepEqual(typeof alertify.delay, "function", "delay part of the API");
    QUnit.deepEqual(typeof alertify.placeholder, "function", "placeholder part of the API");
    QUnit.deepEqual(typeof alertify.defaultValue, "function", "defaultValue part of the API");
    QUnit.deepEqual(typeof alertify.maxLogItems, "function", "maxLogItems part of the API");
});

module("custom labels", {
    setup: function () {
        alertify.okBtn("GO").cancelBtn("Stop").confirm("Test");
        this.ok = document.getElementById("alertify-ok");
        this.cancel = document.getElementById("alertify-cancel");
    },
    teardown: function () {
        // trigger OK click to close the dialog
        var event = document.createEvent("HTMLEvents");
        event.initEvent("click", true, true);
        this.ok.dispatchEvent(event);
        alertify.reset();
    }
});

test("test labels", function () {
    expect(2);
    QUnit.deepEqual(this.ok.innerHTML, "GO", "OK button should have custom label GO");
    QUnit.deepEqual(this.cancel.innerHTML, "Stop", "Cancel button should have custom label Stop");
});
