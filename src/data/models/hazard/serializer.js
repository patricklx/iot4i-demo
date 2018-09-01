import AppSerializer from '../application/serializer';

export default AppSerializer.extend({
  normalize(model, hash, prop) {
    hash.shield = hash.shieldId;
    hash.user = hash.userId;
    delete hash.shieldId;
    delete hash.userId;

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
