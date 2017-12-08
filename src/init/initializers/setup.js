import config from 'iot-app/config/environment';

export default {
  name: 'setup',
  initialize: function initialize(application) {
    application.register('config:environment', config, {singleton: true})
  }
};
