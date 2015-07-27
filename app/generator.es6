export default class Generator {
  sayHello() {
    this.log(this.yosay(`Welcome to the terrific ${this.chalk.green('AngularJS Module')} generator!`));
  }
}
