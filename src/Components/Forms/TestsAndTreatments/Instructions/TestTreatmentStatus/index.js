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
import { StyledHiddenDiv } from 'Components/Forms/TestsAndTreatments/Style';
import { connect } from 'react-redux';

/**
 *
 * @param index
 * @param requiredErrors
 * @returns UI Field of the main form.
 */
const TestTreatMentStatus = ({
  language_direction,
  index,
  requiredErrors,
  item,
  permission,
}) => {
  const { t } = useTranslation();
  const { control, register, setValue, getValues, watch } = useFormContext();

  const handleChange = (event) => {
    //requiredErrors[index].test_treatment_status = false;
    setValue(
      `Instruction[${index}].test_treatment_status`,
      event[0].target.checked,
    );
    register(`Instruction[${index}].test_treatment_status`);
    setChecked(event[0].target.checked);
    let { Instruction } = getValues({ nest: true });
    console.log(Instruction);
    watch();
    return event[0].target.checked;
  };

  const [checked, setChecked] = useState(
    item.test_treatment_status === 'done' ||
      item.test_treatment_status === 'true'
      ? true
      : false,
  );
  useEffect(() => {
    /* console.log(item.test_treatment_status);*/
  }, [item.test_treatment_status]);
  return (
    <>
      {!(
        item.locked &&
        (permission !== 'write' ||
          item.test_treatment_status === 'done' ||
          item.test_treatment_status === 'true')
      ) ? (
        <>
          <span>
            <b>{t('Status')}</b>
          </span>
          <Controller
            name={`Instruction[${index}].test_treatment_status`}
            defaultChecked={item.test_treatment_status}
            onChange={handleChange}
            as={
              <StyledSwitch
                disabled={false}
                checked={
                  checked ||
                  item.test_treatment_status === 'done' ||
                  item.test_treatment_status === 'true'
                    ? true
                    : false
                }
                control={control}
                label_1={'Yet To be done'}
                label_2={'Performed'}
                marginLeft={'70px'}
                marginRight={'70px'}
                width={language_direction == 'rtl' ? '200px' : '300px'}
                margin={'10px 14px'}
              />
            }
          />
        </>
      ) : (
        <>
          <StyledHiddenDiv dontDisplay={true}>
            <Controller
              name={`Instruction[${index}].test_treatment_status`}
              defaultValue={item.test_treatment_status}
              as={<input />}
            />
          </StyledHiddenDiv>
          <TestTreatmentLockedText
            label={t('Status')}
            dontBreakRow={true}
            name={`Instruction[${index}].test_treatment`}
            value={
              item.test_treatment_status === 'done' ||
              item.test_treatment_status === 'true'
                ? t('Performed')
                : t('Yet To be done')
            }
          />
        </>
      )}
      {/* {item.locked &&
      (permission !== 'write' ||
        item.test_treatment_status === 'done' ||
        item.test_treatment_status === 'true') ? (

      ) : null}*/}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language_direction: state.settings.lang_dir,
  };
};
export default connect(mapStateToProps, null)(TestTreatMentStatus);
