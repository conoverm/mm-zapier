const should = require('should'); // required to use .exist()

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {

  describe('Integration test: get campaign trigger', () => {
    let sessionid = '';

    beforeEach(function(done) {
      zapier.tools.env.inject(); // testing only!

      appTester(App.authentication.sessionConfig.perform)
      .then(res => { sessionid = res.sessionKey; done() } )
      .catch(done)

    });

    it('campaign 362424 should successfully GET', (done) => {

      const bundle = {
        inputData: {
          id: '362424'
        },
        authData: {
          sessionKey: sessionid
        }
      };


      appTester(App.triggers.campaigns.operation.perform, bundle)
      .then(res => {
        // logged in, fetched t1/api/v2.0/campaign/362424
        res[0].id.should.equal(362424)
        done()
      })
      .catch(done);

    });

  });

});
