import Ember from 'ember';
import loadInitializers from 'ember-load-initializers';
import utils from './libs/utils';

import Resolver from './resolver';
import config from '../config/environment';


// fix for https://github.com/tildeio/rsvp.js/pull/491
// used in virtual-each
Ember.RSVP.cast = Ember.RSVP.resolve;
Ember.MODEL_FACTORY_INJECTIONS = true;

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, `${config.modulePrefix}/src/init`);

export default App;
