import Router from '@ember/route/routing';
import { service } from 'ember-decorators/service';

export default class extends Router {
  @service store;

  model() {
    return this.get('store').findAll('user');
  }
};
