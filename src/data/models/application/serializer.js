import DS from 'ember-data';
import { setProperties } from '@ember/object';
import { pluralize } from 'ember-inflector';

export default DS.RESTSerializer.extend({
  primaryKey: '_id',
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const newPayload = {};
    if (payload && payload.items) {
      newPayload[pluralize(primaryModelClass.modelName)] = payload.items;
      newPayload[pluralize(primaryModelClass.modelName)].__meta = {
        limit: payload.limit,
        offset: payload.offset,
        totalItems: payload.totalItems
      };
    } else {
      if (payload.id) {
        payload._id = payload.id;
        delete payload.id;
      }
      newPayload[primaryModelClass.modelName] = payload;
    }
    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },

  extractMeta(store, type, payload) {
    if (payload && payload.__meta) {
      store.metaForType(type, payload.__meta);
      delete payload.__meta;
    }
  },

  serializeIntoHash(hash, typeClass, snapshot, options) {
    this._super(hash, typeClass, snapshot, options);
    const normalizedRootKey = this.payloadKeyFromModelName(typeClass.modelName);
    setProperties(hash, hash[normalizedRootKey]);
    hash[normalizedRootKey] = undefined;
  }
});
