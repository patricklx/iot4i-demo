import Ember from 'ember';
import config from 'iot-app/config/environment';

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
    if (!this.get('session.credentials')) {
      if (transition.queryParams.code && transition.queryParams.state) {
        this.transitionTo('trylogin');
        this.get('session').tryLogin(transition.queryParams).then(() => {
          this.transitionTo('index');
        }, () => {
          this.transitionTo('login');
        });
        return
      }
      this.transitionTo('login');
    }
  }
});

Router.map(function() {
  this.route('login', { path: 'login' });
  this.route('shields', { path: 'shields' });
  this.route('hazards', { path: 'hazards' });
  this.route('settings', { path: 'settings' });
  this.route('trylogin', { path: 'trylogin' });
  this.route('shields', { path: 'shields' });
});

export default Router;
