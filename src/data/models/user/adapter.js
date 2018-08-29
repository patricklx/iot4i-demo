import DS from 'ember-data';
import config from 'demoapp/config/environment';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: config.backendUri,
  namespace: 'api/v1'
});
