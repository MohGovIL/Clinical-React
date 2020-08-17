/**
 * @date - 29/07/2020
 * @author Dror Golan drorgo@matrix.co.il
 * @purpose TestTreatmentRemark - select - holds the test and treatment instruction classifier type.
 * @returns UI Field of the main form.
 */

import { Controller, useFormContext } from 'react-hook-form';
import CustomizedTextField from 'Assets/Elements/CustomizedTextField';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { useTranslation } from 'react-i18next';
import TestTreatmentLockedText from 'Components/Forms/TestsAndTreatments/Helpers/TestTreatmentLockedText';
import { getValueSetFromLists } from 'Utils/Helpers/getValueSetArray';
import { StyledHiddenDiv } from 'Components/Forms/TestsAndTreatments/Style';

/**
 *
 * @param item
 * @param index
 * @param requiredErrors
 * @returns UI Field of the main form.
 */
const TestTreatmentType = ({ item, index, requiredErrors }) => {
  const { watch, control, getValues, setValue } = useFormContext();
  const { t } = useTranslation();

  const { Instruction } = getValues({ nest: true });
  const [
    collectedTestAndTreatmentsTypeFromFhirObject,
    setCollectedTestAndTreatmentsTypeFromFhirObject,
  ] = useState();

  const test_treatment =
    (Instruction && Instruction[index] && Instruction[index].test_treatment) ||
    item.test_treatment;

  const test_treatment_type =
    (Instruction &&
      Instruction[index] &&
      Instruction[index].test_treatment_type) ||
    item.test_treatment_type;

  const [
    currentTestTreatmentsInstructionsDetails,
    setCurrentTestTreatmentsInstructionsDetails,
  ] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');
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

      const test_and_treatments_type_list = await getValueSetFromLists(
        listsDetailsAfterAwait[0],
        true,
      );
      setCollectedTestAndTreatmentsTypeFromFhirObject(
        test_and_treatments_type_list,
      );

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
      setCurrentTitle(listsDetailsAfterAwait[0].data.title);
    })();
  }, [test_treatment]);

  return (
    <>
      <StyledHiddenDiv dontDisplay={item.locked}>
        {test_treatment &&
        test_treatment !== '' &&
        currentTestTreatmentsInstructionsDetails &&
        currentTestTreatmentsInstructionsDetails.length > 0 ? (
          <Controller
            onChange={([event]) => {
              requiredErrors[index].test_treatment_type = false;
              watch(`Instruction`);
              return event.target.value;
            }}
            name={`Instruction[${index}].test_treatment_type`}
            control={control}
            defaultValue={item.test_treatment_type} //needed unless you want a uncontrolled controlled issue on your hands
            error={
              requiredErrors[index] &&
              requiredErrors[index].test_treatment_type &&
              requiredErrors[index].test_treatment_type.length
                ? true
                : false
            }
            helperText={
              requiredErrors[index] && requiredErrors[index].test_treatment_type
                ? requiredErrors[index].test_treatment_type
                : ''
            }
            InputProps={{
              readOnly: item.locked,
            }}
            as={
              <CustomizedTextField
                iconColor='#1976d2'
                width='100%'
                select
                label={t(currentTitle)}>
                {currentTestTreatmentsInstructionsDetails.map(
                  (value, index) => {
                    return (
                      <MenuItem key={index} value={value.code}>
                        {t(value.title)}
                      </MenuItem>
                    );
                  },
                )}
              </CustomizedTextField>
            }
          />
        ) : null}
      </StyledHiddenDiv>
      {item.locked ? (
        <TestTreatmentLockedText
          label={t(currentTitle)}
          name={`Instruction[${index}].test_treatment`}
          value={
            collectedTestAndTreatmentsTypeFromFhirObject &&
            t(
              collectedTestAndTreatmentsTypeFromFhirObject[
                item.test_treatment_type
              ],
            )
          }
        />
      ) : null}
    </>
  );
};
export default TestTreatmentType;
