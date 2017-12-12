import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  session: Ember.inject.service(),

  // beforeModel(transition) {
  //   if (!this.get('session.user')) {
  //     this.transitionTo('trylogin');
  //     this.get('session').tryLogin().then(() => {
  //       transition.retry();
  //     }, function () {
  //       this.transitionTo('login');
  //     })
  //   }
  // },

  willTransition: function(oldInfos, newInfos, transition) {
    this._super(...arguments);

    if (this.get('session.credentials')) {
      return;
    }

    this.transitionTo('trylogin');
    this.get('session').tryLogin(transition.queryParams).then(() => {
      this.transitionTo('index');
    }, () => {
      this.transitionTo('login');
    });
  }
});

Router.map(function() {
  this.route('login', { path: 'login' });
  this.route('trylogin', { path: 'trylogin' });
  this.route('shields', { path: 'shields' });
  this.route('hazards', { path: 'hazards' });
  this.route('actions', { path: 'actions' });
  this.route('devices', { path: 'devices' });
  this.route('customers', { path: 'customers' });
});

export default Router;
