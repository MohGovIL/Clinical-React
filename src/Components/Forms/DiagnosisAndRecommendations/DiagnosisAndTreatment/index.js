import React from 'react';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import { StyledButton } from 'Assets/Elements/StyledButton';
import { useTranslation } from 'react-i18next';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Grid } from '@material-ui/core';
import { StyledDivider } from '../Style';
import { useFormContext } from 'react-hook-form';
const DiagnosisAndTreatment = () => {
  const { t } = useTranslation();
  const { permission } = useFormContext();
  return (
    <StyledFormGroup>
      <Title
        label={t('Diagnosis and treatment')}
        fontSize='22px'
        bold
        color='#000b40'
      />
      <StyledDivider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          label={t('Findings details')}
          width='45%'
          multiline
          disabled={permission === 'view' ? true : false}
        />
        <StyledButton
          width='113px'
          disabled={permission === 'view' ? true : false}
          margin='0 16px'
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
        <CustomizedTextField
          label={t('Diagnosis details')}
          width='45%'
          multiline
          disabled={permission === 'view' ? true : false}
        />
        <StyledButton
          disabled={permission === 'view' ? true : false}
          width='113px'
          margin='0 16px'
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
        <CustomizedTextField
          label={t('Treatment details')}
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

export default DiagnosisAndTreatment;
