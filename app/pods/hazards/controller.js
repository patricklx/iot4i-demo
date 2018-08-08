import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    delete(action) {
      return action.destroyRecord();
    },

    ack(action) {

    }
  }
})
