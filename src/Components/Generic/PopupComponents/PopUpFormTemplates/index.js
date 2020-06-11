import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import parseMultipleExaminations from 'Utils/Helpers/parseMultipleExaminations';

import { getFormTemplates } from 'Utils/Services/API';
import MainPopUpFormTemplate from 'Components/Generic/PopupComponents/PopUpFormTemplates/MainPopUpFormTemplate';
import PopUpOnExit from 'Assets/Elements/PopUpOnExit';

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction={props.direction ? props.direction : 'up'}
      ref={ref}
      {...props}
    />
  );
});

const PopUpFormTemplates = ({
  setTemplatesTextReturned,
  templatesTextReturned,
  formID,
  formFields,
  formFieldsTitle,
  handlePopupClose,
  encounter,
  languageDirection,
  verticalName,
  defaultContext,
  popupOpen,
}) => {
  const { t } = useTranslation();
  const [context, setContext] = React.useState('');

  const [popupCloseOpen, setPopupCloseOpen] = React.useState(false);
  const handleSavePopupClose = (e) => {
    //ToDo  : PC-761 - meanwhile :
    setPopupCloseOpen(false);
    //check if to close or not and do :
    handlePopupClose();
  };
  const handleCloseOperation = (e) => {
    //TODO : PC-761 - meanwhile :
    /* if (
      (context === '' && templatesTextReturned === '') ||
      templatesTextReturned !== ''
    ) {
      handlePopupClose();
    } else {
      setPopupCloseOpen(true);
    }*/

    handlePopupClose();
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
          (languageDirection === 'rtl' ? ' > ' : ' < ') +
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
      <PopUpOnExit
        isOpen={popupCloseOpen}
        isClose={handleSavePopupClose}
        returnFunction={handleSavePopupClose}
        exitWithOutSavingFunction={handleSavePopupClose}
      />
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(PopUpFormTemplates);
