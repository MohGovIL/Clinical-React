import React, { useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid } from '@material-ui/core';
import { StyledRadioGroup, StyledRadio } from './Style';

const RadioGroupChoice = ({gridLabel, firstValue, secondValue, callBackFunction}) => {
  const [checkedValue, setCheckedValue] = useState();

  const handleChangeRadio = (event) => {
    setCheckedValue(event.target.value);
  };

  return (
    <StyledRadioGroup>
      <Grid
        container
        direction={'row'}
        justify={'flex-start'}
        alignItems={'center'}>
        <Grid item xs={2}>
          <Typography variant='h6' component='h6'>
            <b>{gridLabel}:</b>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <FormLabel component='legend'>
            {secondValue}
            <StyledRadio
              disableRipple
              icon={<FiberManualRecordIcon htmlColor={'#dadbda'} />}
              checkedIcon={<FiberManualRecordIcon htmlColor={'#076ce9'} />}
              checked={checkedValue === secondValue}
              onChange={handleChangeRadio}
              color='primary'
              value={secondValue}
              name='pregnancy'
            />
          </FormLabel>
        </Grid>
        <Grid item xs={2}>
          <FormLabel component='legend'>
            {firstValue}
            <StyledRadio
              disableRipple
              icon={<FiberManualRecordIcon htmlColor={'#dadbda'} />}
              checkedIcon={<FiberManualRecordIcon htmlColor={'#076ce9'} />}
              checked={checkedValue === firstValue}
              onChange={handleChangeRadio}
              color='primary'
              value={firstValue}
              name='pregnancy'
            />
          </FormLabel>
        </Grid>
      </Grid>
    </StyledRadioGroup>
  );
};
export default RadioGroupChoice;
