import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login', { path: '/login' });
  this.route('shields', { path: '/shields' });
  this.route('settings', { path: '/settings' });
});

export default Router;
