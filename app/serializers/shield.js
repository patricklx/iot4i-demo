import AppSerializer from './application';
import { pluralize } from 'ember-inflector';

export default AppSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let namespace = store.adapterFor('application').namespace;
    if (payload && payload.items) {
      payload.items.forEach((m) => {
        m.links = {
          codes: `/${namespace}/shield-codes?shieldId=${m._id}`
        };
      });
    } else {
      payload.links = {
        codes: `/${namespace}/shield-codes?shieldId=${payload._id}`
      };
    }
    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  normalize(model, hash, prop) {
    hash.user = hash.userId;
    return this._super(model, hash, prop);
  }
});
