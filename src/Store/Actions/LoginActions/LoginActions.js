import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_START,
} from './LoginActionTypes';
import { loginInstance } from 'Utils/Services/AxiosLoginInstance';
import { stateLessOrNot } from 'Utils/Helpers/StatelessOrNot';
import { getSettingsAction } from '../SettingsActions/SettingsActions';
import { basePath } from 'Utils/Helpers/basePath';
import { ApiTokens } from 'Utils/Services/ApiTokens';


export const logoutStartAction = () => {
  return {
    type: LOGOUT_START,
  };
};

export const logoutSuccessAction = () => {
  return {
    type: LOGOUT_SUCCESS,
    isAuth: false,
  };
};

export const logoutFailedAction = () => {
  return {
    type: LOGOUT_FAILED,
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    dispatch(logoutStartAction());
    try {
      for (const token in ApiTokens) {
        document.cookie = `${ApiTokens[token].tokenName}=''`;
      }
      if (!stateLessOrNot()) {
        window.location = `${basePath()}interface/logout.php`;
      }
      dispatch(logoutSuccessAction());
    } catch (err) {
      dispatch(logoutFailedAction());
    }
  };
};

export const loginStartAction = () => {
  return {
    type: LOGIN_START,
  };
};

export const loginFailedAction = () => {
  return {
    type: LOGIN_FAILED,
    isAuth: false,
  };
};

export const loginSuccessAction = (userID) => {
  return {
    type: LOGIN_SUCCESS,
    isAuth: true,
    userID,
  };
};

const loginPromise = (username, password) => {
  if (stateLessOrNot()) {
    const userObj = {
      grant_type: 'password',
      username,
      password,
      scope: 'default',
    };
    const authPromise = [
      loginInstance.post('apis/api/auth', userObj),
      loginInstance.post('apis/fhir/auth', userObj),
    ];
    return Promise.all(authPromise);
  } else {
    return loginInstance.get(
      'interface/modules/zend_modules/public/clinikal-api/get-csrf-token',
    );
  }
};

export const loginAction = (username, password, history) => {
  return async (dispatch) => {
    dispatch(loginStartAction());
    try {
      let tokenData;
      if (stateLessOrNot()) {
        const [api, fhir] = await loginPromise(username, password);
        tokenData = api
        document.cookie = `${ApiTokens.API.tokenName}=${api.data.access_token};`;
        document.cookie = `${ApiTokens.FHIR.tokenName}=${fhir.data.access_token}`;
      }else {
        tokenData = await loginPromise(username, password);
        document.cookie = `${ApiTokens.CSRF.tokenName}=${tokenData.data.csrf_token}`;
      }
      dispatch(loginSuccessAction(tokenData.data?.user_data?.user_id));
      dispatch(getSettingsAction(history, tokenData.data?.user_data?.user_id));
    } catch (err) {
      dispatch(loginFailedAction());
      /*Optional solution dispatch logoutAction and add the 'else' below to logoutAction
            (not really necessary cuz Auth is false and PrivateRoute got it covered)
            */
      if (!stateLessOrNot()) {
        window.location = `${basePath()}interface/logout.php`;
      } else {
        history.push('/');
      }
    }
  };
};


export const restoreSessionAction = (username, password, history) => {
  return async (dispatch) => {
    dispatch(loginStartAction());
    try {
      let tokenData;
      if (stateLessOrNot()) {
        const [api, fhir] = await loginPromise(username, password);
        document.cookie = `${ApiTokens.API.tokenName}=${api.data.access_token};`;
        document.cookie = `${ApiTokens.FHIR.tokenName}=${fhir.data.access_token}`;
      }else {
        tokenData = await loginPromise(username, password);
        document.cookie = `${ApiTokens.CSRF.tokenName}=${tokenData.data.csrf_token}`;
      }
    } catch (err) {
      dispatch(loginFailedAction());
      /*Optional solution dispatch logoutAction and add the 'else' below to logoutAction
            (not really necessary cuz Auth is false and PrivateRoute got it covered)
            */
      if (!stateLessOrNot()) {
        window.location = `${basePath()}interface/logout.php`;
      } else {
        history.push('/');
      }
    }
  };
};
