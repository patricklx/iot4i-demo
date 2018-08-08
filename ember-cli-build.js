/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      alias: {
        // when the app tries to import from "plotly.js", use
        // the real package "plotly.js-basic-dist" instead.
        // 'plotly.js': 'plotly.js-basic-dist',

        // you can also use alises to pick a different entrypoint
        // within the same package. This can come up when the default
        // entrypoint only works in Node, but there is also a browser
        // build available (and the author didn't provide a "browser"
        // field in package.json that would let us detect it
        // automatically).
        // 'handlebars': 'handlebars/dist/handlebars'
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules aember ss keys
  // along with the exports of each module as its value.

  app.import('bower_components/amcharts/dist/amcharts/amcharts.js');
  app.import('bower_components/amcharts/dist/amcharts/serial.js');
  app.import('node_modules/carbon-components/css/carbon-components.css');

  return app.toTree();
};
