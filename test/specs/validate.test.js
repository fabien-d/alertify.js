define(["../../src/validate"], function (validate) {
    module("Validate");

    test("validate object API", function () {
        expect(2);
        deepEqual(typeof validate.isFunction, "function", "validate.isFunction is a function");
        deepEqual(typeof validate.isString, "function", "validate.isString is a function");
    });

    test("isFunction Method", function () {
        expect(5);
        deepEqual(validate.isFunction({}), false, "Object is not a function");
        deepEqual(validate.isFunction("!Function"), false, "String is not a function");
        deepEqual(validate.isFunction(function () {}), true, "Function is a function");
        deepEqual(validate.isFunction(undefined, true), true, "Optional and undefined returns true");
        deepEqual(validate.isFunction("!Function", true), false, "Optional and string returns false");
    });

    test("isString Method", function () {
        expect(3);
        deepEqual(validate.isString({}), false, "Object is not a string");
        deepEqual(validate.isString(200), false, "Number is not a string");
        deepEqual(validate.isString("200"), true, "String is a string");
    });

    test("isNumber Method", function () {
        expect(3);
        deepEqual(validate.isNumber({}), false, "Object is not a number");
        deepEqual(validate.isNumber("200"), false, "String is not a number");
        deepEqual(validate.isNumber(200), true, "Number is a number");
    });

    test("isObject Method", function () {
        expect(4);
        deepEqual(validate.isObject("!Object"), false, "String is not an object");
        deepEqual(validate.isObject([]), false, "Array is not an object");
        deepEqual(validate.isObject(function() {}), false, "Function is not an object");
        deepEqual(validate.isObject({}), true, "Object is an object");
    });

    module("Validate Labels");

    test("validate Labels String", function () {
        expect(1);
        deepEqual(validate.messages.invalidArguments, "Invalid arguments");
    });
});
