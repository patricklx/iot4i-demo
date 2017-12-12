import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('string'),
  type: DS.attr('string'),
  vendorId: DS.attr('string')
});

