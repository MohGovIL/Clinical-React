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
import {getValueSet} from "../../../../../Utils/Services/FhirAPI";



const  AppointmentsPerPatient  =   ({nextAppointment, prevEncounter, patientTrackingStatuses,encounterStatuses}) => {
    const {t} = useTranslation();

    const prevEncounterEntry = prevEncounter && prevEncounter.data && prevEncounter.data.total > 0 ? prevEncounter.data.entry[1].resource : null;
    // const nextAppointmentEntry = prevEncounter && prevEncounter.data && prevEncounter.data.total >0  ? prevEncounter.data.entry[1] : null;
    const normalizedPrevEncounter = prevEncounterEntry ? normalizeFhirEncounter(prevEncounterEntry) : null;
    // const normalizedPrevAppointment = normalizeFhirAppointment(prevEncounterEntry);

debugger;

    return (
        <React.Fragment>

            <StyledBox>

                {normalizedPrevEncounter !== null ?
                    <React.Fragment>
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
                                name={encounterStatuses && normalizedPrevEncounter ? t(encounterStatuses[normalizedPrevEncounter.status]) :''}/*t(normalizedPrevEncounter.status.charAt(0).toUpperCase() + normalizedPrevEncounter.status.slice(1))}*//>
                        </StyledLabelStatusAppointment>
                        <StyledLinkWithIconComponent>
                            <LinkComponentWithIcon linkHeader={t("navigate to encounter sheet")}
                                                   linkUrl={"google.com"}/>
                        </StyledLinkWithIconComponent>
                    </React.Fragment>
                    :
                    <StyledLabelAppointment>
                        <TitleValueComponent name={t("Previous encounter")} value={t("Non existence")}
                                             seperator={true}/>
                    </StyledLabelAppointment>
                }
            </StyledBox>

        </React.Fragment>
    );

};


export default AppointmentsPerPatient;
