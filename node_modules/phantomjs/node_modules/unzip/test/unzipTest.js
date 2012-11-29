'use strict';

var test = require('tap').test;
var fs = require('fs');
var path = require('path');
var fstream = require('fstream');
var temp = require('temp');
var dirdiff = require('dirdiff');
var unzip = require('../');

test("uncompressed archive", function (t) {
  var archive = path.join(__dirname, '../testData/uncompressed/archive.zip');

  temp.mkdir('node-unzip-', function (err, dirPath) {
    if (err) {
      throw err;
    }
    var unzipExtractor = unzip.Extract({ path: dirPath });
    unzipExtractor.on('error', function(err) {
      throw err;
    });
    unzipExtractor.on('end', testExtractionResults);

    fs.createReadStream(archive).pipe(unzipExtractor);

    function testExtractionResults() {
      dirdiff(path.join(__dirname, '../testData/uncompressed/inflated'), dirPath, {
        fileContents: true
      }, function (err, diffs) {
        if (err) {
          throw err;
        }
        t.equal(0, diffs.length, 'extracted directory contents');
        t.end();
      });
    }
  });
});

test("compressed archive", function (t) {
  var archive = path.join(__dirname, '../testData/compressed/archive.zip');

  temp.mkdir('node-unzip-', function (err, dirPath) {
    if (err) {
      throw err;
    }
    var unzipExtractor = unzip.Extract({ path: dirPath });
    unzipExtractor.on('error', function(err) {
      throw err;
    });
    unzipExtractor.on('end', testExtractionResults);

    fs.createReadStream(archive).pipe(unzipExtractor);

    function testExtractionResults() {
      dirdiff(path.join(__dirname, '../testData/compressed/inflated'), dirPath, {
        fileContents: true
      }, function (err, diffs) {
        if (err) {
          throw err;
        }
        t.equal(0, diffs.length, 'extracted directory contents');
        t.end();
      });
    }
  });
});
