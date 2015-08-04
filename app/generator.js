"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = (function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, [{
    key: "sayHello",
    value: function sayHello(generator) {
      generator.log(generator.yosay("Welcome to the splendid " + generator.chalk.green('AngularJS Module') + " generator!"));
    }
  }, {
    key: "getVariables",
    value: function getVariables(generator) {
      var _variables = {
        app: generator.appName,
        username: generator.githubUsername,
        email: generator.email,
        repository: generator.githubRepository,
        compileStyles: generator.compileStyles,
        main: generator.compileStyles ? ["dist/" + generator.appName.toLowerCase() + ".js", "dist/" + generator.appName.toLowerCase() + ".css"] : "dist/" + generator.appName.toLowerCase() + ".js"
      };

      _variables.main = JSON.stringify(_variables.main);

      return _variables;
    }
  }, {
    key: "copyFiles",
    value: function copyFiles(generator) {
      var _variables = this.getVariables(generator);

      generator.template('src/_app.js', 'src/' + generator.appName.toLowerCase() + '.js', _variables);
      generator.template('tests/_app_test.js', 'tests/' + generator.appName.toLowerCase() + '_test.js', _variables);

      if (generator.compileStyles) {
        generator.template('src/_app.css', 'src/' + generator.appName.toLowerCase() + '.css', _variables);
      }

      generator.template('_package.json', 'package.json', _variables);

      generator.template('_bower.json', 'bower.json', _variables);
      generator.template('README.md', 'README.md', _variables);

      generator.template('gulpfile.js', 'gulpfile.js', _variables);
      generator.template('karma.conf.js', 'karma.conf.js', _variables);

      generator.fs.copy(generator.templatePath('_.travis.yml'), generator.destinationPath('.travis.yml'));
      generator.fs.copy(generator.templatePath('_.gitignore'), generator.destinationPath('.gitignore'));
      generator.fs.copy(generator.templatePath('_editorconfig'), generator.destinationPath('.editorconfig'));
      generator.fs.copy(generator.templatePath('_jshintrc'), generator.destinationPath('.jshintrc'));
    }
  }, {
    key: "installDependencies",
    value: function installDependencies(generator) {
      generator.installDependencies({ skipInstall: generator.options['skip-install'] });
    }
  }, {
    key: "promptOptions",
    value: function promptOptions(generator) {
      var done = generator.async();

      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
        "default": generator.lodash.camelCase(generator.appname)
      }, {
        type: 'input',
        name: 'githubRepository',
        message: 'What is your repository name on Github?',
        "default": generator.appname.toLowerCase()
      }, {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your username on Github?'
      }, {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
      }, {
        type: 'confirm',
        name: 'compileStyles',
        message: 'Are you using css with your module?',
        "default": false
      }];

      generator.prompt(prompts, (function (props) {
        generator.appName = props.appName;
        generator.githubRepository = props.githubRepository;
        generator.githubUsername = props.githubUsername;
        generator.email = props.email;
        generator.compileStyles = props.compileStyles;

        done();
      }).bind(generator));
    }
  }]);

  return Generator;
})();

exports["default"] = Generator;
module.exports = exports["default"];