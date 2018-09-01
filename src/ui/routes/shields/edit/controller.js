import Controller from '@ember/controller';
import { alias } from '@ember-decorators/object/computed';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { fields } from '../../../../data/models/shield/model';

export default class extends Controller {
  @alias('model') shield;
  @service session;
  @service router;

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

  @action
  addNew() {
    this.router.transitionTo('shields.edit-shield-code', '__new__');
  }

  @action
  editShieldCode(code) {
    this.router.transitionTo('shields.edit-shield-code', code);
  }

  @action
  deleteShieldCode(code) {
    return code.destroyRecord();
  }
}
