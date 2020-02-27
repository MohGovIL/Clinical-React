import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
// import {createNewEncounter} from "../../../Utils/Services/FhirAPI";
import HeaderPatient from "../../../Assets/Elements/HeaderPatient";
import {useTranslation} from "react-i18next";
import * as Moment from "moment";
import {baseRoutePath} from "../../../Utils/Helpers/baseRoutePath";
import PatientDataBlock from "./PatientDataBlock";
import PatientDetailsBlock from "./PatientDetailsBlock";
import {StyledPatientRow, StyledDummyBlock} from "./Style";

const PatientAdmission = ({location, appointmentsData, patientsData, languageDirection, formatDate, history}) => {
    const {t} = useTranslation();

    const [patientData, setPatientData] = useState({});

    useEffect(() => {
        let appointmentId = new URLSearchParams(location.search).get("index");
        let participantPatient = appointmentsData[appointmentId].participantPatient;

        setPatientData(patientsData[participantPatient]);

        (async () => {
            try {
                //await createNewEncounter()
            } catch (err) {
                console.log(err)
            }
        })()
    }, []);

    const allBreadcrumbs = [
        {
            text: t("Patient Admission"),
            separator: "NavigateNextIcon",
            url: "#",
        },
        {
            text: patientData["firstName"] + " " + patientData["lastName"] + " " + t("Encounter date") + ": " + Moment(Moment.now()).format(formatDate),
            separator: false,
            url: "#"
        }
    ];

    const handleCloseClick = () => {
        history.push(`${baseRoutePath()}/imaging/patientTracking`);
    };

    return (
        <React.Fragment>
            <HeaderPatient breadcrumbs={allBreadcrumbs} languageDirection={languageDirection}
                           onCloseClick={handleCloseClick}/>
            <StyledPatientRow>
                <PatientDataBlock patientData={patientData}/>
                <StyledDummyBlock />
                <PatientDetailsBlock/>
            </StyledPatientRow>

        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        appointmentsData: state.fhirData.appointments,
        patientsData: state.fhirData.patients,
        languageDirection: state.settings.lang_dir,
        formatDate: state.settings.format_date
    };
};

export default connect(mapStateToProps, null)(PatientAdmission);
