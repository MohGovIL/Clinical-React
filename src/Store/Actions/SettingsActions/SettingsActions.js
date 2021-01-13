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
import { FHIR } from 'Utils/Services/FHIR';
import { setUserAction } from 'Store/Actions/ActiveActions';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import {loginSuccessAction} from "../LoginActions/LoginActions";

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

export const getSettingsAction = (history, userName) => {
  return async (dispatch) => {
    try {
      dispatch(getSettingsStartAction());
      const settings = await getGlobalSettings(userName);
      dispatch(loginSuccessAction(settings.data.user_id));
      const PractitionerData = await FHIR('Practitioner', 'doWork', {
        functionName: 'getPractitioner',
        functionParams: {
          user: settings.data.user_id,
        },
      });
      geti18n(settings.data.lang_id);
      console.log(settings.data)
      dispatch(getSettingsSuccessAction(settings.data));


      if (PractitionerData) {
        dispatch(setUserAction(PractitionerData.data));
      }

      //history.push(`${firstRouteMapper(settings.data.clinikal_vertical)}`);
      history.push(`${baseRoutePath()}/generic/patientTracking`);
    } catch (err) {
      dispatch(getSettingsFailedAction());
    }
  };
};
