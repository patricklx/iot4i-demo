import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  user: null,
  userPromise: null,
  credentials: null,

  tryLogin() {
    if (this.get('userPromise')) {
      return this.get('userPromise');
    }
    localStorage.setItem('credentials', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpPU0UiLCJraWQiOiJvS3dTY21CRFdITjBMVEhnVDRpQjhpMjdZUjNYOF9IRWQ3Smo2RlEtcHhVIn0.eyJpc3MiOiJhcHBpZC1vYXV0aC5uZy5ibHVlbWl4Lm5ldCIsImV4cCI6MTQ5ODU3Nzk5NCwiYXVkIjoiMjBjMDliNmUtMzBiYi00ZmUxLTgxNDAtYzY3MTA2ZmE3MmJkIiwic3ViIjoiN2RjNTJkY2MtOWQzYy00MDA0LWE3Y2UtYWIxMGEzYzUwMzlhIiwiYW1yIjpbImdvb2dsZSJdLCJpYXQiOjE0OTg1NzQzOTQsInRlbmFudCI6IjE0MDAxNWRlLWM1NGYtNDlhMC1iYzRhLTQyOTBiMmJhYTQ1ZiIsInNjb3BlIjoiYXBwaWRfZGVmYXVsdCBhcHBpZF9yZWFkcHJvZmlsZSBhcHBpZF9yZWFkdXNlcmF0dHIgYXBwaWRfd3JpdGV1c2VyYXR0ciJ9.CKfc1oFUMaQOLBS0BX_9IjerpNI3I7FYeHmMf_CehSX_5eCmZZAEZaa2l-3osGqMySUCXe3_xg0dgHspBwwwyBbyHDOT-3O2EuhRpYaB5DCrlWU1leSMTBMH_ijy5agYCqibUXZ5gtK0G39cIXQFn1lJ77bmCfUcVVxfplkS743FJTiZpsL4GIK6sLZTEvRXjSumaeyP-IQ2ALJ9LznnVrKtxo_yLSjmge9epnHzr5nSGbVgCvT6Ho5q2VcE-IREk_vDyi6mCu94cjFHcU7zYb8Gygsw9S4HYCdwGAH4DIhSdFW80Em0dkDx-Vfaa2hTsbC7u3o_t-Zk4rfK5fRypQ');
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
    return Ember.RSVP.Promise.reject();
  },

  logout() {
    this.set('user', null);
    this.set('credentials', null);
    localStorage.removeItem('credentials');
  },

  login(name, password) {
    let p = this.get('store').findRecord('user', this.get);
    return p.then((data) => {
      this.get('store').pushPayload('user', {data:  data});
      this.set('userPromise', this.get('store').find('user', data.username));
      this.get('userPromise').then((user) => {
        this.set('user', user);
        localStorage.setItem('credentials', JSON.stringify(this.get('credentials')));
      });
      return this.get('userPromise');
    });
  }
});
