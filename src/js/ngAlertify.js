angular.module("ngAlertify", []).factory("alertify", function() {

    "use strict";

    // A quick hack to avoid exposing alertify to the window scope.
    var module = { exports: true };

    // Don't the line below as the alertif.js contents are
    // automatically injected here based on the string contents.
    /* alertify.js */

    var Alertify = module.exports;
    return new Alertify();

});
