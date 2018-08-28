import DS from 'ember-data';
import config from 'demoapp/config/environment';
import Ember from 'ember';

export default class extends DS.RESTAdapter {
  host = config.backendUri;
  namespace = 'api/v1';
};
