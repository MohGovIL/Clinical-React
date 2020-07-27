import { Controller, useFormContext } from 'react-hook-form';
import CustomizedTextField from '../../../../../Assets/Elements/CustomizedTextField';

import React from 'react';
import { useTranslation } from 'react-i18next';

const TestTreatmentRemark = ({ index, item }) => {
  const { t } = useTranslation();
  const { control, watch, getValues, setValue } = useFormContext();
  const { Instruction } = getValues({ nest: true });

  return (
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
      defaultValue={
        Instruction &&
        Instruction[index] &&
        Instruction[index].test_treatment_remark
      }
      as={<CustomizedTextField multiline width={'85%'} label={t('remark')} />}
    />
  );
};
export default TestTreatmentRemark;
