import React from 'react';
import TitleValueComponent from "./TitleValueComponent";
import {useTranslation} from "react-i18next";
import {
    StyledBox,
    StyledLabelAppointment,
    StyledLabelName, StyledLabelServiceTypeAppointment,
    StyledLabelStatusAppointment,
    StyledLinkWithIconComponent
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





const AppointmentsAndEncountersTables = ({nextAppointment, curEncounter, prevEncounter, patientTrackingStatuses, encounterStatuses}) => {

    const {t} = useTranslation();

    const prevEncounterEntry = prevEncounter && prevEncounter.data && prevEncounter.data.total > 0 ? prevEncounter.data.entry[1].resource : null;
    const nextAppointmentElem = nextAppointment && nextAppointment.data && nextAppointment.data.total >0  ? nextAppointment.data.entry[1].resource : null;
    const curEncounterElem = curEncounter ? curEncounter : null;
    const nextAppointmentEntry = nextAppointmentElem ? normalizeFhirAppointment(nextAppointmentElem) : null;
    const normalizedPrevEncounter = prevEncounterEntry ? normalizeFhirEncounter(prevEncounterEntry) : null;
    let normalizedCurEncounters = [];
    const getAppointmentWithTimeOrNot =(nextAppointmentEntry)=>{
        let isThisAppToday = moment(nextAppointmentEntry.startTime).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY") ? true : false;
        return  (isThisAppToday ? moment(nextAppointmentEntry.startTime).format("DD/MM/YYYY HH:mm") :moment().format("DD/MM/YYYY")  );
    }
    const handleChartClickOpen = ()=> {

    }

    const handleAdmissionClickOpen = () => {

    }

    if (curEncounter.data && curEncounter.data.total > 0) {
        let entry = curEncounter.data.entry;
        entry.map((response, resourceIndex) => {
            if (response && response.resource && response.resource.resourceType === "Encounter") {
                let normalizedCurEncounter = normalizeFhirEncounter(response.resource);
                normalizedCurEncounters.push(normalizedCurEncounter);
            }


        });
    }



debugger;
    return (
        <React.Fragment>
            {normalizedCurEncounters.length > 0 ?
                <React.Fragment>
                    <StyledLabelAppointment><TitleValueComponent name={t("Current encounter")}/></StyledLabelAppointment>
                    <ul></ul>
                    <TableContainer component={Paper}>
                        <Table    aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">{t("Current encounter")}</TableCell>
                                    <TableCell align="right">{t("Service type")}</TableCell>
                                    <TableCell align="right">{t("Status")}</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {normalizedCurEncounters.map((encounter, encounterID) => {
                                    return(
                                    <TableRow key={encounterID}>
                                        <TableCell  align="right" omponent="th" scope="row">
                                            {moment(encounter.startTime).format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell align="right">
                                           {t(encounter.serviceType)}
                                        </TableCell>
                                        <TableCell align="right">
                                            {encounterStatuses && encounter ? t(encounterStatuses[encounter.status]) : ''}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color="primary" onClick={handleChartClickOpen}>{t("navigate to encounter sheet")}</Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" color="primary" onClick={handleAdmissionClickOpen}>{t("Patient admission")}</Button>
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                                </TableBody>
                                </Table>
                                </TableContainer>
                                </React.Fragment>
                        :

                        null
            }
            {

                        nextAppointmentEntry ?
                            <ListItem key={nextAppointmentEntry.id+"_nextAppointmentEntry"} >


                                <StyledLabelAppointment>
                                    <TitleValueComponent name={t("Next appointment")}
                                        //Check if it is today if so show hour also ...
                                        //Else Show the future date of the appointment
                                                         value={getAppointmentWithTimeOrNot(nextAppointmentEntry)}
                                                         seperator={true}/>
                                </StyledLabelAppointment>

                                <StyledLabelAppointment>
                                    <TitleValueComponent name={t(nextAppointmentEntry.serviceType)}/>
                                </StyledLabelAppointment>

                                <StyledLabelStatusAppointment>
                                    <TitleValueComponent
                                        name={patientTrackingStatuses && nextAppointmentEntry ? t(patientTrackingStatuses[nextAppointmentEntry.status]) : ''}/*t(normalizedPrevEncounter.status.charAt(0).toUpperCase() + normalizedPrevEncounter.status.slice(1))}*//>
                                </StyledLabelStatusAppointment>

                                <StyledLinkWithIconComponent>
                                    <LinkComponentWithIcon linkHeader={t("Navigate to appointment details")}
                                                           linkUrl={"#"}/>
                                </StyledLinkWithIconComponent>

                            </ListItem>
                            :
                            <ListItem key={"nextAppointmentEntry_2"}>

                                <StyledLabelAppointment>
                                    <TitleValueComponent name={t("Next appointment")} value={t("Non existence")}
                                                         seperator={true}/>
                                </StyledLabelAppointment>

                            </ListItem>
                    }
                    {normalizedPrevEncounter !== null ?
                        <ListItem key={normalizedPrevEncounter.id+"_normalizedPrevEncounter"} >


                            <StyledLabelAppointment>
                                <TitleValueComponent name={t("Previous encounter")}
                                                     value={moment(normalizedPrevEncounter.startTime).format("DD/MM/YYYY")}
                                                     seperator={true}/>
                            </StyledLabelAppointment>

                            <StyledLabelAppointment>
                                <TitleValueComponent name={t(normalizedPrevEncounter.serviceType)}/>
                            </StyledLabelAppointment>

                            <StyledLabelStatusAppointment>
                                <TitleValueComponent
                                    name={encounterStatuses && normalizedPrevEncounter ? t(encounterStatuses[normalizedPrevEncounter.status]) : ''}/>
                            </StyledLabelStatusAppointment>

                            <StyledLinkWithIconComponent>
                                <LinkComponentWithIcon linkHeader={t("navigate to encounter sheet")}
                                                       linkUrl={"#"}/>
                            </StyledLinkWithIconComponent>

                        </ListItem>
                        :
                        <ListItem key={"normalizedPrevEncounter_3"}>

                            <StyledLabelAppointment>
                                <TitleValueComponent name={t("Previous encounter")} value={t("Non existence")}
                                                     seperator={true}/>
                            </StyledLabelAppointment>

                        </ListItem>
                    }



        </React.Fragment>
    );

};


export default AppointmentsAndEncountersTables;
