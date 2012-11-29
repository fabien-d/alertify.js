test("globals set up", function() {
	expect(1);
	ok(window.alertify, "global alertify object created");
});

test("API options", function () {
	expect(9);
	// methods
	deepEqual(typeof alertify.alert, "function", "alert method part of the API");
	deepEqual(typeof alertify.confirm, "function", "confirm method part of the API");
	deepEqual(typeof alertify.log, "function", "log method part of the API");
	deepEqual(typeof alertify.extend, "function", "extend method part of the API");
	deepEqual(typeof alertify.prompt, "function", "prompt method part of the API");
	deepEqual(typeof alertify.success, "function", "success notification part of the API");
	deepEqual(typeof alertify.error, "function", "error notification part of the API");
	// options
	deepEqual(typeof alertify.labels, "object", "labels object part of the API");
	deepEqual(typeof alertify.delay, "number", "delay value part of the API");
});