import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import HeaderPatient from "../../../Assets/Elements/HeaderPatient";
import {useTranslation} from "react-i18next";
import * as Moment from "moment";
import {baseRoutePath} from "../../../Utils/Helpers/baseRoutePath";
import PatientDataBlock from "./PatientDataBlock";
import PatientDetailsBlock from "./PatientDetailsBlock";
import {StyledPatientRow, StyledDummyBlock, StyledBackdrop} from "./Style";
import {createNewEncounter} from '../../../Utils/Services/FhirAPI';
import normalizeFhirEncounter from '../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';

const PatientAdmission = ({location, appointments, patients, languageDirection, formatDate, history, facility}) => {
    const {t} = useTranslation();
    
    const [patientData, setPatientData] = useState({});
    const [appointmentId, setAppointmentId] = useState('');
    const [newEncounter, setNewEncounter] = useState({});
    const [edit, setEdit] = useState(0);

    useEffect(() => {
        const appointmentIdFromURL = new URLSearchParams(location.search).get("index");
   
        setAppointmentId(appointmentIdFromURL);

        const participantPatient = appointments[appointmentIdFromURL].patient;

        setPatientData(patients[participantPatient]);

        (async () => {
            try {
                const encounterData = await createNewEncounter(appointments[appointmentIdFromURL], facility);
                setNewEncounter(normalizeFhirEncounter(encounterData.data));
            } catch (err) {
                console.log(err)
            }
        })()
    }, [location]);

    const allBreadcrumbs = [
        {
            text: t("Patient Admission"),
            separator: "NavigateNextIcon",
            url: "#",
        },
        {
            text: patientData.firstName + " " + patientData.lastName + " " + t("Encounter date") + ": " + Moment(Moment.now()).format(formatDate),
            separator: false,
            url: "#"
        }
    ];

    const handleCloseClick = () => {
        history.push(`${baseRoutePath()}/imaging/patientTracking`);
    };


    const handleEditButtonClick = isEdit => {
        setEdit(isEdit);
    };

    return (
        <React.Fragment>
            <HeaderPatient breadcrumbs={allBreadcrumbs} languageDirection={languageDirection}
                           onCloseClick={handleCloseClick} edit_mode={edit}/>
            <StyledPatientRow>
                <StyledBackdrop open={true} edit_mode={edit}>
                    {Object.values(patientData).length && <PatientDataBlock appointmentId={appointmentId} patientData={patientData}
                                      onEditButtonClick={handleEditButtonClick} edit_mode={edit}
                                      formatDate={formatDate}/>}
                </StyledBackdrop>
                <StyledDummyBlock edit_mode={edit}/>
                {Object.values(patientData).length && <PatientDetailsBlock patientData={patientData} edit_mode={edit} />}
            </StyledPatientRow>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        appointments: state.fhirData.appointments,
        patients: state.fhirData.patients,
        languageDirection: state.settings.lang_dir,
        formatDate: state.settings.format_date,
        facility: state.settings.facility
    };
};

export default connect(mapStateToProps, null)(PatientAdmission);
