import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  menuItems: [{
    title: 'Home',
    routeName: 'index',
    icon: 'home'
  }, {
    title: 'Shields',
    routeName: 'shields',
    icon: 'security'
  }, {
    title: 'Hazards',
    routeName: 'hazards',
    icon: 'warning'
  }, {
    title: 'Devices',
    routeName: 'devices',
    icon: 'devices_other'
  }, {
    title: 'Customers',
    routeName: 'customers',
    icon: 'perm_identity'
  }],

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
