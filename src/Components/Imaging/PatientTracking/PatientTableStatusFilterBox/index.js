import React from 'react';
import StyledPatientTableStatusFilterBox from "./Style"
import StatusFilterBox from "../../../../Assets/Elements/StatusFilterBox";
import CustomizedTable from "../../../../Assets/Elements/CustomizedTable";

const PatientTableStatusFilterBox = ({tabs, tableHeaders, tableData, options}) => {
    return (
        <StyledPatientTableStatusFilterBox>
            <StatusFilterBox tabs={tabs}/>
            <CustomizedTable tableHeaders={tableHeaders} tableData={tableData} options={options}/>
        </StyledPatientTableStatusFilterBox>
    );
};

export default PatientTableStatusFilterBox;
