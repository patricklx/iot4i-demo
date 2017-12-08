import AppSerializer from '../application/serializer';

export default AppSerializer.extend({
  normalize(model, hash, prop) {
    hash.shield = hash.shieldId;
    delete hash.shieldId;

    return this._super(model, hash, prop);
  }
});
