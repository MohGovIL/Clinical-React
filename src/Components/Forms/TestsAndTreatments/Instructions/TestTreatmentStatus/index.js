/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentRemark - Checkbox knob - holds the status of the advised instruction.
 * @returns UI Field of the main form.
 */

import StyledSwitch from 'Assets/Elements/StyledSwitch';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';

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
    return event.target.checked;
  };

  return !item.locked || permission ? (
    <>
      <span>
        <b>{t('Status')}</b>
      </span>
      <StyledSwitch
        checked={item.test_treatment_status === 'done' ? true : false}
        register={register}
        onChange={handleChange}
        name={`Instruction[${index}].test_treatment_status`}
        control={control}
        label_1={'Yet To be done'}
        label_2={'Performed'}
        marginLeft={'70px'}
        marginRight={'70px'}
        width={'200px'}
        margin={'10px 14px'}
        /*  error={requiredErrors[index].test_treatment_status ? true : false}
        helperText={
          requiredErrors[index].test_treatment_status &&
          `  ${t('Please Select')}  : ${t('Performed')} `
        }*/
      />
    </>
  ) : null;
};
export default TestTreatMentStatus;
