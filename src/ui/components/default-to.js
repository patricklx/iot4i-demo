import Ember from 'ember';

export function _default([something, otherwise]) {
  return something || otherwise;
}

export const helper = Ember.Helper.helper(_default);
