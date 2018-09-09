import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  session: service(),
  store: service(),
  router: service(),

  allShields: computed('', function () {
    return this.store.findAll('shield');
  }),

  allShieldsWithoutActivation: computed('allShields.[]', 'session.user.shieldActivations.[]', function (){
    if (!this.session.user) {
      return [];
    }
    return this.allShields.filter(s => !this.session.user.shieldActivations.find(sa => sa.shield.get('id') === s.id));
  }),

  actions: {
    activateShield(shield) {
      return this.store.createRecord('shield-activation', {
        shield: shield,
        user: this.session.user,
        enabled: true
      }).save();
    },

    toggleShieldActivation(sa) {
      sa.toggleProperty('enabled');
      return sa.save();
    },

    delete(sa) {
      return sa.destroyRecord();
    },

    edit(sa) {
      this.router.transitionTo('profile.shield-activation-edit', sa);
    }
  }
});
