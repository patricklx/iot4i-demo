import Ember from 'ember';

export function strContains([str, substr]) {
  return str && str.startsWith(substr);
}

export default Ember.Helper.helper(strContains);
