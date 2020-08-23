import { tokenInstanceGenerator } from 'Utils/Services/AxiosWithTokenInstance';
import { ApiTokens } from 'Utils/Services/ApiTokens';
import { store } from '../../index';
import { FHIR } from './FHIR';
import normalizeFhirDocumentReference from '../Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirDocumentReference';
import { combineBase_64 } from '../Helpers/combineBase_64';
import { calculateFileSize } from '../Helpers/calculateFileSize';
import { decodeBase_64IntoBlob } from '../Helpers/decodeBase_64IntoBlob';

/**
 * @author Idan Gigi idangi@matrix.co.il
 * @fileOverview Where all the apis that uses the normal api Token
 */

const apiTokenInstance = () => tokenInstanceGenerator(ApiTokens.API.tokenName);

export const getGlobalSettings = (userID) => {
  return apiTokenInstance().get(`apis/api/settings/globals/${userID}`);
};

export const getMenu = (menuName) => {
  return apiTokenInstance().get(`apis/api/settings/menu/${menuName}`);
};

export const getCities = () => {
  return apiTokenInstance().get(`apis/api/lists/cities`);
};

export const getIndicatorsSettings = () => {
  return apiTokenInstance().get(`apis/api/indicator-settings`);
};

export const getStreets = (city) => {
  return city && apiTokenInstance().get(`apis/api/lists/streets/${city}`);
};

export const getForms = (service_type, examination_code) => {
  if (!service_type && (!examination_code || examination_code.length < 1))
    return [];

  let reason_code = examination_code ? examination_code.toString() : null;

  return apiTokenInstance().get(
    `apis/api/load-forms?${service_type ? 'service_type=' + service_type : ''}${
      reason_code && service_type
        ? '&reason_code=' + reason_code
        : reason_code
        ? 'reason_code=' + reason_code
        : ''
    }`,
  );
};

export const getFormTemplates = (
  serviceType,
  reasonCode,
  formID,
  formField,
) => {
  if (serviceType && reasonCode && formID && formField)
    return apiTokenInstance().get(
      `apis/api/templates/search?service-type=${serviceType}&reason-code=${reasonCode}&form=${formID}&form-field=${formField}`,
    );
  return null;
};

export const getLetterAPIListOfParams = (city) => {
  //GET /api/letters/list
  return city && apiTokenInstance().get(`apis/api/letters/list`);
};
export const createLetter = async ({
  letter_type,
  encounter,
  patient,
  owner,
  facility,
  x_ray_type,
  name_of_letter,
  id,
}) => {
  if (id && id > 0) {
    const documentReferenceData = await FHIR('DocumentReference', 'doWork', {
      functionName: 'deleteDocumentReference',
      documentReferenceId: id,
    });
  }
  return apiTokenInstance().post(`apis/api/letters/letter_${letter_type}`, {
    encounter: encounter,
    patient: patient,
    owner: owner,
    facility: facility,
    x_ray_type: x_ray_type,
    name_of_letter: name_of_letter,
  });
};
