import { appointmentActiveFunction } from 'Utils/Helpers/Appointment/appointmentActiveFunction';
import { appointmentNotActiveFunction } from 'Utils/Helpers/Appointment/appointmentNotActiveFunction';
import { setPatientDataInvitedTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataInvitedTableRows';
import { encounterActiveFunction } from 'Utils/Helpers/Encounter/encounterActiveFunction';
import { encounterNotActiveFunction } from 'Utils/Helpers/Encounter/encounterNotActiveFunction';
import { setPatientDataWaitingForExaminationTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataWaitingForExaminationTableRows';
import { setPatientDataWaitingForResultsTableRows } from 'Components/Generic/patientTrackingTabs/setPatientWaitingForResultsTableRows';
import { setPatientDataFinishedTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataFinishedTableRows';

export const imagingTabs = [
  {
    tabName: 'Invited',
    id: 'invited',
    mode: 'hide',
    count: 0,
    tabValue: 0,
    activeAction: appointmentActiveFunction,
    notActiveAction: appointmentNotActiveFunction,
    tableFunction: setPatientDataInvitedTableRows,
  },
  {
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
  {
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
    //add date disabled true
  },
  {
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
];
