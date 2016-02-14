"use strict";

const Base = require('yeoman-generator').Base;
const chalk = require('chalk');
const yosay = require('yosay');
const Generator = require('./generator');
const _ = require('lodash');

module.exports = class AngularJSModule extends Base {
  constructor(args, options, config) {
    super(args, options, config);

    this.yosay = yosay;
    this.chalk = chalk;
    this.lodash = _;

    this.gen = new Generator();
  }

  initializing() {
    this.pkg = require('../package.json');
  }

  sayHello() {
    this.gen.sayHello(this);
  }

  askFor() {
    this.gen.promptOptions(this);
  }

  askForCss() {
    this.gen.promptOptionsCssNg1(this);
  }

  askForWorker() {
    this.gen.promptOptionsWorker(this);
  }

  copyFiles() {
    this.gen.copyFiles(this);
  }

  installStuff() {
    this.gen.installDependencies(this);
  }
}
