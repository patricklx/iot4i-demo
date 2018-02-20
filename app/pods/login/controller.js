import Controller from '@ember/controller';
import { service } from 'ember-decorators/service';
import { action } from 'ember-decorators/object';

export default class extends Controller {
  @service session;

  @action
  login() {
    this.set('loading', true);
    let p = this.get('session').login();
    p.finally(() => {
      this.set('loading', false);
    });
    p.catch((e) => this.set('error', e));
  }
};
