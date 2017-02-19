import AppAdapter from './application';

export default AppAdapter.extend({

  query(store, type, query) {
    if (query.username) {
      var url = this.buildURL(type.modelName, null, null, 'queryRecord', query);
      url += '/byuser/' + query.username;
      return this.ajax(url, 'GET');
    }
    return this._super(...arguments);
  },

  queryRecord(store, type, query) {
    if (query.username) {
      var url = this.buildURL(type.modelName, null, null, 'queryRecord', query);
      url += '/byuser/' + query.username;
      return this.ajax(url, 'GET');
    }
    return this._super(...arguments);
  }
})
