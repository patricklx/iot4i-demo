import AppSerializer from './application';

export default AppSerializer.extend({
  primaryKey: 'username',
  normalize(model, hash, prop) {
    hash.links = {
      shieldassociations: '/shieldassociation/byuser/' + hash.username,
      // hazardEvents: '/hazardEvent'
    };

    return this._super(...arguments);
  }
});
