//TestsAndTreatment

import { connect } from 'react-redux';
import React from 'react';
import { Label } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';

const TestsAndTreatment = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
}) => {
  const { t } = useTranslation();
  console.log(languageDirection);
  return (
    <div dir={languageDirection}>
      <label>{t('Constant Indicators')}</label>
      <hr />
      <form autoComplete='off'>
        <StyledConstantTextField id='height' label={t('Height')} />

        <TextField id='weight' label={t('Weight')} />
      </form>
    </div>
  );
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
export default connect(mapStateToProps, null)(TestsAndTreatment);
