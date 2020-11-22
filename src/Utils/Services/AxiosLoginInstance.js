import axios from 'axios';
import { basePath } from 'Utils/Helpers/basePath';

const baseURL = basePath();
/**
 * @author Idan Gigi idangi@matrix.co.il
 * @returns {AxiosInstance} Axios instance with base URL used for logging in
 */
export const loginInstance = (headers = null) => {

  let axiosObj = {
    baseURL,
  };
  if (headers !== null) {
    axiosObj['headers'] = headers
  }
  return  axios.create(axiosObj);
}

