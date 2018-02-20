import PaperButton from 'ember-paper/components/paper-button';

export default PaperButton.extend({

  actions: {
    click() {
      const action = this.get('onClick');
      if (action) {
        const ret = action(...arguments);
        if (ret instanceof Promise) {
          this.set('loading', true);
          this.set('disabled', true);
          res.finally(() => {
            this.set('loading', false);
            this.set('disabled', false);
          });
        }
      }
      // Prevent bubbling, if specified. If undefined, the event will bubble.
      return this.get('bubbles');
    }
  }
})
