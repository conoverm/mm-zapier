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
  console.info('includeAdamaCookie: global.adamaSession=', global.adamaSession)

  if (global.adamaSession) {
    request.headers['Cookies'] = `adama_session=${global.adamaSession}`
  }

  return request;
}

const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: authentication,
    // includeApiKeyHeader

  beforeRequest: [
    includeAdamaCookie
  ],

  afterResponse: [
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
