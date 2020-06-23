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
  /*const evaluateOnChange = (evt) => ({ functionName }) => {
    switch (functionName) {
      case 'handleWeightChange':
        handleWeightChange(evt);
        break;
      case 'handleHeightChange':
        handleHeightChange(evt);
        break;
    }
  };*/

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
  const constantIndicators = [
    {
      label: 'Height',
      id: 'height',
      type: 'cm',
      pattern: '[1-9]{1,3}',
      value: height,
      handleOnChange: handleHeightChange,
    },
    {
      label: 'Weight',
      id: 'weight',
      type: 'kg',
      pattern: '[1-9]{1,3}|[1-9]{1,3}[.]|^[0-9]\\d{2}\\.\\d{1}$',
      value: weight,
      handleOnChange: handleWeightChange,
    },
  ];
  return (
    <div dir={languageDirection}>
      <StyledConstantHeaders>{t('Constant indicators')}</StyledConstantHeaders>
      <hr />
      <form autoComplete='off'>
        {constantIndicators.map((value, index) => {
          return value ? (
            <StyledConstantTextField
              inputProps={{ pattern: value.pattern }}
              onChange={value.handleOnChange}
              id={value.id}
              label={t(value.label) + ' (' + t(value.type) + ')'}
              value={value.value}
            />
          ) : null;
        })}
      </form>
      <StyledConstantHeaders>{t('Variable indicators')}</StyledConstantHeaders>
      <hr />
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
