/* eslint-env karma, jasmine */
/* eslint strict: [2, "global"] */
/* global inject */
"use strict";

/**
 * A basic test to ensure the ngAlertify module is
 * properly loaded. It doesn't need to contain a
 * complete set of tests, as those are done outside the
 * Angular module. This is just for Angular bootstrapping.
 *
 * @param  {[type]} "ngAlertify test suite" [description]
 * @param  {[type]} function(  [description]
 * @return {[type]}            [description]
 */
describe("ngAlertify test suite", function() {

    var alertify;

    beforeEach(module("ngAlertify"));

    beforeEach(inject(function(_alertify_) {
        alertify = _alertify_;
    }));

    it("should inject alertify", function() {
        expect(angular.isObject(alertify)).toBe(true);
    });

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
