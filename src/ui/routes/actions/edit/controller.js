import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { fields } from '../../../../data/models/action';

export default Controller.extend({
  action: alias('model'),
  session: service(),

  formSections: computed('', () => [{
    name: 'Action',
    form: {
      id: 'action',
      fieldsets: [{
        id: 'model',
        fields
      }]
    }
  }]),

  actions: {
  }
});
