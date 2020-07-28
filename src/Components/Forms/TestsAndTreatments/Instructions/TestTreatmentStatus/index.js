import StyledSwitch from '../../../../../Assets/Elements/StyledSwitch';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import CustomizedTextField from '../../../../../Assets/Elements/CustomizedTextField';

const TestTreatMentStatus = ({ index, item, requiredErrors }) => {
  const { t } = useTranslation();
  const { control, register, setValue, getValues, watch } = useFormContext();
  const { Instruction } = getValues({ nest: true });

  const handleChange = (event) => {
    requiredErrors[index].test_treatment_status = false;
    setValue(
      `Instruction[${index}].test_treatment_status`,
      event.target.checked,
    );
    return event.target.checked;
  };

  return (
    <>
      <span>
        <b>{t('Status')}</b>
      </span>
      <StyledSwitch
        register={register}
        checked={
          Instruction &&
          Instruction[index] &&
          (Instruction[index].test_treatment_status === true ||
            Instruction[index].test_treatment_status === false)
            ? Instruction[index].test_treatment_status
            : false
        }
        onChange={handleChange}
        name={`Instruction[${index}].test_treatment_status`}
        control={control}
        label_1={'Not done'}
        label_2={'Performed'}
        marginLeft={'70px'}
        marginRight={'70px'}
        width={'200px'}
        margin={'10px 14px'}
        error={requiredErrors[index].test_treatment_status ? true : false}
        helperText={
          requiredErrors[index].test_treatment_status &&
          `${t('Performed')} - ${'Must be selected'} `
        }
      />
    </>
  );
};
export default TestTreatMentStatus;
