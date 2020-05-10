import { SET_STATUS_FILTER_BOX_VALUE } from './PatientTrackingTypes';

export const setStatusFilterBoxValueAction = (value) => {
  return {
    type: SET_STATUS_FILTER_BOX_VALUE,
    value,
  };
};
