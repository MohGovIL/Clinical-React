import React from 'react';
import TitleValueComponent from "./TitleValueComponent";
import {useTranslation} from "react-i18next";
import {
    StyledBottomLinks,
    StyledBox, StyledHeaderTableAppointment, StyledHrefButton, StyledHrefTableButton,
    StyledLabelAppointment,
    StyledLabelName, StyledLabelServiceTypeAppointment,
    StyledLabelStatusAppointment, StyledLabelTableButton,
    StyledLinkWithIconComponent, StyledTableTextCell
} from "./Style";
import moment from "moment";
import normalizeFhirAppointment
    from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment";
import normalizeFhirEncounter
    from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter";
import LinkComponentWithIcon from "./LinkComponentWithIcon";

import ListItem from "@material-ui/core/ListItem";
import Header from "../../index";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";
import Button from "@material-ui/core/Button";
import {normalizeFhirAppointmentsWithPatients} from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointmentsWithPatients";
import {StyledIconValueComponent} from "../Style";
import Link from "@material-ui/core/Link";





const AppointmentsAndEncountersTables = ({patient, nextAppointments, curEncounters, prevEncounters, patientTrackingStatuses, encounterStatuses}) => {

    const {t} = useTranslation();

    const prevEncountersEntry = prevEncounters && prevEncounters.data && prevEncounters.data.total > 0 ? prevEncounters.data.entry[1].resource : null;
    const nextAppointmentsElem = nextAppointments && nextAppointments.data && nextAppointments.data.total >0  ? nextAppointments.data.entry[1].resource : null;
    const curEncountersElem = curEncounters ? curEncounters : null;
    const nextAppointmentEntry = nextAppointmentsElem ? normalizeFhirAppointment(nextAppointmentsElem) : null;
    const normalizedPrevEncounter = prevEncountersEntry ? normalizeFhirEncounter(prevEncountersEntry) : null;
    const patientData = patient;

    let normalizedCurEncounters = [];
    let normalizedNextAppointments = [];
    let normalizedPrevEncounters = [];

    const getAppointmentWithTimeOrNot =(nextAppointmentEntry)=>{
        let isThisAppToday = moment(nextAppointmentEntry.startTime).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY") ? true : false;
        return  (isThisAppToday ? moment(nextAppointmentEntry.startTime).format("DD/MM/YYYY HH:mm") :moment().format("DD/MM/YYYY")  );
    }
    const [showAllPastEncounter,setShowAllPastEncounter]= React.useState(false);
    let [pastEncounterCounter,setPastEncounterCounter]= React.useState(2);

    const [showAllFutureAppointments,setShowAllFutureAppointments]= React.useState(false);
    let [futureAppointmentsCounter,setFutureAppointmentsCounter]= React.useState(2);

    const togglePastEncountersTable = ()=>{
        if(showAllPastEncounter) {
            setShowAllPastEncounter(false);
            setPastEncounterCounter(2)
        }else{
            setShowAllPastEncounter(true);
            setPastEncounterCounter(prevEncounters.data.total)
        }
    }

    const toggleFutureAppointmentsTable = ()=>{
       if(showAllFutureAppointments){
           setShowAllFutureAppointments(false);
           setFutureAppointmentsCounter (2);
       }else{
           setShowAllFutureAppointments(true);
           setFutureAppointmentsCounter( nextAppointments.data.total);
       }

    }
    const handleChartClickOpen = ()=> {
            //TODO:
    }

    const handleAdmissionClickOpen = () => {
            //TODO:
    }

    if (curEncounters && curEncounters.data && curEncounters.data.total > 0) {
        let entry = curEncounters.data.entry;
        entry.map((response, resourceIndex) => {
            if (response && response.resource && response.resource.resourceType === "Encounter") {
                let normalizedCurEncounterElem = normalizeFhirEncounter(response.resource);
                normalizedCurEncounters.push(normalizedCurEncounterElem);
            }


        });
    }



    if (nextAppointments && nextAppointments.data && nextAppointments.data.total > 0) {
        let entry = nextAppointments.data.entry;
        entry.map((response, resourceIndex) => {
            if (response && response.resource && response.resource.resourceType === "Appointment") {
                let normalizedNextAppointmentElem = normalizeFhirAppointment(response.resource);
                normalizedNextAppointments.push(normalizedNextAppointmentElem);
            }


        });
    }

    if (prevEncounters && prevEncounters.data && prevEncounters.data.total > 0) {
        let entry = prevEncounters.data.entry;
        entry.map((response, resourceIndex) => {
            if (response && response.resource && response.resource.resourceType === "Encounter") {
                let normalizedPrevEncounterElem = normalizeFhirEncounter(response.resource);
                normalizedPrevEncounters.push(normalizedPrevEncounterElem);
            }


        });
    }







    function handleCreateAppointment(patient) {
        return undefined;
    }

    return (
        <React.Fragment>
            <React.Fragment>
                <br/>
                <StyledHeaderTableAppointment>{t("Current encounter")}</StyledHeaderTableAppointment>
                <ul></ul>
                <TableContainer component={Paper}>
                    <Table    aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">{t("Encounter's hour")}</TableCell>
                                <TableCell align="right">{t("Lab test type")}</TableCell>
                                <TableCell align="center">{t("Status")}</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                            normalizedCurEncounters.length > 0 ?
                            normalizedCurEncounters.map((encounter, encounterID) => {
                                return(
                                <TableRow key={encounterID}>
                                    <TableCell  align="right" omponent="td" scope="row">
                                        <StyledTableTextCell> {moment(encounter.startTime).format("HH:mm")} </StyledTableTextCell>
                                    </TableCell>
                                    <TableCell align="right">
                                        <StyledTableTextCell>{t(encounter.serviceType)} {encounter.serviceType!="" && encounter.examination!="" ?'-':''} {t(encounter.examination)}</StyledTableTextCell>
                                    </TableCell>
                                    <TableCell align="center">
                                        <StyledLabelStatusAppointment>
                                            <TitleValueComponent
                                                name={encounterStatuses && encounter ? t(encounterStatuses[encounter.status]) : ''}/>
                                        </StyledLabelStatusAppointment>
                                    </TableCell>
                                    <TableCell align="right">
                                        <StyledHrefTableButton size={'small'} variant="outlined" color="primary"
                                                          href="#contained-buttons"
                                                         /* disabled={curEncounters && curEncounters.data && curEncounters.data.total > 0 ? true : false}*/
                                                          /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                           >
                                                          {t("navigate to encounter sheet")}
                                        </StyledHrefTableButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <StyledHrefTableButton size={'large'} variant="outlined" color="primary"
                                                          href="#contained-buttons"
                                                         /* disabled={curEncounter && curEncounter.data && curEncounter.data.total > 0 ? true : false}*/
                                                          /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                          >
                                                         {t("Admission form")}
                                        </StyledHrefTableButton>
                                    </TableCell>
                                </TableRow>
                                );
                            })
                            :


                                <TableRow key={"encounters_no_past_rows"}>

                                    <TableCell colspan="5" align="center" omponent="td" scope="row">{t("No data found for display")}</TableCell>
                                </TableRow>

                            }
                            </TableBody>
                            </Table>
                            </TableContainer>
                            </React.Fragment>
            <React.Fragment>
                            <br/>
                            <StyledHeaderTableAppointment>{t("Future appointments")}
                            <StyledHrefButton size={'small'} variant="contained" color="primary"
                                              href="#contained-buttons"
                                              disabled={false}
                                              onClick={() => handleCreateAppointment(patientData)}>{t("Create new appointment")}

                            </StyledHrefButton>
                            </StyledHeaderTableAppointment>
                            <ul></ul>
                            <TableContainer component={Paper}>
                                <Table    aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">{t("Appointment time")}</TableCell>
                                            <TableCell align="right">{t("Lab test type")}</TableCell>
                                            <TableCell align="center">{t("Status")}</TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                    normalizedNextAppointments.length > 0 ?
                                    normalizedNextAppointments.map((appointment, appointmentID) => {
                                       if(futureAppointmentsCounter--)
                                            return(
                                            <TableRow key={appointmentID}>
                                                <TableCell  align="right" omponent="td" scope="row">
                                                    <StyledTableTextCell> {moment(appointment.startTime).format("HH:mm")} </StyledTableTextCell>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <StyledTableTextCell>{t(appointment.serviceType)} {appointment.serviceType!="" && appointment.examination!="" ?'-':''} {t(appointment.examination)}</StyledTableTextCell>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <StyledLabelStatusAppointment>
                                                        <TitleValueComponent
                                                            name={patientTrackingStatuses && appointment ? t(patientTrackingStatuses[appointment.status]) : ''}/>
                                                    </StyledLabelStatusAppointment>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <StyledHrefTableButton size={'small'} variant="outlined" color="primary"
                                                                           href="#contained-buttons"
                                                        /* disabled={curEncounters && curEncounters.data && curEncounters.data.total > 0 ? true : false}*/
                                                        /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                    >
                                                         {t("Appointment details")}

                                                    </StyledHrefTableButton>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <StyledHrefTableButton size={'large'} variant="outlined" color="primary"
                                                                           href="#contained-buttons"
                                                        /* disabled={curEncounter && curEncounter.data && curEncounter.data.total > 0 ? true : false}*/
                                                        /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                    >
                                                        {t("Cancel appointment")}

                                                    </StyledHrefTableButton>
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })
                                    :



                                        <TableRow key={"encounters_no_past_rows"}>
                                            <TableCell colspan="6" align="center" omponent="td" scope="row">{t("No data found for display")}</TableCell>
                                        </TableRow>




                                    }
                            </TableBody>
                            </Table>
                            </TableContainer>
                            {normalizedNextAppointments.length > 2 ?
                                <StyledLabelTableButton onClick={toggleFutureAppointmentsTable}>{t(!showAllFutureAppointments?"Show all appointments":"Show less appointments")}<StyledIconValueComponent iconType={!showAllFutureAppointments?'keyboard_arrow_down':'keyboard_arrow_up'}/></StyledLabelTableButton> :null
                            }
                        </React.Fragment>
            <React.Fragment>
                        <br/>
                        <StyledHeaderTableAppointment>{t("Previous encounters")}</StyledHeaderTableAppointment>
                        <ul></ul>
                        <TableContainer component={Paper}>
                            <Table    aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">{t("Date")}</TableCell>
                                        <TableCell align="right">{t("Lab test type")}</TableCell>
                                        <TableCell align="center">{t("Status")}</TableCell>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {
                                            normalizedPrevEncounters !== null  &&  normalizedPrevEncounters.length > 0 ?
                                            normalizedPrevEncounters.map((encounter, encounterID) => {
                                            if(pastEncounterCounter--) {
                                                return (
                                                    <TableRow key={encounterID}>
                                                        <TableCell align="right" omponent="td" scope="row">
                                                            <StyledTableTextCell> {moment(encounter.startTime).format("HH:mm")} </StyledTableTextCell>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <StyledTableTextCell>{t(encounter.serviceType)} {encounter.serviceType!="" && encounter.examination!="" ? '-' : ''} {t(encounter.examination)}</StyledTableTextCell>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <StyledLabelStatusAppointment>
                                                                <TitleValueComponent
                                                                    name={encounterStatuses && encounter ? t(encounterStatuses[encounter.status]) : ''}/>
                                                            </StyledLabelStatusAppointment>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <StyledHrefTableButton size={'small'} variant="outlined"
                                                                                   color="primary"
                                                                                   href="#contained-buttons"
                                                                /* disabled={curEncounters && curEncounters.data && curEncounters.data.total > 0 ? true : false}*/
                                                                /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                            >
                                                                {t("Encounter sheet")}
                                                            </StyledHrefTableButton>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <StyledHrefTableButton size={'large'} variant="outlined"
                                                                                   color="primary"
                                                                                   href="#contained-buttons"
                                                                /* disabled={curEncounter && curEncounter.data && curEncounter.data.total > 0 ? true : false}*/
                                                                /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                            >
                                                                {t("Send result")}
                                                            </StyledHrefTableButton>
                                                        </TableCell>


                                                    </TableRow>

                                                );
                                            }
                                    }

                                    )
                                    :


                                                <TableRow key={"encounters_no_past_rows"}>
                                                    <TableCell colspan="5" align="center" omponent="td" scope="row">{t("No data found for display")}</TableCell>
                                                </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                            {
                                normalizedPrevEncounters.length > 2 ?
                                    <StyledLabelTableButton onClick={togglePastEncountersTable}>{t(!showAllPastEncounter?'Show all encounters':'Show less encounters')}<StyledIconValueComponent iconType={!showAllPastEncounter?'keyboard_arrow_down':'keyboard_arrow_up'}/></StyledLabelTableButton>
                                    : null
                            }
                    </React.Fragment>
        </React.Fragment>
    );

};


export default AppointmentsAndEncountersTables;
