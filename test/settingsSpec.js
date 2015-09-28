/* eslint-env karma, jasmine */
/* eslint strict: [2, false] */
describe("settings unit tests", function() {

    var $alertify;

    beforeEach(function() {
        alertify.reset();
        $alertify = alertify._$$alertify;
    });

    it("should set default maxLogItems", function() {
        expect($alertify.maxLogItems).toBe(2);
    });

    it("should set default maxLogItems", function() {
        alertify.maxLogItems(10);
        expect($alertify.maxLogItems).toBe(10);
    });

    it("should set empty default input prompt value", function() {
        expect($alertify.promptValue).toBe("");
    });

    it("should set input prompt value", function() {
        alertify.defaultValue("alertify rocks");
        expect($alertify.promptValue).toBe("alertify rocks");
    });

    it("should set empty default input placeholder value", function() {
        expect($alertify.promptPlaceholder).toBe("");
    });

    it("should set input prompt value", function() {
        alertify.placeholder("alertify rocks");
        expect($alertify.promptPlaceholder).toBe("alertify rocks");
    });

    it("should set close on click to be false by default", function() {
        expect($alertify.closeLogOnClick).toBe(false);
    });

    it("should set close on click to be true", function() {
        alertify.closeLogOnClick(true);
        expect($alertify.closeLogOnClick).toBe(true);
    });

    it("should set close on click to be false", function() {
        alertify.closeLogOnClick(false);
        expect($alertify.closeLogOnClick).toBe(false);
    });

    it("should set default ok btn", function() {
        expect($alertify.okLabel).toBe("Ok");
    });

    it("should set ok btn text", function() {
        alertify.okBtn("Yes");
        expect($alertify.okLabel).toBe("Yes");
    });

    it("should set default cancel btn", function() {
        expect($alertify.cancelLabel).toBe("Cancel");
    });

    it("should set cancel btn text", function() {
        alertify.cancelBtn("No");
        expect($alertify.cancelLabel).toBe("No");
    });

    it("should set the default delay to 5000", function() {
        expect($alertify.delay).toBe(5000);
    });

    it("should set delay option", function() {
        alertify.delay(1000);
        expect($alertify.delay).toBe(1000);
    });

    it("should reset all options when reset called", function() {
        alertify.delay(1000);
        alertify.cancelBtn("No");
        alertify.okBtn("Yes");
        alertify.closeLogOnClick(true);
        alertify.defaultValue("alertify rocks");
        alertify.placeholder("alertify rocks");
        alertify.maxLogItems(10);
        alertify.reset();
        expect($alertify.delay).toBe(5000);
        expect($alertify.cancelLabel).toBe("Cancel");
        expect($alertify.okLabel).toBe("Ok");
        expect($alertify.closeLogOnClick).toBe(false);
        expect($alertify.promptValue).toBe("");
        expect($alertify.promptPlaceholder).toBe("");
        expect($alertify.maxLogItems).toBe(2);
    });

});
