"use strict";

import {Base} from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import _ from 'lodash';
import Generator from './generator';

export default class AngularJSModule extends Base {
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
      var _app = { app: this.appName };
      var _username = { username: this.githubUsername };
      var _repository = { repository: this.githubRepository };
      var _appAndUsername = { app: _app.app, username: _username.username };
      var _compileStyles = this.compileStyles;

      this.template('src/_app.js', 'src/' + _app.app.toLowerCase() + '.js', _app);
      this.template('tests/_app_test.js', 'tests/' + _app.app.toLowerCase() + '_test.js', _app)
      if (_compileStyles) {
        this.template('src/_app.css', 'src/' + _app.app.toLowerCase() + '.css', _app);
      }

      this.template('_package.json', 'package.json', _appAndUsername);

      this.template(_compileStyles ? '_bowerWithStyles.json' : '_bower.json', 'bower.json', _appAndUsername);
      this.template('README.md', 'README.md', _appAndUsername);

      this.template('gulpfile.js', 'gulpfile.js', _app);
      this.template('karma.conf.js', 'karma.conf.js', _app);

      this.fs.copy(this.templatePath('_.travis.yml'), this.destinationPath('.travis.yml'));
      this.fs.copy(this.templatePath('_.gitignore'), this.destinationPath('.gitignore'));
      this.fs.copy(this.templatePath('_editorconfig'), this.destinationPath('.editorconfig'));
      this.fs.copy(this.templatePath('_jshintrc'), this.destinationPath('.jshintrc'));
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
            name: 'githubRepository',
            message: 'What is your repository name on Github?',
            default: 'Leave empty to use your app name'
          },
          {
            name: 'githubUsername',
            message: 'What is your username on Github?'
          },
          {
            name: 'compileStyles',
            message: 'Are you using css with your module?',
            default: 'Y(es)/N(o)'
          }
        ];

      this.prompt(prompts, function(props)
      {
        this.appName = _.camelCase(props.appName);
        this.githubRepository = props.githubRepository || props.appName.toLowerCase();
        this.githubUsername = props.githubUsername.toLowerCase();
        this.compileStyles = /y(es)?/i.test(props.compileStyles);

        done();

      }.bind(this));
    }
}
