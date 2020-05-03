import React, {useState} from "react";
import StyledSearch, {
    StyledBottomLinks,
    StyledExpansionPanel,
    StyledExpansionPanelDetails,
    StyledExpansionPanelSummary, StyledHrefButton, StyledLabelAge, StyledLabelPhone,
    StyledPaper
} from './Style';
import {useTranslation} from "react-i18next";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {StyledLabelName, StyledLabelTZ} from "./Style";
import TitleValueComponent from "./TitleValueComponent";
import GenderIcon from "Assets/Elements/CustomizedTable/CustomizedTablePersonalInformationCell/GenderIcon";
import maleIcon from "Assets/Images/maleIcon.png";
import femaleIcon from "Assets/Images/womanIcon.png";
import AppointmentsPerPatient from "./AppointmentsPerPatient";
import {
    getCurrentEncounterPerPatient,
    getHealthCareServiceByOrganization,
    getNextPrevAppointmentPerPatient, getNextPrevAppointmentsPerPatient,
    getNextPrevEncounterPerPatient, getNextPrevEncountersPerPatient, getValueSet,
    requestValueSet
} from "Utils/Services/FhirAPI";
import moment, {now} from "moment";
import normalizeFhirAppointment
    from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment";
import normalizeFhirEncounter
    from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter";
import {FHIR} from "Utils/Services/FHIR";
import {store} from 'index';
import {setEncounterAndPatient} from "Store/Actions/ActiveActions";
import {baseRoutePath} from "Utils/Helpers/baseRoutePath";
import {useHistory} from 'react-router-dom';
import Index from "Components/Generic/PopupComponents/PopupAppointmentsPerPatient";



const DrawThisTable = ({result, searchParam}) => {

    const {t} = useTranslation();
    const ADMISSIONWITHOUTAPPOINTMENT = 0;
    const ADMISSIONWITHAPPOINTMENT = 1;
    const [expanded, setExpanded] = React.useState('');
    const [nextAppointment, setNextAppointment] = React.useState('');
    const [nextAppointments, setNextAppointments] = React.useState('');
    const [prevEncounter, setPrevEncounter] = React.useState('');
    const [prevEncounters, setPrevEncounters] = React.useState('');
    const [curEncounter, setCurEncounter] = React.useState('');
    const [encounterStatuses, setEncounterStatuses] = React.useState('');
    const [patientTrackingStatuses, setPatientTrackingStatuses] = React.useState('');
    const [admissionState, setAdmissionState] = React.useState(ADMISSIONWITHAPPOINTMENT);
    const [appointmentPopUpData, setAppointmentPopUpData] = React.useState(null);
    const history = useHistory();
    const [popUpAppointmentsPerPatient, setPopUpAppointmentsPerPatient] = React.useState(false);
    let curTotal = 0;

    //let patientTrackingStatuses =  null;

    const handleCreateAppointment = async (patient, nextAppointment) => {
        let encounterData = null;
        switch (admissionState) {
            case ADMISSIONWITHOUTAPPOINTMENT :
                console.log("admission without appointment");
                encounterData = await FHIR("Encounter", "doWork", {
                    functionName: "createNewEncounter",
                    functionParams: {
                        facility: store.getState().settings.facility,
                        practitioner: 'practitioner',
                        patient: patient,
                        status: "planned"
                    }
                });
                store.dispatch(setEncounterAndPatient(normalizeFhirEncounter(encounterData.data), patient));
                history.push({
                    pathname: `${baseRoutePath()}/imaging/patientAdmission`,
                });
                break;
            case ADMISSIONWITHAPPOINTMENT:
                if (nextAppointment) {
                    let fhirappointment = nextAppointment && nextAppointment.data && nextAppointment.data.total > 0 ? normalizeFhirAppointment(nextAppointment.data.entry[1].resource) : null;
                    encounterData = await FHIR("Encounter", "doWork", {
                        functionName: "createNewEncounter",
                        functionParams: {
                            facility: store.getState().settings.facility,
                            appointment: fhirappointment
                        }
                    });
                    store.dispatch(setEncounterAndPatient(normalizeFhirEncounter(encounterData.data), patient));
                    history.push({
                        pathname: `${baseRoutePath()}/imaging/patientAdmission`,
                    });

                    console.log("admission with appointment");
                }
                break
        }

    }

    const handleTextOfCurrentAppointmentButton = (curEncounter, nextAppointment) => {

        let thereIsEncounterToday = curEncounter && curEncounter.data && curEncounter.data.total > 0 ? true : false;
        let nextAppointmetCheckNormelized = nextAppointment && nextAppointment.data && nextAppointment.data.total > 0 ? normalizeFhirAppointment(nextAppointment.data.entry[1].resource) : null;
        let theAppointmentIsToday = false;
        if (nextAppointmetCheckNormelized) {
            theAppointmentIsToday = moment.utc(nextAppointmetCheckNormelized.startTime).format("DD/MM/YYYY") === moment.utc().format("DD/MM/YYYY") ? true : false;
        }

        if (!thereIsEncounterToday) {
            if (theAppointmentIsToday) {
                if (admissionState != ADMISSIONWITHAPPOINTMENT) {
                    setAdmissionState(ADMISSIONWITHAPPOINTMENT);
                }
                return t("Patient admission");
            } else {
                if (admissionState != ADMISSIONWITHOUTAPPOINTMENT) {
                    setAdmissionState(ADMISSIONWITHOUTAPPOINTMENT);
                }
                return t("Admission without appointment");
            }
        } else {
            return t("Patient admission");
        }

        return false;

    }

    const requestValueSet = valueSet => {
        if (!valueSet) {
            return;
        }
        const {data: {expansion: {contains}}} = valueSet;
        let options = [];
        if (contains) {
            for (let status of contains) {
                options[status.code] = status.display;
            }
        }

        return options;
    }


    const handleChange = (panel, patient) => async (event, newExpanded) => {

        setExpanded(newExpanded ? panel : false);


        if (newExpanded) {
            let identifier = patient.id;
            let currentDate = moment().utc().format("YYYY-MM-DD");
           // const encounterStatPromise = await getValueSet("encounter_statuses");
            const encounterStatPromise = await FHIR('ValueSet','doWork',{"functionName":'getValueSet','functionParams':{id:'encounter_statuses'}});
            const encounterStat = requestValueSet(encounterStatPromise);
            //const appointmentStatPromise = await getValueSet("appointment_statuses");
            const appointmentStatPromise = await FHIR('ValueSet','doWork',{"functionName":'getValueSet','functionParams':{id:'appointment_statuses'}});
            const appointmentStat = requestValueSet(appointmentStatPromise);


            if (!encounterStatuses) setEncounterStatuses(encounterStat);
            if (!patientTrackingStatuses) setPatientTrackingStatuses(appointmentStat);
            //setNextAppointment(await getNextPrevAppointmentPerPatient(currentDate, identifier, false));

            const FHIRNextAppointment = await FHIR("Appointment", "doWork", {
                functionName: "getNextPrevAppointmentPerPatient",functionParams:{
                    date:currentDate,
                    patient:identifier,
                    prev:false
                }})
            setNextAppointment(FHIRNextAppointment);

            //setPrevEncounter(await getNextPrevEncounterPerPatient(currentDate, identifier, true));
           const FHIRPrevEncounter = await FHIR("Encounter", "doWork", {
                functionName: "getNextPrevEncounterPerPatient",functionParams:{
                    date:currentDate,
                   patient:identifier,
                    prev:true
                }})
            setPrevEncounter(FHIRPrevEncounter);


            //setCurEncounter(await getCurrentEncounterPerPatient(currentDate, identifier));
            const FHIRCurEncounter = await FHIR("Encounter", "doWork", {
                functionName: "getCurrentEncounterPerPatient",functionParams:{
                    date:currentDate,
                    patient:identifier,
                    specialOrder:`_sort=service-type,-priority,date`
                }})
            setCurEncounter(FHIRCurEncounter);

            /*  const prevTotal = prevEncounter && prevEncounter.data && prevEncounter.data.total;*/

            //setNextAppointments(await getNextPrevAppointmentsPerPatient(currentDate, identifier, false));

            const FHIRNextAppointments = await FHIR("Appointment", "doWork", {
                functionName: "getNextPrevAppointmentsPerPatient",functionParams:{
                    date:currentDate,
                    patient:identifier,
                    prev:false
                }})
            setNextAppointments(FHIRNextAppointments);

            //setPrevEncounters(await getNextPrevEncountersPerPatient(currentDate, identifier, true));

            const FHIRPrevEncounters = await FHIR("Encounter", "doWork", {
                functionName: "getNextPrevEncountersPerPatient",functionParams:{
                    date:currentDate,
                    patient:identifier,
                    prev:true
                }})

            setPrevEncounters(FHIRPrevEncounters);

        }
    };


    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - Date.parse(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const handleShowAppointmentsAndEncounters = (patient, prevEncounters,nextAppointments, curEncounter, encounterStatuses,patientTrackingStatuses) => {

        if(!patient)
            return;
        setAppointmentPopUpData({patient:patient, prevEncounter:prevEncounters, nextAppointment:nextAppointments, curEncounter:curEncounter,encounterStatuses:encounterStatuses,patientTrackingStatuses:patientTrackingStatuses})
        setPopUpAppointmentsPerPatient(true);



    }

    const handlePopupClose = () => {

        setPopUpAppointmentsPerPatient(false);
        if(!popUpAppointmentsPerPatient)
        {
            setAppointmentPopUpData(null);
        }
    }



    if (result) {
        return (
            result.map((patient, patientIndex) => {
                if (patient) {
                    return (
                        <React.Fragment>
                            <Index key={"PopUp"+patientIndex} popupOpen={popUpAppointmentsPerPatient}
                                   content={appointmentPopUpData} handlePopupClose={handlePopupClose} ></Index>
                            <StyledExpansionPanel  key={"ExpansionPanel_"+patientIndex} expanded={expanded === 'panel' + patientIndex} key={patientIndex}
                                                  onChange={handleChange('panel' + patientIndex, patient)}>
                                <StyledExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <GenderIcon alt={'gender icon'}
                                                src={patient.gender === 'male' ? maleIcon : femaleIcon}/>
                                    <StyledLabelName>
                                        <TitleValueComponent searchParam={searchParam}
                                                             name={patient.firstName + " " + patient.lastName}/>
                                    </StyledLabelName>
                                    <StyledLabelTZ>
                                        <TitleValueComponent searchParam={searchParam}
                                                             name={t(patient.identifierType === 'idtype_1' ? 'Teudat zehut' : patient.identifierType)}
                                                             value={patient.identifier}/>
                                    </StyledLabelTZ>
                                    <StyledLabelPhone>
                                        {
                                            patient.mobileCellPhone ?
                                                < TitleValueComponent searchParam={searchParam} name={t('Mobile Phone')}
                                                                      value={patient.mobileCellPhone}/> : ''
                                            /*patient.homePhone ? < TitleValueComponent name = {t('Phone number')}   value = {patient.homePhone} /> : ''*/
                                        }
                                    </StyledLabelPhone>
                                    <StyledLabelAge>
                                        <TitleValueComponent name={t(patient.ageGenderType)}
                                                             value={_calculateAge(patient.birthDate)}/>
                                    </StyledLabelAge>

                                </StyledExpansionPanelSummary>
                                <StyledExpansionPanelDetails>
                                    <AppointmentsPerPatient nextAppointment={nextAppointment}
                                                            prevEncounter={prevEncounter}
                                                            curEncounter={curEncounter}
                                                            encounterStatuses={encounterStatuses}
                                                            patientTrackingStatuses={patientTrackingStatuses}
                                    />
                                    <StyledBottomLinks>
                                        <StyledHrefButton size={'small'} variant="outlined" color="primary"
                                                          href="#contained-buttons"
                                                          disabled={(nextAppointments && nextAppointments.data && nextAppointments.data.total > 0) ||  (prevEncounters && prevEncounters.data && prevEncounters.data.total > 0) || (curEncounter && curEncounter.data && curEncounter.data.total > 0) ? false : true}
                                                          onClick={() => handleShowAppointmentsAndEncounters(patient, prevEncounters , nextAppointments, curEncounter, encounterStatuses,patientTrackingStatuses)}>
                                            {t("Encounters and appointments")}
                                        </StyledHrefButton>
                                        <StyledHrefButton size={'small'} variant="contained" color="primary"
                                                          href="#contained-buttons"
                                                          disabled={false}>
                                            {t("New appointment")}
                                        </StyledHrefButton>

                                        <StyledHrefButton size={'small'} variant="contained" color="primary"
                                                          href="#contained-buttons"
                                                          disabled={curEncounter && curEncounter.data && curEncounter.data.total > 0 ? true : false}
                                                          onClick={() => handleCreateAppointment(patient, nextAppointment)}>
                                            {handleTextOfCurrentAppointmentButton(curEncounter, nextAppointment)}
                                        </StyledHrefButton>

                                    </StyledBottomLinks>
                                </StyledExpansionPanelDetails>

                            </StyledExpansionPanel>
                        </React.Fragment>
                    );
                } else {
                    return null;
                }

            })

        );


    } else {
        return null;
    }
};

export default DrawThisTable;
