import AppSerializer from '../application/serializer';
import { pluralize } from 'ember-inflector';

export default AppSerializer.extend({
  attrs: {
    actions: { serialize: true }
  },
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    const namespace = store.adapterFor('application').namespace;
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
    hash.actions = hash.actionIds;
    return this._super(model, hash, prop);
  },

  serialize(snapshot, options) {
    const json = this._super(snapshot, options);

    json.userId = json.user;
    json.actionIds = json.actions;
    delete json.user;
    delete json.actions;

    return json;
  }
});
