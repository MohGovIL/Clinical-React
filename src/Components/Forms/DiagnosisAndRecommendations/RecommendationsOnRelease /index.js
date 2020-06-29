import React from 'react';
import Title from 'Assets/Elements/Title';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { StyledDivider } from '../Style';
import { useFormContext } from 'react-hook-form';
const RecommendationsOnRelease = () => {
  const { t } = useTranslation();
  const { permission } = useFormContext();
  return (
    <StyledFormGroup>
      <Title label={t('Recommendations on release')} fontSize='22px' bold />
      <StyledDivider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          label={t('Instructions for further treatment')}
          width='45%'
          multiline
          disabled={permission === 'view' ? true : false}
        />
        <StyledButton
          disabled={permission === 'view' ? true : false}
          width='113px'
          height='32px'
          color='primary'
          margin='0 16px'
          variant='outlined'
          size='small'>
          {t('Select template')}
        </StyledButton>
      </Grid>
    </StyledFormGroup>
  );
};

export default RecommendationsOnRelease;
