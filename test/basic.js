const should = require('should'); // required to use .exist()

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('custom auth app', () => {

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

    appTester(App.authentication.test, bundle)
    .then((response) => {
      console.info('success response.json.data', response.json.data)
      response.status.should.eql(200);
      response.json.data.should.have.property('session');
      should.exist(global.adamaSession)
      /* .url.should.containEql('?api_key=my_key'); */
      done();
    })
    .catch(done);
  });
});
