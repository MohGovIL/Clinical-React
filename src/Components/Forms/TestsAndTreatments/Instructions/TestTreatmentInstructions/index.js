/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentInstructions - A text field to write the instruction
 * @returns UI Field of the main form.
 */

import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Controller, useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSelectTemplateButton } from 'Assets/Elements/StyledSelectTempleteButton';
import Grid from '@material-ui/core/Grid';

/**
 *
 * @param index
 * @param item
 * @param handlePopUpProps
 * @returns UI Field of the main form.
 */

const TestTreatmentInstructions = ({ index, item, handlePopUpProps }) => {
  const { t } = useTranslation();

  const { control, watch, getValues, setValue } = useFormContext();
  const { Instruction } = getValues({ nest: true });
  const test_treatment =
    (Instruction && Instruction[index] && Instruction[index].test_treatment) ||
    item.test_treatment;
  const instructions =
    (Instruction && Instruction[index] && Instruction[index].instructions) ||
    item.instructions;
  const callBack = (data, name) => {
    setValue(name, data);
  };
  /*  useEffect(() => {
    try {
      const { Instruction } = getValues({ nest: true });
      console.log(Instruction.test_treatment);
    } catch (e) {}
  }, [Instruction && Instruction.test_treatment]);*/
  return (
    <>
      <Grid item xs={6}>
        <Controller
          name={`Instruction[${index}].instructions`}
          control={control}
          defaultValue={item.instructions}
          InputProps={{
            readOnly: item.locked,
          }}
          as={
            <CustomizedTextField
              InputLabelProps={{
                shrink:
                  Instruction &&
                  Instruction[index] &&
                  Instruction[index].instructions
                    ? true
                    : item.instructions
                    ? true
                    : false,
              }}
              label={t('Instructions')}
              width='100%'
              multiline
            />
          }
        />
      </Grid>
      <Grid item xs={2}>
        <StyledSelectTemplateButton
          margin={'30px 30px'}
          disabled={test_treatment && !item.locked ? false : true}
          onClick={() => {
            console.log(test_treatment);
            handlePopUpProps(
              t('X-Ray recommendations'),
              `templates_${test_treatment}`, //to change
              'tests_and_treatments', //to change
              callBack,
              `Instruction[${index}].instructions`,
              instructions,
            );
          }}>
          {t('Select template')}
        </StyledSelectTemplateButton>
      </Grid>
    </>
  );
};
export default TestTreatmentInstructions;
