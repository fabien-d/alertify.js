define(["../../src/logs"], function (Log) {
    module("Alertify Logs");

    test("logs object API", function () {
        expect(5);
        deepEqual(typeof Log.delay, "number", "Log.delay is a number");
        deepEqual(typeof Log.create, "function", "Log.create is a function");
        deepEqual(typeof Log.error, "function", "Log.error is a function");
        deepEqual(typeof Log.info, "function", "Log.info is a function");
        deepEqual(typeof Log.success, "function", "Log.success is a function");
    });

    test("logs create method", function () {
        expect(8);
        try {
            Log.create({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            Log.create("custom", {});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            Log.create("custom", "Message", "!Number");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Third argument error caught");
        }
        try {
            Log.create("custom", "Logs Custom Message 1");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            log = Log.create("custom", "Logs Custom Message 2", 5000);
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {
        }
        deepEqual(log.delay, 5000, "log element delay properly set");
        deepEqual(log.msg, "Logs Custom Message 2", "log element msg properly set");
        deepEqual(log.type, "custom", "log element type properly set");
    });

    test("logs error method", function () {
        expect(4);
        try {
            Log.error({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            Log.error("Message", "!Number");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            Log.error("Error Message 1");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            Log.error("Error Message 2", 5000);
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {}
    });

    test("logs info method", function () {
        expect(4);
        try {
            Log.info({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            Log.info("Message", "!Number");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            Log.info("Info Message 1");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            Log.info("Info Message 2", 5000);
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {}
    });

    test("logs success method", function () {
        expect(4);
        try {
            Log.success({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            Log.success("Message", "!Number");
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            Log.success("Success Message 1");
            deepEqual(1, 1, "Optional parameter validated");
        } catch (error) {
        }
        try {
            Log.success("Success Message 2", 5000);
            deepEqual(1, 1, "Optional parameter provided and valid");
        } catch (error) {}
    });
});
