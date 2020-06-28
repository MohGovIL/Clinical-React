import React from 'react';
import Title from 'Assets/Elements/Title';
import { Divider, Grid, Radio } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';

const RecommendationsOnRelease = () => {
  const { t } = useTranslation();
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
            name='Evacuation to hospital'
            inputRef
          />
          <Radio value='Release to home' name='Release to home' inputRef />
        </label>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        {/* If Evacuation to hospital */}
        <label>
          {t('Evacuation way')}
          <Radio value='Ambulance' name='Ambulance' inputRef />
          <Radio value='Independent' name='Independent' inputRef />
        </label>
        {/* If Release to home */}
        <label>
          {t('Sick leave')}
          <CustomizedTextField
            label={t('Number of days')}
            type='number'
            inputProps={{
              min: '0',
            }}
            inputRef
          />
        </label>
      </Grid>
    </StyledFormGroup>
  );
};

export default RecommendationsOnRelease;
