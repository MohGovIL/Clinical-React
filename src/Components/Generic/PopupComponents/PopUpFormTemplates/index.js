import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import parseMultipleExaminations from 'Utils/Helpers/parseMultipleExaminations';

import { getFormTemplates } from 'Utils/Services/API';
import MainPopUpFormTemplate from 'Components/Generic/PopupComponents/PopUpFormTemplates/MainPopUpFormTemplate';
import PopUpOnExit from 'Assets/Elements/PopUpOnExit';
import { CustomizedPaperHeader } from './Style';

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
  formID,
  formFields,
  formFieldsTitle,
  handlePopupClose,
  encounter,
  languageDirection,
  verticalName,
  defaultContext,
  setDefaultContext,
  popupOpen,
  name,
}) => {
  const { t } = useTranslation();
  const [context, setContext] = React.useState('');
  const [templateWasSaved, setTemplateWasSaved] = React.useState(false);
  const [popupCloseOpen, setPopupCloseOpen] = React.useState(false);
  const handleSavePopupClose = (e) => {
    setPopupCloseOpen(false);
    handlePopupClose();
  };
  const handleWithoutSavingPopupClose = () => {
    handleSavePopupClose();
    setContext('');
  };
  const handleJustClosePopupClose = () => {
    setPopupCloseOpen(false);
  };
  const handleCloseOperation = ({ saved }) => {
    if ((context === '' && !saved) || (saved && typeof saved !== 'object')) {
      handlePopupClose();
    } else {
      if (
        defaultContext === '' ||
        (defaultContext !== '' &&
          context &&
          defaultContext.trim() !== context.trim())
      ) {
        setPopupCloseOpen(true);
      } else {
        setPopupCloseOpen(false);
        setContext('');
        handlePopupClose();
      }
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

  useEffect(() => {
    (async () => {
      //fix rerendering from same screen
      setTemplates([]);
      try {
        const templatesServerData = [];
        let response = await getFormTemplates(
          encounter.serviceTypeCode,
          encounter.examinationCode && encounter.examinationCode.toString(),
          formID,
          formFields,
        );
        if (response && response.data && response.data.length > 0) {
          for (let i = 0; i < response.data.length; i++) {
            templatesServerData.push({ title: response.data[i] });
          }
        }

        if (templatesServerData && templatesServerData.length > 0) {
          setTemplates(templatesServerData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [
    encounter.examinationCode,
    encounter.serviceTypeCode,
    formID,
    formFields,
  ]);

  return templates ? (
    <React.Fragment>
      <CustomizedPopup
        languageDirection={languageDirection}
        title={
          t(formFieldsTitle) +
          (languageDirection === 'rtl' ? ' < ' : ' > ') +
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
          defaultContext={defaultContext}
          languageDirection={languageDirection}
          handleCloseOperation={handleCloseOperation}
          context={context}
          setContext={setContext}
          setDefaultContext={setDefaultContext}
          name={name}
          setTemplatesTextReturned={setTemplatesTextReturned}
          setTemplateWasSaved={setTemplateWasSaved}
          templates={templates}></MainPopUpFormTemplate>
      </CustomizedPopup>
      <PopUpOnExit
        languageDirection={languageDirection}
        isOpen={popupCloseOpen}
        isClose={handleSavePopupClose}
        returnFunction={handleJustClosePopupClose}
        exitWithOutSavingFunction={handleWithoutSavingPopupClose}
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
