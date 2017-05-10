require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('custom auth app', () => {

  it('has auth details added to every request', (done) => {
    // Try changing the values of username or password to see how the test method behaves
    const bundle = {
      authData: {
        api_key: process.env.T1APIKEY,
	user: process.env.T1USER,
	password: process.env.T1PASSWORD
      }
    };

    appTester(App.authentication.test, bundle)
      .then((response) => {
       	response.status.should.eql(200);
        response.json.data.should.have.property('session');
 /* .url.should.containEql('?api_key=my_key'); */
        done();
      })
      .catch(done);
  });
});
