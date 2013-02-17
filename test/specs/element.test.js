define(["../../src/element"], function (element) {
    module("Element");

    test("Element object API", function () {
        expect(2);
        deepEqual(typeof element.create, "function", "element.create is a function");
        deepEqual(typeof element.ready, "function", "element.ready is a function");
    });

    test("Create element parameters", function () {
        expect(4);
        try {
            element.create({});
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
        try {
            element.create("article");
            deepEqual(1, 1, "Optional argument not provided");
        } catch (error) {
        }
        try {
            element.create("article", []);
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "Second argument error caught");
        }
        try {
            element.create("article", {});
            deepEqual(1, 1, "Optional argument provided and valid");
        } catch (error) {
        }
    });

    test("Creating the element", function () {
        expect(4);
        var el = element.create("article", {
            classes: "alertify-log",
            attributes: {
                id: "id-test",
                "data-prop": "data-test"
            }
        });
        deepEqual(typeof el, "object", "element.create returns an object");
        deepEqual(el.className, "alertify-log", "class names appended properly");
        deepEqual(el.id, "id-test", "id appended properly");
        deepEqual(el.getAttribute("data-prop"), "data-test", "data attribute appended properly");
    });

    test("Ready method parameter", function () {
        expect(1);
        try {
            element.ready();
        } catch (error) {
            deepEqual(error.message, "Invalid arguments", "First argument error caught");
        }
    });

    test("Element ready method", function () {
        expect(1);
        var el = element.create("fake");
        element.ready(el);
        deepEqual(true, true, "element is ready and execution continued");
    });
});
