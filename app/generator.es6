export default class Generator {
  sayHello() {
    this.log(this.yosay(`Welcome to the splendid ${this.chalk.green('AngularJS Module')} generator!`));
  }
}
