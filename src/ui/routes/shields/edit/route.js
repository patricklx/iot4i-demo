import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  store: service(),
  menuTitle: service(),

  model(params) {
    if (params.shield_id === '__new__') {
      this.menuTitle.currentSubTitle = 'Creating new Shield';
      return {
        id: '__new__', name: 'New Shield', modelType: 'shield', isLoaded: true
      };
    }
    return this.store.find('shield', params.shield_id).then((r) => {
      return r;
    });
  },

  afterModel(model, transition) {
    this.menuTitle.set('currentSubTitle', model.name);
  },

  actions: {
    willTransition(transition) {
      this.menuTitle.set('currentSubTitle', '');
    }
  }
});
