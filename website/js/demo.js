function reset () {
  $("#toggleCSS").attr("href", "");
  alertify.reset();
}

// ==============================
// Standard Dialogs
$("#alert").on( "click", function () {
  reset();
  alertify.alert("This is an alert dialog");
  return false;
});

$("#confirm").on( "click", function (ev) {

  ev.preventDefault();
  reset();

  alertify.confirm("This is a confirm dialog", function (event) {
      event.preventDefault();
      alertify.success("You've clicked OK");
  }, function(event) {
      event.preventDefault();
      alertify.error("You've clicked Cancel");
  });

});


$("#click-to-close").on( "click", function (ev) {

  ev.preventDefault();
  reset();

  alertify
    .closeLogOnClick(true)
    .log("Click me to close!");

});

$("#disable-click-to-close").on( "click", function (ev) {

  ev.preventDefault();
  reset();

  alertify
    .closeLogOnClick(true)
    .log("Click me to close!")
    .closeLogOnClick(false)
    .log("You can't click to close this!");

});

$("#reset").on( "click", function (ev) {

  ev.preventDefault();
  reset();

  alertify
    .okBtn("Go For It!")
    .reset()
    .alert("Custom values were reset");

});

$("#max-log-items").on( "click", function (ev) {

  ev.preventDefault();

  reset();

  alertify
    .maxLogItems(1)
    .log("This is the first message");

  // The timeout is just for visual effect.
  setTimeout(function() {
    alertify.log("The second message will force the first to close.");
  }, 1000);

});

$("#prompt").on( "click", function (ev) {

  ev.preventDefault();
  reset();

  alertify
      .defaultValue("Default value")
      .prompt("This is a prompt dialog", function (str, event) {
          event.preventDefault();
          alertify.success("You've clicked OK and typed: " + str);
      }, function(event) {
          event.preventDefault();
          alertify.error("You've clicked Cancel");
      });

});

// ==============================
// Ajax
$("#ajax").on("click", function (ev) {

    ev.preventDefault();
    reset();

    alertify.confirm("Confirm?", function(event) {
        event.preventDefault();
        alertify.alert("Successful AJAX after OK");
    }, function(events) {
        event.preventDefault();
        alertify.alert("Successful AJAX after Cancel");
    });

});

// ==============================
// Standard Dialogs
$("#notification").on( "click", function (ev) {
    ev.preventDefault();
    reset();
    alertify.log("Standard log message");
});

$("#notification-html").on( "click", function (ev) {
    ev.preventDefault();
    reset();
    alertify.log("<img src='https://placehold.it/256x128'><h3>This is HTML</h3><p>It's great, right?</p>");
});

$("#notification-callback").click(function(ev) {

    reset();

    ev.preventDefault();
    alertify.log("Standard log message with callback", function(event) {
        event.preventDefault();
        alertify.log("You clicked the notification");
    });

});

$("#success").on( "click", function (ev) {

  ev.preventDefault();
  reset();
  alertify.success("Success log message");

});

$("#success-callback").click(function() {
    reset();
    alertify.success("Standard log message with callback", function() {
        alertify.success("You clicked the notification");
    });
});

$("#error").on( "click", function (ev) {
    ev.preventDefault();
    reset();
    alertify.error("Error log message");
});

$("#error-callback").click(function(ev) {

    ev.preventDefault();
    reset();

    alertify.error("Standard log message with callback", function(event) {
        event.preventDefault();
        alertify.error("You clicked the notification");
    });

});

// ==============================
// Custom Properties
$("#delay").on( "click", function (e) {

  reset();
  e.preventDefault();
  alertify
    .delay(10000)
    .log("Hiding in 10 seconds");

});

$("#forever").on( "click", function (ev) {

  ev.preventDefault();

  reset();

  alertify
    .delay(0)
    .log("Will stay until clicked");

});

$("#labels").on( "click", function (ev) {

  reset();

  ev.preventDefault();
  alertify
    .okBtn("Accept")
    .cancelBtn("Deny")
    .confirm("Confirm dialog with custom button labels", function (event) {
        event.preventDefault();
        alertify.success("You've clicked OK");
    }, function(event) {
        event.preventDefault();
        alertify.error("You've clicked Cancel");
    });

});

// ==============================
// Custom Themes
$("#bootstrap").on("click", function (ev) {

    ev.preventDefault();
    reset();

    $("#toggleCSS").attr("href", "../dist/css/alertify-bootstrap.css");

    alertify.prompt("Prompt dialog with bootstrap theme",
      function (str, event) {
        event.preventDefault();
        alertify.success("You've clicked OK");
      }, function(event) {
        event.preventDefault();
        alertify.error("You've clicked Cancel");
    });

});

// Bootstrap-3 Theme
$("#bootstrap-3").on( "click", function (ev) {

    ev.preventDefault();
    reset();

    $("#toggleCSS").attr("href", "../dist/css/alertify-bootstrap-3.css");

    alertify.prompt("Prompt dialog with bootstrap theme",
      function (str, event) {
        event.preventDefault();
        alertify.success("You've clicked OK");
      }, function(event) {
        event.preventDefault();
        alertify.error("You've clicked Cancel");
    });

});
