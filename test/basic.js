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

    zapier.tools.env.inject(); // testing only!

    appTester(App.authentication.sessionConfig.perform)
    .then((response) => {
      response.should.have.property('sessionKey');
      done();
    })
    .catch(done);
  });

});
