'use strict';

module.exports = Extract;

var Parse = require("../unzip").Parse;
var Writer = require("fstream").Writer;
var Stream = require('stream').Stream;
var path = require('path');
var inherits = require('util').inherits;

inherits(Extract, Stream);

function Extract (opts) {
  var self = this;
  if (!(this instanceof Extract)) {
    return new Extract(opts);
  }

  Stream.apply(this);

  this.writable = true;
  this.readable = true;

  this._parser = Parse();
  this._parser.on('error', function(err) {
    self.emit('error', err);
  });

  var writer = Writer(opts);
  writer.on('error', function(err) {
    self.emit('error', err);
  });
  writer.on('close', function() {
    self.emit("end");
    self.emit("close");
  });

  this._parser.pipe(writer);
}

Extract.prototype.write = function (data) {
  this._parser.write(data);
};

Extract.prototype.end = function (data) {
  this._parser.end(data);
};

Extract.prototype.pipe = function (dest, opts) {
  var self = this;
  if (typeof dest.add === "function") {
    self.on("entry", function (entry) {
      dest.add(entry);
    })
  }
  return this._parser.pipe.apply(this, arguments);
};