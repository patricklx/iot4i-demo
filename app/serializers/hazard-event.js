import AppSerializer from './application';

export default AppSerializer.extend({
  normalize(model, hash, prop) {

    hash.user = hash.username;
    hash.hazardUuid = hash.hazardUUID;
    hash.shield = hash.shieldUUID || hash.shieldID;

    delete hash.shieldUUID;
    delete hash.shieldID;
    delete hash.username;

    return this._super(...arguments);
  },
});
