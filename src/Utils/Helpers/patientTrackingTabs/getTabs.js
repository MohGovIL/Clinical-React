import { setPatientDataInvitedTableRows } from 'Utils/Helpers/patientTrackingTabs/setPatientDataInvitedTableRows';
import { setPatientDataWaitingForExaminationTableRows } from 'Utils/Helpers/patientTrackingTabs/setPatientDataWaitingForExaminationTableRows';
import { setPatientDataWaitingForResultsTableRows } from 'Utils/Helpers/patientTrackingTabs/setPatientWaitingForResultsTableRows';
import { setPatientDataFinishedTableRows } from 'Utils/Helpers/patientTrackingTabs/setPatientDataFinishedTableRows';
import { appointmentActiveFunction } from 'Utils/Helpers/Appointment/appointmentActiveFunction';
import { appointmentNotActiveFunction } from 'Utils/Helpers/Appointment/appointmentNotActiveFunction';
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
    activeAction: () => {
      console.log('Not implemented`');
    },
    notActiveAction: () => {
      console.log('Not implemented');
    },
    sort: '-priority,date,service-type',
    status: ['arrived', 'in-progress', 'waiting-for-nurse'],
  },
};

export const getTabs = (idArr) => {
  const tabs = [];
  idArr.forEach((tab) => {
    tabs.push(allTabs[tab]);
  });
  return tabs;
};
