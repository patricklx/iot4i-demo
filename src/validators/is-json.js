/*******************************************************************************
 * Licensed Materials - Property of IBM
 * © Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

'use strict';


import BaseValidator from 'ember-cp-validations/validators/base';
import Ember from 'ember';


const FloatValidator = BaseValidator.extend({
  store: Ember.inject.service(),

  validate(value, options) {
    if (isNaN(value) || (!value && value !== '')) {
      return true;
    }
    try {
      JSON.parse(value);
    } catch (e) {
      this.createErrorMessage(e, value, options);
    }
  }
});

export default FloatValidator;
