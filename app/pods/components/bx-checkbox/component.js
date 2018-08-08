import Ember from 'ember';
import Checkbox from "carbon-components/es/components/checkbox/checkbox";

export default Ember.Component.extend({
  tagName: '',
  uuid: Ember.computed(function () {
    return Ember.uuid();
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.attrs.disabled !== undefined) {
      this.checkbox && this.checkbox.setDisabled(this.attrs.disabled);
    }
    if (this.attrs.state !== undefined) {
      this.checkbox && this.checkbox.setState(this.attrs.state);
    }
  },

  didInsertElement() {
    this.checkbox = new Checkbox($(`#${this.uuid}`)[0], this.attrs);
  },

  willDestroy() {
    return this.checkbox.release();
  }
})
