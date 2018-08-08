import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  createdAt: DS.attr('number'),
  type: DS.attr('string'),
  shield: DS.belongsTo('shield'),
  user: DS.belongsTo('user'),
  ishandled: DS.attr('boolean'),
  actionParams: DS.attr(),

  userId: Ember.computed(function() {
    return this.belongsTo('user').id()
  })
});
