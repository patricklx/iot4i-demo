import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  store: service(),

  modelArray: computed('field.modelType', function () {
    return this.field.modelType ? this.store.findAll(this.field.modelType) : [];
  }),

  actions: {
    removeAction() {

    },

    addAction() {

    },

    selectFocused() {

    }
  }
});
