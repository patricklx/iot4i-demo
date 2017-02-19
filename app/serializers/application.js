import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    let inflector = new Ember.Inflector(Ember.Inflector.defaultRules);
    let newPayload = {};

    if (!['findAll', 'findHasMany'].includes(requestType)) {
      payload.id = payload._id;
      delete payload._id;
      newPayload[primaryModelClass.modelName] = payload;
    } else {
      let plural = inflector.pluralize(primaryModelClass.modelName);
      newPayload[plural] = payload[plural.camelize()];
      newPayload[plural].forEach(function(item){
        item.id = item._id;
        delete item._id;
      });
    }

    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },
});
