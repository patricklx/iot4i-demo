import AppSerializer from './application';

export default AppSerializer.extend({
  normalize(model, hash, prop) {
    hash.shield = hash.shieldId;
    hash.user = hash.userId;
    delete hash.shieldId;
    delete hash.userId;

    return this._super(model, hash, prop);
  }
});
