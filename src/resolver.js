import Resolver from 'ember-resolver/resolvers/fallback';
import buildResolverConfig from 'ember-resolver/ember-config';
import Ember from 'ember';
import config from '../config/environment';

const moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */

export default Resolver.extend({
  config: moduleConfig,
  makeToString(factory, fullName) {
    const name = this._super(factory, fullName);
    if (name.startsWith('@ember') || name === '(unknown)') {
      return fullName.replace('component:', '');
    }
    return name;
  },
  resolve: function resolve(name, referrer) {
    try {
      var result = this._super(name, referrer);
    } catch (e) {
      console.warn(e);
    }
    return result || this._fallback.resolve(this._fallback.normalize(name));
  }
});


const ComponentLookup = Ember.ComponentLookup;


ComponentLookup.reopen({
  componentFor: function componentFor(name, owner, options) {
    if (name.includes('::')) {
      name = name.replace('::', '/');
      name = `/@src/ui/components/${name}`;
    }
    if (name.includes('/') && options) {
      options.source = undefined;
    }
    return this._super.call(this, name, owner, options);
  },

  layoutFor(name, owner, options) {
    if (name.includes('::')) {
      name = name.replace('::', '/');
      name = `/@src/ui/components/${name}`;
    }
    if (name.includes('/') && options) {
      options.source = undefined;
    }
    return this._super.call(this, name, owner, options);
  }
});
