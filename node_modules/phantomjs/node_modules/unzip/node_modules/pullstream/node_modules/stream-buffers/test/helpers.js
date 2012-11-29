var assert = require("assert");

module.exports = {
	assertBuffersEqual: function(actual, expected) {
		assert.equal(actual.length, expected.length);
		
		for(var i = 0; i < actual.length; i++) {
			assert.equal(actual[i], expected[i], "Byte at index #" + i + " does not match!");
		}
	}
};
