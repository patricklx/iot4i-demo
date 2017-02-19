import AppAdapter from './application';

export default AppAdapter.extend({

  urlForFindRecord(id, modelName, snapshot) {
    return this.get('host') + `/user/name/${id}`;
  },

  queryRecord(store, type, query) {
    if (query.username) {
      var url = this.buildURL(type.modelName, null, null, 'queryRecord', query);
      url += '/name/' + query.username;
      return this.ajax(url, 'GET');
    }
    return this._super(...arguments);
  },

  login() {
    const baseUrl = this.buildURL();
    var url = baseUrl + '/checkuser/login';
    return this.ajax(url);
  },

  saveAttribute(model, attr, value) {
    const name = model.get('username');
    const baseUrl = this.buildURL(model);
    const url = `${baseUrl}/attribute/${name}/${attr}/${value}`;
    return this.ajax(url, 'POST');
  }
})
