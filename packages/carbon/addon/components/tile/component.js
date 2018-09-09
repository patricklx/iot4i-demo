import Ember from 'ember';

export default Ember.Component.extend({
  selectable: false,
  expandable: false,
  clickable: false,
  uuid: Ember.computed(() => Ember.uuid()),

  default: Ember.computed(function () {
    return !this.selectable && !this.expandable;
  }),

  actions: {
    onClick() {

    }
  }
});
