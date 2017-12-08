import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  actions: DS.attr(),
  canBeDisabled: DS.attr('boolean'),
  hazardDetectionOnCloud: DS.attr('boolean'),
  jsCodeMethod: DS.attr('string'),
  type: DS.attr('string'),
  image: DS.attr('string'),

  hazards: DS.hasMany('hazard')
});

