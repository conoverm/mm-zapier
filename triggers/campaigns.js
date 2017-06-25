// I don't think I actually want this... trigger is like 'a thing happened'. Triggers define the thing that happened.

const getCampaign = (z, bundle) => {
  // `z.console.log()` is similar to `console.log()`.
  // z.console.log('console says hello world!');

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const requestOptions = {
    url: `https://api.mediamath.com/api/v2.0/campaigns/${bundle.inputData.id}`,
    headers: {
      'Cookie' : `adama_session=${global.adamaSession}`,
      'Accept': `application/vnd.mediamath.v1+json`
    }
  };

  // You may return a promise or a normal data structure from any perform method.
  return z.request(requestOptions)
    .then((response) => {
      // console.info('response', response)
      return [response.json.data]
      // JSON.parse(response.content);
    });
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'campaigns',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Campaigns',
  display: {
    label: 'Get Campaigns',
    description: 'get all campaign details'
  },

  // `operation` is where the business logic goes.
  operation: {

    // `inputFields` can define the fields a user could provide,
    // we'll pass them in as `bundle.inputData` later.
    inputFields: [
      {key: 'id', type: 'integer',  helpText: 'id of campaign to get details'}
    ],

    perform: getCampaign,

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 362424,
      name: 'a campaign name'
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'createdAt', label: 'Created At'},
      {key: 'name', label: 'Name'},
      {key: 'directions', label: 'Directions'},
      {key: 'authorId', label: 'Author ID'},
      {key: 'style', label: 'Style'}
    ]
  },

};
