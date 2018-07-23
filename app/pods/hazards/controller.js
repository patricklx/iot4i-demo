import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';

export default class extends Controller {

  @action
  delete(action) {
    return action.destroyRecord();
  }
}
