import Resolver from 'ember-resolver/resolvers/fallback';
import buildResolverConfig from 'ember-resolver/ember-config';
import config from '../config/environment';

let moduleConfig = buildResolverConfig(config.modulePrefix);
/*
 * If your application has custom types and collections, modify moduleConfig here
 * to add support for them.
 */

export default Resolver.extend({
  config: moduleConfig,
  makeToString(factory, fullName) {
    const name = this._super(factory, fullName);
    if (name.startsWith('@ember') || name === '(unknown)') {
      return fullName;
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
