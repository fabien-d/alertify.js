/* eslint-env karma, jasmine */
/* eslint strict: [2, false] */
describe("Dialog Unit Tests:", function () {
    var $alertify;

    beforeEach(function() {
        alertify.reset();
        $alertify = alertify._$$alertify;
    });

    describe("Setting button values", function() {

        it("should set the cancel/okay button label", function(done) {
            alertify.reset().cancelBtn("No!").okBtn("Yes!").confirm("Test");
            setTimeout(function() {
                expect(document.querySelector(".alertify .dialog .cancel").innerHTML).toBe("No!");
                expect(document.querySelector(".alertify .dialog .ok").innerHTML).toBe("Yes!");
                done();
            }, 100);
        });

    });

    describe("The 'setup' function", function() {
        // reset global Promise object after tests
        if (typeof Promise !== "undefined") {
            var globalPromise;

            beforeAll(function() {
                globalPromise = Promise;
            });

            afterAll(function() {
                Promise = globalPromise;
            });
        }

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

        it("should return undefined when the Promise object does NOT exist", function () {
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

    describe("Prompt method:", function() {

        it("should set the default value of prompt element", function(done) {
            var val = "This is a test";
            alertify.defaultValue(val).prompt("Test");
            setTimeout(function() {
                expect(document.querySelector(".alertify .dialog input").value).toBe(val);
                done();
            }, 100);
        });

    });

    describe("Setting focus on dialog elements:", function() {

        it("should set focus on prompt input element", function(done) {
            alertify.prompt("Test");
            setTimeout(function() {
                expect(document.activeElement.tagName).toBe("INPUT");
                done();
            }, 100);
        });

        it("should set focus on ok button for alert()", function(done) {
            alertify.alert("Test");
            setTimeout(function() {
                expect(document.activeElement.tagName).toBe("BUTTON");
                expect(document.activeElement.classList[0]).toBe("ok");
                done();
            }, 100);
        });

        it("should set focus on ok button for confirm()", function(done) {
            alertify.alert("Test");
            setTimeout(function() {
                expect(document.activeElement.tagName).toBe("BUTTON");
                expect(document.activeElement.classList[0]).toBe("ok");
                done();
            }, 100);
        });

    });
});
