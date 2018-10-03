import EmberRouter from "@ember/routing/router";
import config from "../config/environment";
import { inject as service } from '@ember/service';


const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  session: service(),

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

Router.map(function() {
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
  this.route('profile', function () {
    this.route('index');
    this.route('shields', { path: 'shields' });
    this.route('shield-activation-edit', { path: ':shield_activation_id' });
  });
});

export default Router;
