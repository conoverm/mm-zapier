const CampaignResource = require('./resources/campaign');
// const campaignSearch = require('./searches/campaigns');
const campaignTrigger = require('./triggers/campaigns');
const authentication = require('./authentication');

const includeAdamaCookie = (request, z, bundle) => {

  if (bundle.authData.sessionKey) {
    request.headers = request.headers || {};
    request.headers['Cookie'] = `adama_session=${bundle.authData.sessionKey}`
  }

  return request;
}


// If we get a response and it is a 401, we can raise a special error telling Zapier to retry this after another exchange.
const sessionRefreshIf401 = (response, z, bundle) => {
  if (bundle.authData.sessionKey) {
    if (response.status === 401) {
      throw new z.errors.RefreshAuthError('Session key needs refreshing.');
    }
  }
  return response;
};

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,

  beforeRequest: [
    includeAdamaCookie
  ],

  afterResponse: [
    sessionRefreshIf401
  ],

  resources: {
    // [CampaignResource.key]: CampaignResource,
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [campaignTrigger.key]: campaignTrigger
  },

  // If you want your searches to show up, you better include it here!
  searches: {
    // [campaignSearch.key]: campaignSearch
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
