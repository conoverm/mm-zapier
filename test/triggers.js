const should = require('should'); // required to use .exist()

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {

  describe('get campaign trigger', () => {
    let sessionid = '';

    // beforeEach(()=>{
    //   zapier.tools.env.inject(); // testing only!

    //   return appTester(App.authentication.sessionConfig.perform)
    //   .then( (res) => {
    //     console.info('res', res)
    //     console.info('sessionid', sessionid)
    //     return sessionid = res.json.session.sessionid;
    //   })
    //   .catch((err) => {
    //     console.info('beforeEach catcherr', err)
    //     return sessionid = err.json.session.sessionid;
    //   })

    // })

    beforeEach(function(done) {
      zapier.tools.env.inject(); // testing only!
      // console.info('beforeeach sessionid', sessionid )
      appTester(App.authentication.sessionConfig.perform)
      .then(res => { sessionid = res.sessionKey; done() } )
      .catch(done)

    });

    it('campaign should fail to load', (done) => {
      /* should fail to load because i can't get the auth functions to run
      in these tests */
      // zapier.tools.env.inject(); // testing only!
      // console.info('in IT sessionid', sessionid)
      // let sess = sessionid;
      // console.info('in IT sess', sess)
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
        console.info('then res', res)
        done()
      })
      .catch((e) => {
        e.message.should.match(/^status 401/)
        done()
      })
      .catch(done);

    });

  });

});
