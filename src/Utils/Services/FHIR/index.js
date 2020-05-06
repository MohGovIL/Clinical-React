/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a contaxt strategy entry point which handles old fhirAPI code logic written by :
 *                   Idan Gigi - gigiidan@gmail.com
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import React, { useState } from 'react';
import Appointment from './Appointment';
import Encounter from './Encounter';
import HealthcareService from './HealthcareService';
import Organization from './Organization';
import Patient from './Patient';
import ValueSet from './ValueSet';
import RelatedPerson from './RelatedPerson';
import Questionnaire from './Questionnaire';
import QuestionnaireResponse from './QuestionnaireResponse/index';
import DocumentReference from './DocumentReference';
import { tokenInstanceGenerator } from '../AxiosWithTokenInstance';
import { ApiTokens } from '../ApiTokens';

const FHIRStates = {
  Appointment: Appointment,
  Encounter: Encounter,
  HealthcareService: HealthcareService,
  Organization: Organization,
  Patient: Patient,
  ValueSet: ValueSet,
  RelatedPerson: RelatedPerson,
  Questionnaire: Questionnaire,
  QuestionnaireResponse: QuestionnaireResponse,
  DocumentReference:DocumentReference,
  /* More transformers */
  __default__: null,
};

export const FHIR = (state = null, action = null, params = null) =>
  new Promise((resolve, reject) => {
    if (action) {
      const transformer = FHIRStates[state] ?? FHIR.__default__;
      resolve(transformer(action, params));
    }
  });
