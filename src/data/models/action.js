import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  callbackAction: DS.attr(),

  shield: DS.belongsTo('shield')
});


export const fields = [{
  id: 'name',
  label: 'Name',
  type: 'text',
  help: 'Name of Action',
  validations: null
},
{
  id: 'type',
  label: 'Type',
  type: 'text',
  help: 'Custom type of action',
  validations: null
},
{
  id: 'description',
  label: 'Description',
  type: 'text',
  validations: {
    presence: true,
    length: {
      min: 3,
      max: 30
    }
  }
},
{
  id: 'jsonPathTransform',
  label: 'Json Path Transform',
  type: 'json-edit',
  help: 'Provide a template containing JsonPath strings to transform the standard hazard payload into another format.',
  rows: 5,
  defaultValue: `{
    "hazardId": "$._id",
    "processingTime": "$.rawEvents[0].arrivedAtMH",
    "timestamp": "$.createdAt.epochMillisToISO8601()"
  } 
  -> would result in:
  {
  "hazardId": "ha_12345678",
  "processingTime": “2017-04-19T08:40:08.123Z”
  }
  `,
  validations: null
},
{
  id: 'callbackAction',
  label: 'Url endoint to call on hazard',
  type: 'json-edit',
  rows: 10,
  defaultValue: `{
    "url": "string",
    "auth": {
      "authType": "string",
      "username": "string",
      "password": "string",
      "bearerToken": "string"
    }
  }`,
  validations: null
}
];
