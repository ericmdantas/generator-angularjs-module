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
        ngVersion: generator.ngVersion,
        repository: generator.githubRepository,
        compileStyles: generator.compileStyles,
        main: generator.compileStyles ? ["dist/" + generator.appName.toLowerCase() + ".min.js", "dist/" + generator.appName.toLowerCase() + ".min.css"] : "dist/" + generator.appName.toLowerCase() + ".min.js"
      };

      _variables.main = JSON.stringify(_variables.main);

      return _variables;
    }
  }, {
    key: "_copyFilesNg1",
    value: function _copyFilesNg1(generator, variables) {
      generator.template('ng1/src/_app.js', 'src/' + generator.appName.toLowerCase() + '.js', variables);
      generator.template('ng1/tests/_app_test.js', 'tests/' + generator.appName.toLowerCase() + '_test.js', variables);

      if (generator.compileStyles) {
        generator.template('ng1/src/_app.css', 'src/' + generator.appName.toLowerCase() + '.css', variables);
      }

      generator.template('ng1/_package.json', 'package.json', variables);

      if (generator.ngVersion === "ng1") {
        generator.template('ng1/_bower.json', 'bower.json', variables);
      }

      generator.template('ng1/README.md', 'README.md', variables);

      generator.template('ng1/gulpfile.babel.js', 'gulpfile.babel.js', variables);
      generator.template('ng1/karma.conf.js', 'karma.conf.js', variables);

      generator.fs.copy(generator.templatePath('ng1/_.travis.yml'), generator.destinationPath('.travis.yml'));
      generator.fs.copy(generator.templatePath('ng1/_.gitignore'), generator.destinationPath('.gitignore'));
      generator.fs.copy(generator.templatePath('ng1/_editorconfig'), generator.destinationPath('.editorconfig'));
      generator.fs.copy(generator.templatePath('ng1/_jshintrc'), generator.destinationPath('.jshintrc'));
    }
  }, {
    key: "_copyFilesNg2",
    value: function _copyFilesNg2(generator, variables) {
      if (generator.ng2worker) {
        generator.template('ng2/src/_app_worker.ts', 'src/' + generator.appName.toLowerCase() + '.ts', variables);
      } else {
        generator.template('ng2/src/_app.ts', 'src/' + generator.appName.toLowerCase() + '.ts', variables);
      }

      generator.template('ng2/src/_app.html', 'src/' + generator.appName.toLowerCase() + '.html', variables);
      generator.template('ng2/src/_app.css', 'src/' + generator.appName.toLowerCase() + '.css', variables);
      generator.template('ng2/tests/_app_test.ts', 'tests/' + generator.appName.toLowerCase() + '_test.ts', variables);

      generator.template('ng2/_package.json', 'package.json', variables);

      generator.template('ng2/README.md', 'README.md', variables);

      generator.template('ng2/gulpfile.babel.js', 'gulpfile.babel.js', variables);
      generator.template('ng2/karma.conf.js', 'karma.conf.js', variables);

      generator.fs.copy(generator.templatePath('ng2/tsconfig.json'), generator.destinationPath('tsconfig.json'));
      generator.fs.copy(generator.templatePath('ng2/tsd.json'), generator.destinationPath('tsd.json'));

      generator.fs.copy(generator.templatePath('ng2/_.travis.yml'), generator.destinationPath('.travis.yml'));
      generator.fs.copy(generator.templatePath('ng2/_.gitignore'), generator.destinationPath('.gitignore'));
      generator.fs.copy(generator.templatePath('ng2/_editorconfig'), generator.destinationPath('.editorconfig'));
      generator.fs.copy(generator.templatePath('ng2/_jshintrc'), generator.destinationPath('.jshintrc'));
    }
  }, {
    key: "copyFiles",
    value: function copyFiles(generator) {
      var _variables = this.getVariables(generator);

      switch (_variables.ngVersion) {
        case "ng1":
          return this._copyFilesNg1(generator, _variables);
        case "ng2":
          return this._copyFilesNg2(generator, _variables);
      }
    }
  }, {
    key: "installDependencies",
    value: function installDependencies(generator) {
      generator.installDependencies({ skipInstall: generator.options['skip-install'], npm: true, bower: generator.ngVersion === "ng1" });
    }
  }, {
    key: "promptOptions",
    value: function promptOptions(generator) {
      var done = generator.async();
      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
        "default": generator.lodash.kebabCase(generator.appname)
      }, {
        type: 'input',
        name: 'githubRepository',
        message: 'What is your repository name on Github?',
        "default": generator.lodash.kebabCase(generator.appname.toLowerCase())
      }, {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your username on Github?'
      }, {
        type: 'input',
        name: 'email',
        message: 'What is your email?'
      }, {
        type: 'list',
        name: 'ngVersion',
        message: 'What version of Angular do you want to use?',
        choices: ["ng1", "ng2"],
        "default": 0
      }];

      generator.prompt(prompts, function (prop) {
        generator.appName = prop.appName;
        generator.githubRepository = prop.githubRepository;
        generator.githubUsername = prop.githubUsername;
        generator.email = prop.email;
        generator.ngVersion = prop.ngVersion;

        done();
      });
    }
  }, {
    key: "promptOptionsCssNg1",
    value: function promptOptionsCssNg1(generator) {
      var done = generator.async();

      var _prompts = [{
        type: 'confirm',
        name: 'compileStyles',
        message: 'Are you using css with your module?',
        when: function when() {
          return generator.ngVersion === "ng1";
        },
        "default": false
      }];

      generator.prompt(_prompts, function (prop) {
        generator.compileStyles = prop.compileStyles;

        done();
      });
    }
  }, {
    key: "promptOptionsWorker",
    value: function promptOptionsWorker(generator) {
      var done = generator.async();

      var _prompts = [{
        type: 'confirm',
        name: 'ng2worker',
        message: 'Are you using workers with ng2?',
        when: function when() {
          return generator.ngVersion === 'ng2';
        },
        "default": false
      }];

      generator.prompt(_prompts, function (prop) {
        generator.ng2worker = prop.ng2worker;

        done();
      });
    }
  }]);

  return Generator;
})();

exports["default"] = Generator;
module.exports = exports["default"];