import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  store: Ember.inject.service(),

  overviewCards: Ember.computed(
    'session.hazards.length',
    'session.shields.length',
    'session.devices.length',
    function() {
      return [{
        name: 'hazards',
        display: `${(this.get('session.hazards') || []).filterBy('acknowledged').length} acks / ${this.get('session.hazards.length')}`,
        icon: 'warning'
      },
      {
        name: 'shields',
        display: this.get('session.shields.length'),
        icon: 'security'
      },
      {
        name: 'devices',
        display: this.get('session.devices.length'),
        icon: 'devices_other'
      }
    ];
  }),

  actions: {

  }
});
