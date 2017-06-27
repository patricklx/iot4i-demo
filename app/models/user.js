import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),

  saveAttribute(attr) {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.saveAttribute(this, attr, this.get(attr));
  }
});
