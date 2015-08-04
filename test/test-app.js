'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('angularjs-module:app', function() {
  describe('main generator file creation', function() {
    before(function(done) {
      helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompts({
          appName: 'my-app',
          githubUsername: 'someuser',
          githubRepository: 'repository',
          email: 'email@email.com',
          compileStyles: true
        })
        .on('end', done);
    });

    it('creates files', function() {
      var _fileArray = ['bower.json', 'package.json', '.editorconfig', '.travis.yml', 'gulpfile.js',
                        'README.md', '.jshintrc', '.gitignore', 'karma.conf.js', 'src/my-app.js', 'tests/my-app_test.js'];

      assert.file(_fileArray);
    });
  })
});
