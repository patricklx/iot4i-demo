import DS from 'ember-data';

export default DS.Model.extend({
  hazardUuid: DS.attr(),
  hazardid: DS.attr(),
  ishandled: DS.attr(),
  islocal: DS.attr(),
  timestamp: DS.attr(),
  title: DS.attr(),

  shield: DS.belongsTo('shield'),
  user: DS.belongsTo('user')
});

