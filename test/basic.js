const should = require('should'); // required to use .exist()

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('custom auth app', () => {

  it('perform login', (done) => {

    zapier.tools.env.inject(); // testing only!

    appTester(App.authentication.sessionConfig.perform)
    .then((response) => {
      response.should.have.property('sessionKey');
      done();
    })
    .catch(done);
  });

  it('Integration test: passing bad API key returns 400', (done) => {

    const bundle = {
      authData: {
        sessionKey: 'new fake key'
      }
    };

    appTester(App.authentication.test, bundle)
    .then(err => {
      err.status.should.equal(400)
      err.content.should.equal('Bad Request')
      // err.name.should.equal('RefreshAuthError')
      done()
    })
    .catch(done);
  });


});
