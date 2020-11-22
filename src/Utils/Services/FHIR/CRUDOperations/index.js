/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a CRUDOperations which calls fhir server api with
 * @search
 * @read
 * @patch
 * @update
 * @create
 *
 */

// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FHIR.setStrategy(with the object you want);  .
// 3) Call doWork from the FHIR .

import { tokenInstanceGenerator } from '../../AxiosWithTokenInstance';
import { ApiTokens } from '../../ApiTokens';

const CRUDOperationsCalls = {
  search: (params, fhirTokenInstance) => {
    const resolved = CRUDOperationsCalls['read'](params, fhirTokenInstance);
    return resolved;
  },
  read: (params, fhirTokenInstance) => {
    const resolved = fhirTokenInstance().get(params);
    return resolved;
  },
  patch: (params, fhirTokenInstance, data) => {
    const resolved = fhirTokenInstance().patch(params, data);
    return resolved;
  },
  update: function (params, fhirTokenInstance, data) {
    const resolved = fhirTokenInstance().put(params, data);
    return resolved;
  },
  create: function (params, fhirTokenInstance, data) {
    const resolved = fhirTokenInstance().post(params, data);
    return resolved;
  },
  delete: function (params, fhirTokenInstance) {
    const resolved = fhirTokenInstance().delete(params);
    return resolved;
  },
  __default__: null,
};
/**
 *
 * @param {string} action create | delete | update | patch | read | search
 * @param {string} url
 * @param {object} data
 */
export function CRUDOperations(action, url, data) {
  let fhirTokenInstance = () =>
    tokenInstanceGenerator(ApiTokens.API.tokenName);
  let fhirBasePath = 'apis/default/fhir/v4';
  const transformer =
    CRUDOperationsCalls[action] ?? CRUDOperationsCalls.__default__;
  return transformer(fhirBasePath + url, fhirTokenInstance, data);
}
