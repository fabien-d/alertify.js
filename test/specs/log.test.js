var x;
define(["../../src/log"], function (Log) {
    module("Alertify Log");

    test("log object API", function () {
        expect(3);
        var el = document.createElement("fake");
        var log = new Log(el, "info", "message");
        deepEqual(typeof log.close, "function", "Log.close is a function");
        deepEqual(typeof log.create, "function", "Log.create is function");
        deepEqual(typeof log.show, "function", "Log.show is function");
    });

    test("log object", function () {
        expect(7);
        var el = document.createElement("fake");
        try {
            new Log("custom");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            new Log(el, {});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            new Log(el, "custom", function () {});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Third argument error caught");
        }
        try {
            new Log(el, "custom", "message", "!Number");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Fourth argument error caught");
        }
        try {
            new Log(el, "custom", "Custom Message");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            new Log(el, "custom", "Custom Message", 5000);
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {
        }

        var log = new Log(el, "success", "This is my message", 8000);
        deepEqual(log.delay, 8000, "Set proper delay");
    });
});
