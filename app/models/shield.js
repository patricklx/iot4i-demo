import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  actions: DS.attr(),
  enabled: DS.attr('boolean'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  image: DS.attr('string'),
  codes: DS.hasMany('shield-code')
});

