import { tokenInstanceGenerator } from 'Utils/Services/AxiosWithTokenInstance';
import { ApiTokens } from 'Utils/Services/ApiTokens';

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
