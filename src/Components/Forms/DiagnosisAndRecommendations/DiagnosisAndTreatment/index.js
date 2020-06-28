import React from 'react';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup } from '../Style';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Divider, Grid } from '@material-ui/core';

const DiagnosisAndTreatment = () => {
  const { t } = useTranslation();
  return (
    <StyledFormGroup>
      <Title label={t('Diagnosis and treatment')} fontSize='22px' bold />
      <Divider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField label={t('Findings details')} width='45%' />
        <StyledButton
          font-size='15px'
          width='113px'
          height='32px'
          color='primary'
          variant='outlined'
          size='small'>
          {t('Select template')}
        </StyledButton>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField label={t('Diagnosis details')} width='45%' />
        <StyledButton
          font-size='15px'
          width='113px'
          height='32px'
          color='primary'
          variant='outlined'
          size='small'>
          {t('Select template')}
        </StyledButton>
      </Grid>
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField label={t('Treatment details')} width='45%' />
        <StyledButton
          font-size='15px'
          width='113px'
          height='32px'
          color='primary'
          variant='outlined'
          size='small'>
          {t('Select template')}
        </StyledButton>
      </Grid>
    </StyledFormGroup>
  );
};

export default DiagnosisAndTreatment;
