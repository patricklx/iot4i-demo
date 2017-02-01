import AppAdapter from './application';

export default AppAdapter.extend({
  urlForFindRecord(id, modelName, snapshot) {
    return this.get('host') + `/user/name/${id}`;
  },

  login() {
    const baseUrl = this.buildURL('user');
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
