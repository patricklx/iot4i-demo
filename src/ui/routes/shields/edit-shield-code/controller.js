import Controller from '@ember/controller';
import { alias } from '@ember-decorators/object/computed';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { fields } from '../../../../data/models/shield-code';

export default class extends Controller {
  @alias('model') shieldCode;
  @service session;

  @computed('')
  get formSections() {
    return [{
      name: 'ShieldCode',
      form: {
        id: 'shield-code',
        fieldsets: [{
          id: 'model',
          fields: fields
        }]
      }
    }];
  }
}
