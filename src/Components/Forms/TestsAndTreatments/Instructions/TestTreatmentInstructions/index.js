/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentInstructions - A text field to write the instruction
 * @returns UI Field of the main form.
 */

import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import { Controller, useFormContext } from 'react-hook-form';
import React, { useState } from 'react';
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
  const callBack = (data, name) => {
    setValue(name, data);
  };

  return (
    <>
      <Grid item xs={6}>
        <Controller
          name={`Instruction[${index}].instructions`}
          control={control}
          defaultValue={item.instructions}
          as={
            <CustomizedTextField
              InputLabelProps={{
                shrink:
                  Instruction[index] && Instruction[index].instructions
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
          disabled={
            Instruction[index] &&
            Instruction[index].test_treatment &&
            Instruction[index].test_treatment !== ''
              ? false
              : true
          }
          onClick={() =>
            handlePopUpProps(
              t('X-Ray recommendations'),
              `templates_${Instruction[index].test_treatment}`, //to change
              'tests_and_treatments', //to change
              callBack,
              `Instruction[${index}].instructions`,
              Instruction[index] && Instruction[index].instructions,
            )
          }>
          {t('Select template')}
        </StyledSelectTemplateButton>
      </Grid>
    </>
  );
};
export default TestTreatmentInstructions;
