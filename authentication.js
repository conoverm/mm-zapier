const testAuth = (z, bundle) => {
  // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
  // every user will have access to, such as an account or profile endpoint like /me.
  // In this example, we'll hit httpbin, which validates the Authorization Header against the arguments passed in the URL path

  // This method can return any truthy value to indicate the credentials are valid.
  // Raise an error to show

  z.request.headers = z.request.headers || {};

  return z.request({
    method: 'GET',
    url: 'https://api.mediamath.com/api/v2.0/session',
    headers: {
      'Accept': 'application/vnd.mediamath.v1+json',
      'Cookie': `adama_session=${bundle.authData.sessionKey}`
    }
  })
  .then((response) => {
    if (response.status == 401) {
      throw new Error('not logged in or no session id');
    }

    return response;

  })
};


const login = (z, bundle) => {

  return z.request({
    method: 'POST',
    url: 'https://api.mediamath.com/api/v2.0/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/vnd.mediamath.v1+json'
    },
    form: {
      user: process.env.T1USER || bundle.authData.T1USER,
      password: process.env.T1PASSWORD || bundle.authData.T1PASSWORD,
      api_key: process.env.T1APIKEY || bundle.authData.T1APIKEY
    }
  }).then((response) => {

    if (response.status === 403) {
      throw new Error('The API Key you supplied is invalid');
    }

    return {
      sessionKey: response.json.data.session.sessionid || 'new fake key'
    }

  });
}


module.exports = {
  type: 'session',
  // Define any auth fields your app requires here. The user will be prompted to enter this info when
  // they connect their account.
  fields: [
    { key: 'T1APIKEY', label: 'API Key', required: true, type: 'string', helpText: 'api key from developer.mediamath' },
    { key: 'T1USER', label: 'T1 Username', required: true, type: 'string' },
    { key: 'T1PASSWORD', label: 'T1 Password', required: true, type: 'password' }
  ],
  // The test method allows Zapier to verify that the credentials a user provides are valid. We'll execute this
  // method whenver a user connects their account for the first time.
  test: testAuth,

  // zapier magic config?
  sessionConfig: {
    perform: login
  }
};
