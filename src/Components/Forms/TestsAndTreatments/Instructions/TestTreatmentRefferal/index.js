/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentReferral - A button ,
 *                                  will create a referral x-ray photography (pdf).
 * @returns UI Field of the main form.
 */
import PDF from 'Assets/Images/pdf.png';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledIconedButton } from 'Components/Forms/TestsAndTreatments/Style';
import { useFormContext } from 'react-hook-form';

/**
 *
 * @param index
 * @returns UI Field of the main form.
 */

const TestTreatmentReferral = ({ index }) => {
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
