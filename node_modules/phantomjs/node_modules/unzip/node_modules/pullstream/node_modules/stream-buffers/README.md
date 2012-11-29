# Node Stream Buffers

... For lack of a cooler (or less confusing) name.

Simple Readable and Writable Streams that use a Buffer to store received data, or for data to send out. Pretty much to be used for automated test-cases or debugging.

## Installation

It's on NPM.

	npm install stream-buffers

## Usage

To use the stream buffers in your module, simply import it and away you go.

	var streamBuffers = require("stream-buffers");

### Writable StreamBuffer

Writable Stream Buffers implement the standardized writable stream interface. All write()'s to this object will accumulate in an internal Buffer. If the Buffer overflows it will be resized larger automatically. The initial size of the Buffer and the amount in which it grows can be configured in the constructor.

	var myWritableStreamBuffer = new streamBuffers.WritableStreamBuffer({
		initialSize: (100 * 1024),		// start as 100 kilobytes.
		incrementAmount: (10 * 1024)	// grow by 10 kilobytes each time buffer overflows.
	});
	
The default initial size and increment amount are stored in the following constants:

	streamBuffers.DEFAULT_INITIAL_SIZE 		// (8 * 1024)
	streamBuffers.DEFAULT_INCREMENT_AMOUNT	// (8 * 1024)

Writing is standard Stream stuff:

	myWritableStreamBuffer.write(myBuffer);
	// - or -
	myWritableStreamBuffer.write("\u00bd + \u00bc = \u00be", "utf8");

You can query the size of the data being held in the Buffer, and also how big the Buffer's max capacity currently is: 

	myWritableStreamBuffer.write("ASDF");
	streamBuffers.size();			// 4.
	streamBuffers.maxSize();		// Whatever was configured as initial size. In our example: (100 * 1024).

Retrieving the contents of the Buffer is simple:

	myWritableStreamBuffer.getContents();					// Gets all held data as a Buffer.
	myWritableStreamBuffer.getContentsAsString("utf8");		// Gets all held data as a utf8 string.
	myWritableStreamBuffer.getContents(5);					// Gets first 5 bytes as a Buffer.
	myWritableStreamBuffer.getContentsAsString("utf8", 5);	// Gets first 5 bytes as a utf8 string.

Care should be taken when getting encoded strings from WritableStream, as it doesn't really care about the contents (multi-byte characters will not be respected).
 
Destroying or ending the WritableStream will not delete the contents of Buffer, but will disallow any further writes:

	myWritableStreamBuffer.write("ASDF");
	myWritableStreamBuffer.destroy();
	
	myWritableStreamBuffer.getContents();		// Returns ASDF in Buffer.
	myWritableStreamBuffer.write("Yeah?");		// No effect.
	

### Readable StreamBuffer

Readable Stream Buffers can have data inserted in them, which will then be pumped out via standard readable stream data events. The data to be sent out is held in a Buffer, which can grow in much the same way as a WritableStream Buffer does, if data is being put in Buffer faster than it's being pumped out. 

The frequency in which chunks are pumped out, and the size of the chunks themselves can be configured in the constructor. The initial size and increment amount of internal Buffer can be configured too.

	var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
		frequency: 10		// in milliseconds.
		chunkSize: 2048		// in bytes.
	});

Default frequency and chunk size:

	streamBuffers.DEFAULT_CHUNK_SIZE 		// (1024)
	streamBuffers.DEFAULT_FREQUENCY			// (1)

Putting data in Buffer to be pumped out is easy:

	myReadableStreamBuffer.put(aBuffer);
	myReadableStreamBuffer.put("A String", "utf8");
	
Chunks are pumped out via standard readable stream spec: 

	myReadableStreamBuffer.on("data", function(data) {
		// Yup.
		assert.isTrue(data instanceof Buffer);
	});

setEncoding() for streams is respected too:

	myReadableStreamBuffer.setEncoding("utf8");
	myReadableStreamBuffer.on("data", function(data) {
		assert.isTrue(data instanceof String);
	});
	
Pause and resume are also implemented. pause()'ing stream will allow buffer to continue accumulating, but will not pump any of that data out until it is resume()'d again. 

Destroying the stream will immediately purge the buffer, unless destroySoon() is called, in which case the rest of the buffer will be written out. Either way, any further attempts to put data in the Buffer will be silently ignored. 

	myReadableStreamBuffer.destroySoon();
	myReadableStreamBuffer.put("A String!");
	myReadableStreamBuffer.size();			// will be 0.
	
## Disclaimer

Not supposed to be a speed demon, it's more for tests/debugging or weird edge cases. It works with an internal buffer that it copies contents to/from/around.