define([], function () {
    "use strict";

    // from mustache.js
    // https://github.com/janl/mustache.js/blob/master/mustache.js#L55
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;"
    };

    var escape = {
        html: function (str) {
            return String(str).replace(/[&<>"'\/]/g, function (s) {
                return entityMap[s];
            });
        }
    };

    return escape;
});