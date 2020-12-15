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
    align: 'center',
    component: PERSONAL_INFORMATION_CELL,
  },
  cellPhone: {
    tableHeader: 'Cell phone',
    hideTableHeader: false,
    component: LABEL_CELL,
    align: 'center',
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
    align: 'center',
  },
  status: {
    tableHeader: 'Status',
    hideTableHeader: false,
    component: SELECT_CELL,
    align: 'center',
  },
  messages: {
    tableHeader: 'Messages',
    hideTableHeader: false,
    component: BADGE_CELL,
    align: 'center',
  },
  date: {
    tableHeader: 'Date',
    hideTableHeader: false,
    component: LABEL_CELL,
    align: 'center',
  },
  patientAdmission: {
    tableHeader: 'Patient admission',
    hideTableHeader: true,
    component: BUTTON_CELL,
    align: 'center',
  },
  encounterSheet: {
    tableHeader: 'Encounter sheet',
    hideTableHeader: true,
    component: BUTTON_CELL,
    align: 'center',
  },
};

export const getTableHeaders = (tableHeadersName) => {
  return tableHeadersName.map((header) => {
    return tableHeaders[header];
  });
};
