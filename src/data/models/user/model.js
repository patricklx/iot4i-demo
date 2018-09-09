import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  address: DS.attr(),
  createdAt: DS.attr('number'),
  shieldActivations: DS.hasMany('shield-activation')
});
