import {
  SET_FILTER_DATE,
  SET_ORGANIZATION_FILTER_VALUE,
  SET_SERVICE_TYPE_FILTER_VALUE,
} from '../FilterActions/FilterActionsTypes';

export const setFilterDateAction = (filter_date) => {
  return {
    type: SET_FILTER_DATE,
    filter_date,
  };
};

export const setFilterOrganizationAction = (filter_organization) => {
  return {
    type: SET_ORGANIZATION_FILTER_VALUE,
    filter_organization,
  };
};

export const setFilterServiceTypeAction = (filter_service_type) => {
  return {
    type: SET_SERVICE_TYPE_FILTER_VALUE,
    filter_service_type,
  };
};
