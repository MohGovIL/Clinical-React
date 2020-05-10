import axios from 'axios';
import { basePath } from 'Utils/Helpers/basePath';
import { getToken } from 'Utils/Helpers/getToken';
import { stateLessOrNot } from 'Utils/Helpers/StatelessOrNot';
import { ApiTokens } from 'Utils/Services/ApiTokens';

/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param tokenName - the token needed for the api
 * @returns {AxiosInstance} Axios instance with the token stored inside the axios instance
 */
export const tokenInstanceGenerator = (tokenName) => {
  const baseURL = basePath();
  let axiosObj = {
    baseURL,
  };

  if (stateLessOrNot()) {
    switch (tokenName) {
      case ApiTokens.API.tokenName:
        axiosObj['headers'] = {
          Authorization: `${ApiTokens.API.tokenType} ${getToken(
            ApiTokens.API.tokenName,
          )}`,
        };
        break;
      case ApiTokens.FHIR.tokenName:
        axiosObj['headers'] = {
          Authorization: `${ApiTokens.FHIR.tokenType} ${getToken(
            ApiTokens.FHIR.tokenName,
          )}`,
        };
        break;
      default:
        break;
    }
  } else {
    axiosObj['headers'] = {
      apicsrftoken: `${getToken(ApiTokens.CSRF.tokenName)}`,
    };
  }
  return axios.create(axiosObj);
};
