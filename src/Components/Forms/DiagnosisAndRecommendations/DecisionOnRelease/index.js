import React, { useEffect, useState } from 'react';
import Title from 'Assets/Elements/Title';
import { Grid, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { useFormContext } from 'react-hook-form';
import { StyledDivider } from '../Style';
const RecommendationsOnRelease = () => {
  const { t } = useTranslation();
  const {
    register,
    unregister,
    setValue,
    permission,
    questionnaireResponse,
  } = useFormContext();
  const [decision, setDecision] = useState('');
  const [evacuationWay, setEvacuationWay] = useState('');

  const handleEvacuationWayChange = (event) => {
    setEvacuationWay(event.target.value);
    setValue('evacuationWay', event.target.value);
  };

  const handleDecisionChange = (event) => {
    setDecision(event.target.value);
    setValue('decision', event.target.value);
  };

  useEffect(() => {
    register({ name: 'decision' });
    register({ name: 'evacuationWay' });
    const { items } = questionnaireResponse;
    if (items) {
      items.forEach((item) => {
        if (item.answer) {
          switch (item.text) {
            case 'Decision':
              setDecision(item.answer[0].valueString);
              setValue('decision', item.answer[0].valueString);
              break;
            case 'Evacuation way':
              setEvacuationWay(item.answer[0].valueString);
              setValue('evacuationWay', item.answer[0].valueString);
              break;
            case 'Sick leave':
              setValue('numberOfDays', item.answer[0].valueString);
              break;
            default:
              break;
          }
        }
      });
    }
    return () => unregister(['decision', 'evacuationWay']);
  }, [register, unregister, questionnaireResponse, setValue]);

  return (
    <StyledFormGroup>
      <Title
        label={t('Decision on release')}
        fontSize='22px'
        bold
        color='#000b40'
      />
      <StyledDivider />
      <Grid container direction='row' justify='flex-start' alignItems='center'>
        <label>{t('Decision')}</label>
        <RadioGroup
          row
          name='decision'
          value={decision}
          onChange={handleDecisionChange}>
          <FormControlLabel
            value='Evacuation to hospital'
            label={t('Evacuation to hospital')}
            control={
              <Radio
                color='primary'
                disabled={permission === 'view' ? true : false}
              />
            }
          />
          <FormControlLabel
            value='Release to home'
            label={t('Release to home')}
            control={
              <Radio
                color='primary'
                disabled={permission === 'view' ? true : false}
              />
            }
          />
        </RadioGroup>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems={decision === 'Release to home' ? 'baseline' : 'center'}>
        {decision === 'Evacuation to hospital' && (
          <React.Fragment>
            <label>{t('Evacuation way')}</label>
            <RadioGroup
              row
              name='evacuationWay'
              value={evacuationWay}
              onChange={handleEvacuationWayChange}>
              <FormControlLabel
                value='Ambulance'
                label={t('Ambulance')}
                control={
                  <Radio
                    color='primary'
                    disabled={permission === 'view' ? true : false}
                  />
                }
              />
              <FormControlLabel
                value='Independent'
                label={t('Independent')}
                control={
                  <Radio
                    color='primary'
                    disabled={permission === 'view' ? true : false}
                  />
                }
              />
            </RadioGroup>
          </React.Fragment>
        )}
        {decision === 'Release to home' && (
          <React.Fragment>
            <label>{t('Sick leave')}</label>
            <CustomizedTextField
              style={{ marginLeft: '16px', marginRight: '16px' }}
              name='numberOfDays'
              width='10%'
              label={t('Number of days')}
              type='number'
              inputProps={{
                min: '0',
              }}
              inputRef={register}
              disabled={permission === 'view' ? true : false}
            />
          </React.Fragment>
        )}
      </Grid>
    </StyledFormGroup>
  );
};

export default RecommendationsOnRelease;
