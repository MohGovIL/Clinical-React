import React, {useEffect, useState} from 'react';
import PatientTrackingStyle from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";
import {getAppointments, getStatuses} from "../../../Utils/Services/FhirAPI";
import {normalizeAppointmentData} from "../../../Utils/Helpers/normalizeFhirAppointmentsData/normalizeFhirAppointmentData";
import PatientTableStatusFilterBox from "./PatientTableStatusFilterBox";
import FilterBox from "./FilterBox";

const PatientTracking = () => {

    const [appointments, setAppointments] = useState([]);

    //Gets Appointment data
    useEffect(() => {
        (async () => {
            try {
                const {data} = await getAppointments();
                const normalizedAppointmentData = normalizeAppointmentData(data.entry);
                setAppointments(normalizedAppointmentData);
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);

    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const {data} = await getStatuses();
                setStatuses(data.compose.include[0].concept);
            }catch (err) {
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
        },
        {
            tableHeader: 'Cell phone',

        },
        {
            tableHeader: 'Healthcare service',

        },
        {
            tableHeader: 'Test',

        },
        {
            tableHeader: 'Time',

        },
        {
            tableHeader: 'Status',

        },
        {
            tableHeader: 'Messages',

        },
        {
            tableHeader: 'Patient admission',
            hideTableHeader: true
        },

    ];

    return (
        <PatientTrackingStyle>
            <FilterBox statuses={statuses} />
            <PatientTableStatusFilterBox tabs={tabs} tableHeaders={tableHeaders} tableData={appointments} options={statuses} />
        </PatientTrackingStyle>


        //     <StatusFilterBox tabs={tabs}/>
        //     <CustomizedTable tableHeaders={tableHeaders} tableData={appointments} options={statuses}/>
        // </PatientTrackingStyle>
    );
};

export default PatientTracking;
