'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');

var AngularJsModule = function(args, options, config)
{
    yeoman.generators.Base.apply(this, arguments);
}

util.inherits(AngularJsModule, yeoman.generators.Base);

AngularJsModule.prototype.initializing = function()
{
  this.pkg = require('../package.json');
}

AngularJsModule.prototype.prompting = function()
{
  this.log(yosay('Welcome to the terrific ' + chalk.green('AngularJS Module') + ' generator!'));

}

AngularJsModule.prototype.writing = function()
{
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

AngularJsModule.prototype.install = function()
{
  this.installDependencies({skipInstall: this.options['skip-install']});
}

AngularJsModule.prototype.prompUser = function()
{
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

module.exports = AngularJsModule;
