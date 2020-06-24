import { setPatientDataInvitedTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataInvitedTableRows';
import { setPatientDataWaitingForExaminationTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataWaitingForExaminationTableRows';
import { setPatientDataWaitingForResultsTableRows } from 'Components/Generic/patientTrackingTabs/setPatientWaitingForResultsTableRows';
import { setPatientDataFinishedTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataFinishedTableRows';
import { appointmentActiveFunction } from 'Utils/Helpers/Appointment/appointmentActiveFunction';
import { appointmentNotActiveFunction } from 'Utils/Helpers/Appointment/appointmentNotActiveFunction';
import { setPatientDataWaitingForNurseTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataWaitingForNurse';
import { encounterActiveFunction } from 'Utils/Helpers/Encounter/encounterActiveFunction';
import { encounterNotActiveFunction } from 'Utils/Helpers/Encounter/encounterNotActiveFunction';
const allTabs = {
  invited: {
    tabName: 'Invited',
    id: 'invited',
    mode: 'hide',
    count: 0,
    tabValue: 0,
    activeAction: appointmentActiveFunction,
    notActiveAction: appointmentNotActiveFunction,
    tableFunction: setPatientDataInvitedTableRows,
  },
  waiting_for_examination: {
    tabName: 'Waiting for examination',
    id: 'waiting_for_examination',
    mode: 'hide',
    count: 0,
    tabValue: 1,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
    tableFunction: setPatientDataWaitingForExaminationTableRows,
    sort: 'date,-priority,service-type',
    statuses: ['arrived', 'triaged', 'in-progress'],
  },
  waiting_for_decoding: {
    tabName: 'Waiting for decoding',
    id: 'waiting_for_decoding',
    mode: 'hide',
    count: 0,
    tabValue: 2,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
    tableFunction: setPatientDataWaitingForResultsTableRows,
    sort: '-priority,date,service-type',
    statuses: ['waiting-for-results'],
  },
  finished: {
    tabName: 'Finished treatment',
    id: 'finished',
    mode: 'hide',
    count: 0,
    tabValue: 3,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
    tableFunction: setPatientDataFinishedTableRows,
    sort: 'date,-priority,service-type',
    statuses: ['finished'],
  },
  waiting_for_nurse: {
    tabName: 'Waiting for nurse',
    id: 'waiting_for_nurse',
    mode: 'hide',
    count: 0,
    tabValue: 4,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
    tableFunction: setPatientDataWaitingForNurseTableRows,
    sort: '-priority,date,service-type',
    statuses: ['arrived'],
    extendedStatuses: ['waiting-for-nurse'],
  },
  waiting_for_doctor: {
    tabName: 'Waiting for doctor',
    id: 'waiting_for_doctor',
    mode: 'hide',
    count: 0,
    tabValue: 5,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
  },
  waiting_for_xray: {
    name: 'Waiting for Xray',
    id: 'waiting_for_xray',
    mode: 'hide',
    count: 0,
    tabValue: 6,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
  },
  waiting_for_release: {
    name: 'Waiting for release',
    id: 'waiting_for_release',
    mode: 'hide',
    count: 0,
    tabValue: 7,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
  },
  finished_visit: {
    name: 'Finished visit',
    id: 'finished_visit',
    mode: 'hide',
    count: 0,
    tabValue: 8,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
  },
};

export const getTabs = (idArr) => {
  const tabs = [];
  idArr.forEach((tab) => {
    tabs.push(allTabs[tab]);
  });
  return tabs;
};
