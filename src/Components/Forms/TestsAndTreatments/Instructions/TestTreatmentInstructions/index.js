import { Controller, useFormContext } from 'react-hook-form';
import CustomizedTextField from '../../../../../Assets/Elements/CustomizedTextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FHIR } from '../../../../../Utils/Services/FHIR';
import normalizeFhirValueSet from '../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { useTranslation } from 'react-i18next';

const TestTreatmentInstructions = ({ item, index }) => {
  const { watch, control, getValues } = useFormContext();
  const { t } = useTranslation();

  const { Instruction } = getValues({ nest: true });
  /* const InstructionsWatch = watch(`Instruction`);

  let test_treatment_watch = InstructionsWatch[index]
    ? InstructionsWatch[index].test_treatment
    : '';*/

  const test_treatment =
    Instruction && Instruction[index] && Instruction[index].test_treatment;

  const test_treatment_type =
    Instruction && Instruction[index] && Instruction[index].test_treatment_type;

  const [
    currentTestTreatmentsInstructionsDetails,
    setCurrentTestTreatmentsInstructionsDetails,
  ] = useState([]);

  useEffect(() => {
    (async () => {
      if (!test_treatment) return;
      let listsDetails = [];
      listsDetails.push(
        FHIR('ValueSet', 'doWork', {
          functionName: 'getValueSet',
          functionParams: {
            id: `details_${test_treatment}`,
          },
        }),
      );
      const listsDetailsAfterAwait = await Promise.all(listsDetails);
      let detailsObj = [];
      if (
        listsDetailsAfterAwait &&
        listsDetailsAfterAwait[0] &&
        listsDetailsAfterAwait[0].status &&
        listsDetailsAfterAwait[0].status === 200
      )
        listsDetailsAfterAwait[0].data.expansion.contains.map((data) => {
          const dataNormalized = normalizeFhirValueSet(data);
          detailsObj.push({
            title: dataNormalized.name,
            code: dataNormalized.code,
          });
        });

      setCurrentTestTreatmentsInstructionsDetails(detailsObj);
    })();
  }, [test_treatment]);
  console.log(
    `item from testTreatmentInstructions ${index} - ${JSON.stringify(item)}`,
    `currentTestTreatmentsInstructionsDetails :${currentTestTreatmentsInstructionsDetails.length}`,
  );

  console.log(
    `index=${index} , test_treatment = ${test_treatment}  , test_treatment_type = ${test_treatment_type}`,
  );
  return (
    currentTestTreatmentsInstructionsDetails &&
    currentTestTreatmentsInstructionsDetails.length > 0 && (
      <Controller
        onChange={([event]) => {
          watch(`Instruction`);
          return event.target.value;
        }}
        name={`Instruction[${index}].test_treatment_type`}
        control={control}
        defaultValue={item.test_treatment_type || ''}
        as={
          <CustomizedTextField
            //needed unless you want a uncontrolled controlled issue on your hands
            iconColor='#1976d2'
            width='100%'
            select
            label={t('X-Ray Type')}>
            {currentTestTreatmentsInstructionsDetails.map((value, index) => {
              return (
                <MenuItem key={index} value={value.code}>
                  {t(value.title)}
                </MenuItem>
              );
            })}
          </CustomizedTextField>
        }
      />
    )
  );
};
export default TestTreatmentInstructions;
