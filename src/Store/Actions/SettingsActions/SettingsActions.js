import { getGlobalSettings } from 'Utils/Services/API';
import firstRouteMapper from 'Utils/Helpers/firstRouteMapper';
import {
  GET_SETTINGS,
  GET_SETTINGS_FAILED,
  GET_SETTINGS_SUCCESS,
  SET_SETTINGS,
  SET_SETTINGS_FAILED,
  SET_SETTINGS_SUCCESS,
} from './SettingsActionTypes';
import { geti18n } from 'Utils/Services/i18n';

export const getSettingsStartAction = () => {
  return {
    type: GET_SETTINGS,
  };
};

export const getSettingsSuccessAction = (payload) => {
  return {
    type: GET_SETTINGS_SUCCESS,
    payload,
  };
};

export const getSettingsFailedAction = () => {
  return {
    type: GET_SETTINGS_FAILED,
  };
};

export const getSettingsAction = (history, userID) => {
  return async (dispatch) => {
    try {
      dispatch(getSettingsStartAction());
      const settings = await getGlobalSettings(userID);
      await geti18n(settings.data.lang_id);
      dispatch(getSettingsSuccessAction(settings.data));
      history.push(`${firstRouteMapper(settings.data.clinikal_vertical)}`);
    } catch (err) {
      dispatch(getSettingsFailedAction());
    }
  };
};
