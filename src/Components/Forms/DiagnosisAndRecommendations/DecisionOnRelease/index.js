import React, { useEffect, useState } from 'react';
import Title from 'Assets/Elements/Title';
import {
  Divider,
  Grid,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { useFormContext } from 'react-hook-form';
import { StyledDivider } from '../Style';
const RecommendationsOnRelease = () => {
  const { t } = useTranslation();
  const { register, unregister, setValue } = useFormContext();
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
    return () => unregister(['decision', 'evacuationWay']);
  }, [register, unregister]);

  return (
    <StyledFormGroup>
      <Title label={t('Decision on release')} fontSize='22px' bold />
      <StyledDivider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <RadioGroup
          row
          name='decision'
          value={decision}
          onChange={handleDecisionChange}>
          <label>{t('Decision')}</label>
          <FormControlLabel
            value='Evacuation to hospital'
            label={t('Evacuation to hospital')}
            control={<Radio color='primary' />}
          />
          <FormControlLabel
            value='Release to home'
            label={t('Release to home')}
            control={<Radio color='primary' />}
          />
        </RadioGroup>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        {decision === 'Evacuation to hospital' && (
          <RadioGroup
            row
            name='evacuationWay'
            value={evacuationWay}
            onChange={handleEvacuationWayChange}>
            <label>
              {t('Evacuation way')}
              <FormControlLabel
                value='Ambulance'
                label={t('Ambulance')}
                control={<Radio color='primary' />}
              />
              <FormControlLabel
                value='Independent'
                label={t('Independent')}
                control={<Radio color='primary' />}
              />
            </label>
          </RadioGroup>
        )}
        {decision === 'Release to home' && (
          <React.Fragment>
            <label>{t('Sick leave')}</label>
            <CustomizedTextField
              name='numberOfDays'
              label={t('Number of days')}
              type='number'
              inputProps={{
                min: '0',
              }}
              inputRef={register}
            />
          </React.Fragment>
        )}
      </Grid>
    </StyledFormGroup>
  );
};

export default RecommendationsOnRelease;
