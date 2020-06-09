import { CustomizedPaper, CustomizedPaperFooter, CustomizedPaperHeader, StyledContextTextArea } from './Style';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import Grid from '@material-ui/core/Grid';

const PopUpContext = ({setContext,context})=>{
  const { t } = useTranslation();
  const textAreaRef = useRef(null);
  useEffect(()=>{
    setContext(textAreaRef.current.value);
  });
  const handleChange = ()=>{
    setContext(textAreaRef.current.value);
  }
  return (
    <React.Fragment>
      <CustomizedPaperHeader>{t("Create context for examination details")}</CustomizedPaperHeader>
         <CustomizedPaper>

            <StyledContextTextArea  rowsMax={40}
                                   value={context} onChange={handleChange} ref={textAreaRef}/>

          </CustomizedPaper>

      <CustomizedPaperFooter> </CustomizedPaperFooter>
    </React.Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};

export default connect(mapStateToProps, null)(PopUpContext);
