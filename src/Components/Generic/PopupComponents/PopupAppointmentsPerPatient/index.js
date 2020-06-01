import React from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import Slide from '@material-ui/core/Slide';
import AppointmentsAndEncountersTables from './AppointmentsAndEncountersTables';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction={props.direction ? props.direction : 'up'}
      ref={ref}
      {...props}
    />
  );
});

const PopAppointmentsPerPatient = ({
  content,
  popupOpen,
  handlePopupClose,
  authorizationACO,
  gotToPatientAdmission,
  patient,
}) => {
  const { t } = useTranslation();

  if (!content) return null;

  const nextAppointments =
    content && content.nextAppointment ? content.nextAppointment : null;
  const curEncounters =
    content && content.curEncounter ? content.curEncounter : null;
  const prevEncounters =
    content && content.prevEncounter ? content.prevEncounter : null;
  const patientTrackingStatuses =
    content && content.patientTrackingStatuses
      ? content.patientTrackingStatuses
      : null;
  const encounterStatuses =
    content && content.encounterStatuses ? content.encounterStatuses : null;
  const dialog_props = {
    fullWidth: true,
    maxWidth: 'md',
    TransitionComponent: Transition,
    labelledby: 'alert-dialog-slide-title',
    describedby: 'alert-dialog-slide-description',
  };
  return content ? (
    <React.Fragment>
      <CustomizedPopup
        title={
          t('Appointments And Encounters') +
          ' > ' +
          content.patient.firstName +
          ' ' +
          content.patient.lastName
        }
        isOpen={popupOpen}
        onClose={handlePopupClose}
        dialog_props={dialog_props}
        content_dividers={false}

        /*bottomButtons={bottomButtonsData}*/
      >
        <AppointmentsAndEncountersTables
          patientId={content.patient}
          nextAppointments={nextAppointments}
          curEncounters={curEncounters}
          prevEncounters={prevEncounters}
          patientTrackingStatuses={patientTrackingStatuses}
          encounterStatuses={encounterStatuses}
          authorizationACO={authorizationACO}
          patient={patient}
          gotToPatientAdmission={
            gotToPatientAdmission
          }></AppointmentsAndEncountersTables>
      </CustomizedPopup>
    </React.Fragment>
  ) : null;
};

export default PopAppointmentsPerPatient;
