import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    transitionTo(to) {
      this.set('currentRoute', to);
      this.transitionToRoute(to);
    },

    logout() {
      this.get('session').logout();
      this.transitionToRoute('login');
    }
  }
})
