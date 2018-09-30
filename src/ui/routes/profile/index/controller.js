import Controller from '@ember/controller';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class extends Controller {
  @service session;
  @service store;
};
