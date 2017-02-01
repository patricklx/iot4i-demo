import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {  
    payload.id = payload._id;
    var newPayload = {};
    newPayload[primaryModelClass.modelName] = payload;

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },
});