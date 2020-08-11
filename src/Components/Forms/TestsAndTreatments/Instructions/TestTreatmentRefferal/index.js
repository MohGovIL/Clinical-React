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
import { connect } from 'react-redux';

/**
 *
 * @param index
 * @returns UI Field of the main form.
 */

const TestTreatmentReferral = ({
  index,
  item,
  encounter,
  languageDirection,
}) => {
  const { control, watch, getValues, setValue } = useFormContext();
  const { Instruction } = getValues({ nest: true });
  const { t } = useTranslation();
  const test_treatment =
    Instruction && Instruction[index] && Instruction[index].test_treatment;

  useEffect(() => {}, [test_treatment]);
  return test_treatment === 'x_ray' &&
    !(item.reason_referance_doc_id && encounter.status === 'completed') ? (
    <StyledIconedButton name={`Instruction[${index}].test_treatment_referral`}>
      <div>
        <img src={PDF} />
      </div>
      <p>{t('Referral for x-ray')}</p>
    </StyledIconedButton>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
  };
};
export default connect(mapStateToProps, null)(TestTreatmentReferral);
