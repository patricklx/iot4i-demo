import Ember from 'ember';

export function strContains([str, substr]) {
  return str && str.startsWith(substr);
}

export const helper = Ember.Helper.helper(strContains);
