const should = require('should'); // required to use .exist()

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {

  describe('get campaign trigger', () => {
    it('should load campaign NAME NAME 362424', (done) => {
      const bundle = {
        inputData: {
          id: '362424'
        }
      };

      appTester(App.triggers.campaigns.operation.perform, bundle)
        .then(results => {

          should.exist(results)
          console.info('results', results)
          const campaign = results[0];

          campaign.name.should.eql('NAME NAME');
          campaign.id.should.eql(362424);

          done();
        })
        .catch(done);
    });

  });

});
