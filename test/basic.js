const should = require('should'); // required to use .exist()

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('custom auth app', () => {

  it('should return error message from testAuth on initial session request', (done) => {

    appTester(App.authentication.test /*, bundle */)
    .then(err => {
      should.equal(err.message, `not logged in or no session id`)
      done()
    })

  });

  it('has auth details added to every request', (done) => {
    // Try changing the values of username or password to see how the test method behaves
    zapier.tools.env.inject(); // testing only!
    const bundle = {
      authData: {
        user: process.env.T1USER,
        password: process.env.T1PASSWORD,
        api_key: process.env.T1APIKEY
      }
    };

    appTester(App.authentication.sessionConfig.perform, bundle)
    .then((response) => {
      response.should.have.property('sessionKey');
      done();
    })
    .catch(done);
  });

});
