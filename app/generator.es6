export default class Generator {
  sayHello() {
    console.log('alo! :DDDDDDDDDDDDDDDDDDD')

    this.log(this.yosay(`Welcome to the splendid ${this.chalk.green('AngularJS Module')} generator!`));
  }
}
