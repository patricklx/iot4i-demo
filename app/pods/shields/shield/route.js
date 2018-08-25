import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),

  model(params) {
    if (params.shield_id === '__new__') {
      return {
        id: '__new__', name: 'New Shield', modelType: 'shield', isLoaded: true
      };
    }
    return this.store.find(params.shieldId);
  }
});
