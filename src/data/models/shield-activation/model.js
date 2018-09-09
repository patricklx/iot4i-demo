import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  enabled: DS.attr('boolean'),
  shieldParameters: DS.attr(),
  shield: DS.belongsTo('shield'),
  user: DS.belongsTo('user')
});


export const fields = [{
  id: 'enabled',
  label: 'Enabled',
  type: 'checkbox',
  help: 'Enable shield code',
  validations: {
    presence: true
  }
}
];
