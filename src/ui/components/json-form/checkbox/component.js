import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  currentValue: computed('value', function () {
    return this.value;
  }),

  actions: {
    onChange(value) {
      this.set('currentValue', value);
      this.onChange(value);
    }
  }
});
