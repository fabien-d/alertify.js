'use strict';

module.exports = Entry;

var Stream = require('stream').Stream;
var inherits = require('util').inherits;

inherits(Entry, Stream);

function Entry (pullStream) {
  this.pullStream = pullStream;
  Stream.call(this);

  this.writable = false;
  this.readable = true;

  this.props = {};
}

Entry.prototype.pause = function () {
  this.pullStream.pause();
};

Entry.prototype.resume = function () {
  this.pullStream.resume();
};
