import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {createNewEncounter} from "../../../Utils/Services/FhirAPI";
import HeaderPatient from "../../../Assets/Elements/HeaderPatient";
import {useTranslation} from "react-i18next";


const PatientAdmission = ({location, appointmentsData, patientsData}) => {
    const {t} = useTranslation();

    const [patientData, setPatientData] = useState({});

    useEffect(()=> {
        let appointmentId = new URLSearchParams(location.search).get("index");
        let participantPatient = appointmentsData[appointmentId].participantPatient;

        setPatientData(patientsData[participantPatient]);

        (async () => {
           try{
               // await createNewEncounter()
           } catch (err) {
               console.log(err)
           }
        })()
    }, []);


    const buildBreadcrumbs = () => {
        // console.log("```````````````````````");
        // console.log(patientData);
        // console.log("```````````````````````");
        let breadcrumbArray = [];
        let _tmp = [];
        _tmp["text"] = t("Patient Addmission");
        _tmp["separator"] = "NavigateNextIcon";
        _tmp["url"] = "#";
        breadcrumbArray.push(_tmp);
        _tmp = [];
        _tmp["text"] = patientData["firstName"] + " " + patientData["lastName"];
        _tmp["separator"] = "NavigateNextIcon";
        _tmp["url"] = "#";
        breadcrumbArray.push(_tmp);
        _tmp = [];
        _tmp["text"] = t("Encounter date") + ":" + "2";
        _tmp["separator"] = "NavigateNextIcon";
        _tmp["url"] = "#";
        breadcrumbArray.push(_tmp);


        return breadcrumbArray;
    };

    //


    return (
        <React.Fragment>
            <HeaderPatient makeBread={buildBreadcrumbs()}/>
        </React.Fragment>
        // <span>
        //     PATIENT ADMISSION
        // </span>
    );
};

const mapStateToProps = state => {
    return{
        appointmentsData: state.fhirData.appointments,
        patientsData: state.fhirData.patients
    };
};

export default connect(mapStateToProps, null)(PatientAdmission);
