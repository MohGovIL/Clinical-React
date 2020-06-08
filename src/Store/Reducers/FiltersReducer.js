import { SET_STATUS_FILTER_BOX_VALUE } from 'Store/Actions/PatientTrackingActions/PatientTrackingTypes';
import Moment from 'moment';
import {
  SET_FILTER_DATE,
  SET_ORGANIZATION_FILTER_VALUE,
  SET_SERVICE_TYPE_FILTER_VALUE,
} from 'Store/Actions/FilterActions/FilterActionsTypes';

const INITIAL_STATE = {
  STATUS: '',
  statusFilterBoxValue: 0,
  filter_date: Moment().format('YYYY-MM-DD'),
  filter_organization: 0,
  filter_service_type: 0,
  filter_is_set: 0,
};

const FiltersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STATUS_FILTER_BOX_VALUE:
      return {
        ...state,
        STATUS: action.type,
        statusFilterBoxValue: action.value,
      };
    case SET_FILTER_DATE:
      return {
        ...state,
        STATUS: action.type,
        filter_date: Moment(action.filter_date).format('YYYY-MM-DD'),
        filter_is_set: 1
      };
    case SET_ORGANIZATION_FILTER_VALUE:
      return {
        ...state,
        STATUS: action.type,
        filter_organization: action.filter_organization,
        filter_is_set: 1
      };
    case SET_SERVICE_TYPE_FILTER_VALUE:
      return {
        ...state,
        STATUS: action.type,
        filter_service_type: action.filter_service_type,
        filter_is_set: 1,
      };
    default:
      return state;
  }
};

export default FiltersReducer;
