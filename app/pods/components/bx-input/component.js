import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  tagName: '',
  uuid: computed(function () {
    return guidFor(this);
  }),
})
