import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  tagName: '',
  hasInput: computed.bool('value'),
  value: null,

  actions: {
    onChange(value) {
      this.set('value', value);
    },

    onClear() {
      this.set('value', null);
    }
  }
});
