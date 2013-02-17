define([], function () {
    "use strict";

    return function () {
        var output = "require([\"alertify\", \"dialog\", \"logs\"], function (Alertify, Dialog, logs) {\n" +
                     "    Alertify.dialog = Dialog;\n" +
                     "    Alertify.log    = logs;\n" +
                     "    window.Alertify = Alertify;\n" +
                     "});";
        return output;
    };
});