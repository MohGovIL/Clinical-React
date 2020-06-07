import Grid from '@material-ui/core/Grid';

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CustomizedPaper, CustomizedPaperFooter, CustomizedPaperHeader } from 'Components/Generic/PopupComponents/PopUpFormTemplates/Style';
import { useTranslation } from 'react-i18next';
import PopUpContantList from './PopUpContantList';

const MainPopUpFormTemplate = ({ templates,languageDirection }) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <CustomizedPaperHeader languageDirection={languageDirection}>{t("Add template")}</CustomizedPaperHeader>
        <PopUpContantList templates={templates}/>
      </Grid>
      <Grid item xs={6}>
        <CustomizedPaperHeader>{t("Create context for examination details")}</CustomizedPaperHeader>
        <CustomizedPaper>xs=6

        </CustomizedPaper>
        <CustomizedPaperFooter>

        </CustomizedPaperFooter>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};

export default connect(mapStateToProps, null)(MainPopUpFormTemplate);
