import Ember from 'ember';
import Checkbox from 'carbon-components/es/components/checkbox/checkbox';

export default Ember.Component.extend({
  tagName: '',
  uuid: Ember.computed(() => Ember.uuid()),

  didReceiveAttrs(...args) {
    this._super(...args);
    if (this.disabled !== undefined) {
      this.checkbox && this.checkbox.setDisabled(this.disabled);
    }
    if (this.state !== undefined) {
      this.checkbox && this.checkbox.setState(this.state);
    }
  },

  didInsertElement() {
    this.checkbox = new Checkbox($(`#checkbox-${this.uuid}`)[0], this);
  },

  willDestroy() {
    return this.checkbox.release();
  }
});
