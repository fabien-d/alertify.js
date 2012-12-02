test("globals set up", function() {
	expect(1);
	ok(alertify, "global alertify object created");
});

test("API options", function () {
	expect(10);
	// methods
	deepEqual(typeof alertify.alert, "function", "alert method part of the API");
	deepEqual(typeof alertify.confirm, "function", "confirm method part of the API");
	deepEqual(typeof alertify.init, "function", "init method part of the API");
	deepEqual(typeof alertify.log, "function", "log method part of the API");
	deepEqual(typeof alertify.extend, "function", "extend method part of the API");
	deepEqual(typeof alertify.prompt, "function", "prompt method part of the API");
	deepEqual(typeof alertify.success, "function", "success notification part of the API");
	deepEqual(typeof alertify.error, "function", "error notification part of the API");
	// options
	deepEqual(typeof alertify.labels, "object", "labels object part of the API");
	deepEqual(typeof alertify.delay, "number", "delay value part of the API");
});

module("custom properties", {
	setup : function () {
		alertify.labels.ok     = "GO";
		alertify.labels.cancel = "Stop";
		alertify.confirm("Test");
		this.ok     = document.getElementById("aOK");
		this.cancel = document.getElementById("aCancel");

	},
	teardown: function () {
		// trigger OK click to close the dialog
		var event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, true);
		this.ok.dispatchEvent(event);
	}
});

test("test properties", function () {
	expect(2);
	deepEqual(this.ok.innerHTML, "GO", "OK button should have custom label GO");
	deepEqual(this.cancel.innerHTML, "Stop", "Cancel button should have custom label Stop");
});