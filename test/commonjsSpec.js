/* eslint-env karma, jasmine */
/* eslint strict: [2, "global"] */
/* global require */
"use strict";

describe("commonjs test suite", function() {

    var Alertify = require("alertify");

    it("should be a function", function() {
        expect(typeof Alertify).toBe("function");
    });

    [ Alertify, new Alertify(), Alertify() ].forEach(function(alertify) {
        it("should define the public methods", function() {
            expect(typeof alertify.reset).toBe("function");
            expect(typeof alertify.alert).toBe("function");
            expect(typeof alertify.confirm).toBe("function");
            expect(typeof alertify.prompt).toBe("function");
            expect(typeof alertify.log).toBe("function");
            expect(typeof alertify.success).toBe("function");
            expect(typeof alertify.error).toBe("function");
            expect(typeof alertify.cancelBtn).toBe("function");
            expect(typeof alertify.okBtn).toBe("function");
            expect(typeof alertify.delay).toBe("function");
            expect(typeof alertify.placeholder).toBe("function");
            expect(typeof alertify.defaultValue).toBe("function");
            expect(typeof alertify.maxLogItems).toBe("function");
            expect(typeof alertify.closeLogOnClick).toBe("function");
        });
    });

    it("should be different instances", function() {
        var alertify = new Alertify();
        alertify.defaultValue("foo");
        expect(alertify._$$alertify).not.toEqual(Alertify._$$alertify);
    });

});
