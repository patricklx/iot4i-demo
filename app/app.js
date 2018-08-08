import utils from './lib/utils';

import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

// fix for https://github.com/tildeio/rsvp.js/pull/491
// used in virtual-each
Ember.RSVP.cast = Ember.RSVP.resolve;
Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
