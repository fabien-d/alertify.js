'use strict';

module.exports = Parse.create = Parse;

var PullStream = require('pullstream');
var Stream = require('stream').Stream;
var inherits = require('util').inherits;
var zlib = require('zlib');
var binary = require('binary');
var Entry = require('./entry');

inherits(Parse, Stream);

function Parse() {
  var self = this;
  if (!(this instanceof Parse)) {
    return new Parse();
  }

  Stream.apply(this);

  this.writable = true;
  this.readable = true;
  this._pullStream = new PullStream();

  this._pullStream.on("error", function (e) {
    self.emit('error', e);
  });

  /*this._pullStream.on("end", function () {
    self.emit('end');
  });*/

  this._readRecord();
}

Parse.prototype._readRecord = function () {
  var self = this;
  this._pullStream.pull(4, function (err, data) {
    if (err) {
      return self.emit('error', err);
    }

    if (data.length === 0) {
      return;
    }

    var signature = data.readUInt32LE(0);
    if (signature === 0x04034b50) {
      self._readFile();
    } else if (signature === 0x02014b50) {
      self._readCentralDirectoryFileHeader();
    } else if (signature === 0x06054b50) {
      self._readEndOfCentralDirectoryRecord();
    } else {
      err = new Error('invalid signature: 0x' + signature.toString(16) + ' (at position: 0x' + data.posInStream.toString(16) + ')');
      self.emit('error', err);
    }
  });
};

Parse.prototype._readFile = function () {
  var self = this;
  this._pullStream.pull(26, function (err, data) {
    if (err) {
      return self.emit('error', err);
    }

    var vars = binary.parse(data)
      .word16lu('versionsNeededToExtract')
      .word16lu('flags')
      .word16lu('compressionMethod')
      .word16lu('lastModifiedTime')
      .word16lu('lastModifiedDate')
      .word32lu('crc32')
      .word32lu('compressedSize')
      .word32lu('uncompressedSize')
      .word16lu('fileNameLength')
      .word16lu('extraFieldLength')
      .vars;

    return self._pullStream.pull(vars.fileNameLength, function (err, fileName) {
      if (err) {
        return self.emit('error', err);
      }
      fileName = fileName.toString('utf8');
      var entry = new Entry(self._pullStream);
      entry.path = fileName;
      entry.props.path = fileName;
      entry.type = (vars.compressedSize === 0 && /[\/\\]$/.test(fileName)) ? 'Directory' : 'File';
      entry.size = vars.uncompressedSize;

      self.emit('entry', entry);

      self._pullStream.pull(vars.extraFieldLength, function (err, extraField) {
        if (err) {
          return self.emit('error', err);
        }
        if (vars.compressionMethod === 0) {
          self._pullStream.pull(vars.compressedSize, function (err, compressedData) {
            if (err) {
              return self.emit('error', err);
            }

            entry.emit('data', compressedData);
            entry.emit('end');

            return self._readRecord();
          });
        } else {
          var inflater = zlib.createInflateRaw();
          inflater.on('error', function (err) {
            self.emit('error', err);
          });
          inflater.on('end', function () {
            entry.emit('end');
            self._readRecord();
          });
          inflater.on('data', function (uncompressedData) {
            entry.emit('data', uncompressedData);
          });
          self._pullStream.pipe(vars.compressedSize, inflater);
        }
      });
    });
  });
};

Parse.prototype._readCentralDirectoryFileHeader = function () {
  var self = this;
  this._pullStream.pull(42, function (err, data) {
    if (err) {
      return self.emit('error', err);
    }

    var vars = binary.parse(data)
      .word16lu('versionMadeBy')
      .word16lu('versionsNeededToExtract')
      .word16lu('flags')
      .word16lu('compressionMethod')
      .word16lu('lastModifiedTime')
      .word16lu('lastModifiedDate')
      .word32lu('crc32')
      .word32lu('compressedSize')
      .word32lu('uncompressedSize')
      .word16lu('fileNameLength')
      .word16lu('extraFieldLength')
      .word16lu('fileCommentLength')
      .word16lu('diskNumber')
      .word16lu('internalFileAttributes')
      .word32lu('externalFileAttributes')
      .word32lu('offsetToLocalFileHeader')
      .vars;

    return self._pullStream.pull(vars.fileNameLength, function (err, fileName) {
      if (err) {
        return self.emit('error', err);
      }
      fileName = fileName.toString('utf8');

      self._pullStream.pull(vars.extraFieldLength, function (err, extraField) {
        if (err) {
          return self.emit('error', err);
        }
        self._pullStream.pull(vars.fileCommentLength, function (err, fileComment) {
          if (err) {
            return self.emit('error', err);
          }
          return self._readRecord();
        });
      });
    });
  });
};

Parse.prototype._readEndOfCentralDirectoryRecord = function () {
  var self = this;
  this._pullStream.pull(18, function (err, data) {
    if (err) {
      return self.emit('error', err);
    }

    var vars = binary.parse(data)
      .word16lu('diskNumber')
      .word16lu('diskStart')
      .word16lu('numberOfRecordsOnDisk')
      .word16lu('numberOfRecords')
      .word32lu('sizeOfCentralDirectory')
      .word32lu('offsetToStartOfCentralDirectory')
      .word16lu('commentLength')
      .vars;

    return self._pullStream.pull(vars.commentLength, function (err, comment) {
      if (err) {
        return self.emit('error', err);
      }
      comment = comment.toString('utf8');
      self.emit('end');
      return self.emit('close');
    });
  });
};

Parse.prototype.write = function (data) {
  this._pullStream.write(data);
};

Parse.prototype.end = function (data) {
  this._pullStream.end(data);
};

Parse.prototype.pipe = function (dest, opts) {
  var self = this;
  if (typeof dest.add === "function") {
    self.on("entry", function (entry) {
      dest.add(entry);
    })
  }
  return Stream.prototype.pipe.apply(this, arguments);
};
