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
    this.gen.sayHello(this);
  }

  askFor() {
    this.gen.promptOptions(this);
  }

  copyFiles() {
    this.gen.copyFiles(this);
  }

  installStuff() {
    this.gen.installDependencies(this);
  }
}
