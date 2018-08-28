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

    onSelect(selected) {
      this.set('currentValue', selected);
      this.onChange(this.currentValue);
    },

    remove(model) {
      this.currentValue.removeObject(model);
      this.onChange(this.currentValue);
    },

    add(model) {
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
