"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");

var AngularJsModule = (function (_yeoman$generators$Base) {
  function AngularJsModule(args, options, config) {
    _classCallCheck(this, AngularJsModule);

    yeoman.generators.Base.apply(this, arguments);
  }

  _inherits(AngularJsModule, _yeoman$generators$Base);

  AngularJsModule.prototype.initializing = function initializing() {
    this.pkg = require("../package.json");
  };

  AngularJsModule.prototype.prompting = function prompting() {
    this.log(yosay("Welcome to the terrific " + chalk.green("AngularJS Module") + " generator!"));
  };

  return AngularJsModule;
})(yeoman.generators.Base);

module.exports = AngularJsModule;

AngularJsModule.prototype.writing = function () {
  var _app = { app: this.appName };
  var _username = { username: this.githubUsername };
  var _appAndUsername = { app: _app.app, username: _username.username };

  this.template("src/_app.js", "src/" + _app.app + ".js", _app);
  this.template("tests/_app_test.js", "tests/" + _app.app + "_test.js", _app);

  this.template("_package.json", "package.json", _appAndUsername);
  this.template("_bower.json", "bower.json", _appAndUsername);
  this.template("README.md", "README.md", _appAndUsername);

  this.template("gulpfile.js", "gulpfile.js", _app);
  this.template("karma.conf.js", "karma.conf.js", _app);

  this.fs.copy(this.templatePath("_.travis.yml"), this.destinationPath(".travis.yml"));
  this.fs.copy(this.templatePath("_.gitignore"), this.destinationPath(".gitignore"));
  this.fs.copy(this.templatePath("_editorconfig"), this.destinationPath(".editorconfig"));
  this.fs.copy(this.templatePath("_jshintrc"), this.destinationPath(".jshintrc"));
};

AngularJsModule.prototype.install = function () {
  this.installDependencies({ skipInstall: this.options["skip-install"] });
};

AngularJsModule.prototype.prompUser = function () {
  var done = this.async();

  var prompts = [{
    name: "appName",
    message: "What is the name of your app?"
  }, {
    name: "githubUsername",
    message: "What is your username on Github?"
  }];

  this.prompt(prompts, (function (props) {
    this.appName = props.appName;
    this.githubUsername = props.githubUsername;

    done();
  }).bind(this));
};

module.exports = AngularJsModule;
