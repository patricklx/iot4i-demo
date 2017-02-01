import DS from 'ember-data';

export default DS.Model.extend({
   username: DS.attr('string'),
   phonenumber: DS.attr('string'),

   saveAttribute(attr) {
     const adapter = this.store.adapterFor(this.constructor.modelName);
     return adapter.saveAttribute(this, attr, this.get(attr));
   }
});
