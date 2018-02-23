import DS from 'ember-data';
import { computed } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';
import config from 'demoapp/config/environment';


export default class extends DS.RESTAdapter {
  @service session;
  @service router;
  host = config.iotUri;
  namespace = 'api/v1/' + config.tenantId;

  @computed('session.credentials')
  headers(){
    let auth = this.get('session.credentials.access_token');
    if (!auth) return {};
    return {
      'authorization': 'Bearer ' + auth
    };
  }

  handleResponse(status) {
    if (status === 401) {
      this.get('session').logout();
      this.get('router').transitionTo('index');
    }
    return super.handleResponse(...arguments);
  }
};
