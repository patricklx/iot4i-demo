import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: '_id',
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    var newPayload = {};
    if (payload && payload.items) {
      newPayload[primaryModelClass.modelName] = payload.items;
      newPayload[primaryModelClass.modelName].__meta = {
        limit: payload.limit,
        offset: payload.offset,
        totalItems: payload.totalItems
      };
    } else {
      newPayload[primaryModelClass.modelName] = payload;
    }
    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },

  extractMeta: function(store, type, payload) {
    if (payload && payload.__meta) {
      store.metaForType(type, payload.__meta);
      delete payload.__meta;
    }
  }
});
