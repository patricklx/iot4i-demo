import Ember from 'ember';
import BxClassNames from 'demoapp/mixins/bx-class-names'

export default Ember.Component.extend(BxClassNames, {
  tagName: '',
  classPrefix: 'bx--btn--',
  classMappings: [
    'primary:primary',
    'secondary:secondary',
    'danger:danger',
    'small:sm'
  ]
})
