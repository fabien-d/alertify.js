module("alert", {
	setup : function () {}
});

test("alert returns alertify object", function () {
	expect(1);
	deepEqual(alertify.alert(""), alertify, "should be equal");
});

test("alert parameters", function () {
	expect(2);
	try {
		alertify.alert();
	} catch (error) {
		deepEqual(error.message, "message must be a string", "parameter error");
	}
	try {
		alertify.alert("test", {});
	} catch (error) {
		deepEqual(error.message, "fn must be a function", "parameter error");
	}
});