import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import parseMultipleExaminations from 'Utils/Helpers/parseMultipleExaminations';

import { getFormTemplates } from 'Utils/Services/API';
import MainPopUpFormTemplate from 'Components/Generic/PopupComponents/PopUpFormTemplates/MainPopUpFormTemplate';

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
  setTemplatesTextReturned,
  templatesTextReturned,
  formID,
  formFields,
  formFieldsTitle,
  popupOpen,
  handlePopupClose,
  encounter,
  languageDirection,
  formatDate,
  verticalName,
  defaultContext,
}) => {
  const { t } = useTranslation();
  const [context, setContext] = React.useState('');
  const handleCloseOperation = (e) => {
    if (
      (context === '' && templatesTextReturned === '') ||
      templatesTextReturned !== ''
    ) {
      handlePopupClose();
    } else {
      alert('ToDo: close without save PC-761');
    }
  };
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
    const templatesServerData = [];
    let response = await getFormTemplates(
      encounter.serviceTypeCode,
      encounter.examinationCode.toString(),
      formID,
      formFields,
    );

    if (response.data && response.data.length > 0) {
      for (let i = 0; i < response.data.length; i++) {
        // templatesServerData.push(stripHtml(response.data));
        templatesServerData.push({ title: response.data[i] });
      }
    }

    if (templatesServerData && templatesServerData.length > 0) {
      setTemplates(templatesServerData);
    }
  };

  useEffect(() => {
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
            encounter.examination,
            t,
          )
        }
        isOpen={popupOpen}
        onClose={handleCloseOperation}
        dialog_props={dialog_props}
        content_dividers={false}>
        <MainPopUpFormTemplate
          handleCloseOperation={handleCloseOperation}
          context={context}
          setContext={setContext}
          defaultContext={defaultContext}
          setTemplatesTextReturned={setTemplatesTextReturned}
          templates={templates}></MainPopUpFormTemplate>
      </CustomizedPopup>
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(PopUpFormTemplates);
