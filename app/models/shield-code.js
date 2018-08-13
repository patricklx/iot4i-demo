import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  type: DS.attr('string'),
  enabled: DS.attr('boolean'),
  jobOptions: DS.attr(),

  shield: DS.belongsTo('shield')
});


export const fields = [{
  id: 'name',
  label: 'Name',
  type: 'text',
  help: 'Name of shield code',
  validations: null
},
{
  id: 'type',
  label: 'Type',
  type: 'select',
  help: 'Type of shield',
  options: ['edge', 'cloud'],
  validations: {
    presence: true
  }
},
{
  id: 'enabled',
  label: 'Enabled',
  type: 'checkbox',
  help: 'Enable shield code',
  validations: {
    presence: true
  }
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
  id: 'jobOptions',
  label: 'jobOptions',
  type: 'json-edit',
  validations: {
    presence: true
  }
}
];
