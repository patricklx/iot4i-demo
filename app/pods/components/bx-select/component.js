import Ember from 'ember';
import BxClassNames from 'demoapp/mixins/bx-class-names'

export default Ember.Component.extend({
  content: [],
  options: null,
  multiple: false,
  selected: null,

  actions: {
    onChange(choice) {
      if (this.multiple) {
        choice.forEach((item) => {
          if (!this.content.includes(item)) {
            this.attrs.addItem && this.attrs.addItem(item);
          }
        });
        this.content.forEach((item) => {
          if (!choice.includes(item)) {
            this.attrs.removeItem && this.attrs.removeItem(item);
          }
        });
        return;
      }
      this.attrs.onSelect && this.attrs.onSelect(choice);
    },

    selectFocused(...args) {
      return this.attrs.selectFocused && this.attrs.selectFocused(...args);
    },

    handleKeydown (select, event) {
      let selected = this.get('content') || [],
        backspaceHandled = false;

      // Delete the entire last tag if backspacing into the tags area.
      if (8 === event.keyCode && Ember.isBlank(event.target.value)) {  // BACKSPACE === 8
        this.attrs.removeItem && this.attrs.removeItem(selected.slice(-1)[0]);
        event.preventDefault();
        backspaceHandled = true;
        return false;
      }

      if (13 === event.keyCode) {// enter === 8
        Ember.set(select, 'searchText', '');
        backspaceHandled = true;
      }

      if (backspaceHandled) {
        event.preventDefault();
      }
    }
  },

  didInsertElement() {
    this.$('.ember-power-select-status-icon').replaceWith('' +
      '<svg class="bx--dropdown__arrow ember-power-select-status-icon" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">\n' +
      '    <path d="M10 0L5 5 0 0z"></path>\n' +
      '  </svg>');
  }
});
