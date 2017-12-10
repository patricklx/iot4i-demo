import Ember from 'ember';
import config from 'iot-app/config/environment';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  router: Ember.inject.service(),
  emberOauth2: Ember.inject.service(),
  user: null,
  userPromise: null,
  credentials: null,

  processLogin() {
    if (localStorage['credentials']) {
      this.set('credentials', localStorage['credentials']);
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
      this.debug(output);
      this.set('userPromise', this.get('store').findRecord('user', output.sub));
      this.get('userPromise').then((user) => {
        this.set('user', user);
      });
      return this.get('userPromise');
    }
  },

  tryLogin(params) {

    if (!params || !params.code) {
      return Ember.RSVP.Promise.reject();
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
    });
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
