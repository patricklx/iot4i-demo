import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  router: service(),
  leftSideBarOpen: true,

  init() {
    this._super(...arguments);
    this.menuItems = [{
      title: 'Home',
      routeName: 'index',
      icon: 'applications'
    }, {
      title: 'Shields',
      routeName: 'shields',
      icon: 'security'
    }, {
      title: 'Hazards',
      routeName: 'hazards',
      icon: 'warning--outline',
      submenus: [{
        title: 'Hazards',
        routeName: 'hazards',
        icon: 'warning--outline'
      }, {
        title: 'Hazards by Country',
        routeName: 'hazards',
        icon: 'warning--outline'
      }
      ]
    }, {
      title: 'Devices',
      routeName: 'devices',
      icon: 'iot'
    }, {
      title: 'Actions',
      routeName: 'actions',
      icon: 'notification-on'
    }, {
      title: 'Customers',
      routeName: 'customers',
      icon: 'header--user'
    }];

    const handler = (event) => {
      if (!this.leftSideBarOpen) {
        return;
      }
      // if the target is a descendent of container do nothing
      if ($(event.target).is('.side-nav, .side-nav *, .side-nav__toggle-btn, .side-nav__toggle-btn *')) return;
      if ($(window).width() <= 1024) {
        this.set('leftSideBarOpen', false);
      }
      // remove event handler from document
      // $(document).off("click", handler);
      // dostuff
    };

    $(document).on('click', handler);

    if ($(window).width() <= 1024) {
      this.set('leftSideBarOpen', false);
    }
  },

  currentMenu: computed('router.currentRouteName', function () {
    return this.menuItems.find((i) => {
      if (i.submenus) {
        return i.submenus.find(sm => this.router.currentRouteName.startsWith(sm.routeName));
      }
      return this.router.currentRouteName.startsWith(i.routeName);
    });
  }),

  currentSubMenu: computed('router.currentRouteName', function () {
    return this.menuItems.find((i) => {
      if (i.submenus) {
        return i.submenus.find(sm => sm.routeName.startsWith(this.router.currentRouteName));
      }
    });
  }),

  actions: {
    transitionTo(to) {
      this.transitionToRoute(to);
      if ($(window).width() <= 1024) {
        this.set('leftSideBarOpen', false);
      }
    },

    logout() {
      this.get('session').logout();
      this.transitionToRoute('login');
    },

    toggleExpandedItem(item, ev) {
      ev.stopPropagation();
      const expandProperty = `${item}-expanded`;
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
});
