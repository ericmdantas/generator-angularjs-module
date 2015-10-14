import path from 'path';
import {assert} from 'yeoman-generator';
import {test as helpers} from 'yeoman-generator';
import os from 'os';

describe('angularjs-module:app', () => {
  describe('main generator file creation', () => {
    before((done) => {
      helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompts({
          "appName": 'my-app',
          "githubUsername": 'someuser',
          "githubRepository": 'repository',
          "email": 'email@email.com',
          "compileStyles": true
        })
        .on('end', done);
    });

    it('creates files', () => {
      var _fileArray = ['bower.json', 'package.json', '.editorconfig', '.travis.yml', 'gulpfile.js',
                        'README.md', '.jshintrc', '.gitignore', 'karma.conf.js', 'src/my-app.js', 'tests/my-app_test.js'];

      assert.file(_fileArray);
    });
  })
});
