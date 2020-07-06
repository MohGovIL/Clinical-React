import React, { useEffect, useState } from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid } from '@material-ui/core';
import { StyledRadioGroup, StyledRadio } from './Style';

const RadioGroupChoice = ({
  gridLabel,
  listValues,
  defaultValue,
  trueValue,
  radioName,
  callBackFunction,
}) => {
  const [checkedValue, setCheckedValue] = useState(defaultValue);

  const handleChangeRadio = (event) => {
    setCheckedValue(event.target.value);
  };

  useEffect(() => {
    let returnValue = checkedValue === trueValue ? true : false;
    callBackFunction(returnValue);
  }, [checkedValue]);

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
        {listValues &&
          listValues.map((value, indexValue) => {
            return (
              <Grid item xs={2} key={indexValue}>
                <FormLabel component='legend'>
                  {value}
                  <StyledRadio
                    disableRipple
                    icon={<FiberManualRecordIcon htmlColor={'#dadbda'} />}
                    checkedIcon={
                      <FiberManualRecordIcon htmlColor={'#076ce9'} />
                    }
                    checked={checkedValue === value}
                    onChange={handleChangeRadio}
                    color='primary'
                    value={value}
                    name={radioName}
                  />
                </FormLabel>
              </Grid>
            );
          })}
      </Grid>
    </StyledRadioGroup>
  );
};
export default RadioGroupChoice;
