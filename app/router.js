import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  session: Ember.inject.service(),

  willTransition: function(oldInfos, newInfos, transition) {
    this._super(...arguments);
    if (this.get('triedLogin')) {
      return;
    }
    if (!this.get('session.user')) {
      this.transitionTo('trylogin');
      this.set('triedLogin', true);
      this.get('session').tryLogin().then(() => {
        transition.retry();
      }, () => {
        this.transitionTo('login');
      })
    }
  }
});

Router.map(function() {
  this.route('login', { path: 'login' });
  this.route('shields', { path: 'shields' });
  this.route('settings', { path: 'settings' });
  this.route('trylogin', { path: 'trylogin' });
  this.route('shields', { path: 'shields' });
  this.route('hazards', { path: 'hazards' });
});

export default Router;
