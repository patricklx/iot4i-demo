import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  overviewCards: Ember.computed(
    'session.hazards.length',
    'session.shields.length',
    'session.devices.length',
    'session.users.length',
    function() {
      return [{
        name: 'Hazards',
        display: `${(this.get('session.hazards') || []).filterBy('ishandled').length} acks / ${this.get('session.hazards.length')}`,
        icon: 'warning'
      },
        {
          name: 'Shields',
          display: this.get('session.shields.length'),
          icon: 'security'
        },
        {
          name: 'Devices',
          display: this.get('session.devices.length'),
          icon: 'devices_other'
        },
        {
          name: 'Users',
          display: this.get('session.users.length'),
          icon: 'perm_identity'
        },
        {
          name: 'Claims',
          display: this.get('session.claims.length'),
          icon: 'mail'
        }
      ];
    }),

  actions: {

  }
});
