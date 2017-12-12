import Ember from 'ember';
import config from 'demoapp/config/environment';
import { pluralize } from 'ember-inflector';


export default Ember.Service.extend({
  store: Ember.inject.service(),
  router: Ember.inject.service(),
  emberOauth2: Ember.inject.service(),
  user: null,
  userPromise: null,
  credentials: null,

  getUserId() {
    let output = localStorage['credentials'].split('.')[1].replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw "Illegal base64url string!";
    }
    output = JSON.parse(atob(output));
    return output.sub;
  },

  setAll(model) {
    this.get('store').findAll(model).then((res) => {
      this.set(pluralize(model), res);
    });
  },

  setUser() {
    this.setAll('hazard');
    this.setAll('shield');
    this.setAll('user');
    this.setAll('device');
    this.setAll('claim');
    this.set('userPromise', this.get('store').findRecord('user', this.getUserId()));
    this.get('userPromise').then((user) => {
      this.set('user', user);
    });
  },

  checkCredentials() {
    if (localStorage['credentials']) {
      this.set('credentials', JSON.parse(localStorage['credentials']));

      let adapter = this.get('store').adapterFor('application');
      let url = adapter.buildURL() + '/introspect';
      return Ember.$.ajax({
        url: url,
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
          token: this.get('credentials.access_token')
        }}).then((result) => {
          if (result.active === false) {
            this.set('credentials', null);
            localStorage.removeItem('credentials');
            throw new Error('Token Invalid');
          }
          this.setUser();
      });
    }

    return Ember.RSVP.Promise.reject();
  },

  tryLogin(params) {

    if (!params || !params.code) {
      return this.checkCredentials();
    }

    let adapter = this.get('store').adapterFor('application');
    let url = adapter.buildURL() + '/token';
    return Ember.$.ajax({
      url: url,
      type: 'post',
      contentType: 'application/x-www-form-urlencoded',
      data: {
        client_id:'your-client-id',
        client_secret:'your-client-secret-if-required',
        code: params.code,
        redirect_uri: config.EmberENV['ember-oauth2'].iot4i.redirectUri,
        grant_type: 'authorization_code'
    }}).then((token) => {
      localStorage.setItem('credentials', JSON.stringify(token));
      window.close();
    }).catch((err) => {
      localStorage.setItem('authError', JSON.stringify(err));
      window.close();
    })
  },

  logout() {
    this.set('user', null);
    this.set('credentials', null);
    localStorage.removeItem('credentials');
  },

  login() {
    this.get('emberOauth2').setProvider('iot4i');
    // this.get('emberOauth2').set('clientId', 'your-client-id');
    return this.get('emberOauth2').authorize().then((response) => {
      let checkWindow = () => {
        if(response.closed) {
          this.set('credentials', JSON.parse(localStorage.getItem('credentials')));
          this.set('authError', JSON.parse(localStorage.getItem('authError')));
          this.setUser();
          this.get('router').transitionTo('index');
          return;
        }
        Ember.run.later(checkWindow);
      };
      checkWindow();
    }, function(error) {
      this.get('emberOauth2').get('auth').trigger('error', error);
    })
  }
});
