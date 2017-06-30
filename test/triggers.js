const should = require('should'); // required to use .exist()

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {

  describe('get campaign trigger', () => {

    it('campaign should fail to load', () => {
      /* should fail to load because i can't get the auth functions to run
      in these tests */
      zapier.tools.env.inject(); // testing only!

      const bundle = {
        inputData: {
          id: '362424'
        }
      };


      return appTester(App.triggers.campaigns.operation.perform, bundle)
      .catch((e) => {
        e.message.should.match(/^status 401/)
      });

    });

  });

});
