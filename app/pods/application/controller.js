import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Controller {
  @service session;

  init() {
    this.menuItems = [{
      title: 'Home',
      routeName: 'application',
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
      title: 'Actions',
      routeName: 'actions',
      icon: 'notifications'
    }, {
      title: 'Customers',
      routeName: 'customers',
      icon: 'perm_identity'
    }];
  }

  @action
  transitionTo(to) {
    this.set('currentRoute', to);
    this.transitionToRoute(to);
  }

  @action
  logout() {
    this.get('session').logout();
    this.transitionToRoute('login');
  }
}
