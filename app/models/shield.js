import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  image: DS.attr('string'),
  codes: DS.hasMany('shield-code'),
  actions: DS.hasMany('action')
});

