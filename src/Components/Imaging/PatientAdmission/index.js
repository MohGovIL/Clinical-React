import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {createNewEncounter} from "../../../Utils/Services/FhirAPI";

const PatientAdmission = ({location, patientsData}) => {

    const [patientData, setPatientData] = useState({});

    useEffect(()=> {
        setPatientData(patientsData[new URLSearchParams(location.search).get("index")]);
        (async () => {
           try{
               await createNewEncounter()
           } catch (err) {
               console.log(err)
           }
        })()
    }, []);

    console.log(patientData);
    return (
        <span>
            1
        </span>
    );
};

const mapStateToProps = state => {
    return{
        patientsData: state.imaging.patientsData
    };
};

export default connect(mapStateToProps, null)(PatientAdmission);
