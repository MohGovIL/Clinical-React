//TestsAndTreatment

import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Label } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import TextField from '@material-ui/core/TextField';
import { StyledConstantHeaders, StyledConstantTextField } from './Style';

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
  const [height, setHeight] = useState([]);
  const [weight, setWeight] = useState([]);
  const handleWeightChange = (evt) => {
    /* add this when bugs arise from design something like
        &&
      evt.target.value < 600*/

    const weightTemp =
      evt.target.validity.valid && evt.target.value.length < 6
        ? evt.target.value
        : weight;
    setWeight(weightTemp);
  };

  const handleHeightChange = (evt) => {
    const heightTemp =
      /* add this when bugs arise from design something like
       && evt.target.value < 300*/
      evt.target.validity.valid && evt.target.value.length < 4
        ? evt.target.value
        : height;
    setHeight(heightTemp);
  };

  return (
    <div dir={languageDirection}>
      <StyledConstantHeaders>{t('Constant Indicators')}</StyledConstantHeaders>
      <hr />
      <form autoComplete='off'>
        <StyledConstantTextField
          inputProps={{ pattern: '[1-9]{1,3}' }}
          onChange={handleHeightChange}
          id='height'
          label={t('Height') + ' (' + t('cm') + ')'}
          value={height}
        />

        <StyledConstantTextField
          inputProps={{
            pattern: ['[1-9]{1,3}|[1-9]{1,3}[.]|^[0-9]\\d{2}\\.\\d{1}$'],
          }}
          onChange={handleWeightChange}
          id='weight'
          label={t('Weight') + ' (' + t('kg') + ')'}
          value={weight}
        />
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
