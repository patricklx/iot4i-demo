import Ember from 'ember';
import icon from 'carbon-icons';

export default Ember.Component.extend({
  tagName: '',
  svg: Ember.computed('attrs.icon', function () {
    return icon.find(i => i.id === `icon--${this.attrs.icon}`);
  }),

  actions: {
    onClick() {
      const promise = this.attrs.onClick && this.attrs.onClick();
      if (promise && promise instanceof Promise) {
        this.set('loading', true);
        this.set('disabled', true);
        promise.finally(() => {
          this.set('loading', false);
          this.set('disabled', false);
        });
      }
    }
  }
})
