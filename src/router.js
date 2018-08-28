import Ember from 'ember';
import config from '../config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  session: Ember.inject.service(),

  willTransition(oldInfos, newInfos, transition) {
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

Router.map(function () {
  this.route('login', { path: 'login' });
  this.route('trylogin', { path: 'trylogin' });
  this.route('shields', { path: 'shields' }, function () {
    this.route('index');
    this.route('edit', { path: ':shield_id' });
    this.route('edit-shield-code', { path: 'code/:shield_code_id' });
  });
  this.route('hazards', { path: 'hazards' });
  this.route('actions', { path: 'actions' }, function () {
    this.route('index');
    this.route('edit', { path: ':action_id' });
  });
  this.route('devices', { path: 'devices' });
  this.route('actions', { path: 'actions' });
  this.route('customers', { path: 'customers' });
  this.route('claims', { path: 'claims' });
});

export default Router;
