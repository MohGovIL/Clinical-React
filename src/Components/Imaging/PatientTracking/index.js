import React, {useEffect, useState} from 'react';
import PatientTrackingStyle from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";
import {getValueSet} from "../../../Utils/Services/FhirAPI";
import {connect} from "react-redux";
import {setPatientsDataAction} from "../../../Store/Actions/PatientTrackingActions/PatienTrackingActions";
import {setAppointmentsWithPatientsAction} from "../../../Store/Actions/FhirActions/fhirActions";
import Header from "../../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../../Utils/Services/API";
import setPatientDataInvitedTableRows from "../../../Utils/Helpers/setPatientDataInvitedTableRows";
import {
    SELECT_CELL,
    BADGE_CELL,
    BUTTON_CELL,
    PERSONAL_INFORMATION_CELL,
    LABEL_CELL
} from "../../../Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes";
import {getAppointmentsWithPatients} from "../../../Utils/Services/FhirAPI";
import {normalizeFhirAppointmentsWithPatients} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentsWithPatients";
import {store} from "../../../index";

const implementMeActive = () => {
    console.log('Implement me active :D')
};

const implementMeNotActive = () => {
    console.log('Implement me not active :D')
};

const invitedTabActiveFunction = async () => {
//     import { store } from '/path/to/createdStore';
// ​
// function testAction(text) {
//     return {
//         type: 'TEST_ACTION',
//         text
//     }
// }
// ​
// store.dispatch(testAction('StackOverflow))
    try {
        console.log('invitedTabActiveFunction');
        const appointmentsWithPatients = await getAppointmentsWithPatients();
        const [patients, appointments] = normalizeFhirAppointmentsWithPatients(appointmentsWithPatients.data.entry);
        store.dispatch(setAppointmentsWithPatientsAction(patients, appointments));
        const statuses = await getValueSet('apptstat');
        // setPatientDataInvitedTableRows(patients, appointments, tableHeaders, statusesArr, history)
    } catch (err) {
        console.log(err);
    }
};

const allTabs = [
    {
        tabName: 'Invited',
        count: 0,
        tabValue: 0,
        activeAction: invitedTabActiveFunction,
        notActiveAction: implementMeNotActive,
        permission: ['admin'],
    },
    {
        tabName: 'Waiting for examination',
        count: 0,
        tabValue: 1,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive,
        permission: ['admin']
    },
    {
        tabName: 'Waiting for decoding',
        count: 0,
        tabValue: 2,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive,
        permission: ['admin']
    },
    {
        tabName: 'Finished',
        count: 0,
        tabValue: 3,
        activeAction: implementMeActive,
        notActiveAction: implementMeNotActive,
        permission: ['admin']
    }
]; //Needs to be placed in another place in the project

const tableHeaders = [
    {
        tableHeader: 'Personal information',
        hideTableHeader: false,
        component: PERSONAL_INFORMATION_CELL
    },
    {
        tableHeader: 'Cell phone',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Healthcare service',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Test',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Time',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Status',
        hideTableHeader: false,
        component: SELECT_CELL
    },
    {
        tableHeader: 'Messages',
        hideTableHeader: false,
        component: BADGE_CELL
    },
    {
        tableHeader: 'Patient admission',
        hideTableHeader: true,
        component: BUTTON_CELL,
    },

]; //Needs to be placed in another place in the project

const PatientTracking = ({vertical, status, history, userRole}) => {

    const [tabs, setTabs] = useState([]);

    const [tableData, setTableData] = useState([]);

    const [tableHeaders, setTableHeaders] = useState([]);
    //Create an array of tabs according to the user role
    useEffect(() => {
        const permittedTabs = [];
        for (let tabIndex = 0; tabIndex < allTabs.length; tabIndex++) {
            const tab = allTabs[tabIndex];
            // eslint-disable-next-line no-unused-expressions
            tab.permission.some(role => userRole.includes(role)) ? permittedTabs.push(tab) : null
        }
        setTabs(permittedTabs);
    }, [userRole]);

    //Filter box mechanism
    useEffect(() => {
        (async () => {
            try {
                for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
                    const tab = tabs[tabIndex];
                    if (tab.tabValue === status) {
                        tab.activeAction();
                    } else {
                        tab.notActiveAction();
                    }
                }
                // switch (status) {
                //     case 0:
                //         let statusesArr = [];
                //         const appointmentsWithPatients = await getAppointmentsWithPatients();
                //         const [patients, appointments] = normalizeFhirAppointmentsWithPatients(appointmentsWithPatients.data.entry);
                //         setAppointmentsWithPatientsAction(patients, appointments);
                //         const statuses = await getValueSet('apptstat');
                //         statusesArr.push(statuses.data.compose.include[0].concept);
                //         setTableData(setPatientDataInvitedTableRows(patients, appointments, tableHeaders, statusesArr, history));
                //         break;
                //     case 1:
                //         break;
                //     case 2:
                //         break;
                //     case 3:
                //         break;
                //     default:
                //         console.log('No such status could be a critical error');
                //         break;
                // }
            } catch (err) {
                console.log(err)
            }
        })();
    }, [status, tabs]);


    const {t} = useTranslation();

    const [menuItems, setMenuItems] = useState([]);


    //Gets the menu items
    useEffect(() => {
        (async () => {
            try {
                const menuData = await getMenu(`${vertical}-client`);
                const menuDataClone = menuData.data.map(menuDataItem => {
                    menuDataItem.label = t(menuDataItem.label);
                    return menuDataItem;
                });
                setMenuItems(menuDataClone);
            } catch (err) {
                console.log(err)
            }
        })();


    }, []);


    return (
        <React.Fragment>
            <Header Items={menuItems}/>
            <PatientTrackingStyle>
                <StatusFilterBox tabs={tabs}/>
                <CustomizedTable tableHeaders={tableHeaders} tableData={tableData}/>
            </PatientTrackingStyle>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        // patientsData: state.imaging.patientsData,
        vertical: state.settings.clinikal_vertical,
        status: state.filters.statusFilterBoxValue,
        userRole: state.settings.user_role
    };
};

export default connect(mapStateToProps, {setAppointmentsWithPatientsAction})(PatientTracking);
