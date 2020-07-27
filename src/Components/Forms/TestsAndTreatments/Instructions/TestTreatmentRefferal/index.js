import PDF from '../../../../../Assets/Images/pdf.png';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledIconedButton } from '../../Style';
const TestTreatmentReferral = ({ index, item }) => {
  const { t } = useTranslation();
  return (
    <StyledIconedButton name={`Instruction[${index}].test_treatment_referral`}>
      <div>
        <img src={PDF} />
      </div>
      <p>{t('Referral for x-ray')}</p>
    </StyledIconedButton>
  );
};
export default TestTreatmentReferral;
