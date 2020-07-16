import React, { useEffect, useState } from 'react';
import Title from 'Assets/Elements/Title';
import StyledContent from './Style';
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
const Content = ({ statuses }) => {
  const { permission, setValue, register, unregister } = useFormContext();

  useEffect(() => {
    register({ name: 'nextStatus' });
    return () => {
      unregister('nextStatus');
    };
  }, [register, unregister]);

  const { t } = useTranslation();

  const [nextStatus, setNextStatus] = useState('');
  const handleNextStatusChange = (event) => {
    setNextStatus(event.target.value);
    setValue('nextStatus', event.target.value);
  };
  return (
    <StyledContent>
      <Title label='Please Note' bold fontSize='24px' color='#000b40' />
      <Title
        label='Please select whom to transfer the treatment before saving and closing'
        fontSize='16px'
        color='#000b40'
      />
      <RadioGroup
        row
        name='nextStatus'
        value={nextStatus}
        onChange={handleNextStatusChange}>
        {statuses.map((status, statusIndex) => (
          <FormControlLabel
            key={statusIndex}
            value={status.value}
            label={t(status.label)}
            control={
              <Radio
                color='primary'
                disabled={permission === 'view' ? true : false}
              />
            }
          />
        ))}
      </RadioGroup>
    </StyledContent>
  );
};

export default Content;
