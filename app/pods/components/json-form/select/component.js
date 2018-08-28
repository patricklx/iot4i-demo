import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  currentValue: computed('value', function () {
    if (this.field.multiple) {
      return (this.value && this.value.slice()) || [];
    }
    return this.value;
  }),

  actions: {
    remove(model) {
      if (this.field.multiple) {
        this.currentValue.removeObject(model);
      } else {
        this.set('currentValue', undefined);
      }
      this.onChange(this.currentValue);
    },

    add(model) {
      if (this.field.multiple) {
        if (!Array.isArray(this.currentValue)) {
          this.set('currentValue', []);
        }
        this.currentValue.pushObject(model);
      } else {
        this.set('currentValue', model);
      }
      this.onChange(this.currentValue);
    },

    selectFocused() {

    }
  }
});
