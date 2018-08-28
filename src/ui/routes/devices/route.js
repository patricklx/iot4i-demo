import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';

export default class extends Route {
  @service store;

  model() {
    this.store.findAll('device');
    return this.store.peekAll('device');
  }
};
