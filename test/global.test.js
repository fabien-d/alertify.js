test("globals set up", function() {
	ok(window.alertify, "global alertify object created");
});

test("API options", function () {
	// methods
	ok(alertify.alert, "alert method part of the API");
	ok(alertify.confirm, "confirm method part of the API");
	ok(alertify.log, "log method part of the API");
	ok(alertify.prompt, "prompt method part of the API");
	// options
	ok(alertify.labels, "labels object part of the API");
	ok(alertify.delay, "delay value part of the API");
});