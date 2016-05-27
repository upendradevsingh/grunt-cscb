/*
 * grunt-cscb
 * https://github.com/upendradevsingh/cscb#README.md
 *
 * Copyright (c) 2016 Upendra Dev Singh
 * Licensed under the MIT license.
 */

'use strict';

var bust = require('cscb');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('cscb', 'Css busting', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var done = this.async();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return bust({
          src: process.cwd() + '/' + filepath.replace(/\/$/,''),
          dest: process.cwd() + '/' + f.dest + 'assets.json',
          cb: done
        });
      });

      grunt.log.writeln('File "' + f.dest + 'assets.json' + '" created.');

    });
  });

};

