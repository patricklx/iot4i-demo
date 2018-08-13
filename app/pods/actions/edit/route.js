import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model(params) {
    if (params.action_id === '__new__') {
      return {
        id: '__new__', name: 'New Action', modelType: 'action', isLoaded: true
      };
    }
    return this.store.find('action', params.action_id);
  }
});
