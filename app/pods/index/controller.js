import Controller from '@ember/controller';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Controller {
  @service session;
  @service store;
  @service router;

  @action
  transitionTo(to) {
    this.router.transitionTo(to);
  }

  @computed('session.hazards.length','session.shields.length','session.devices.length','session.users.length')
  get overviewCards() {
      return [{
        link: 'hazards',
        name: 'Hazards',
        display: `${(this.get('session.hazards') || []).filterBy('ishandled').length} acks / ${this.get('session.hazards.length')}`,
        icon: 'warning'
      },
        {
          link: 'shields',
          name: 'Shields',
          display: this.get('session.shields.length'),
          icon: 'security'
        },
        {
          link: 'devices',
          name: 'Devices',
          display: this.get('session.devices.length'),
          icon: 'devices_other'
        },
        {
          link: 'users',
          name: 'Users',
          display: this.get('session.users.length'),
          icon: 'perm_identity'
        },
        {
          link: 'claims',
          name: 'Claims',
          display: this.get('session.claims.length'),
          icon: 'mail'
        }
      ];
  }
};
