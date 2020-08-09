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
      <Title
        marginTop='47px'
        label='Please Note'
        bold
        fontSize='24px'
        color='#000b40'
      />
      <Title
        marginTop='16px'
        label='Please select whom to transfer the treatment before saving and closing'
        fontSize='16px'
        color='#000b40'
      />
      <RadioGroup
        style={{ marginBottom: '109px' }}
        row
        name='nextStatus'
        value={nextStatus}
        onChange={handleNextStatusChange}>
        {statuses.map((status, statusIndex) => (
          <FormControlLabel
            style={{ marginRight: '0', marginLeft: '0' }}
            key={statusIndex}
            value={status.value}
            label={t(status.label)}
            control={
              <Radio
                style={{ paddingRight: statusIndex === 0 && '0' }}
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
