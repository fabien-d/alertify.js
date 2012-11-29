'use strict';

var nodeunit = require('nodeunit');
var fs = require("fs");
var path = require("path");
var streamBuffers = require("stream-buffers");
var PullStream = require('../');

module.exports = {
  "source sending 1-byte at a time": function (t) {
    var ps = new PullStream();
    ps.on('end', function () {
      sourceStream.destroy();
      t.done();
    });

    var sourceStream = new streamBuffers.ReadableStreamBuffer({
      frequency: 0,
      chunkSize: 1
    });
    sourceStream.put("Hello World!");

    sourceStream.pipe(ps);

    ps.pull('Hello'.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.equal('Hello', data.toString());
      t.equal(0, data.posInStream);

      var writableStream = new streamBuffers.WritableStreamBuffer({
        initialSize: 100
      });
      writableStream.on('close', function () {
        var str = writableStream.getContentsAsString('utf8');
        t.equal(' World', str);

        ps.pull(function (err, data) {
          if (err) {
            return t.done(err);
          }
          t.equal('!', data.toString());
          t.equal('Hello World'.length, data.posInStream);
        });
      });

      ps.pipe(' World'.length, writableStream);
    });
  },

  "source sending all data at once": function (t) {
    var ps = new PullStream();
    ps.on('end', function () {
      sourceStream.destroy();
      return t.done();
    });

    var sourceStream = new streamBuffers.ReadableStreamBuffer({
      frequency: 0,
      chunkSize: 1000
    });
    sourceStream.put("Hello World!");

    sourceStream.pipe(ps);

    ps.pull('Hello'.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.equal('Hello', data.toString());

      var writableStream = new streamBuffers.WritableStreamBuffer({
        initialSize: 100
      });
      writableStream.on('close', function () {
        var str = writableStream.getContentsAsString('utf8');
        t.equal(' World', str);

        ps.pull(function (err, data) {
          if (err) {
            return t.done(err);
          }
          t.equal('!', data.toString());
        });
      });

      ps.pipe(' World'.length, writableStream);
    });
  },

  "two length pulls": function (t) {
    var ps = new PullStream();
    ps.on('end', function () {
      sourceStream.destroy();
      return t.done();
    });

    var sourceStream = new streamBuffers.ReadableStreamBuffer({
      frequency: 0,
      chunkSize: 1000
    });
    sourceStream.put("Hello World!");

    sourceStream.pipe(ps);

    ps.pull('Hello'.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.equal('Hello', data.toString());

      ps.pull(' World!'.length, function (err, data) {
        if (err) {
          return t.done(err);
        }
        t.equal(' World!', data.toString());
      });
    });
  },

  "pulling zero bytes returns empty data": function (t) {
    var ps = new PullStream();

    var sourceStream = new streamBuffers.ReadableStreamBuffer({
      frequency: 0,
      chunkSize: 1000
    });
    sourceStream.put("Hello World!");

    sourceStream.pipe(ps);

    ps.pull(0, function (err, data) {
      if (err) {
        return t.done(err);
      }

      t.equal(0, data.length, "data is empty");
      sourceStream.destroy();
      return t.done();
    });
  },

  "read from file": function (t) {
    var ps = new PullStream();
    ps.on('end', function () {
      return t.done();
    });

    var sourceStream = fs.createReadStream(path.join(__dirname, 'testFile.txt'));

    sourceStream.pipe(ps);

    ps.pull('Hello'.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.equal('Hello', data.toString());

      ps.pull(' World!'.length, function (err, data) {
        if (err) {
          return t.done(err);
        }
        t.equal(' World!', data.toString());
      });
    });
  },

  "read from file pipe pause/resume": function (t) {
    var ps = new PullStream();

    var sourceStream = fs.createReadStream(path.join(__dirname, 'testFile.txt'));

    sourceStream.pipe(ps);

    ps.pause();
    ps.pull('Hello'.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.equal('Hello', data.toString());

      ps.pull(' World!'.length, function (err, data) {
        if (err) {
          return t.done(err);
        }
        t.equal(' World!', data.toString());

        ps.pull(5, function (err, data) {
          t.ok(err, 'end of file should happen');
          return t.done();
        });
      });
    });

    process.nextTick(function () {
      ps.resume();
    });
  },

  "pause/resume": function (t) {
    var ps = new PullStream();
    ps.on('end', function () {
      sourceStream.destroy();
      return t.done();
    });

    var sourceStream = new streamBuffers.ReadableStreamBuffer({
      frequency: 0,
      chunkSize: 1000
    });
    sourceStream.put("Hello World!");

    sourceStream.pipe(ps);

    ps.pause();
    process.nextTick(function () {
      ps.resume();
      ps.pull('Hello'.length, function (err, data) {
        if (err) {
          return t.done(err);
        }
        t.equal('Hello', data.toString());

        ps.pull(' World!'.length, function (err, data) {
          if (err) {
            return t.done(err);
          }
          t.equal(' World!', data.toString());
        });
      });
    });
  },

  "read past end of stream": function (t) {
    var ps = new PullStream();
    ps.on('end', function () {
      sourceStream.destroy();
      return t.done();
    });

    var sourceStream = new streamBuffers.ReadableStreamBuffer({
      frequency: 0,
      chunkSize: 1000
    });
    sourceStream.put("Hello World!");

    sourceStream.pipe(ps);

    ps.pull('Hello World!'.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.equal('Hello World!', data.toString());

      ps.pull(1, function (err, data) {
        if (err) {
          t.ok(err, 'should get an error');
          return; // ok
        }
        return t.done(new Error('should get an error'));
      });
    });
  },

  "pause/resume using writes": function (t) {
    var isResumed = false;
    var ps = new PullStream();
    ps.pause();
    ps.pull('Hello World!'.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.ok(isResumed, 'Stream is resumed');
      t.equal('Hello World!', data.toString());
      return t.done();
    });
    ps.write(new Buffer('Hello World!', 'utf8'));
    ps.end();
    setTimeout(function () {
      isResumed = true;
      ps.resume();
    }, 100);
  },

  "pause/resume using writes pause after first pull": function (t) {
    var isResumed = false;
    var ps = new PullStream();
    ps.pull('Hello '.length, function (err, data) {
      if (err) {
        return t.done(err);
      }
      t.equal('Hello ', data.toString());
      ps.pause();
      ps.pull('World!'.length, function (err, data) {
        if (err) {
          return t.done(err);
        }
        t.ok(isResumed, 'Stream is resumed');
        t.equal('World!', data.toString());

        ps.pull(10, function (err, data) {
          if (err) {
            t.ok(err, 'should be an error');
            return t.done(); // good
          }
          return t.done(new Error('should be end of file'));
        });
      });
      setTimeout(function () {
        isResumed = true;
        ps.resume();
      }, 100);
    });
    ps.write(new Buffer('Hello World!', 'utf8'));
    ps.end();
  },

  "pipe with no length": function (t) {
    var ps = new PullStream();

    var writableStream = new streamBuffers.WritableStreamBuffer({
      initialSize: 100
    });
    writableStream.on('close', function () {
      var str = writableStream.getContentsAsString('utf8');
      t.equal('Hello World!', str);
      t.done();
    });
    ps.pipe(writableStream);

    process.nextTick(function () {
      ps.write(new Buffer('Hello', 'utf8'));
      ps.write(new Buffer(' World', 'utf8'));
      process.nextTick(function () {
        ps.write(new Buffer('!', 'utf8'));
        ps.end();
      });
    });
  },

  "throw on calling data or end after end": function (t) {
    var ps = new PullStream();
    ps.end();

    try {
      ps.data(new Buffer('hello', 'utf8'));
      t.fail("should throw error");
    } catch (ex) {
      t.ok(ex);
    }

    try {
      ps.end(new Buffer('hello', 'utf8'));
      t.fail("should throw error");
    } catch (ex) {
      t.ok(ex);
    }

    t.done();
  }
};

