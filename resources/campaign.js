// get a single campaign
const getCampaign = (z, bundle) => {
  const responsePromise = z.request({
    url: `https://api.mediamath.com/api/v2.0/campaigns/${bundle.inputData.id}/`,
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

// get a list of campaigns
const listCampaigns = (z) => {
  const responsePromise = z.request({
    url: 'https://api.mediamath.com/api/v2.0/campaigns/'
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

// find a particular campaign by name
// const searchCampaigns = (z, bundle) => {
//   const responsePromise = z.request({
//     url: 'https://api.mediamath.com/api/v2.0/campaigns.json',
//     params: {
//       query: `name:${bundle.inputData.name}`
//     }
//   });
//   return responsePromise
//     .then(response => JSON.parse(response.content));
// };

// create a campaign
// const createCampaign = (z, bundle) => {
//   const responsePromise = z.request({
//     method: 'POST',
//     url: 'https://api.mediamath.com/api/v2.0/campaigns.json',
//     body: {
//       name: bundle.inputData.name // json by default
//     }
//   });
//   return responsePromise
//     .then(response => JSON.parse(response.content));
// };

module.exports = {
  key: 'campaign',
  noun: 'Campaign',

  get: {
    display: {
      label: 'Get Campaign',
      description: 'Gets a campaign.'
    },
    operation: {
      inputFields: [
        {key: 'id', required: true}
      ],
      perform: getCampaign
    }
  },

  list: {
    display: {
      label: 'New Campaign',
      description: 'Lists the campaigns.'
    },
    operation: {
      perform: listCampaigns
    }
  },

  // search: {
  //   display: {
  //     label: 'Find Campaign',
  //     description: 'Finds a campaign by searching.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: searchCampaigns
  //   },
  // },

  // create: {
  //   display: {
  //     label: 'Create Campaign',
  //     description: 'Creates a new campaign.'
  //   },
  //   operation: {
  //     inputFields: [
  //       {key: 'name', required: true}
  //     ],
  //     perform: createCampaign
  //   },
  // },

  sample: {
    id: 839393,
    name: 'New Test Campaign by brand new T1 user!'
  },

  outputFields: [
    {key: 'id', label: 'ID'},
    {key: 'name', label: 'Name'}
  ]
};
