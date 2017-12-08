import Ember from 'ember';

export function toJson([object]) {
  return JSON.stringify(object);
}

export default Ember.Helper.helper(toJson);
