import React, {useEffect, useState} from 'react';
import PatientTrackingStyle from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";
import {getValueSet} from "../../../Utils/Services/FhirAPI";
import {connect} from "react-redux";
import {setPatientsDataAction} from "../../../Store/Actions/PatientTrackingActions/PatienTrackingActions";
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
import {getAppointments} from "../../../Utils/Services/FhirAPI";
import {normalizeAppointmentData} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentData";

const PatientTracking = ({vertical, status, setPatientsDataAction, history}) => {

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

    ];

    const [tabs, setTabs] = useState([
        {
            tabName: 'Invited',
            count: 0,

        },
        {
            tabName: 'Waiting for examination',
            count: 0
        },
        {
            tabName: 'Waiting for decoding',
            count: 0
        },
        {
            tabName: 'Finished',
            count: 0
        }
    ]);

    const [tableData, setTableData] = useState([]);

    //Gets patients data
    useEffect(() => {
        (async () => {
            try {
                switch (status) {
                    case 0:
                        let statusesArr = [];
                        const appointments = await getAppointments();
                        const normalizedAppointmentData = normalizeAppointmentData(appointments.data.entry);
                        setPatientsDataAction(normalizedAppointmentData);
                        // setTabs(...tabs, tabs[status]) //Should be setting to state so it will re-render (but tabs are hard coded)
                        const statuses = await getValueSet('apptstat');
                        statusesArr.push(statuses.data.compose.include[0].concept);
                        setTableData(setPatientDataInvitedTableRows(normalizedAppointmentData, tableHeaders, statusesArr, history));
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                    default:
                        console.log('No such status could be a critical error');
                        break;
                }
            } catch (err) {
                console.log(err)
            }

        })();

    }, [status]);


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
        status: state.imaging.statusFilterBoxValue
    };
};

export default connect(mapStateToProps, {setPatientsDataAction})(PatientTracking);
