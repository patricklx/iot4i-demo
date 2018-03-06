import Ember from 'ember';
import PaperChipsComponent from 'ember-paper/components/paper-chips';
import layout from 'ember-paper/templates/components/paper-chips';

const {
  isEmpty, isPresent
} = Ember;

export default PaperChipsComponent.extend({
  layout,

  didRender() {
    const input = this.getInput();
    input.on('keydown',(e) => {
      if (['ArrowDown', 'Down'].includes(e.key)) {
        this.autocomplete && this.autocomplete.actions.open();
      }
    })
  },

  actions: {

    inputFocus(autocomplete) {
      let input = this.getInput();

      this.set('focusedElement', 'input');

      if (!this.get('content').length && !input.is(':focus')) {
        input.focus();
      } else {
        this.set('activeChip', -1);
      }

      // Keep track of the autocomplete, so we can force it to close when navigating to chips.
      if (isEmpty(this.get('autocomplete')) && input.is('.ember-paper-autocomplete-search-input')) {
        this.set('autocomplete', autocomplete);
      }

    },
  },
});
