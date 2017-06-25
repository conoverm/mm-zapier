module.exports = {
  key: 'campaigns',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Get Campaigns',
  display: {
    label: 'Campaign ID',
    description: 'get Campaign by ID'
  },

  // `operation` is where we make the call to your API to do the search
  operation: {
    // This search only has one search field. Your searches might have just one, or many
    // search fields.
    inputFields: [
      {
        key: 'id',
        type: 'integer',
        label: 'campaign id',
        helpText: 'enter the campaign ID'
      }
    ],

    perform: (z, bundle) => {
      const url = 'https://api.mediamath.com/api/v2.0/campaigns';

      // Put the search value in a query param. The details of how to build
      // a search URL will depend on how your API works.
      const options = {
        params: {
          search: bundle.inputData.id
        }
      };

      return z.request(url, options)
        .then(response => JSON.parse(response.content));
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1234551,
      name: 'test campaign'
    },


    outputFields: [
      { key: "use_mm_freq", label: "use_mm_freq" },
      { key: "spend_cap_type", label: "spend_cap_type" },
      { key: "zone_name", label: "zone_name" },
      { key: "frequency_interval", label: "frequency_interval" },
      { key: "updated_on", label: "updated_on" },
      { key: "use_default_ad_server", label: "use_default_ad_server" },
      { key: "initial_start_date", label: "initial_start_date" },
      { key: "restrict_targeting_to_deterministic_id", label: "restrict_targeting_to_deterministic_id" },
      { key: "created_on", label: "created_on" },
      { key: "id", label: "id" },
      { key: "name", label: "name" }
    ]
    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    // outputFields: [
    //   {key: 'id', label: 'ID'},
    //   {key: 'createdAt', label: 'Created At'},
    //   {key: 'name', label: 'Name'},
    //   {key: 'directions', label: 'Directions'},
    //   {key: 'authorId', label: 'Author ID'},
    //   {key: 'style', label: 'Style'}
    // ]
  }
};
