import {
  SET_FILTER_DATE,
  SET_ORGANIZATION_FILTER_VALUE,
  SET_SERVICE_TYPE_FILTER_VALUE,
  SET_FILTER_DATE_DISABLED,
} from '../FilterActions/FilterActionsTypes';

export const setFilterDateAction = (filter_date) => {
  return {
    type: SET_FILTER_DATE,
    filter_date,
  };
};

export const setFilterDateDisabledAction = (isDisabled) => {
  //TODO:if filterDate isDisabled is true means that the time needs to be 'today'
  // Then check if disabled is false and set the filter_date to 'today'
  // And change CustomizedDatePicker line 86 that value: filter_date inside PickerProps obj
  return {
    type: SET_FILTER_DATE_DISABLED,
    isDisabled,
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
