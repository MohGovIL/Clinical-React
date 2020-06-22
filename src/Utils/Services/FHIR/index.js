/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a contaxt strategy entry point which handles old fhirAPI code logic written by :
 *                   Idan Gigi - idangi@matrix.co.il
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

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
import Practitioner from './Practitioner';
import Condition from './Condition';
import MedicationStatement from './MedicationStatement';

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
  DocumentReference: DocumentReference,
  Practitioner:Practitioner,
  Condition:Condition,
  MedicationStatement:MedicationStatement,
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
