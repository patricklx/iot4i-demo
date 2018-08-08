import Route from '@ember/routing/route';
import { service } from '@ember-decorators/service';

export default class extends Route {
  @service session;

  beforeModel() {
    if (!this.get('session.credentials')) {
      this.transitionTo('login');
    }
  }
};
