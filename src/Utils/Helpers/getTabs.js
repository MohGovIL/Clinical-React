import {
  invitedTabActiveFunction,
  invitedTabNotActiveFunction,
} from 'Utils/Helpers/patientTrackingTabs/setPatientDataInvitedTableRows';
import {
  waitingForExaminationTabActiveFunction,
  waitingForExaminationTabNotActiveFunction,
} from 'Utils/Helpers/patientTrackingTabs/setPatientDataWaitingForExaminationTableRows';
import {
  waitingForResultsTabActiveFunction,
  waitingForResultsTabNotActiveFunction,
} from 'Utils/Helpers/patientTrackingTabs/setPatientWaitingForResultsTableRows';
import {
  finishedTabActiveFunction,
  finishedTabNotActiveFunction,
} from 'Utils/Helpers/patientTrackingTabs/setPatientDataFinishedTableRows';

const allTabs = {
  invited: {
    tabName: 'Invited',
    id: 'invited',
    mode: 'hide',
    count: 0,
    tabValue: 0,
    activeAction: invitedTabActiveFunction,
    notActiveAction: invitedTabNotActiveFunction,
  },
  waiting_for_examination: {
    tabName: 'Waiting for examination',
    id: 'waiting_for_examination',
    mode: 'hide',
    count: 0,
    tabValue: 1,
    activeAction: waitingForExaminationTabActiveFunction,
    notActiveAction: waitingForExaminationTabNotActiveFunction,
    sort: 'date,-priority,service-type',
    statuses: ['arrived', 'triaged', 'in-progress'],
  },
  waiting_for_decoding: {
    tabName: 'Waiting for decoding',
    id: 'waiting_for_decoding',
    mode: 'hide',
    count: 0,
    tabValue: 2,
    activeAction: waitingForResultsTabActiveFunction,
    notActiveAction: waitingForResultsTabNotActiveFunction,
    sort: '-priority,date,service-type',
    statuses: ['waiting-for-results'],
  },
  finished: {
    tabName: 'Finished treatment',
    id: 'finished',
    mode: 'hide',
    count: 0,
    tabValue: 3,
    activeAction: finishedTabActiveFunction,
    notActiveAction: finishedTabNotActiveFunction,
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
    sort: '',
    status: '',
  },
};

export const getTabs = (idArr) => {
  const tabs = [];
  idArr.forEach((tab) => {
    tabs.push(allTabs[tab]);
  });
  return tabs;
};
