import AppSerializer from '../application/serializer';
import { pluralize } from 'ember-inflector';

export default AppSerializer.extend({
  attrs: {
    user: { serialize: true },
    shield: { serialize: true }
  },

  normalize(model, hash, prop) {
    hash.user = hash.userId;
    hash.shield = hash.shieldId;
    return this._super(model, hash, prop);
  },

  serialize(snapshot, options) {
    const json = this._super(snapshot, options);

    json.userId = json.user;
    json.shieldId = json.shield;
    delete json.user;
    delete json.shield;

    return json;
  }
});
