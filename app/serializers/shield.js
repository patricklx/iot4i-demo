import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {  
    payload['shields'].forEach(function(item){
      item.id = item._id;
      item.uuid = item.UUID;
      delete item.UUID;
    });

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});