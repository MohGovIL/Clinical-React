import React from 'react';
import Title from 'Assets/Elements/Title';
import { Divider, Grid, Radio } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { useFormContext } from 'react-hook-form';

const RecommendationsOnRelease = () => {
  const { t } = useTranslation();
  const { register, watch } = useFormContext();
  const decision = watch('decision');
  return (
    <StyledFormGroup>
      <Title label={t('Decision on release')} fontSize='22px' bold />
      <Divider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <label>
          {t('Decision')}
          <Radio
            value='Evacuation to hospital'
            name='decision'
            inputRef={register}
          />
          <Radio value='Release to home' name='decision' inputRef={register} />
        </label>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        {decision === 'Evacuation to hospital' && (
          <label>
            {t('Evacuation way')}
            <Radio value='Ambulance' name='evacuationWay' inputRef={register} />
            <Radio
              value='Independent'
              name='evacuationWay'
              inputRef={register}
            />
          </label>
        )}
        {decision === 'Release to home' && (
          <label>
            {t('Sick leave')}
            <CustomizedTextField
              name='numberOfDays'
              label={t('Number of days')}
              type='number'
              inputProps={{
                min: '0',
              }}
              inputRef={register}
            />
          </label>
        )}
      </Grid>
    </StyledFormGroup>
  );
};

export default RecommendationsOnRelease;
