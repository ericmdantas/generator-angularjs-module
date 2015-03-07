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
  this.log(yosay('Welcome to the terrific ' + chalk.red('AngularJS Module') + ' generator!'));

}

AngularJsModule.prototype.writing = function()
{
  this.fs.copy(this.templatePath('_app.js'),this.destinationPath('src/app.js'));
  this.fs.copy(this.templatePath('_app_test.js'),this.destinationPath('tests/app_test.js'));

  this.fs.copy(this.templatePath('_package.json'),this.destinationPath('package.json'));
  this.fs.copy(this.templatePath('_bower.json'),this.destinationPath('bower.json'));

  this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));

  this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
  this.fs.copy(this.templatePath('karma.conf.js'), this.destinationPath('karma.conf.js'));

  this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));
  this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
  this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
  this.fs.copy(this.templatePath('jshintrc'),this.destinationPath('.jshintrc'));
}

AngularJsModule.prototype.install = function()
{
  this.installDependencies({skipInstall: this.options['skip-install']});
}

module.exports = AngularJsModule;
