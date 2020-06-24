import { encounterActiveFunction } from 'Utils/Helpers/Encounter/encounterActiveFunction';
import { encounterNotActiveFunction } from 'Utils/Helpers/Encounter/encounterNotActiveFunction';
import { setPatientDataWaitingForNurseTableRows } from 'Components/Generic/patientTrackingTabs/setPatientDataWaitingForNurse';

export const emergencyTabs = [
  {
    tabName: 'Waiting for nurse',
    id: 'waiting_for_nurse',
    mode: 'hide',
    count: 0,
    tabValue: 0,
    activeAction: encounterActiveFunction,
    notActiveAction: encounterNotActiveFunction,
    tableFunction: setPatientDataWaitingForNurseTableRows,
    sort: '-priority,date,service-type',
    statuses: ['arrived'],
    extendedStatuses: ['waiting-for-nurse'],
  },
  // {
  //   tabName: 'Waiting for doctor',
  //   id: 'waiting_for_doctor',
  //   mode: 'hide',
  //   count: 0,
  //   tabValue: 1,
  //   activeAction: encounterActiveFunction,
  //   notActiveAction: encounterNotActiveFunction,
  // },
  // {
  //   name: 'Waiting for Xray',
  //   id: 'waiting_for_xray',
  //   mode: 'hide',
  //   count: 0,
  //   tabValue: 2,
  //   activeAction: encounterActiveFunction,
  //   notActiveAction: encounterNotActiveFunction,
  // },
  // {
  //   name: 'Waiting for release',
  //   id: 'waiting_for_release',
  //   mode: 'hide',
  //   count: 0,
  //   tabValue: 3,
  //   activeAction: encounterActiveFunction,
  //   notActiveAction: encounterNotActiveFunction,
  // },
  // {
  //   name: 'Finished visit',
  //   id: 'finished_visit',
  //   mode: 'hide',
  //   count: 0,
  //   tabValue: 4,
  //   activeAction: encounterActiveFunction,
  //   notActiveAction: encounterNotActiveFunction,
  // },
];
