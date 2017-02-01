import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  actions: {
    submit() {
      this.set('loading', true);
      let p = this.get('session.user').saveAttribute('phonenumber');
      p.catch(function () {
        this.get('session.user').rollbackAttributes();
      });
      p.finally(() => {
        this.set('loading', false);
      })
    }
  }
});
