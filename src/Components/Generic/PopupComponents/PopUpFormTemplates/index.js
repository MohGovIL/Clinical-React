import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import parseMultipleExaminations from 'Utils/Helpers/parseMultipleExaminations';

import { getFormTemplates } from 'Utils/Services/API';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction={props.direction ? props.direction : 'up'}
      ref={ref}
      {...props}
    />
  );
});
const stripHtml = (html) => {
  var tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const PopUpFormTemplates = ({
  formID,
  formFields,
  formFieldsTitle,
  popupOpen,
  handlePopupClose,
  patient,
  encounter,
  languageDirection,
  formatDate,
  verticalName,
}) => {
  const { t } = useTranslation();
  const dialog_props = {
    fullWidth: true,
    maxWidth: 'md',
    TransitionComponent: Transition,
    labelledby: 'alert-dialog-slide-title',
    describedby: 'alert-dialog-slide-description',
  };
  const [templates, setTemplates] = React.useState([]);
  const errorInFields =
    !formID ||
    !formFields ||
    !encounter.serviceType ||
    !encounter.serviceTypeCode ||
    !encounter.examinationCode ||
    encounter.examinationCode < 1;

  const handleCreateData = async () => {
    debugger;
    const templatesServerData = [];
    let response = await getFormTemplates(
      encounter.serviceTypeCode,
      encounter.examinationCode,
      formID,
      formFields,
    );

    if (response.data && response.data.length > 0) {
      for (let i = 0; i < response.data.length; i++) {
        // templatesServerData.push(stripHtml(response.data));
        templatesServerData.push(response.data[i]);
      }
    }

    if (templatesServerData && templatesServerData.length > 0) {
      setTemplates(templatesServerData);
    }
  };

  useEffect(() => {
    debugger;
    if (errorInFields) return null;

    if (templates.length === 0) handleCreateData();
  });

  return templates ? (
    <React.Fragment>
      <CustomizedPopup
        title={
          t(formFieldsTitle) +
          ' > ' +
          parseMultipleExaminations(
            encounter.serviceType,
            encounter.reasonCode,
            t,
          )
        }
        isOpen={popupOpen}
        onClose={handlePopupClose}
        dialog_props={dialog_props}
        content_dividers={false}>
        {t(templates)}
      </CustomizedPopup>
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(PopUpFormTemplates);
