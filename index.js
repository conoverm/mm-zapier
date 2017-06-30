const CampaignResource = require('./resources/campaign');
// const campaignSearch = require('./searches/campaigns');
const campaignTrigger = require('./triggers/campaigns');
const authentication = require('./authentication');

// To include the API key header on all outbound requests, simply define a function here.
// It runs runs before each request is sent out, allowing you to make tweaks to the request in a centralized spot
// const includeApiKeyHeader = (request, z, bundle) => {
//   if (bundle.authData.apiKey) {
//     request.params = request.params || {};
//     request.params.api_key = bundle.authData.apiKey;
//   }
//   return request;
// };

const includeAdamaCookie = (request, z, bundle) => {
  // console.info('includeAdamaCookie request', request)
  // console.info('includeAdamaCookie z', z)
  console.info('includeAdamaCookie bundle', bundle)
  if (bundle.authData.sessionKey) {
    request.headers = request.headers || {};
    request.headers['Cookie'] = `adama_session=${bundle.authData.sessionKey}`
  }

  console.info('request.headers', request.headers)
  return request;
}


// If we get a response and it is a 401, we can raise a special error telling Zapier to retry this after another exchange.
const sessionRefreshIf401 = (response, z, bundle) => {
  console.info('bundle.authData.sessionKey', bundle.authData.sessionKey)

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
