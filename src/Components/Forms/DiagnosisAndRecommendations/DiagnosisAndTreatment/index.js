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
      <Grid container direction='row'>
        <CustomizedTextField label={t('Findings details')} />
        <StyledButton color='primary' variant='outlined'>
          {t('Select template')}
        </StyledButton>
      </Grid>
      <Grid container direction='row'>
        <CustomizedTextField label={t('Diagnosis details')} />
        <StyledButton color='primary' variant='outlined'>
          {t('Select template')}
        </StyledButton>
      </Grid>
      <Grid container direction='row'>
        <CustomizedTextField label={t('Treatment details')} />
        <StyledButton color='primary' variant='outlined'>
          {t('Select template')}
        </StyledButton>
      </Grid>
    </StyledFormGroup>
  );
};

export default DiagnosisAndTreatment;
