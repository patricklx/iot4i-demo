import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),



  beforeModel() {
    if (!this.get('session.user')) {
      this.transitionTo('login');
    }
  }
});
