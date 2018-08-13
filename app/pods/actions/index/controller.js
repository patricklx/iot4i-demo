import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    delete(action) {
      return action.destroyRecord();
    },

    addNew() {
      this.router.transitionTo('actions.edit', '__new__');
    },

    edit(action) {
      this.router.transitionTo('actions.edit', action);
    }
  }
});
