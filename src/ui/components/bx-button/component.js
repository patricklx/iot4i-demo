import Ember from 'ember';
import BxClassNames from 'demoapp/src\\utils\\mixins\\bx-class-names';

export default Ember.Component.extend(BxClassNames, {
  tagName: '',
  classPrefix: 'bx--btn--',
  classMappings: [
    'primary:primary',
    'secondary:secondary',
    'danger:danger',
    'ghost:ghost',
    'small:sm'
  ],
  actions: {
    onClick(...args) {
      const action = this.get('onClick');
      if (action) {
        const ret = action(...args);
        if (ret instanceof Promise) {
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
  }
});
