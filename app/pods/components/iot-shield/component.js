import Ember from 'ember';


export default Ember.Component.extend({

  router: Ember.inject.service(),
  shield: null,

  actions: {
    showDetails() {
      this.get('router').transitionTo('shields.shield', this.get('shield'));
    },

    delete() {

    },

    deactivate() {

    }
  }
});
