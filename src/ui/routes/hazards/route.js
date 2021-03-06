import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';

export default class extends Route{
  @service store;

  model() {
    return this.get('store').query('hazard', {descending: true});
  }
};
