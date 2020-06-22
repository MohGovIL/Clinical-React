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
