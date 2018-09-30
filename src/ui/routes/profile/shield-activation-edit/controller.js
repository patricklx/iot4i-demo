import Controller from '@ember/controller';
import { alias } from '@ember-decorators/object/computed';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { fields } from '../../../../data/models/shield-activation/model';

export default class extends Controller {
  @alias('model') shield;
  @service session;
  @service router;

  @computed('shield')
  get formSections() {
    const paramters = {
      id: 'shieldParameters',
      label: 'shieldParameters',
      type: 'json-edit',
      validations: {
        presence: true
      }
    };
    if (this.shield.commonShieldCode) {

    } else {
      fields.push(paramters);
    }

    return [{
      name: 'Shield Activation',
      form: {
        id: 'shield-activation',
        fieldsets: [{
          id: 'model',
          fields: fields
        }]
      }
    }];
  }
}
