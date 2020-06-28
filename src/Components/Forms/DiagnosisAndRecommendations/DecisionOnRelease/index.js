import React from 'react';
import Title from 'Assets/Elements/Title';
import { Divider, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { StyledFormGroup } from 'Assets/Elements/StyledFormGroup';

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
        alignItems='baseline'></Grid>
    </StyledFormGroup>
  );
};

export default RecommendationsOnRelease;
