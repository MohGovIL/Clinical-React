import {
  StyledSaveButton,
  CustomizedPaper,
  CustomizedPaperFooter,
  CustomizedPaperHeader,
  StyledContextTextArea,
  StyledRoundButton,
} from './Style';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const PopUpContext = ({
  setContext,
  context,
  setTemplatesTextReturned,
  handleCloseOperation,
}) => {
  const { t } = useTranslation();
  const textAreaRef = useRef(null);
  useEffect(() => {
    setContext(textAreaRef.current.value);
  });
  const handleChange = () => {
    setContext(textAreaRef.current.value);
  };
  const handleSaveAndClose = () => {
    //ToDo : PC-761
    handleCloseOperation();
  };
  return (
    <React.Fragment>
      <CustomizedPaperHeader>
        {t('Create context for examination details')}
      </CustomizedPaperHeader>
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
