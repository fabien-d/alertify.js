/* eslint-env karma, jasmine */
/* eslint strict: [2, false] */

describe("Dialog Unit Tests:", function () {
    var $alertify;

    beforeEach(function() {
        alertify.reset();
        $alertify = alertify._$$alertify;
    });

    describe("The 'setup' function", function() {
        var globalPromise;

        beforeAll(function() {
            globalPromise = Promise;
        });

        afterAll(function() {
            // reset global Promise object
            Promise = globalPromise;
        });

        it("should return a promise instance when the Promise object exists", function() {
            // Mock Promise global
            Promise = function () {};

            var promise = $alertify.setup({
                type: "alert",
                message: "Test",
                onOkay: function () {},
                onCancel: function () {}
            });

            expect(typeof promise === "object").toBe(true);
        });

        it ("should return undefined when the Promise object does NOT exist", function () {
            // Mock Promise global
            delete Promise;

            var promise = $alertify.setup({
                type: "alert",
                message: "Test",
                onOkay: function () {},
                onCancel: function () {}
            });

            expect(typeof promise === "undefined").toBe(true);
        });
    });
});
