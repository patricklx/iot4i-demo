import DS from 'ember-data';
import config from 'demoapp/config/environment';

export default DS.RESTAdapter.extend({
  session: Ember.inject.service(),
  host: config.iotUri,
  headers: Ember.computed('session.credentials', function(){
    var auth = this.get('session.credentials');
    return {
      'Authorization': 'Basic ' + btoa(auth.name+':'+auth.password)
    };
  }),

  pathForType(type) {
    return type.constructor.modelName;
  }
});
