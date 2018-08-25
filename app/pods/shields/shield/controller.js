import Controller from '@ember/controller';
import { alias } from '@ember-decorators/object/computed';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { fields } from '../../../models/shield';

export default class extends Controller {
  @alias('model') shield;
  @service session;

  @computed('shield.actions')
  get actionsArray() {
    return this.shield.actions.toArray();
  }

  @computed('')
  get formSections() {
    return [{
      name: 'Shield',
      form: {
        id: 'shield',
        fieldsets: [{
          id: 'model',
          fields: fields
        }]
      }
    }];
  }

  @computed('session.actions.[]','actionsArray.[]')
  get actionOptionsArray() {
    return this.session.actions;
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
