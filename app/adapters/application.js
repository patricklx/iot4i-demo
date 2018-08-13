import DS from 'ember-data';
import { computed } from '@ember-decorators/object';
import { service } from '@ember-decorators/service';
import { dasherize } from '@ember/string';
import { pluralize } from 'ember-inflector';

import config from 'demoapp/config/environment';


export default class extends DS.RESTAdapter {
  @service session;
  @service router;
  @service paperToaster;
  host = config.iotUri;
  namespace = 'api/v1/' + config.tenantId;

  @computed('session.credentials')
  get headers(){
    let auth = this.get('session.credentials.access_token');
    if (!auth) return {};
    return {
      'authorization': 'Bearer ' + auth
    };
  }

  pathForType(modelName) {
    const dasherized = dasherize(modelName);
    return pluralize(dasherized);
  }

  deleteRecord(store, type) {
    let p = super.deleteRecord(...arguments);
    return p.then((result) => {
      this.paperToaster.show(`deleted record ${type.modelName}`, {
        position: 'bottom right',
        duration: 4000
      });
      return result;
    }, (err) => {
      this.paperToaster.show(`failed to delete record ${type.modelName}: ${err}`, {
        position: 'bottom right',
        duration: 4000
      });
      throw err;
    });
  }

  handleResponse(status) {
    if (status === 401) {
      this.session.logout();
      this.router.transitionTo('index');
    }
    return super.handleResponse(...arguments);
  }
};
