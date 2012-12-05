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

module("custom labels individual", {
	setup : function () {
		alertify.labels.ok     = "GO";
		alertify.labels.cancel = "Stop";
		alertify.confirm("Test");
		this.ok     = document.getElementById("alertify-ok");
		this.cancel = document.getElementById("alertify-cancel");

	},
	teardown : function () {
		// trigger OK click to close the dialog
		var event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, true);
		this.ok.dispatchEvent(event);
	}
});

test("test individual labels", function () {
	expect(2);
	deepEqual(this.ok.innerHTML, "GO", "OK button should have custom label GO");
	deepEqual(this.cancel.innerHTML, "Stop", "Cancel button should have custom label Stop");
});

module("custom labels combined", {
	setup : function () {
		alertify.labels = { ok: "Continue", cancel: "Back" };
		alertify.confirm("Test");
		this.ok     = document.getElementById("alertify-ok");
		this.cancel = document.getElementById("alertify-cancel");

	},
	teardown : function () {
		// trigger OK click to close the dialog
		var event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, true);
		this.ok.dispatchEvent(event);
	}
});

test("test combined labels", function () {
	expect(2);
	deepEqual(this.ok.innerHTML, "Continue", "OK button should have custom label Continue");
	deepEqual(this.cancel.innerHTML, "Back", "Cancel button should have custom label Back");
});

module("custom delay", {
	setup : function () {
		alertify.delay = 1000;
	}
});

test("test custom delay", function () {
	expect(1);
	deepEqual(alertify.delay, 1000, "Delay should be 1000");
});
