import AppAdapter from './application';

export default AppAdapter.extend({
  urlForFindAll(id, modelName, snapshot) {
    return this.get('host') + `/shield/all`;
  },

  queryRecord(store, type, query) {
    if (query.username) {
      var url = this.buildURL(type.modelName, null, null, 'queryRecord', query);
      url += '/username/' + query.username;
      return this.ajax(url, 'GET');
    }
    return this._super(...arguments);
  }
})
