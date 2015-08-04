var sinon = require('sinon');
var expect = require('chai').expect;
var Generator = require('../app/generator');

describe('test-generator', function() {
  var _generator;

  beforeEach(function() {
    _generator = new Generator();
  });

  describe('sayHello', function() {
    var _fakeHello = {
      log: sinon.spy(),
      yosay: sinon.spy(),
      chalk: {
        green: sinon.spy()
      }
    };

    it('should say hello correctly', function() {
      _generator.sayHello.call(_fakeHello);

      expect(_fakeHello.log.called).to.be.true;
      expect(_fakeHello.yosay.called).to.be.true;
      expect(_fakeHello.chalk.green.calledWith('AngularJS Module')).to.be.true;
    });
  });

  describe('installDependencies', function() {
    var _fakeInstallDependencies = {
      installDependencies: sinon.spy()
    };

    it('should say hello correctly', function() {
      _generator.installDependencies.call(_fakeInstallDependencies);

      expect(_fakeInstallDependencies.installDependencies.called).to.be.true;
    });
  });

  describe('getVariables', function() {
    var _fakeUserInput = {
      appName: 'app',
      githubUsername: 'username',
      email: 'email@email.com',
      githubRepository: 'repository',
      compileStyles: true,
      main: [ "dist/app.js", "dist/app.css"]
    };

    it('should get variables correctly', function() {
      _generator.getVariables.call(_fakeUserInput);

      Object.keys(_fakeUserInput).forEach(function(k, v) {
        expect(_generator[k]).to.equal(v);
      })
    })
  })

  describe('copyFilesWithParams', function() {

  })

  describe('copyFilesWithoutParams', function() {

  })

  describe('installDependencies', function() {

  })

  describe('promptOptions', function() {

  })
});
