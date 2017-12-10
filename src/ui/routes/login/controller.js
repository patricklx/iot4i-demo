import Ember from 'ember';

export default Ember.Controller.extend({

  session: Ember.inject.service(),
  name: null,
  password: null,

  actions: {
    login() {
      this.set('loading', true);
      let p = this.get('session').login(
        this.get('name'),
        this.get('password')
      );
      p.finally(() => {
        this.set('loading', false);
      });
      p.catch((e) => this.set('error', e));
    }
  }
});
