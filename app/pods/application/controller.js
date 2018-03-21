import Controller from '@ember/controller';
import { action, computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';

export default class extends Controller {
  @service session;
  @service router;

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
      icon: 'warning',
      submenus: [{
        title: 'Hazards',
        routeName: 'hazards',
        icon: 'warning'
      }, {
        title: 'Hazards by Country',
        routeName: 'hazards',
        icon: 'warning'
      }
      ]
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

  @computed('router.currentRouteName')
  get currentMenu() {
    return this.menuItems.find((i) => {
      if (i.submenus) {
        return i.submenus.find(sm => sm.routeName.startsWith(this.router.currentRouteName));
      }
      return i.routeName.startsWith(this.router.currentRouteName);
    });
  }

  @action
  transitionTo(to) {
    this.transitionToRoute(to);
  }

  @action
  logout() {
    this.get('session').logout();
    this.transitionToRoute('login');
  }

  @action
  toggleExpandedItem(item, ev) {
    ev.stopPropagation();
    const expandProperty = item + '-expanded';
    if (this.currentExpanded === expandProperty) {
      this.toggleProperty(expandProperty);
      return;
    }
    if (this.currentExpanded) {
      this.set(this.currentExpanded, false);
    }
    this.currentExpanded = expandProperty;
    this.set(this.currentExpanded, true);
  }
}
