import Ember from 'ember';
import Checkbox from 'carbon-components/es/components/checkbox/checkbox';

export default Ember.Component.extend({
  tagName: '',
  uuid: Ember.computed(() => Ember.uuid()),
  disabled: false,
  state: null,
  checked: null,

  onFocus() {
    this.set('isFocus', true);
  },

  onBlur() {
    this.set('isFocus', false);
  }
});
