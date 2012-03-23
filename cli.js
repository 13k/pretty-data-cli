#!/usr/bin/env node

(function() {
  "use strict";

  function version() {
    var pkg = JSON.parse(fs.readFileSync("package.json"));
    console.error("%s %s (%s)", pkg.name, pkg.version, pkg.homepage);
  }

  function err() {
    console.error("%s. See pretty -h for usage.", util.format.apply({}, arguments));
    process.exit(1);
  }

  function verifyType(type) {
    if (SUPPORTED_TYPES.indexOf(opts.type) < 0) {
      err("Type %s not supported", opts.type);
    }
  }

  function requireType(type) {
    if (!opts.type) {
      err("Type missing");
    }

    verifyType(type);
  }

  function guessType(file) {
    var type;
    // try to guess from file extension
    if (type = SUPPORTED_MIME_TYPES[mime.lookup(file)]) {
      return type;
    }
    return null;
  }

  function prettyPrint(data, type) {
    console.log(pd[type].call(pd, data));
  }

  function minify(data, type) {
    console.log(pd[type + "min"].call(pd, data));
  }

  function print(data, type, minified) {
    if (minified) {
      minify(data, type);
    } else {
      prettyPrint(data, type);
    }
  }

  function readFromStdin(type, minified) {
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
      print(chunk, type, minified);
    });
  }

  /**
   * Reads content from file and guess filetype if type not given
   */
  function readFromFile(file, type, minified) {
    if (!type && !(type = guessType(file))) {
      console.error("Could not determine or not supported file type for file %s", file);
      return;
    }

    print(fs.readFileSync(file, 'utf8'), type, minified);
  }

  var SUPPORTED_TYPES = ["json", "xml", "css", "sql"],
      SUPPORTED_MIME_TYPES = require('./lib/mime-types');

  var fs = require('fs'),
      util = require('util'),
      nomnom = require('nomnom'),
      pd = require('pretty-data').pd,
      mime = require('mime'),
      opts, args;

  mime.define({
    'application/x-sql': ['sql']
  });

  opts = nomnom.script("pretty")
    .options({
      type: {
        abbr: 't',
        metavar: 'TYPE',
        help: 'Data TYPE. If not present, will guess from file extension. Required if no FILE(s) given.'
      },
      minify: {
        abbr: 'm',
        flag: true,
        help: 'Minify instead of pretty print.'
      },
      version: {
        abbr: 'v',
        flag: true,
        help: 'Show version.'
      },
      files: {
        position: 0,
        metavar: 'FILE(s)',
        list: true,
        help: 'Read from FILE(s). Optional.'
      }
    }).parse();

  if (opts.version) {
    version();
    process.exit(0);
  }

  if (opts.files) {
    if ((opts.files.length == 1) && (opts.files[0] == "-")) {
      requireType(opts.type);
      readFromStdin(opts.type, opts.minify);
      return;
    }

    if (opts.type) {
      verifyType(opts.type);
    }

    opts.files.forEach(function(file) {
      readFromFile(file, opts.type, opts.minify);
    });
  } else {
    requireType(opts.type);
    readFromStdin(opts.type, opts.minify);
  }
}());
