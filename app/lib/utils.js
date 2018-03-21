import PaperButton from 'ember-paper/components/paper-button';
import PaperTemplate from 'demoapp/pods/components/paper-button/template';

/**
 * Extend paper button to show loading indicator for promises
 */
PaperButton.reopen({
  template: PaperTemplate,

  click() {
    const action = this.get('onClick');
    if (action) {
      const ret = action(...arguments);
      if (ret && ret.then && ret.finally) {
        this.set('loading', true);
        this.set('disabled', true);
        ret.finally(() => {
          this.set('loading', false);
          this.set('disabled', false);
        });
      }
    }
    // Prevent bubbling, if specified. If undefined, the event will bubble.
    return this.get('bubbles');
  }
});

export {}
