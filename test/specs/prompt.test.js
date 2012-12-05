module("prompt", {
	setup : function () {
		alertify.labels.ok = "OK";
		alertify.labels.ok = "Cancel";
		this.dialog = alertify.prompt("Test");
		this.ok = document.getElementById("aOK");
		this.cancel = document.getElementById("aCancel");
		this.text = document.getElementById("aText");
	},
	teardown : function () {
		// trigger OK click to close the dialog
		var event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, true);
		this.ok.dispatchEvent(event);
	}
});

test("prompt returns alertify object", function () {
	expect(1);
	deepEqual(this.dialog, alertify, "should be equal");
});

test("prompt elements", function () {
	expect(3);
	ok(this.ok, "OK button exists");
	ok(this.cancel, "Cancel button exists");
	ok(this.text, "Textfield exists");
});

test("prompt parameters", function () {
	expect(2);
	try {
		alertify.confirm();
	} catch (error) {
		deepEqual(error.message, "message must be a string", "parameter error");
	}
	try {
		alertify.confirm("test", {});
	} catch (error) {
		deepEqual(error.message, "fn must be a function", "parameter error");
	}
});