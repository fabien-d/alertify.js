define(["../../src/proto"], function (Proto) {
    module("Alertify Prototype");

    test("prototype object API", function () {
        expect(5);
        deepEqual(typeof Proto._version, "string", "Prototype _version is a string");
        deepEqual(typeof Proto._prefix, "string", "Prototype _prefix is a string");
        deepEqual(typeof Proto.get, "function", "Prototype.get is a function");
        deepEqual(typeof Proto.on, "function", "Prototype.on is a function");
        deepEqual(typeof Proto.off, "function", "Prototype.off is a function");
    });

    test("self optimizing function", function () {
        expect(2);
        var originalON  = Proto.on;
        var originalOFF = Proto.off;
        Proto.on(document.createElement("fake"), "click", function () {});

        notDeepEqual(originalON, Proto.on, "on method self optimized itself");
        notDeepEqual(originalOFF, Proto.off, "off method self optimized itself");
    });

    test("get method", function () {
        expect(1);
        var el = document.createElement("fake");
        el.setAttribute("id", "test");
        document.body.appendChild(el);
        deepEqual(el, Proto.get("test"), "elements selector is working");
    });
});
