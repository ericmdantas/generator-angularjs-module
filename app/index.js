'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _yeomanGenerator = require('yeoman-generator');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

var _generator = require('./generator');

var _generator2 = _interopRequireDefault(_generator);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AngularJSModule = (function (_Base) {
  _inherits(AngularJSModule, _Base);

  function AngularJSModule(args, options, config) {
    _classCallCheck(this, AngularJSModule);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AngularJSModule).call(this, args, options, config));

    _this.yosay = _yosay2.default;
    _this.chalk = _chalk2.default;
    _this.lodash = _lodash2.default;

    _this.gen = new _generator2.default();
    return _this;
  }

  _createClass(AngularJSModule, [{
    key: 'initializing',
    value: function initializing() {
      this.pkg = require('../package.json');
    }
  }, {
    key: 'sayHello',
    value: function sayHello() {
      this.gen.sayHello(this);
    }
  }, {
    key: 'askFor',
    value: function askFor() {
      this.gen.promptOptions(this);
    }
  }, {
    key: 'askForCss',
    value: function askForCss() {
      this.gen.promptOptionsCssNg1(this);
    }
  }, {
    key: 'askForWorker',
    value: function askForWorker() {
      this.gen.promptOptionsWorker(this);
    }
  }, {
    key: 'copyFiles',
    value: function copyFiles() {
      this.gen.copyFiles(this);
    }
  }, {
    key: 'installStuff',
    value: function installStuff() {
      this.gen.installDependencies(this);
    }
  }]);

  return AngularJSModule;
})(_yeomanGenerator.Base);

exports.default = AngularJSModule;