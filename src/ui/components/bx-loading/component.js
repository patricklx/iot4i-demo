import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import Loading from 'carbon-components/es/components/loading/loading';

export default Component.extend({
  tagName: '',
  uuid: computed(function () {
    return guidFor(this);
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.active !== undefined) {
      this.loading && this.loading.set(this.active);
    }
  },

  didInsertElement() {
    this.loading = new Loading($(`#${this.uuid}`)[0], this);
  },

  willDestroy() {
    return this.loading.end();
  }
});
