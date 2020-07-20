import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import { Controller, useFormContext } from 'react-hook-form';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { StyledInsulation, StyledIsUrgent } from './Style';
import { useTranslation } from 'react-i18next';

const UrgentAndInsulation = (requiredUrgent, requiredInsulation) => {
  const { t } = useTranslation();

  const {
    register,
    watch,
  } = useFormContext();

  const watchisInsulationInstruction = watch('isInsulationInstruction');
  const watchisUrgent = watch('isUrgent');

  //May be in future, chang avatar circle to red
  // useEffect(() => {
  //   console.log('is urgent: ' + watchisUrgent);
  // }, [watchisUrgent]);

  return (
    <React.Fragment>
      <StyledIsUrgent>
        <Grid
          container
          direction={'row'}
          justify={'flex-start'}
          alignItems={'center'}>
          <span>
            <b>{t('Is urgent?')} {requiredUrgent || requiredUrgent === true ? ("*") : ''}</b>
          </span>
          {/* Requested service - switch */}
          <StyledSwitch
            name='isUrgent'
            register={register}
            label_1={'No'}
            label_2={'Yes'}
            marginLeft={'40px'}
            marginRight={'40px'}
          />
        </Grid>
      </StyledIsUrgent>
      <StyledInsulation>
        <Grid
          container
          direction={'row'}
          justify={'flex-start'}
          alignItems={'center'}>
          <span>
            <b>{t('Insulation required')}? {requiredInsulation || requiredInsulation === true ? ("*") : ''}</b>
          </span>
          {/* Requested service - switch */}
          <StyledSwitch
            name='isInsulationInstruction'
            register={register}
            label_1={'No'}
            label_2={'Yes'}
            marginLeft={'40px'}
            marginRight={'33px'}
          />
        </Grid>
        {watchisInsulationInstruction && (
          <CustomizedTextField
            inputRef={register}
            name='insulationInstruction'
            width={'70%'}
            label={t('Insulation instruction')}
          />
        )}
      </StyledInsulation>
    </React.Fragment>
  );
};
export default UrgentAndInsulation;
