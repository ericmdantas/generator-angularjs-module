import Generator from '../app/generator';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('test-generator', () => {
  var _generator, stub, doneStub;

  beforeEach(() => {
    _generator = new Generator();
    stub = {
      appname: 'app name',
      ngVersion: "ng1",
      log: sinon.spy(),
      yosay: sinon.spy(),
      chalk: {
        green: sinon.spy()
      },
      lodash: {
        camelCase: sinon.spy()
      },
      prompt: sinon.spy(),
      async: sinon.stub(),
      options: {
        'skip-install': true
      },
      template: sinon.spy(),
      fs: {
        copy: sinon.spy()
      },
      templatePath: sinon.spy(),
      destinationPath: sinon.spy(),
      installDependencies: sinon.spy()
    };
    doneStub = sinon.spy();
    stub.async.returns(doneStub);
  });

  describe('sayHello', () => {
    it('should say hello correctly', () => {
      _generator.sayHello(stub);

      expect(stub.log).to.have.been.called;
      expect(stub.yosay).to.have.been.called;
      expect(stub.chalk.green).to.have.been.calledWith('AngularJS Module');
    });
  });

  describe('askFor', () => {
    it('should ask a few questions to user', () => {
      _generator.promptOptions(stub);

      stub.prompt.withArgs(sinon.match.array, sinon.match.func).callArgWith(1, {
        "appName": 'my-app',
        "githubUsername": 'someuser',
        "ngVersion": 'ng1',
        "githubRepository": 'repository',
        "email": 'email@email.com',
        "compileStyles": true
      });

      expect(stub.async).to.have.been.called;
      expect(stub.lodash.camelCase).to.have.been.calledWith(stub.appname);
      expect(stub.prompt).to.have.been.calledWith(sinon.match.array, sinon.match.func);
      expect(doneStub).to.have.been.called;

      expect(stub.appName).to.equal('my-app');
      expect(stub.githubUsername).to.equal('someuser');
      expect(stub.githubRepository).to.equal('repository');
      expect(stub.email).to.equal('email@email.com');
      expect(stub.ngVersion).to.equal('ng1');
      expect(stub.compileStyles).to.equal(true);
    });
  });

  describe('installDependencies', () => {
    it('should say hello correctly', () => {
      _generator.installDependencies(stub);

      expect(stub.installDependencies).to.have.been.calledWithMatch(sinon.match((parametro) => {
        return !!parametro.skipInstall;
      }));
    });
  });

  describe('getVariables', () => {
    var userInput = {
      appName: 'app',
      githubUsername: 'username',
      email: 'email@email.com',
      githubRepository: 'repository',
      compileStyles: true
    };

    it('should get variables correctly when compiling styles', () => {
      var response = _generator.getVariables(userInput);

      expect(response.app).to.equals(userInput.appName);
      expect(response.username).to.equals(userInput.githubUsername);
      expect(response.email).to.equals(userInput.email);
      expect(response.repository).to.equals(userInput.githubRepository);
      expect(response.compileStyles).to.be.truthy;
      expect(response.main).to.equals('["dist/app.min.js","dist/app.min.css"]');
    });

    it('should get variables correctly when is not compiling styles', () => {
      userInput.compileStyles = false;
      var response = _generator.getVariables(userInput);

      expect(response.app).to.equals(userInput.appName);
      expect(response.username).to.equals(userInput.githubUsername);
      expect(response.email).to.equals(userInput.email);
      expect(response.repository).to.equals(userInput.githubRepository);
      expect(response.compileStyles).to.be.truthy;
      expect(response.main).to.equals('"dist/app.min.js"');
    });
  });

  describe('copyFiles - ng1', () => {
    beforeEach(() => {
      stub.appName = 'app';
      stub.githubUsername = 'username';
      stub.email = 'email@email.com';
      stub.repository = 'repository';
      stub.ngVersion = 'ng1';
      stub.compileStyles = true;
    });

    it('should copy files correctly', () => {
      _generator.copyFiles(stub);

      expect(stub.template).to.have.been.calledWith('ng1/src/_app.js', 'src/app.js', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng1/tests/_app_test.js', 'tests/app_test.js', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng1/src/_app.css', 'src/app.css', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng1/_package.json', 'package.json', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng1/_bower.json', 'bower.json', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng1/README.md', 'README.md', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng1/gulpfile.babel.js', 'gulpfile.babel.js', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng1/karma.conf.js', 'karma.conf.js', sinon.match.object);
    });
  });

  describe('copyFiles - ng2', () => {
    beforeEach(() => {
      stub.appName = 'app';
      stub.githubUsername = 'username';
      stub.email = 'email@email.com';
      stub.ngVersion = 'ng2';
      stub.repository = 'repository';
      stub.compileStyles = true;
    });

    it('should copy files correctly', () => {
      _generator.copyFiles(stub);

      expect(stub.template).to.have.been.calledWith('ng2/src/_app.ts', 'src/app.ts', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng2/tests/_app_test.ts', 'tests/app_test.ts', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng2/src/_app.css', 'src/app.css', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng2/src/_app.html', 'src/app.html', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng2/_package.json', 'package.json', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng2/README.md', 'README.md', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng2/gulpfile.babel.js', 'gulpfile.babel.js', sinon.match.object);
      expect(stub.template).to.have.been.calledWith('ng2/karma.conf.js', 'karma.conf.js', sinon.match.object);
    });
  });
});
