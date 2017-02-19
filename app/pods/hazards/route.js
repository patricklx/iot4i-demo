import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),

  model() {
    this.get('store').findAll('hazard-event');
    return this.get('store').findAll('user');
  }
});
