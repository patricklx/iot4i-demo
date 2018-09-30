import config from 'demoapp/config/environment';
import AppAdapter from '../application/adapter';

export default class UserAdapter extends AppAdapter {
  host = config.backendUri;
}
