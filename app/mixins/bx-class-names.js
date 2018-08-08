/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

'use strict';

import Ember from 'ember';

export default Ember.Mixin.create({
  init() {
    this._super(...arguments);
    const mapping = {};
    const attrs = this.classMappings.map(m => m.split(':'));
    attrs.forEach(([a, c]) => {
      mapping[a] = this.classPrefix + c;
    });
    const props = attrs.map(a => `attrs.${a[0]}`);
    Ember.defineProperty(this, 'bxClassNames', Ember.computed(props.join(','), () => {
      return attrs.map(a => a[0]).map(a => String(this.attrs[a]) === 'true' ? mapping[a] : null).compact().join(' ');
    }));
  }
});
