import {invitedTabActiveFunction, invitedTabNotActiveFunction} from "./setPatientDataInvitedTableRows";
import {
    waitingForExaminationTabActiveFunction,
    waitingForExaminationTabNotActiveFunction
} from "./setPatientDataWaitingForExaminationTableRows";
import {
    waitingForResultsTabActiveFunction,
    waitingForResultsTabNotActiveFunction
} from "./setPatientWaitingForResultsTableRows";
import {finishedTabActiveFunction, finishedTabNotActiveFunction} from "./setPatientDataFinishedTableRows";

export const getStaticTabsArray = () => {
    let allTabs = [
        // Do not change the tabValue if want to change the order just change their place in the array,
        // because there are functionality that depends on the tabValue because it (the tabs) needs to be customized
        // meaning sometimes you have to show them and sometimes you need to add more tabs in between.
        {
            tabName: 'Invited',
            id: 'invited',
            mode: 'hide',
            count: 0,
            tabValue: 0,
            activeAction: invitedTabActiveFunction,
            notActiveAction: invitedTabNotActiveFunction,
        },
        {
            tabName: 'Waiting for examination',
            id: 'waiting_for_examination',
            mode: 'hide',
            count: 0,
            tabValue: 1,
            activeAction: waitingForExaminationTabActiveFunction,
            notActiveAction: waitingForExaminationTabNotActiveFunction
        },
        {
            tabName: 'Waiting for decoding',
            id: 'waiting_for_decoding',
            mode: 'hide',
            count: 0,
            tabValue: 2,
            activeAction: waitingForResultsTabActiveFunction,
            notActiveAction: waitingForResultsTabNotActiveFunction
        },
        {
            tabName: 'Finished treatment',
            id: 'finished',
            mode: 'hide',
            count: 0,
            tabValue: 3,
            activeAction: finishedTabActiveFunction,
            notActiveAction: finishedTabNotActiveFunction
        }
    ];
    return allTabs;
};
