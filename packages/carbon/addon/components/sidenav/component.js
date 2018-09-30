import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  searchResultsGlobal: null,
  searchResultsSection: null,
  menuItems: null,

  actions: {

    search(searchFor) {

    },

    transitionTo(menuItem) {
      this.set('currentMenu', menuItem);
      this.transitionTo(menuItem.routeName);
    },

    toggleOpen() {
      this.toggleProperty('open');
      this.onToggle(this.open);
    }
  }
});
