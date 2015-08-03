"use strict";

import {Base} from 'yeoman-generator';
import chalk from 'chalk';
import yosay from 'yosay';
import Generator from './generator';
import _ from 'lodash';

export default class AngularJSModule extends Base {
  constructor(args, options, config) {
    super(args, options, config);
    this.yosay = yosay;
    this.chalk = chalk;

    this.gen = new Generator();

    this.argument('appname', { type: String, required: true });
    this.appName = _.camelCase(this.appname);
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
      var _appUsernameAndRepository = { app: _app.app, username: _username.username, repository: this.githubRepository };
      var _compileStyles = this.compileStyles;

      this.template('src/_app.js', 'src/' + _app.app.toLowerCase() + '.js', _app);
      this.template('tests/_app_test.js', 'tests/' + _app.app.toLowerCase() + '_test.js', _app)
      if (_compileStyles) {
        this.template('src/_app.css', 'src/' + _app.app.toLowerCase() + '.css', _app);
      }

      this.template('_package.json', 'package.json', _appUsernameAndRepository);

      this.template(_compileStyles ? '_bowerWithStyles.json' : '_bower.json', 'bower.json', _appUsernameAndRepository);
      this.template('README.md', 'README.md', _appUsernameAndRepository);

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
            type: 'input',
            name: 'appName',
            message: 'What is the name of your app?',
            default: this.appName
          },
          {
            type: 'input',
            name: 'githubRepository',
            message: 'What is your repository name on Github?',
            default: this.appName
          },
          {
            type: 'input',
            name: 'githubUsername',
            message: 'What is your username on Github?'
          },
          {
            type: 'confirm',
            name: 'compileStyles',
            message: 'Are you using css with your module?',
            default: false
          }
        ];

      this.prompt(prompts, function(props)
      {
        this.appName = props.appName;
        this.githubRepository = props.githubRepository.toLowerCase();
        this.githubUsername = props.githubUsername;
        this.compileStyles = props.compileStyles;

        done();

      }.bind(this));
    }
}
