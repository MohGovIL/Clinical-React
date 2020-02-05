import React, {useEffect, useState} from 'react';
import PatientTrackingStyle from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";
import {getAppointments, getStatuses} from "../../../Utils/Services/FhirAPI";
import {normalizeAppointmentData} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentData";
import {connect} from "react-redux";
import {getAppointmentsAction} from "../../../Store/Actions/PatientTrackingActions/PatienTrackingActions";
import Header from "../../../Assets/Elements/Header";
import {useTranslation} from "react-i18next";
import {getMenu} from "../../../Utils/Services/API";

const PatientTracking = ({appointments, getAppointmentsAction, vertical}) => {

    // const [appointments, setAppointments] = useState([]);

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
            hideTableHeader: false

        },
        {
            tableHeader: 'Cell phone',
            hideTableHeader: false

        },
        {
            tableHeader: 'Healthcare service',
            hideTableHeader: false

        },
        {
            tableHeader: 'Test',
            hideTableHeader: false

        },
        {
            tableHeader: 'Time',
            hideTableHeader: false

        },
        {
            tableHeader: 'Status',
            hideTableHeader: false

        },
        {
            tableHeader: 'Messages',
            hideTableHeader: false

        },
        {
            tableHeader: 'Patient admission',
            hideTableHeader: true
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
