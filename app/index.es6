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
    this.lodash = _;

    this.gen = new Generator();
  }

  initializing() {
    this.pkg = require('../package.json');
  }

  sayHello() {
    this.gen.sayHello.call(this);
  }

  copyFiles() {
    this.gen.copyFiles.call(this);
  }

  installStuff() {
    this.gen.installDependencies.call(this);
  }

  prompUser() {
    this.gen.promptOptions.call(this);
  }
}
