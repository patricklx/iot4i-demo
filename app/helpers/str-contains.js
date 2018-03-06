import Ember from 'ember';

export function strContains([str, substr]) {
  return str && str.indexOf(substr) >= 0;
}

export default Ember.Helper.helper(strContains);
