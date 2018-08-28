import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr('string'),
  type: DS.attr('string'),
  description: DS.attr('string'),
  image: DS.attr('string'),
  codes: DS.hasMany('shield-code'),
  actions: DS.hasMany('action')
});


export const fields = [{
  id: 'name',
  label: 'Name',
  type: 'text',
  help: 'Name of shield',
  validations: null
},
  {
    id: 'type',
    label: 'Type',
    type: 'text',
    help: 'Custom type of shield',
    validations: null
  },
  {
    id: 'image',
    label: 'Image',
    type: 'text',
    help: 'Link to an image to represent the shield',
    validations: null
  },
  {
    id: 'description',
    label: 'Description',
    type: 'text',
    validations: {
      presence: true,
      length: {
        min: 3,
        max: 30
      }
    }
  },
  {
    id: 'actions',
    label: 'Select actions to execute on a hazard',
    type: 'model-select',
    modelType: 'action',
    modelLabel: 'name',
    description: 'description',
    validations: {
      presence: true
    }
  }
];
