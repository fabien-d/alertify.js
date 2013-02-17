(function () {
    QUnit.config.autostart = false;

    require.config({
        baseUrl: "../src",
    });

    var testModules = [
        "specs/alertify.test.js",
        "specs/dialog.test.js",
        "specs/element.test.js",
        "specs/keys.test.js",
        "specs/logs.test.js",
        "specs/log.test.js",
        "specs/proto.test.js",
        "specs/transition.test.js",
        "specs/validate.test.js"
    ];

    require(testModules, QUnit.start);
}());