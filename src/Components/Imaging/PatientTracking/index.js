import React from 'react';
import PatientTrackingStyle from './Style';
import StatusFilterBox from "../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../Assets/Elements/CustomizedTable";

const PatientTracking = ({appointments}) => {

    const tabsArray = [
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
            tabName: 'Personal information',
        },
        {
            tabName: 'Cell phone',

        },
        {
            tabName: 'Healthcare service',

        },
        {
            tabName: 'Test',

        },
        {
            tabName: 'Time',

        },
        {
            tabName: 'Status',

        },
        {
            tabName: 'Messages',

        },
        {
            tabName: 'Patient admission',
            hideTabName: true
        },

    ];

    return (
        <PatientTrackingStyle>
            <StatusFilterBox tabs={tabsArray}/>
            <CustomizedTable tableHeaders={tableHeaders} tableData={appointments}/>
        </PatientTrackingStyle>
    );
};

export default PatientTracking;
