import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  address: DS.attr('string'),
  phonenumber: DS.attr('string'),
  shieldassociations: DS.hasMany('shieldassociation'),
  hazardEvents: DS.hasMany('hazard-event'),
  geoLocation: Ember.computed(function () {
    return {
      lat: 180 * Math.random(),
      lng: 100 * Math.random(),
    };
  }),

  shields: Ember.computed('shieldassociations.@each.shield', function () {
    return this.get('shieldassociations').mapBy('shield');
  }),

  saveAttribute(attr) {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.saveAttribute(this, attr, this.get(attr));
  }
});
