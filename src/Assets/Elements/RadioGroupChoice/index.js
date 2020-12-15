import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, FormControlLabel } from '@material-ui/core';
import { StyledRadioGroup, StyledRadio } from './Style';
import { useFormContext, Controller } from 'react-hook-form';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useTranslation } from 'react-i18next';
/**
 * @param {gridLabel} string
 * @param {listValues} string[]
 * @param {radioName} string
 */
const RadioGroupChoice = ({ gridLabel, listValues, radioName }) => {
  const { t } = useTranslation();

  const { control, permission } = useFormContext();

  return (
    <StyledRadioGroup>
      <Controller
        control={control}
        name={radioName}
        defaultValue=''
        as={
          <RadioGroup>
            <Grid
              container
              direction={'row'}
              justify={'flex-start'}
              alignItems={'center'}>
              <Grid item xs={3}>
                <Typography variant='h6' component='h6'>
                  <b>{gridLabel}:</b>
                </Typography>
              </Grid>
              {listValues &&
                listValues.map((value, indexValue) => {
                  return (
                    <Grid item xs={3} key={indexValue}>
                      <FormLabel component='legend'>
                        <FormControlLabel
                          disabled={permission === 'write' ? false : true}
                          label={t(value)}
                          value={value}
                          control={
                            <StyledRadio
                              disableRipple
                              icon={
                                <FiberManualRecordIcon htmlColor={'#dadbda'} />
                              }
                              checkedIcon={
                                <FiberManualRecordIcon htmlColor={'#076ce9'} />
                              }
                              color='primary'
                            />
                          }></FormControlLabel>
                      </FormLabel>
                    </Grid>
                  );
                })}
            </Grid>
          </RadioGroup>
        }
      />
    </StyledRadioGroup>
  );
};
export default RadioGroupChoice;
