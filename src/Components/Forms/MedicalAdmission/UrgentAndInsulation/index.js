import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import { Controller, useFormContext } from 'react-hook-form';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { StyledInsulation, StyledIsUrgent } from './Style';
import { useTranslation } from 'react-i18next';

const UrgentAndInsulation = ({ requiredUrgent, requiredInsulation, items, initValueFunction }) => {
  const { t } = useTranslation();

  const { register, watch, setValue, control, permission } = useFormContext();

  const watchisInsulationInstruction = watch('isInsulationInstruction');
  // const watchisUrgent = watch('questionnaireResponseItems');

  //May be in future, chang avatar circle to red
  // useEffect(() => {
  //   console.log('is urgent: ' + watchisUrgent);
  // }, [watchisUrgent]);

  const [insulationInstructionState, setInsulationInstructionState] = useState(
    '',
  );

  useEffect(() => {
    if (!items.length) return;
    const itemsObj = {};
    items.forEach((item) => {
      switch (item.linkId) {
        case '1':
          if (item.answer) {
            itemsObj[item.linkId] =
              item.answer[0].valueBoolean === '1' ? true : false;
          }
          break;
        case '2':
          if (item.answer) {
            itemsObj[item.linkId] = item.answer[0].valueString || '';
          }
          break;
        case '3':
          if (item.answer) {
            itemsObj[item.linkId] = item.answer[0].valueString || '';
          }
          break;
        case '4':
          if (item.answer) {
            itemsObj[item.linkId] =
              item.answer[0].valueBoolean === 'Yes' ? 'Yes' : 'No';
          }
          break;

        default:
          break;
      }
    });
    setInsulationInstructionState(itemsObj[2]);
    initValueFunction([
      {
        isInsulationInstruction: itemsObj[1],
      },
      {
        nursingDetails: itemsObj[3],
      },
      {
        isPregnancy: itemsObj[4],
      },
    ]);
  }, [items, setValue]);

  return (
    <React.Fragment>
      <StyledIsUrgent>
        <Grid
          container
          direction={'row'}
          justify={'flex-start'}
          alignItems={'center'}>
          <span>
            <b>
              {t('Is urgent?')}{' '}
              {requiredUrgent || requiredUrgent === true ? '*' : ''}
            </b>
          </span>
          {/* Requested service - switch */}
          <StyledSwitch
            disabled={permission === 'write' ? false : true}
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
            <b>
              {t('Insulation required')}?{' '}
              {requiredInsulation || requiredInsulation === true ? '*' : ''}
            </b>
          </span>
          {/* Requested service - switch */}
          <StyledSwitch
            disabled={permission === 'write' ? false : true}
            name='isInsulationInstruction'
            register={register}
            label_1={'No'}
            label_2={'Yes'}
            marginLeft={'40px'}
            marginRight={'33px'}
          />
        </Grid>
        {watchisInsulationInstruction && (
          <Controller
            control={control}
            defaultValue={insulationInstructionState}
            name='insulationInstruction'
            as={
              <CustomizedTextField
                disabled={permission === 'write' ? false : true}
                width={'70%'}
                label={t('Insulation instruction')}
              />
            }
          />
        )}
      </StyledInsulation>
    </React.Fragment>
  );
};
export default UrgentAndInsulation;
