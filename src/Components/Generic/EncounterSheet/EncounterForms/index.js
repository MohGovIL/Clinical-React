import React from 'react';
import StyledPatientFiles from './Style';

const EncounterForms = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  return <StyledPatientFiles></StyledPatientFiles>;
};

export default EncounterForms;

/*
-------------------------EXAMPLE HOW TO CALL POPUP FORM TEMPLATES ---------------------

import React from 'react';
import StyledPatientFiles from './Style';
import PopUpFormTemplates from '../../PopupComponents/PopUpFormTemplates';
import PopAppointmentsPerPatient from '../../PopupComponents/PopupAppointmentsPerPatient';
import { connect } from 'react-redux';

const EncounterForms = ({
  encounter,
  patient,
  languageDirection,
  formatDate,
}) => {
  let formID = 1,
    formFields = 'reccomended_medicine',
    formFieldsTitle = 'Medical problem';

  const [popUpTemplates, setPopUpTemplates] = React.useState(true);
  const [templatesTextReturned, setTemplatesTextReturned] = React.useState('');
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
        setTemplatesTextReturned={setTemplatesTextReturned}
        templatesTextReturned={templatesTextReturned}
        formID={formID}
        formFields={formFields}
        formFieldsTitle={formFieldsTitle}
        encounter={encounter} //can be whatever encounter needed
        defaultContext={'hfsidf hufuds fusd fusdhfusfd usdiufshdfushdfus'}
        popupOpen={popUpTemplates}
        handlePopupClose={handlePopupClose}></PopUpFormTemplates>
    </StyledPatientFiles>
  );
};

const mapStateToProps = (state) => {
  return {
    encounter: state.active.activeEncounter,
    patient: state.active.activePatient,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(EncounterForms);

 */
