import PDF from '../../../../../Assets/Images/pdf.png';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledIconedButton } from '../../Style';
import { useFormContext } from 'react-hook-form';
const TestTreatmentReferral = ({ index, item }) => {
  const { control, watch, getValues, setValue } = useFormContext();
  const { Instruction } = getValues({ nest: true });
  const { t } = useTranslation();
  const test_treatment =
    Instruction && Instruction[index] && Instruction[index].test_treatment;

  useEffect(() => {}, [test_treatment]);
  return test_treatment === 'x_ray' ? (
    <StyledIconedButton name={`Instruction[${index}].test_treatment_referral`}>
      <div>
        <img src={PDF} />
      </div>
      <p>{t('Referral for x-ray')}</p>
    </StyledIconedButton>
  ) : null;
};
export default TestTreatmentReferral;
