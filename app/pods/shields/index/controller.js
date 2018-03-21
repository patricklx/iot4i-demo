import Controller from '@ember/controller';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Controller {
  @service router;

  @action
  goToShield(shield) {
    this.router.transitionTo('shields.shield', shield);
  }

  @action
  deleteShield(shield) {
    return shield.destroyRecord();
  }

  @action
  deactivate(shield) {
    shield.enabled = false;
    return shield.save();
  }
}
