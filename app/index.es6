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
  }

  initializing() {
    this.pkg = require('../package.json');
  }

  prompting() {
    this.gen.sayHello.call(this);
  }

    writing() {
      var _variables = {
        app: this.appName,
        username: this.githubUsername,
        email: this.email,
        repository: this.githubRepository,
        compileStyles: this.compileStyles
      };

      this.template('src/_app.js', 'src/' + this.appName.toLowerCase() + '.js', _variables);
      this.template('tests/_app_test.js', 'tests/' + this.appName.toLowerCase() + '_test.js', _variables)
      if (this.compileStyles) {
        this.template('src/_app.css', 'src/' + this.appName.toLowerCase() + '.css', _variables);
      }

      this.template('_package.json', 'package.json', _variables);

      this.template('_bower.json', 'bower.json', _variables);
      this.template('README.md', 'README.md', _variables);

      this.template('gulpfile.js', 'gulpfile.js', _variables);
      this.template('karma.conf.js', 'karma.conf.js', _variables);

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
            default: _.camelCase(this.appname)
          },
          {
            type: 'input',
            name: 'githubRepository',
            message: 'What is your repository name on Github?',
            default: this.appname.toLowerCase()
          },
          {
            type: 'input',
            name: 'githubUsername',
            message: 'What is your username on Github?'
          },
          {
            type: 'input',
            name: 'email',
            message: 'What is your email?'
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
        this.githubRepository = props.githubRepository;
        this.githubUsername = props.githubUsername;
        this.email = props.email;
        this.compileStyles = props.compileStyles;

        done();

      }.bind(this));
    }
}
