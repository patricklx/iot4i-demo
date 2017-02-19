import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload['shieldassociations'].forEach(function(item){
      item.id = item._id;
      item.user = item.username;
      item.shield = item.shieldUUID;
      delete item._id;
    });
    delete payload.params;
    delete payload.total;

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
