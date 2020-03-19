import React from 'react';
import TitleValueComponent from "./TitleValueComponent";
import {useTranslation} from "react-i18next";
import Box from "@material-ui/core/Box";
import {
    StyledBox,
    StyledLabelAppointment,
    StyledLabelName, StyledLabelServiceTypeAppointment,
    StyledLabelStatusAppointment,
    StyledLinkWithIconComponent
} from "./Style";
import moment from "moment";
import {StyledContainer, StyledPaperContainer} from "../Style";
import normalizeFhirAppointment
    from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment";
import normalizeFhirEncounter
    from "../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter";
import LinkComponentWithIcon from "./LinkComponentWithIcon";
import {getHealthCareServiceByOrganization, getValueSet} from "../../../../../Utils/Services/FhirAPI";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";


const AppointmentsPerPatient = ({nextAppointment, curEncounter, prevEncounter, patientTrackingStatuses, encounterStatuses}) => {

    const {t} = useTranslation();

    const prevEncounterEntry = prevEncounter && prevEncounter.data && prevEncounter.data.total > 0 ? prevEncounter.data.entry[1].resource : null;
    // const nextAppointmentEntry = prevEncounter && prevEncounter.data && prevEncounter.data.total >0  ? prevEncounter.data.entry[1] : null;
    const normalizedPrevEncounter = prevEncounterEntry ? normalizeFhirEncounter(prevEncounterEntry) : null;
    let normalizedCurEncounters = [];
debugger;
    if (curEncounter.data && curEncounter.data.total > 0) {
        let entry = curEncounter.data.entry;
        entry.map((response, resourceIndex) => {
            if (response && response.resource && response.resource.resourceType === "Encounter") {
                let normalizedCurEncounter = normalizeFhirEncounter(response.resource);
                console.log(normalizedCurEncounter);
                normalizedCurEncounters.push(normalizedCurEncounter);
            }


        });
    }


    // const normalizedPrevAppointment = normalizeFhirAppointment(prevEncounterEntry);
    /* const [healthCareServiceTypes, setHealthCareServiceServiceType] = React.useState(null);
     if (normalizedPrevEncounter && !healthCareServiceTypes) {
         setHealthCareServiceServiceType(getHealthCareServiceByOrganization(normalizedPrevEncounter.serviceProvider));
     }*/
    return (
        <React.Fragment>

            <StyledBox>
                <List >
                    {normalizedCurEncounters.length > 0 ?
                        normalizedCurEncounters.map((encounter, encounterID) => {
                            return (

                                <ListItem>

                                            <StyledLabelAppointment>
                                                <TitleValueComponent name={t("Previous encounter")}
                                                                     value={moment(normalizedCurEncounters.startTime).format("DD/MM/YYYY")}
                                                                     seperator={true}/>
                                            </StyledLabelAppointment>

                                            <StyledLabelAppointment>
                                                <TitleValueComponent name={t(normalizedCurEncounters.serviceType)}/>
                                            </StyledLabelAppointment>

                                            <StyledLabelStatusAppointment>
                                                <TitleValueComponent
                                                    name={encounterStatuses && normalizedCurEncounters ? t(encounterStatuses[normalizedCurEncounters.status]) : ''}/*t(normalizedPrevEncounter.status.charAt(0).toUpperCase() + normalizedPrevEncounter.status.slice(1))}*//>
                                            </StyledLabelStatusAppointment>

                                            <StyledLinkWithIconComponent>
                                                <LinkComponentWithIcon linkHeader={t("navigate to encounter sheet")}
                                                                       linkUrl={"google.com"}/>
                                            </StyledLinkWithIconComponent>

                                </ListItem>
                            );

                        })
                        :
                        <ListItem>

                                <StyledLabelAppointment>
                                    <TitleValueComponent name={t("Current encounter")} value={t("Non existence")}
                                                         seperator={true}/>
                                </StyledLabelAppointment>

                        </ListItem>

                    }

                    {normalizedPrevEncounter !== null ?
                        <ListItem key={normalizedPrevEncounter.id} >


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
                                            name={encounterStatuses && normalizedPrevEncounter ? t(encounterStatuses[normalizedPrevEncounter.status]) : ''}/*t(normalizedPrevEncounter.status.charAt(0).toUpperCase() + normalizedPrevEncounter.status.slice(1))}*//>
                                    </StyledLabelStatusAppointment>

                                    <StyledLinkWithIconComponent>
                                        <LinkComponentWithIcon linkHeader={t("navigate to encounter sheet")}
                                                               linkUrl={"google.com"}/>
                                    </StyledLinkWithIconComponent>

                        </ListItem>
                        :
                        <ListItem>

                                <StyledLabelAppointment>
                                    <TitleValueComponent name={t("Previous encounter")} value={t("Non existence")}
                                                         seperator={true}/>
                                </StyledLabelAppointment>

                        </ListItem>
                    }
                </List>
            </StyledBox>

        </React.Fragment>
    );

};


export default AppointmentsPerPatient;
