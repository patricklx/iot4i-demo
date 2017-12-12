import DS from 'ember-data';
import Ember from 'ember';
import config from 'demoapp/config/environment';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: config.iotUri,
  namespace: 'api/v1/' + config.tenantId,
  headers: Ember.computed('session.credentials', function(){
    let auth = this.get('session.credentials.access_token');
    if (!auth) return {};
    return {
      'authorization': 'Bearer ' + auth
    };
  })
});