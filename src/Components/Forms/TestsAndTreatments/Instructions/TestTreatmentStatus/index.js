/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentRemark - Checkbox knob - holds the status of the advised instruction.
 * @returns UI Field of the main form.
 */

import StyledSwitch from 'Assets/Elements/StyledSwitch';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import TestTreatmentLockedText from 'Components/Forms/TestsAndTreatments/Helpers/TestTreatmentLockedText';
import { StyledHiddenDiv } from '../../Style';

/**
 *
 * @param index
 * @param requiredErrors
 * @returns UI Field of the main form.
 */
const TestTreatMentStatus = ({ index, requiredErrors, item, permission }) => {
  const { t } = useTranslation();
  const { control, register, setValue, getValues, watch } = useFormContext();

  const handleChange = (event) => {
    //requiredErrors[index].test_treatment_status = false;
    setValue(
      `Instruction[${index}].test_treatment_status`,
      event.target.checked,
    );
    register(`Instruction[${index}].test_treatment_status`);
    setChecked(event.target.checked);
    return event.target.checked;
  };

  const [checked, setChecked] = useState(
    item.test_treatment_status === 'done' ? true : false,
  );
  useEffect(() => {
    console.log(item.test_treatment_status);
  }, [item.test_treatment_status]);
  return (
    <>
      <StyledHiddenDiv dontDisplay={item.locked && permission !== 'write'}>
        <span>
          <b>{t('Status')}</b>
        </span>
        <StyledSwitch
          checked={checked}
          register={register}
          onChange={handleChange}
          name={`Instruction[${index}].test_treatment_status`}
          control={control}
          label_1={'Yet To be done'}
          label_2={'Performed'}
          marginLeft={'70px'}
          marginRight={'70px'}
          width={'300px'}
          margin={'10px 14px'}
        />
      </StyledHiddenDiv>
      {item.locked && permission !== 'write' ? (
        <TestTreatmentLockedText
          label={t('Status')}
          dontBreakRow={true}
          name={`Instruction[${index}].test_treatment`}
          value={
            item.test_treatment_status === 'done'
              ? t('Performed')
              : t('Yet To be done')
          }
        />
      ) : null}
    </>
  );
};
export default TestTreatMentStatus;
