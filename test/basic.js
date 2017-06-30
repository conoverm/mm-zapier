// const should = require('should'); // required to use .exist()

// const zapier = require('zapier-platform-core');

// const App = require('../index');
// const appTester = zapier.createAppTester(App);

// describe('custom auth app', () => {

//   it('perform login', (done) => {

//     zapier.tools.env.inject(); // testing only!

//     appTester(App.authentication.sessionConfig.perform)
//     .then((response) => {
//       response.should.have.property('sessionKey');
//       done();
//     })
//     .catch(done);
//   });

//   it('App auth test should have adama_cookie on second request', (done) => {

//     const bundle = {
//       authData: {
//         sessionKey: 'new fake key'
//       }
//     };

//     appTester(App.authentication.test, bundle)
//     .catch(err => {
//       err.name.should.equal('RefreshAuthError')
//       done()
//     })
//     .catch(done);
//   });


// });
