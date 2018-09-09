import Resolver from 'ember-resolver/resolvers/fallback';
import buildResolverConfig from 'ember-resolver/ember-config';
import Ember from 'ember';
import { computed } from '@ember/object';
import config from '../config/environment';

const moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */

export default Resolver.extend({
  config: moduleConfig,

  init(options) {
    this._super(options);
    const lookupAddonComponent = function lookupAddonComponent(parsedName) {
      if (parsedName.type === 'template') {
        return `${parsedName.prefix}/${parsedName.fullNameWithoutType}/${parsedName.type}`;
      }
      return `${parsedName.prefix}/components/${parsedName.fullNameWithoutType}/${parsedName.type}`;
    };
    this._fallback.moduleNameLookupPatterns.push(lookupAddonComponent);
  },

  makeToString(factory, fullName) {
    const name = this._super(factory, fullName);
    if (name.startsWith('@ember') || name === '(unknown)') {
      return fullName.replace('component:', '');
    }
    return name;
  },
  resolve: function resolve(name, referrer) {
    let result;
    try {
      result = this._super(name, referrer);
    } catch (e) {
      console.warn(e);
    }
    return result || this._fallback.resolve(this._fallback.normalize(name));
  }
});


const ComponentLookup = Ember.ComponentLookup;


ComponentLookup.reopen({
  componentFor(name, owner, options) {
    options = Object.assign({}, options);
    if (name.includes('::')) {
      name = name.replace('::', '@');
    }
    if (name.includes('@') && options) {
      options.source = undefined;
    }
    const ret = this._super.call(this, name, owner, options);
    if (ret) {
      return ret;
    }

    if (options && options.source) {
      const namespace = options.source.split(':')[1].split('/')[0];
      name = `${namespace}@${name}`;
      options.source = undefined;
      return this._super.call(this, name, owner, options);
    }
  },

  layoutFor(name, owner, options) {
    options = Object.assign({}, options);
    if (name.includes('::')) {
      name = name.replace('::', '@');
    }
    if (name.includes('@') && options) {
      options.source = undefined;
    }
    const ret = this._super.call(this, name, owner, options);
    if (ret) {
      return ret;
    }

    if (options && options.source) {
      const namespace = options.source.split(':')[1].split('/')[0];
      name = `${namespace}@${name}`;
      options.source = undefined;
      return this._super.call(this, name, owner, options);
    }
  }
});
