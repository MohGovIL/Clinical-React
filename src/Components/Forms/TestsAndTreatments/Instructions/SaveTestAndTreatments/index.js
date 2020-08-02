import React, { useEffect, useState } from 'react';
import { StyledHeader, StyledSubHeader } from '../../Style';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

import { StyledSubmitButton } from '../../../Style';
const SaveTestAndTreatents = ({ permission }) => {
  const { t } = useTranslation();
  const [decision, setDecision] = useState('');
  const [decisionFromFhir, setDecisionFromFhir] = useState('');
  const { register, unregister, setValue } = useFormContext();
  const handleDecisionChange = (event) => {
    setDecision(event.target.value);
    setValue('decision', event.target.value);
  };

  useEffect(() => {
    register({ name: 'decision' });
    register({ name: 'evacuationWay' });
    return () => unregister(['decision', 'evacuationWay']);
  }, [register, unregister]);
  return (
    <>
      <Grid item xs={8}>
        <StyledHeader>{t('Please Note')}</StyledHeader>
        <StyledSubHeader>
          {t(
            'Please select whom to transfer the treatment before saving and closing',
          )}
        </StyledSubHeader>
      </Grid>
      <Grid item xs={8}>
        {/*   <label style={{ width: '66px' }}>
          {t('Selection of factor / stage for transfer')}
        </label>*/}
        <RadioGroup
          row
          name='decision'
          value={decision}
          onChange={handleDecisionChange}>
          <FormControlLabel
            value='transfer_to_a_nurse'
            label={t('Transfer to a nurse')}
            control={
              <Radio
                color='primary'
                disabled={permission === 'view' ? true : false}
              />
            }
          />
          <FormControlLabel
            value='transfer_to_a_doctor'
            label={t('Transfer to a doctor')}
            control={
              <Radio
                color='primary'
                disabled={permission === 'view' ? true : false}
              />
            }
          />
          <FormControlLabel
            value='transfer_to_photography'
            label={t('Transfer to photography')}
            control={
              <Radio
                color='primary'
                disabled={permission === 'view' ? true : false}
              />
            }
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={4}>
        <StyledSubmitButton
          opacity={
            permission !== 'view' && decisionFromFhir === '' ? '1' : '0.4'
          }
          type='submit'
          disabled={
            permission === 'view' && decisionFromFhir === '' ? true : false
          }>
          {t('Save and close')}
        </StyledSubmitButton>
      </Grid>
    </>
  );
};

export default SaveTestAndTreatents;
