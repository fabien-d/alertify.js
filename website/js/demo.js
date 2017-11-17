/*eslint strict: [2, "global"], global: {ga: false} */
"use strict";

(function() {

    function $(selector) {
        return document.querySelector(selector);
    }

    function reset (ev) {
        ev.preventDefault();
        alertify.reset();
    }

    function logDemo(selector) {
        (ga || function() { })("send", "event", "button", "click", "demo", selector);
    }

    function demo(selector, cb) {
        var el = $(selector);
        if(el) {
            el.addEventListener("click", function(ev) {
                ev.preventDefault();
                logDemo(selector);
                cb();
            });
        }
    }

    var ga = ga || function() {};

    // ==============================
    // Standard Dialogs
    demo("#alert", function (ev) {
        alertify.alert("This is an alert dialog");
        return false;
    });

    demo("#confirm", function (ev) {
        alertify.confirm("This is a confirm dialog", function (ev) {
            ev.preventDefault();
            alertify.success("You've clicked OK");
        }, function(ev) {
            ev.preventDefault();
            alertify.error("You've clicked Cancel");
        });
    });

    demo("#click-to-close", function (ev) {
        alertify
          .closeLogOnClick(true)
          .log("Click me to close!");
    });

    demo("#disable-click-to-close", function (ev) {
        alertify
            .closeLogOnClick(true)
            .log("Click me to close!")
            .closeLogOnClick(false)
            .log("You can't click to close this!");
    });

    demo("#reset", function (ev) {
        alertify
            .okBtn("Go For It!")
            .reset(ev)
            .alert("Custom values were reset");
    });

    demo("#log-template", function (ev) {
        alertify
            .setLogTemplate(function (input) { return 'log message: ' + input; })
            .log("This is the message");
    });

    demo("#max-log-items", function (ev) {
        alertify
            .maxLogItems(1)
            .log("This is the first message");

        // The timeout is just for visual effect.
        setTimeout(function() {
            alertify.log("The second message will force the first to close.");
        }, 1000);
    });

    demo("#prompt", function (ev) {
        alertify
            .defaultValue("Default value")
            .prompt("This is a prompt dialog", function (str, ev) {
                ev.preventDefault();
                alertify.success("You've clicked OK and typed: " + str);
            }, function(ev) {
                ev.preventDefault();
                alertify.error("You've clicked Cancel");
            });
    });

    // ==============================
    // Ajax
    demo("#ajax", function (ev) {
        alertify.confirm("Confirm?", function(ev) {
            ev.preventDefault();
            alertify.alert("Successful AJAX after OK");
        }, function(ev) {
            ev.preventDefault();
            alertify.alert("Successful AJAX after Cancel");
        });
    });

    // ==============================
    // Promise Aware
    demo("#promise", function (ev) {
        if ("function" !== typeof Promise) {
            alertify.alert("Your browser doesn't support promises");
            return;
        }

        alertify.confirm("Confirm?").then(function (resolvedValue) {
            // The click event is in the
            // event variable, so you can use
            // it here.
            resolvedValue.event.preventDefault();
            alertify.alert("You clicked the " + resolvedValue.buttonClicked + " button!");
        });
    });

    // ==============================
    // Standard Dialogs
    demo("#notification", function (ev) {
        alertify.log("Standard log message");
    });

    demo("#notification-html", function (ev) {
        alertify.log("<img src='https://placehold.it/256x128'><h3>This is HTML</h3><p>It's great, right?</p>");
    });

    demo("#notification-callback", function(ev) {
        alertify.log("Standard log message with callback", function(ev) {
            ev.preventDefault();
            alertify.log("You clicked the notification");
        });
    });

    demo("#success", function (ev) {
        alertify.success("Success log message");
    });

    demo("#success-callback", function(ev) {
        alertify.success("Standard log message with callback", function() {
            alertify.success("You clicked the notification");
        });
    });

    demo("#error", function (ev) {
        alertify.error("Error log message");
    });

    demo("#error-callback", function(ev) {
        alertify.error("Standard log message with callback", function(ev) {
            ev.preventDefault();
            alertify.error("You clicked the notification");
        });
    });

    // ==============================
    // Custom Properties
    demo("#delay", function (ev) {
        alertify
            .delay(10000)
            .log("Hiding in 10 seconds");
    });

    demo("#forever", function (ev) {
        alertify
            .delay(0)
            .log("Will stay until clicked");
    });

    demo("#labels", function (ev) {
        alertify
            .okBtn("Accept")
            .cancelBtn("Deny")
            .confirm("Confirm dialog with custom button labels", function (ev) {
                ev.preventDefault();
                alertify.success("You've clicked OK");
            }, function(ev) {
                ev.preventDefault();
                alertify.error("You've clicked Cancel");
            });
    });

    demo("#log-position", function() {
        alertify.delay(1000); // This is just to make the demo go faster.
        alertify.log("Default bottom left position");
        setTimeout(function() {
            alertify.logPosition("top left");
            alertify.log("top left");
        }, 1500);
        setTimeout(function() {
            alertify.logPosition("top right");
            alertify.log("top right");
        }, 3000);
        setTimeout(function() {
            alertify.logPosition("bottom right");
            alertify.log("bottom right");
        }, 4500);
        setTimeout(function() {
            alertify.reset(); // Puts the message back to default position.
            alertify.log("Back to default");
        }, 6000);
    });

})();

var app = angular.module("alertifyDemo", ["ngAlertify"]);
app.controller("alertifyLogDemoCtrl", function($scope, $log, alertify) {

    $scope.type = "log";
    $scope.msg = "ngAlertify";
    $scope.log = alertify.log;
    $scope.error = alertify.error;
    $scope.success = alertify.success;
    $scope.maxLogItems = 2;
    $scope.delay = 5000;

    $scope.show = function(msg) {
        alertify[$scope.type](msg);
    };

    $scope.$watch("closeLogOnClick", alertify.closeLogOnClick);
    $scope.$watch("maxLogItems", alertify.maxLogItems);
    $scope.$watch("delay", alertify.delay);

});
