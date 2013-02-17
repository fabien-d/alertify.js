define(["../../src/keys"], function (keys) {
    module("Keys");

    test("keys API", function () {
        expect(3);
        deepEqual(keys.ENTER, 13, "Enter code is 13");
        deepEqual(keys.ESC, 27, "Escape code is 27");
        deepEqual(keys.SPACE, 32, "Space code is 32");
    });
});
