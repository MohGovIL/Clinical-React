import React from 'react';
import StyledPatientFiles from './Style';
import PopUpFormTemplates from '../../PopupComponents/PopUpFormTemplates';
import PopAppointmentsPerPatient from '../../PopupComponents/PopupAppointmentsPerPatient';

const EncounterForms = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  let formID = 1,
    formFields = 'reccomended_medicine',
    formFieldsTitle = 'Medical anamneze';

  const [popUpTemplates, setPopUpTemplates] = React.useState(true);
  const handlePopupClose = () => {
    if (setPopUpTemplates) {
      setPopUpTemplates(false);
    } else {
      setPopUpTemplates(true);
    }
  };

  return (
    <StyledPatientFiles>
      <PopUpFormTemplates
        formID={formID}
        formFields={formFields}
        formFieldsTitle={formFieldsTitle}
        serviceType={encounter.serviceType}
        reasonCode={encounter.reasonCode}
        popupOpen={popUpTemplates}
        handlePopupClose={handlePopupClose}></PopUpFormTemplates>
    </StyledPatientFiles>
  );
};

export default EncounterForms;
