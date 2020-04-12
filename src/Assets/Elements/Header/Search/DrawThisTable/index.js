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
import GenderIcon from "../../../CustomizedTable/CustomizedTablePersonalInformationCell/GenderIcon";
import maleIcon from "../../../../Images/maleIcon.png";
import femaleIcon from "../../../../Images/womanIcon.png";
import AppointmentsPerPatient from "./AppointmentsPerPatient";
import {
    getCurrentEncounterPerPatient,
    getHealthCareServiceByOrganization,
    getNextPrevAppointmentPerPatient,
    getNextPrevEncounterPerPatient, getValueSet,
    requestValueSet
} from "../../../../../Utils/Services/FhirAPI";
import moment, {now} from "moment";
import normalizeFhirAppointment
    from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment";
import normalizeFhirEncounter
    from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter";
import {FHIR} from "../../../../../Utils/Services/FHIR";

const DrawThisTable = ({result, searchParam}) => {

    const {t} = useTranslation();
    const ADMISSIONWITHOUTAPPOINTMENT = 0;
    const ADMISSIONWITHAPPOINTMENT = 1;
    const [expanded, setExpanded] = React.useState('');
    const [nextAppointment, setNextAppointment] = React.useState('');
    const [prevEncounter, setPrevEncounter] = React.useState('');
    const [curEncounter, setCurEncounter] = React.useState('');
    const [encounterStatuses, setEncounterStatuses] = React.useState('');
    const [patientTrackingStatuses, setPatientTrackingStatuses] = React.useState('');
    const [admissionState,setAdmissionState] = React.useState(ADMISSIONWITHAPPOINTMENT)

    let curTotal = 0;

    //let patientTrackingStatuses =  null;

    const handleCreateAppointment = event => {
        switch (admissionState) {
            case ADMISSIONWITHOUTAPPOINTMENT :
                console.log("admission without appointment");
                FHIR("Encounter","doWork",{functionName:"createNewEncounter",functionParams:{}})
            break;
            case ADMISSIONWITHAPPOINTMENT:
                console.log("admission with appointment");
            break
        }

    }

    const handleTextOfCurrentAppointmentButton  = (curEncounter, nextAppointment) => {

        let thereIsEncounterToday = curEncounter && curEncounter.data && curEncounter.data.total >0 ? true : false;
        let nextAppointmetCheckNormelized = nextAppointment && nextAppointment.data && nextAppointment.data.total > 0 ? normalizeFhirAppointment (nextAppointment.data.entry[1].resource ): null;
        let theAppointmentIsToday = nextAppointmetCheckNormelized ? (moment(nextAppointmetCheckNormelized.startTime).format("DD/MM/YYYY")  === moment().format("DD/MM/YYYY") ?true :false ): false;

        if(!thereIsEncounterToday)
        {
            if(theAppointmentIsToday)
            {
                if(admissionState != ADMISSIONWITHAPPOINTMENT) {
                    setAdmissionState(ADMISSIONWITHAPPOINTMENT);
                }
                return t("Patient admission");
            }
            else{
                if(admissionState != ADMISSIONWITHOUTAPPOINTMENT) {
                    setAdmissionState(ADMISSIONWITHOUTAPPOINTMENT);
                }
                return t("Admission without appointment");
            }
        }
        else{
                return t("Patient admission");
        }

        return false;

    }

    const requestValueSet = valueSet => {
        if(!valueSet) {
         return;
        }
        const {data: {expansion: {contains}}} = valueSet;
        let options = [];
        if(contains) {
            for (let status of contains) {
                options[status.code] = status.display;
            }
        }

        return options;
    }


    const handleChange = (panel, identifier) => async (event, newExpanded) => {

        setExpanded(newExpanded ? panel : false);



        if (newExpanded) {

            let currentDate = moment().utc().format("YYYY-MM-DD");
            const encounterStatPromise =  await getValueSet("encounter_statuses");
            const encounterStat = requestValueSet(encounterStatPromise);
            const appointmentStatPromise = await getValueSet("appointment_statuses");
            const appointmentStat = requestValueSet(appointmentStatPromise);


            if(!encounterStatuses) setEncounterStatuses(encounterStat) ;
            if(!patientTrackingStatuses) setPatientTrackingStatuses(appointmentStat);
            setNextAppointment(await getNextPrevAppointmentPerPatient(currentDate, identifier, false));
            setPrevEncounter(await getNextPrevEncounterPerPatient(currentDate, identifier, true));
            setCurEncounter(await getCurrentEncounterPerPatient(currentDate, identifier));
          /*  const prevTotal = prevEncounter && prevEncounter.data && prevEncounter.data.total;*/



        }
    };


    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - Date.parse(birthday);
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    if (result) {
        return (
            result.map((patient, patientIndex) => {
                if (patient) {
                    return (
                        <StyledExpansionPanel expanded={expanded === 'panel' + patientIndex} key={patientIndex}
                                              onChange={handleChange('panel' + patientIndex, patient.id)}>
                            <StyledExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <GenderIcon alt={'gender icon'}
                                            src={patient.gender === 'male' ? maleIcon : femaleIcon}/>
                                <StyledLabelName>
                                    <TitleValueComponent searchParam={searchParam} name={patient.firstName+" "+patient.lastName}/>
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
                                                        encounterStatuses = {encounterStatuses}
                                                        patientTrackingStatuses = {patientTrackingStatuses}
                                />
                                <StyledBottomLinks>
                                    <StyledHrefButton size={'small'} variant="outlined" color="primary" href="#contained-buttons"
                                                  disabled= {(nextAppointment && nextAppointment.data && nextAppointment.data.total >0 ) || (curEncounter && curEncounter.data && curEncounter.data.total >0 ) ? false : true}  >
                                        {t("Encounters and appointments")}
                                    </StyledHrefButton>
                                    <StyledHrefButton size={'small'} variant="contained" color="primary" href="#contained-buttons"
                                                  disabled={false} >
                                        {t("New appointment")}
                                    </StyledHrefButton>

                                    <StyledHrefButton size={'small'} variant="contained" color="primary" href="#contained-buttons"
                                                  disabled={curEncounter && curEncounter.data && curEncounter.data.total  > 0 ? true : false} onClick = {handleCreateAppointment}  >
                                         {handleTextOfCurrentAppointmentButton(curEncounter,nextAppointment)}
                                    </StyledHrefButton>

                                </StyledBottomLinks>
                            </StyledExpansionPanelDetails>

                        </StyledExpansionPanel>
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
