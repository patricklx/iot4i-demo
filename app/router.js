import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  session: Ember.inject.service(),

  willTransition: function(oldInfos, newInfos, transition) {
    this._super(...arguments);

    if (this.get('session.credentials')) {
      return;
    }
    this.transitionTo('trylogin');
    this.get('session').tryLogin(transition.queryParams).then(() => {
      transition.retry();
    }, () => {
      this.transitionTo('login');
    });
  }
});

Router.map(function() {
  this.route('login', { path: 'login' });
  this.route('trylogin', { path: 'trylogin' });
  this.route('shields', { path: 'shields' }, function () {
    this.route('index');
    this.route('shield', { path: ':shield_id' }, function () {
      this.route('codes', function () {
        this.route('index');
      });
    });
  });
  this.route('hazards', { path: 'hazards' });
  this.route('actions', { path: 'actions' });
  this.route('devices', { path: 'devices' });
  this.route('actions', { path: 'actions' });
  this.route('users', { path: 'customers' });
  this.route('claims', { path: 'claims' });
});

export default Router;
