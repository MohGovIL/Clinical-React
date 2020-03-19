import React, {useState} from "react";
import StyledSearch, {
    StyledExpansionPanel,
    StyledExpansionPanelDetails,
    StyledExpansionPanelSummary, StyledLabelAge, StyledLabelPhone,
    StyledPaper
} from './Style';
import {useTranslation} from "react-i18next";
import normalizeFhirPatient from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirPatient";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {StyledLabelName, StyledLabelTZ} from "./Style";
import Typography from "@material-ui/core/Typography";
import TitleValueComponent from "./TitleValueComponent";
import GenderIcon from "../../../CustomizedTable/CustomizedTablePersonalInformationCell/GenderIcon";
import maleIcon from "../../../../Images/maleIcon.png";
import femaleIcon from "../../../../Images/womanIcon.png";
import AppointmentsPerPatient from "./AppointmentsPerPatient";
import {
    getCurrentEncounterPerPatient,
    getHealthCareServiceByOrganization,
    getNextPrevAppointmentPerPatient,
    getNextPrevEncounterPerPatient,
    requestValueSet
} from "../../../../../Utils/Services/FhirAPI";
import moment, {now} from "moment";
import normalizeFhirValueSet from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet";
import {normalizeValueData} from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";

const DrawThisTable = ({result, searchParam}) => {


    const [expanded, setExpanded] = React.useState('');
    const [nextAppointment, setNextAppointment] = React.useState('');
    const [prevEncounter, setPrevEncounter] = React.useState('');
    const [curEncounter, setCurEncounter] = React.useState('');
    const [encounterStatuses, setEncounterStatuses] = React.useState('');

    //let patientTrackingStatuses =  null;


    const handleChange = (panel, identifier) => async (event, newExpanded) => {

        setExpanded(newExpanded ? panel : false);
        setEncounterStatuses(await requestValueSet("encounter_statuses"));


        if (newExpanded) {

            let currentDate = moment().utc().format("YYYY-MM-DD");
          //  setNextAppointment(await getNextPrevAppointmentPerPatient(currentDate, identifier, false));
            setPrevEncounter(await getNextPrevEncounterPerPatient(currentDate, identifier, true));
            setCurEncounter(await getCurrentEncounterPerPatient("2020-03-01", identifier));

        }
    };

    const {t} = useTranslation();

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
                                    <TitleValueComponent searchParam={searchParam} name={patient.firstName}
                                                         value={patient.lastName}/>
                                </StyledLabelName>
                                <StyledLabelTZ>
                                    <TitleValueComponent searchParam={searchParam}
                                                         name={t(patient.identifier.type === 'idtype_1' ? 'Teudat zehut' : patient.identifier.type)}
                                                         value={patient.identifier.value}/>
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
                                />
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
