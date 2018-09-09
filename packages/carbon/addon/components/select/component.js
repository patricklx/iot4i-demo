import Ember from 'ember';

export default Ember.Component.extend({
  content: [],
  options: null,
  multiple: false,
  selected: null,

  actions: {
    onChange(choice) {
      if (this.multiple) {
        choice.forEach((item) => {
          if (!this.content || !this.content.includes(item)) {
            this.addItem && this.addItem(item);
          }
        });
        this.content && this.content.forEach((item) => {
          if (!choice.includes(item)) {
            this.removeItem && this.removeItem(item);
          }
        });
        return;
      }
      this.onSelect && this.onSelect(choice);
    },

    selectFocused(...args) {
      return this.selectFocused && this.selectFocused(...args);
    },

    handleKeydown(select, event) {
      const selected = this.get('content') || [];


      let backspaceHandled = false;

      // Delete the entire last tag if backspacing into the tags area.
      if (event.keyCode === 8 && Ember.isBlank(event.target.value)) { // BACKSPACE === 8
        this.removeItem && this.removeItem(selected.slice(-1)[0]);
        event.preventDefault();
        backspaceHandled = true;
        return false;
      }

      if (event.keyCode === 13) { // enter === 8
        Ember.set(select, 'searchText', '');
        backspaceHandled = true;
      }

      if (backspaceHandled) {
        event.preventDefault();
      }
    }
  },

  didInsertElement() {
    this.$('.ember-power-select-status-icon').replaceWith(''
      + '<svg class="bx--dropdown__arrow ember-power-select-status-icon" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">\n'
      + '    <path d="M10 0L5 5 0 0z"></path>\n'
      + '  </svg>');
  }
});
