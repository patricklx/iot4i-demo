import Component from '@ember/component';
import { action } from '@ember-decorators/object';
import { alias } from '@ember-decorators/object/computed';
import { service } from '@ember-decorators/service';

export default class extends Component {

  @service router;

  @action
  showDetails() {
    this.get('router').transitionTo('shields.shield', this.get('shield'));
  }

  @action
  delete() {
    return this.shield.destroyRecord();
  }

  @action
  deactivate() {
  }
};
