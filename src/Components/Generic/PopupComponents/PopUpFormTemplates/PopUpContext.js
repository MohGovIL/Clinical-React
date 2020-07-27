import {
  StyledSaveButton,
  CustomizedPaper,
  CustomizedPaperFooter,
  CustomizedPaperHeader,
  StyledContextTextArea,
  StyledRoundButton,
} from 'Components/Generic/PopupComponents/PopUpFormTemplates/Style';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const PopUpContext = ({
  setContext,
  context,
  setTemplatesTextReturned,
  handleCloseOperation,
  setTemplateWasSaved,
  name,
}) => {
  const { t } = useTranslation();
  const textAreaRef = useRef(null);
  useEffect(() => {
    setContext(textAreaRef.current.value);
  }, [context]);
  const handleChange = () => {
    setContext(textAreaRef.current.value);
  };
  const handleSaveAndClose = () => {
    //SAVE :
    setTemplatesTextReturned(context, name);
    setTemplateWasSaved(true);
    //Close :
    setContext('');
    handleCloseOperation({ saved: true });
  };
  return (
    <React.Fragment>
      <CustomizedPaperHeader>{t('Edit field content')}</CustomizedPaperHeader>
      <CustomizedPaper>
        <StyledContextTextArea
          rowsMax={40}
          value={context}
          onChange={handleChange}
          ref={textAreaRef}
        />
      </CustomizedPaper>

      <CustomizedPaperFooter>
        <StyledSaveButton
          variant={'contained'}
          color={'primary'}
          fontWeight={'bold'}
          disabled={
            textAreaRef &&
            textAreaRef.current &&
            textAreaRef.current.value === ''
          }
          onClick={handleSaveAndClose}>
          {t('Save and Close')}
        </StyledSaveButton>
      </CustomizedPaperFooter>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};

export default connect(mapStateToProps, null)(PopUpContext);
