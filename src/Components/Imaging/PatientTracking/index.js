import React, {useEffect, useState} from 'react';
import PatientTrackingStyle from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";
import {getStatuses} from "../../../Utils/Services/FhirAPI";
import {connect} from "react-redux";
import {getAppointmentsAction} from "../../../Store/Actions/PatientTrackingActions/PatienTrackingActions";
import Header from "../../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../../Utils/Services/API";
import setPatientTrackingTableRows from "../../../Utils/Helpers/patientTrackingTableRows";
import {SELECT_CELL, BADGE_CELL, BUTTON_CELL, PERSONAL_INFORMATION_CELL, LABEL_CELL} from "../../../Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes";

const PatientTracking = ({appointments, getAppointmentsAction, vertical}) => {

    useEffect(() => {

    }, []);

    //Gets Appointment data
    useEffect(() => {
        getAppointmentsAction();
    }, []);

    const [statuses, setStatuses] = useState([]);

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

    //Get statuses
    useEffect(() => {
        (async () => {
            try {
                const {data} = await getStatuses();
                setStatuses(data.compose.include[0].concept);
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);

    const tabs = [
        {
            tabName: 'Invited',
            count: 10
        },
        {
            tabName: 'Waiting for examination',
            count: 10
        },
        {
            tabName: 'Waiting for decoding',
            count: 10
        },
        {
            tabName: 'Finished',
            count: 10
        }
    ];

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
            component: BUTTON_CELL
        },

    ];

    return (
        <React.Fragment>
            <Header Items={menuItems}/>
            <PatientTrackingStyle>
                <StatusFilterBox tabs={tabs}/>
                <CustomizedTable tableHeaders={tableHeaders} tableData={appointments} options={statuses}/>
            </PatientTrackingStyle>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        appointments: state.imaging.appointments,
        vertical: state.settings.clinikal_vertical
    };
};

export default connect(mapStateToProps, {getAppointmentsAction})(PatientTracking);
