import Ember from 'ember';
import Component from '@ember/component';
import {computed} from '@ember/object';
import icon from 'carbon-icons';
import BxClassNames from 'demoapp/mixins/bx-class-names'

export default Component.extend(BxClassNames, {
  tagName: '',
  classPrefix: 'bx--icon--',
  classMappings: [
    'info:info',
    'danger:danger',
    'disabled:disabled'
  ],
  svg: computed('attrs.icon', function () {
    return icon.find(i => i.id === `icon--${this.icon}`);
  }),

  actions: {
    onClick() {
      const promise = this.onClick && this.onClick();
      if (promise && promise.finally) {
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
