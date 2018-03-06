import Controller from '@ember/controller';
import { alias } from '@ember-decorators/object/computed';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Controller {
  @alias('model') shield;
  @service session;

  @computed('shield.actions')
  get actionsArray() {
    return this.shield.actions.toArray();
  }

  @computed('session.actions.[]','actionsArray.[]')
  get actionOptionsArray() {
    if (!this.session.actions || !this.actionsArray) {
      return this.session.actions;
    }
    return this.session.actions.filter((a) => !this.actionsArray.findBy('id', a.id));
  }

  @action
  selectFocused(select, evt) {
    select.actions.open();
  }

  @action
  goToShieldCode() {

  }

  @action
  deleteShieldCode() {

  }

  @action
  addAction(action) {
    this.actionsArray.pushObject(action);
  }

  @action
  removeAction(action) {
    this.actionsArray.removeObject(action);
  }
}
