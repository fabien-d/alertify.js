var vows = require("vows"),
	assert = require("assert"),
	streamBuffer = require("../lib/streambuffer"),
	fixtures = require("./fixtures"),
	helpers = require("./helpers");

vows.describe("ReadableStreamBuffer").addBatch({
	"A ReadableStreamBuffer": {
		topic: function() {
			return new streamBuffer.ReadableStreamBuffer();
		},
		
		"is a Stream": function(aStreamBuffer) {
			assert.instanceOf(aStreamBuffer, require("stream").Stream);
		},
		
		"is readable": function(aStreamBuffer) {
			assert.isTrue(aStreamBuffer.readable);
		},
		
		"is not writable": function(aStreamBuffer) {
			assert.isFalse(aStreamBuffer.writable);
		},
		
		"is empty": function(aStreamBuffer) {
			assert.equal(aStreamBuffer.size(), 0);
		},
		
		"has default backing buffer size": function(aStreamBuffer) {
			assert.equal(aStreamBuffer.maxSize(), streamBuffer.DEFAULT_INITIAL_SIZE);
		}
	},

	"Paused with basic String contents": {
		topic: function() {
			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer();
			aStreamBuffer.pause();
			aStreamBuffer.put(fixtures.simpleString);
			return aStreamBuffer;
		},
		
		"has correct size": function(aStreamBuffer) {
			assert.equal(aStreamBuffer.size(), fixtures.simpleString.length);
		},
		
		"has correct backing buffer size": function(aStreamBuffer) {
			assert.equal(aStreamBuffer.maxSize(), streamBuffer.DEFAULT_INITIAL_SIZE);
		},
		
		"and then resumed, with encoding set to utf8": {
			topic: function(aStreamBuffer) {
				aStreamBuffer.setEncoding("utf8");
				aStreamBuffer.on("data", this.callback.bind(this, null));
				aStreamBuffer.resume();
			},
			
			"results in a String": function(data) {
				assert.isString(data);
			},
			
			"with correct contents": function(data) {
				assert.equal(data, fixtures.simpleString);
			}
		}
	}
}).addBatch({
	"Writing binary data": {
		topic: function() {
			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer();
			aStreamBuffer.on("data", this.callback.bind(this, null));
			
			aStreamBuffer.put(fixtures.binaryData);
		},
		
		"results in a Buffer": function(data) {
			assert.instanceOf(data, Buffer);
		},
		
		"with the correct data": function(data) {
			helpers.assertBuffersEqual(data, fixtures.binaryData);
		}
	},
	
	"Writing binary data larger than initial backing buffer size": {
		topic: function() {
			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer();
			aStreamBuffer.pause();
			aStreamBuffer.put(fixtures.largeBinaryData);
			return aStreamBuffer;
		},
		
		"buffer is correct size": function(aStreamBuffer) {
			assert.equal(aStreamBuffer.size(), fixtures.largeBinaryData.length);
		},
		
		"backing buffer is correct size": function(aStreamBuffer) {
			assert.equal(aStreamBuffer.maxSize(), streamBuffer.DEFAULT_INITIAL_SIZE + streamBuffer.DEFAULT_INCREMENT_AMOUNT);
		}
	},
	
	"Setting custom chunk size": {
		topic: function() {
			var that = this;
			
			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer({
				chunkSize: 2
			});
			
			aStreamBuffer.once("data", function(data) { that.callback(null, data); });
			aStreamBuffer.put(fixtures.binaryData);
		},
		
		"gives us a Buffer with the correct length": function(data) {
			assert.length(data, 2);
		}
	},
	
	"Setting a custom frequency": {
		topic: function() {
			var that = this,
				startTime = new Date().getTime();

			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer({
				frequency: 300
			});
			
			aStreamBuffer.on("data", function(data) { that.callback(null, new Date().getTime() - startTime); });
			aStreamBuffer.put(fixtures.binaryData);
		},
		
		"gave us data after the correct amount of time": function(time) {
			assert.isTrue(time >= 300);
		}
	},
	
	"Setting a custom initial size and increment amount": {
		topic: function() {
			return new streamBuffer.ReadableStreamBuffer({
				initialSize: 1,
				incrementAmount: 5
			});
		},

		"gives us correct initial backing buffer size": function(aStreamBuffer) {
			assert.equal(aStreamBuffer.maxSize(), 1);
		},
		
		"and writing to size of initial size": {
			topic: function(aStreamBuffer) {
				aStreamBuffer.put("ab");
				return aStreamBuffer;
			},
			
			"gives us correct incremented size of backing buffer": function(aStreamBuffer) {
				assert.equal(aStreamBuffer.maxSize(), 6);
			}
		}
	},
	
	"Destroying stream": {
		topic: function() {
			var that = this;
			
			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer();
			
			aStreamBuffer.on("data", function() {
				aStreamBuffer.dataCalled = true;
			});
			
			aStreamBuffer.on("end", function() {
				aStreamBuffer.endCalled = true;
			});
			
			aStreamBuffer.on("close", function() {
				that.callback(null, aStreamBuffer);
			});
			
			aStreamBuffer.put("asdf");
			aStreamBuffer.destroy();
		},
		
		"sets *readable* to false": function(aStreamBuffer) {
			assert.isFalse(aStreamBuffer.readable);
		},
		
		"*data* event was never called": function(aStreamBuffer) {
			assert.isFalse(aStreamBuffer.dataCalled || false);
		},
		
		"*end* event was called": function(aStreamBuffer) {
			assert.isTrue(aStreamBuffer.endCalled);
		}
	},
	
	"Data written in two chunks": {
		topic: function() {
			var that = this;

			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer({
				chunkSize: Math.ceil(fixtures.simpleString.length / 2)
			});
			aStreamBuffer.setEncoding("utf8");
			
			var chunks = [];
			aStreamBuffer.on("data", function(data) {
				chunks.push(data);
				if(chunks.length == 2) that.callback(null, chunks);
			});
			
			aStreamBuffer.put(fixtures.simpleString);
		},

		"chunks equal original value": function(chunks) {
			assert.equal(chunks[0] + chunks[1], fixtures.simpleString);
		}
	},
	
	"Writing unicode data in two writes": {
		topic: function() {
			var that = this;

			var aStreamBuffer = new streamBuffer.ReadableStreamBuffer();
			aStreamBuffer.pause();
			aStreamBuffer.put(fixtures.unicodeString);
			aStreamBuffer.put(fixtures.unicodeString);
			aStreamBuffer.resume();
			aStreamBuffer.setEncoding("utf8");
			aStreamBuffer.on("data", this.callback.bind(this, null));
		},

		"chunks equal original value": function(data) {
			assert.equal(data, fixtures.unicodeString + fixtures.unicodeString);
		}
	}
}).export(module);