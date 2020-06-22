import {
  BADGE_CELL,
  BUTTON_CELL,
  LABEL_CELL,
  PERSONAL_INFORMATION_CELL,
  SELECT_CELL,
} from 'Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes';

const tableHeaders = {
  personalInformation: {
    tableHeader: 'Personal information',
    hideTableHeader: false,
    component: PERSONAL_INFORMATION_CELL,
  },
  cellPhone: {
    tableHeader: 'Cell phone',
    hideTableHeader: false,
    component: LABEL_CELL,
  },
  healthcareService: {
    tableHeader: 'Healthcare service',
    hideTableHeader: false,
    component: LABEL_CELL,
  },
  reasonForReferral: {
    tableHeader: 'Reason for refferal',
    hideTableHeader: false,
    component: LABEL_CELL,
  },
  time: {
    tableHeader: 'Time',
    hideTableHeader: false,
    component: LABEL_CELL,
  },
  status: {
    tableHeader: 'Status',
    hideTableHeader: false,
    component: SELECT_CELL,
  },
  messages: {
    tableHeader: 'Messages',
    hideTableHeader: false,
    component: BADGE_CELL,
  },
  date: {
    tableHeader: 'Date',
    hideTableHeader: false,
    component: LABEL_CELL,
  },
  patientAdmission: {
    tableHeader: 'Patient admission',
    hideTableHeader: true,
    component: BUTTON_CELL,
  },
  encounterSheet: {
    tableHeader: 'Encounter sheet',
    hideTableHeader: true,
    component: BUTTON_CELL,
  },
};

export const getTableHeaders = (tableHeadersName) => {
  return tableHeadersName.map((header) => {
    return tableHeaders[header];
  });
};
