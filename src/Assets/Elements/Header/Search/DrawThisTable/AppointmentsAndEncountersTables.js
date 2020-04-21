import React from 'react';
import TitleValueComponent from "./TitleValueComponent";
import {useTranslation} from "react-i18next";
import {
    StyledBottomLinks,
    StyledBox, StyledHrefButton,
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
                                    <TableCell align="right">{t("Encounter's hour")}</TableCell>
                                    <TableCell align="right">{t("Lab test type")}</TableCell>
                                    <TableCell align="center">{t("Status")}</TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {normalizedCurEncounters.map((encounter, encounterID) => {
                                    return(
                                    <TableRow key={encounterID}>
                                        <TableCell  align="right" omponent="th" scope="row">
                                            {moment(encounter.startTime).format("HH:mm")}
                                        </TableCell>
                                        <TableCell align="right">
                                           {t(encounter.serviceType)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <StyledLabelStatusAppointment>
                                                <TitleValueComponent
                                                    name={encounterStatuses && encounter ? t(encounterStatuses[encounter.status]) : ''}/>
                                            </StyledLabelStatusAppointment>
                                        </TableCell>
                                        <TableCell align="right">
                                            <StyledHrefButton size={'small'} variant="outlined" color="primary"
                                                              href="#contained-buttons"
                                                              disabled={curEncounter && curEncounter.data && curEncounter.data.total > 0 ? true : false}
                                                              /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                               >
                                                              {t("navigate to encounter sheet")}
                                            </StyledHrefButton>
                                        </TableCell>
                                        <TableCell align="right">
                                            <StyledHrefButton size={'large'} variant="outlined" color="primary"
                                                              href="#contained-buttons"
                                                              disabled={curEncounter && curEncounter.data && curEncounter.data.total > 0 ? true : false}
                                                              /*onClick={() => handleCreateAppointment(patient, nextAppointment)}>*/
                                                              >
                                                             {t("Admission form")}
                                            </StyledHrefButton>
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

                            <React.Fragment>
                                <StyledLabelAppointment><TitleValueComponent name={t("Future encounters")}/></StyledLabelAppointment>
                                <ul></ul>
                                <TableContainer component={Paper}>
                                    <Table    aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="right">{t("Encounter's date")}</TableCell>
                                                <TableCell align="right">{t("Lab test type")}</TableCell>
                                                <TableCell align="center">{t("Status")}</TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                            <StyledLabelAppointment>
                                                <TitleValueComponent name={t("Next appointment")} value={t("Non existence")}
                                                                     seperator={true}/>
                                            </StyledLabelAppointment>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </React.Fragment>


                            :


                              null


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
