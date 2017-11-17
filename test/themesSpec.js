/* eslint-env karma, jasmine */
/* eslint strict: [2, "global"] */
"use strict";

describe("themes unit tests", function() {

    var $alertify;

    beforeEach(function() {
        alertify.reset();
        $alertify = alertify._$$alertify;
    });

    it("should set the buttons to bootstrap theme", function() {
        alertify.theme("bootstrap");
        expect($alertify.dialogs.buttons.ok.indexOf("btn") > -1).toBe(true);
        expect($alertify.dialogs.buttons.ok.indexOf("btn-primary") > -1).toBe(true);
        expect($alertify.dialogs.buttons.ok.indexOf("ok") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("btn") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("cancel") > -1).toBe(true);
    });

    it("should set the buttons to material design light", function() {
        alertify.theme("mdl");
        expect($alertify.dialogs.buttons.ok.indexOf("ok") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("mdl-button") > -1).toBe(true);
        expect($alertify.dialogs.buttons.ok.indexOf("mdl-button") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("mdl-button") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("cancel") > -1).toBe(true);
    });

    it("should set the buttons to purecss", function() {
        alertify.theme("purecss");
        expect($alertify.dialogs.buttons.ok.indexOf("ok") > -1).toBe(true);
        expect($alertify.dialogs.buttons.ok.indexOf("pure-button") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("pure-button") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("cancel") > -1).toBe(true);
    });

    it("should set the buttons to angular-material", function() {
        alertify.theme("angular-material");
        expect($alertify.dialogs.buttons.ok.indexOf("ok") > -1).toBe(true);
        expect($alertify.dialogs.buttons.ok.indexOf("md-button") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("md-button") > -1).toBe(true);
        expect($alertify.dialogs.buttons.cancel.indexOf("cancel") > -1).toBe(true);
    });

    it("should reset the buttons to default", function() {
        alertify.theme("bootstrap");
        alertify.theme("default");
        expect($alertify.dialogs.buttons.ok.indexOf("ok") > -1).toBe(true);
        expect($alertify.dialogs.buttons.ok.indexOf("btn") > -1).toBe(false);
        expect($alertify.dialogs.buttons.cancel.indexOf("btn") > -1).toBe(false);
        expect($alertify.dialogs.buttons.cancel.indexOf("cancel") > -1).toBe(true);
    });

});
