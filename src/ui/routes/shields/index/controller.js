import Controller from '@ember/controller';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Controller {
  @service router;
  @service store;

  @action
  editShield(shield) {
    this.router.transitionTo('shields.edit', shield);
  }

  @action
  deleteShield(shield) {
    return shield.destroyRecord();
  }

  @action
  createNewShield() {
    this.router.transitionTo('shields.edit', '__new__');
  }

  @action
  deactivate(shield) {
    shield.enabled = false;
    return shield.save();
  }
}
