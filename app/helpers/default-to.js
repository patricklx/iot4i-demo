import Ember from 'ember';

export function _default([something, otherwise]) {
  return something || otherwise;
}

export default Ember.Helper.helper(_default);
