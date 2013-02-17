define(["../../src/dialog"], function (Dialog) {
    module("Alertify Dialog Properties");

    test("dialog properties", function () {
        expect(12);
        var d = Dialog;
        deepEqual(d.buttonFocus, "ok", "Initial button focus is OK");
        deepEqual(d.buttonReverse, false, "Initial button order is default");
        deepEqual(typeof d.cover, "undefined", "Initial cover element is undefined");
        deepEqual(typeof d.el, "undefined", "Initial dialog element is undefined");
        deepEqual(d.labels.ok, "OK", "Initial ok button label is OK");
        deepEqual(d.labels.cancel, "Cancel", "Initial cancel button label is Cancel");

        d.alert("test");
        deepEqual(typeof d.cover, "object", "Cover element gets created");
        deepEqual(typeof d.el, "object", "Dialog element gets created");

        d.buttonFocus = "cancel";
        deepEqual(d.buttonFocus, "cancel", "Initial button focus can be changed");

        d.buttonReverse = true;
        deepEqual(d.buttonReverse, true, "Initial button order can be changed");

        d.labels.ok     = "Yes";
        d.labels.cancel = "No";
        deepEqual(d.labels.ok, "Yes", "Initial ok label can be changed");
        deepEqual(d.labels.cancel, "No", "Initial cancel label can be changed");
    });

    module("Alertify Dialog");

    test("dialog object API", function () {
        expect(6);
        deepEqual(typeof Dialog.labels, "object", "Dialog.labels is an object");
        deepEqual(typeof Dialog.labels.ok, "string", "Dialog.labels.ok is a string");
        deepEqual(typeof Dialog.labels.cancel, "string", "Dialog.labels.cancel is a string");
        deepEqual(typeof Dialog.alert, "function", "Dialog.alert is a function");
        deepEqual(typeof Dialog.confirm, "function", "Dialog.confirm is a function");
        deepEqual(typeof Dialog.prompt, "function", "Dialog.prompt is a function");
    });

    test("dialog chaining", function () {
        expect(3);
        try {
            Dialog.confirm("Alert chaining").alert("Alert chaining 2");
            deepEqual(1, 1, "Alert chaining works");
        } catch (error) {}
        try {
            Dialog.confirm("Confirm chaining").alert("Confirm chaining 2");
            deepEqual(1, 1, "Confirm chaining works");
        } catch (error) {}
        try {
            Dialog.prompt("Prompt chaining").alert("Prompt chaining 2");
            deepEqual(1, 1, "Prompt chaining works");
        } catch (error) {}
    });

    test("dialog alert method", function () {
        expect(4);
        try {
            Dialog.alert({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            Dialog.alert("Message", "!Function");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            Dialog.alert("Message");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            Dialog.alert("Message", function () {});
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {
        }
    });

    test("dialog confirm method", function () {
        expect(6);
        try {
            Dialog.confirm({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            Dialog.confirm("Message", "!Function");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            Dialog.confirm("Message", function () {}, "!Function");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Third argument error caught");
        }
        try {
            Dialog.confirm("Message");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            Dialog.confirm("Message", function () {});
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {
        }
        try {
            Dialog.confirm("Message", function () {}, function () {});
            deepEqual(1, 1, "Optional parameters provided and valid");
        } catch (error) {
        }
    });

    test("dialog prompt method", function () {
        expect(8);
        try {
            Dialog.prompt({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            Dialog.prompt("Message", "!Function");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            Dialog.prompt("Message", function () {}, "!Function");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Third argument error caught");
        }
        try {
            Dialog.prompt("Message", function () {}, function () {}, {});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Fourth argument error caught");
        }
        try {
            Dialog.prompt("Message");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            Dialog.prompt("Message", function () {});
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {
        }
        try {
            Dialog.prompt("Message", function () {}, function () {});
            deepEqual(1, 1, "Optional parameters provided and valid");
        } catch (error) {
        }
        try {
            Dialog.prompt("Message", function () {}, function () {}, "Placeholder");
            deepEqual(1, 1, "Optional parameters provided and valid");
        } catch (error) {
        }
    });
});
