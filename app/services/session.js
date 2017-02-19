import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  user: null,
  userPromise: null,
  credentials: null,

  tryLogin() {
    if (localStorage['credentials']) {
      let cred = JSON.parse(localStorage['credentials']);
      return this.login(cred.name, cred.password);
    }
    return new Ember.RSVP.Promise(function (resolve, fail) {
      fail();
    })
  },

  logout() {
    this.set('user', null);
    this.set('credentials', null);
    localStorage.removeItem('credentials');
  },

  login(name, password) {
    this.set('credentials', {name:name, password:password});
    let p = this.get('store').adapterFor('user').login(name, password);
    return p.then((data) => {
      this.set('userPromise', this.get('store').queryRecord('user', {username: data.username}));
      return this.get('userPromise').then((user) => {
        this.set('user', user);
        localStorage.setItem('credentials', JSON.stringify(this.get('credentials')));
      });
    });
  }
});
