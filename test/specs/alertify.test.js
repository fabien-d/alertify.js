define(["alertify"], function (Alertify) {
    module("Alertify");

    test("Alertify prototype object API", function () {
        expect(5);
        deepEqual(typeof Alertify._version, "string", "Alertify _version is a string");
        deepEqual(typeof Alertify._prefix, "string", "Alertify _prefix is a string");
        deepEqual(typeof Alertify.get, "function", "Alertify.get is a function");
        deepEqual(typeof Alertify.on, "function", "Alertify.on is a function");
        deepEqual(typeof Alertify.off, "function", "Alertify.off is a function");
    });
});
