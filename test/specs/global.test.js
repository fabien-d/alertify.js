test("globals set up", function() {
	expect(1);
	ok(alertify, "global alertify object created");
});

test("API options", function () {
	expect(9);
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
	deepEqual(typeof alertify.set, "function", "set method part of the API");
});

module("custom labels", {
	setup : function () {
		alertify.set({ labels: { ok: "GO", cancel: "Stop" } });
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

test("test labels", function () {
	expect(2);
	deepEqual(this.ok.innerHTML, "GO", "OK button should have custom label GO");
	deepEqual(this.cancel.innerHTML, "Stop", "Cancel button should have custom label Stop");
});