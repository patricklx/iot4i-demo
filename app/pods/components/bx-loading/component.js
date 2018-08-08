import Ember from 'ember';
import Loading from 'carbon-components/es/components/loading/loading';

export default Ember.Component.extend({
  tagName: '',
  uuid: Ember.computed(function () {
    return Ember.uuid();
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.attrs.active !== undefined) {
      this.loading && this.loading.set(this.attrs.active);
    }
  },

  didInsertElement() {
    this.loading = new Loading($(`#${this.uuid}`)[0], this.attrs);
  },

  willDestroy() {
    return this.loading.end();
  }
})
