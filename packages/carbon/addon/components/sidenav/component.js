import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  tagName: '',
  searchResultsGlobal: null,
  searchResultsSection: null,
  menuItems: null,

  actions: {

    search(searchFor) {

    },

    transitionTo(to) {
      this.transitionTo(to);
    },

    toggleOpen() {
      this.toggleProperty('open');
      this.onToggle(this.open);
    }
  }
});
