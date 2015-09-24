/* global angular: false */

angular.module("ngAlertify", []).factory("alertify", function() {

    "use strict";

    // A quick hack to avoid exposing alertify to the window scope.
    var module = { exports: true };

    /* alertify.js */
    return module.exports;

});
