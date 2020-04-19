import React from 'react';

import AppointmentsPerPatient from "./AppointmentsPerPatient";
import CustomizedPopup from "../../../CustomizedPopup";
import normalizeFhirAppointment
    from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment";
import normalizeFhirEncounter
    from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter";


const PopUpAppointmentsPerPatient = ({content, popupOpen, handlePopupClose}) => {
    if(!content)
        return null;
debugger;
        const nextAppointment = content && content.nextAppointment && content.nextAppointment.data && content.nextAppointment.data.total > 0 ? normalizeFhirAppointment(content.nextAppointment.data.entry[1].resource) : null;
        const curEncounter = content && content.curEncounter  && content.curEncounter.data && content.curEncounter.data.total > 0 ?  normalizeFhirEncounter(content.curEncounter.data.entry[1].resource): null;
        const patientTrackingStatuses = content && content.patientTrackingStatuses ? content.patientTrackingStatuses : null ;
        const encounterStatuses = content && content.encounterStatuses ? content.encounterStatuses : null;


        /*const bottomButtonsData = [
            {
                'label': 'Encounters and appointments',
                'variant': "text",
                'color': "primary",
                'type': "submit"
            },
            {
                'label': 'Encounters and appointments',
                'variant': "contained",
                'color': "primary",
                'onClickHandler': handlePopupClose //user function
            },
            {
                'label': 'Encounters and appointments',
                'variant': "contained",
                'color': "primary",
                'onClickHandler': handlePopupClose //user function
            }
        ];*/

        return content ? (

            <React.Fragment>
                <CustomizedPopup isOpen={popupOpen} onClose={handlePopupClose}
                                 title={'Create new patient'}
                                 content_dividers={false}
                                 /*bottomButtons={bottomButtonsData}*/>
                    <AppointmentsPerPatient
                        nextAppointment={nextAppointment}
                        curEncounter={curEncounter}

                        patientTrackingStatuses={patientTrackingStatuses}
                        encounterStatuses={encounterStatuses}>

                    </AppointmentsPerPatient>
                </CustomizedPopup>
            </React.Fragment>
        ) : null;


};


export default PopUpAppointmentsPerPatient;
