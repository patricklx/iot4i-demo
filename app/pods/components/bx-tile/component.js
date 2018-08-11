import Ember from 'ember';
import Loading from 'carbon-components/es/components/loading/loading';

export default Ember.Component.extend({
  selectable: false,
  expandable: false,
  clickable: false,
  uuid: Ember.computed(function () {
    return Ember.uuid();
  }),

  default: Ember.computed(function () {
    return !this.selectable && !this.expandable;
  }),

  actions: {
    onClick() {

    }
  }
})
