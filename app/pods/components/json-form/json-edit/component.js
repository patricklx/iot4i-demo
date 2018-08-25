import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  tagName: '',

  actions: {
    onChange(value) {
      try {
        const val = JSON.parse(value);
        this.set('err', '');
        this.onChange(val);
      } catch (e) {
        this.set('err', e);
      }
    }
  }
});
