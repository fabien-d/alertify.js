define(["../../src/transition"], function (transition) {
    module("Transition");

    test("transition API", function () {
        expect(2);
        deepEqual(typeof transition.type, "string", "transition.type is a string");
        deepEqual(typeof transition.supported, "boolean", "transition.supported is a boolean");
    });
});
