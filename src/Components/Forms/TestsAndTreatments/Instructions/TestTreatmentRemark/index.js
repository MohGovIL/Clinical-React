/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentRemark - TextField - holds additional comments on the test treatment instruction to be made.
 * @returns UI Field of the main form.
 */

import { Controller, useFormContext } from 'react-hook-form';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TestTreatmentLockedText from 'Components/Forms/TestsAndTreatments/Helpers/TestTreatmentLockedText';
import { StyledHiddenDiv } from 'Components/Forms/TestsAndTreatments/Style';

/**
 *
 * @param index
 * @returns UI Field of the main form.
 */
const TestTreatmentRemark = ({ index, item, permission}) => {
  const { t } = useTranslation();
  const { control, watch, getValues, setValue } = useFormContext();
  const { Instruction } = getValues({ nest: true });
  const lock = item.locked &&
    (permission !== 'write' ||
      item.test_treatment_status === 'done' ||
      item.test_treatment_status === 'true');
  return (
    <>
      {!(
        lock
      ) ? (
        <Controller
          onChange={([event]) => {
            setValue(
              `Instruction[${index}].test_treatment_remark`,
              event.target.checked,
            );
            return event.target.value;
          }}
          name={`Instruction[${index}].test_treatment_remark`}
          control={control}
          defaultValue={item.test_treatment_remark}
          InputProps={{
            readOnly: lock,
          }}
          as={
            <CustomizedTextField multiline width={'85%'} label={t('remark')} />
          }
        />
      ) : (
        <>
        <Controller
          hidden
          name={`Instruction[${index}].test_treatment_remark`}
          defaultValue={item.test_treatment_remark}
          as={<input />}
        />
        <TestTreatmentLockedText
          label={t('remark')}
          value={item.test_treatment_remark}
          name={`Instruction[${index}].test_treatment`}
        />
        </>
      )}
    </>
  );
};
export default TestTreatmentRemark;
