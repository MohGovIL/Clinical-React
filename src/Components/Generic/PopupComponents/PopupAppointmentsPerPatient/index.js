import React from 'react';
import {useTranslation} from "react-i18next";
import CustomizedPopup from "Assets/Elements/CustomizedPopup";
import Slide from "@material-ui/core/Slide";
import AppointmentsAndEncountersTables from "./AppointmentsAndEncountersTables";


const Transition = React.forwardRef(function Transition(props, ref,direction) {
    return <Slide direction={direction?direction:"up"} ref={ref} {...props} />;
});


const PopAppointmentsPerPatient = ({content, popupOpen, handlePopupClose}) => {
    const {t} = useTranslation();

    if(!content)
        return null;

        const nextAppointments = content && content.nextAppointment ? content.nextAppointment  :null;
        const curEncounters = content && content.curEncounter ? content.curEncounter : null;
        const prevEncounters = content && content.prevEncounter ? content.prevEncounter : null;
        const patientTrackingStatuses = content && content.patientTrackingStatuses ? content.patientTrackingStatuses : null ;
        const encounterStatuses = content && content.encounterStatuses ? content.encounterStatuses : null;

        return content ? (

            <React.Fragment>
                <CustomizedPopup isOpen={popupOpen} onClose={handlePopupClose}
                                 title={t('Appointments And Encounters')+" > "+content.patient.firstName + " " + content.patient.lastName}
                                 content_dividers={false}
                                 fullWidth = {true}
                                 maxWidth = 'md'
                                 TransitionComponent = {Transition}
                                 labelledby="alert-dialog-slide-title"
                                 describedby="alert-dialog-slide-description"
                                 /*bottomButtons={bottomButtonsData}*/>
                    <AppointmentsAndEncountersTables
                        patientId={content.patient}
                        nextAppointments={nextAppointments}
                        curEncounters={curEncounters}
                        prevEncounters={prevEncounters}
                        patientTrackingStatuses={patientTrackingStatuses}
                        encounterStatuses={encounterStatuses}>

                    </AppointmentsAndEncountersTables>
                </CustomizedPopup>
            </React.Fragment>
        ) : null;


};


export default PopAppointmentsPerPatient;
