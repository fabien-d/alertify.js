pullstream
==========

Tired of getting a firehose worth of data from your streams. This module is here to save the day. PullStream allows
you to pull data when you want and as much as you want.

## Quick Examples

```javascript
var PullStream = require('pullstream');
var fs = require('fs');

var ps = new PullStream();
var loremIpsumStream = fs.createReadStream('loremIpsum.txt');
var outputStream = fs.createWriteStream(path.join(__dirname, 'loremIpsum.out'));

loremIpsumStream.pipe(ps);

// pull 5 bytes
ps.pull(5, function(err, data) {
  console.log(data.toString('utf8'));

  // pipe the next 100 to a file
  ps.pipe(100, outputStream).on('end', function () {
    console.log('all done');
  });
});
```

# API Index

## PullStream
 * [pull](#pullStreamPull)
 * [pipe](#pullStreamPipe)
 * [write](#pullStreamWrite)
 * [end](#pullStreamEnd)

# API Documentation

<a name="pullStream"/>
## PullStream

<a name="pullStreamPull" />
### ps.pull([number], callback)

Calls a callback when the specified number of bytes are ready. If no number is specified pull will read until the end
of the input stream.

__Arguments__

* number (optional) - Number of bytes to wait for. If not specified reads to the end of input stream.
* callback(err, data) - Callback called when the bytes are ready. data is a buffer containing the bytes.

__Example__

```javascript
var ps = new PullStream();

ps.pull(5, function(err, data) {
  console.log(data.toString('utf8'));
});
```

<a name="pullStreamPipe" />
### ps.pipe([number], destStream)

Pipes the specified number of bytes to destStream. If a number is not specified pipe will pipe the remainder
of the input stream to destStream.

__Arguments__

* number (optional) - Number of bytes to pipe. If not specified pipe the rest of input stream.
* destStream - The stream to pipe data to.

__Returns__

Returns destStream.

__Example__

```javascript
var ps = new PullStream();
var outputStream = fs.createWriteStream(path.join(__dirname, 'loremIpsum.out'));

ps.pipe(100, out).on('end', function() {
  console.log('done with pipe');
});
```

<a name="pullStreamWrite" />
### ps.write(data)

Writes data to input side of a pull stream.

__Arguments__

* data - Buffer to write to the input side of the pull stream.

__Example__

```javascript
var ps = new PullStream();

ps.pull(5, function(err, data) {
  console.log(data.toString('utf8'));
});

ps.write(new Buffer('Hello World', 'utf8'));
```

<a name="pullStreamEnd" />
### ps.end()

Manually ends a pull stream.

__Example__

```javascript
var ps = new PullStream();

ps.pull(5, function(err, data) {
  console.log(data.toString('utf8'));
});

ps.write(new Buffer('Hello World', 'utf8'));
ps.end();
```
