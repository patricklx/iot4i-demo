import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  callbackAction: DS.attr(),

  shield: DS.belongsTo('shield')
});

