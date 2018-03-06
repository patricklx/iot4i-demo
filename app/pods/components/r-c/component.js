import Component from '@ember/component';
import { computed } from '@ember-decorators/object';

export default class extends Component {
  positionalParams = 'params';

  get tagName() {
    return '';
  }

  @computed('params.[]')
  get comp() {
    return this.params[0];
  }

  set comp(c) {
    if (!this.params) this.params = [];
    this.params[0] = c;
  }

  @computed('params.[]')
  get compParams() {
    return this.params.slice(1);
  }
}
