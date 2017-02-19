import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'uuid',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (id) {
      payload.id = payload._id;
      payload.uuid = payload.UUID;
      delete payload.UUID;

      payload = {
        shield: payload
      };
    } else {
      payload['shields'].forEach(function(item){
        item.id = item._id;
        item.uuid = item.UUID;
        delete item.UUID;
      });
    }


    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
