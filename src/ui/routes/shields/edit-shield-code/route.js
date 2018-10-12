import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  menuTitle: service(),

  model(params) {
    if (params.shield_code_id === '__new__') {
      return {
        id: '__new__', name: 'New Shield Code', modelType: 'shield-code', isLoaded: true
      };
    }
    return this.store.find('shield-code', params.shield_code_id);
  },

  afterModel(model, transition) {
    this.menuTitle.set('currentTitle', 'Shield Code');
    this.menuTitle.set('currentSubTitle', model.name);
  },

  actions: {
    willTransition(transition) {
      this.menuTitle.set('currentTitle', undefined);
      this.menuTitle.set('currentSubTitle', undefined);
    }
  }
});
