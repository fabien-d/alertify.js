module("prompt", {
	setup : function () {
		alertify.set({ labels: { ok: "OK", cancel: "Cancel" } });
		this.dialog = alertify.prompt("Test");
		this.ok = document.getElementById("alertify-ok");
		this.cancel = document.getElementById("alertify-cancel");
		this.text = document.getElementById("alertify-text");
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

module("prompt parameters", {
	setup : function () {
		alertify.prompt("Test", function () {}, "Default Message");
		this.ok = document.getElementById("alertify-ok");
		this.text = document.getElementById("alertify-text");
	},
	teardown : function () {
		// trigger OK click to close the dialog
		var event = document.createEvent("HTMLEvents");
		event.initEvent("click", true, true);
		this.ok.dispatchEvent(event);
	}
});

test("test prompt parameters", function () {
	expect(3);
	try {
		alertify.prompt();
	} catch (error) {
		deepEqual(error.message, "message must be a string", "parameter error");
	}
	try {
		alertify.prompt("test", {});
	} catch (error) {
		deepEqual(error.message, "fn must be a function", "parameter error");
	}
	deepEqual(this.text.value, "Default Message", "Default prompt message should be \"Default \"Message");
});