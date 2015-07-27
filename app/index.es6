'use strict';

import {Base} from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';

import Generator from './generator';

export default class AngularJsModule extends Base {
    constructor(args, options, config) {
        super(args, options, config);

        this.yosay = yosay;
        this.chalk = chalk;

        this.gen = new Generator();
    }

    initializing() {
      this.pkg = require('../package.json');
    }

    prompting() {
      this.gen.sayHello.call(this);
    }

    writing() {
      var _app = {app: this.appName};
      var _username = {username: this.githubUsername};
      var _appAndUsername = {app: _app.app, username: _username.username};

      this.template('src/_app.js', 'src/' + _app.app + '.js', _app);
      this.template('tests/_app_test.js', 'tests/' + _app.app + '_test.js', _app);

      this.template('_package.json', 'package.json', _appAndUsername);
      this.template('_bower.json', 'bower.json', _appAndUsername);
      this.template('README.md', 'README.md', _appAndUsername);

      this.template('gulpfile.js', 'gulpfile.js', _app);
      this.template('karma.conf.js', 'karma.conf.js', _app);

      this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));
      this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
      this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
      this.fs.copy(this.templatePath('jshintrc'),this.destinationPath('.jshintrc'));
    }

    install() {
      this.installDependencies({skipInstall: this.options['skip-install']});
    }

    prompUser() {
      var done = this.async();

      var prompts =
        [
          {
            name: 'appName',
            message: 'What is the name of your app?'
          },
          {
            name: 'githubUsername',
            message: 'What is your username on Github?'
          }
        ];

      this.prompt(prompts, function(props)
      {
        this.appName = props.appName;
        this.githubUsername = props.githubUsername;

        done();

      }.bind(this));
    }
}
