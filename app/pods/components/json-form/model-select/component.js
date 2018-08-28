import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  currentValue: computed('value', function () {
    return (this.value && this.value.slice()) || [];
  }),

  modelArray: computed('field.modelType', function () {
    return this.field.modelType ? this.store.findAll(this.field.modelType) : [];
  }),

  actions: {
    removeModel(model) {
      this.currentValue.removeObject(model);
      this.onChange(this.currentValue);
    },

    addModel(model) {
      if (!Array.isArray(this.currentValue)) {
        this.set('currentValue', []);
      }
      this.currentValue.pushObject(model);
      this.onChange(this.currentValue);
    },

    selectFocused() {

    }
  }
});
