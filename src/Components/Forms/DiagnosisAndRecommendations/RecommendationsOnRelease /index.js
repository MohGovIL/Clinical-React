import React from 'react';
import Title from 'Assets/Elements/Title';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Divider, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';
import { StyledButton } from 'Assets/Elements/StyledButton';

const RecommendationsOnRelease = () => {
  const { t } = useTranslation();
  return (
    <StyledFormGroup>
      <Title label={t('Recommendations on release')} fontSize='22px' bold />
      <Divider />
      <Grid
        container
        direction='row'
        justify='flex-start'
        alignItems='baseline'>
        <CustomizedTextField
          label={t('Instructions for further treatment')}
          width='45%'
          multiline
        />
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

export default RecommendationsOnRelease;
