import MenuItem from '@material-ui/core/MenuItem';
import CustomizedTextField from '../../../../Assets/Elements/CustomizedTextField';
import {
  StyledCardContent,
  StyledCardDetails,
  StyledCardName,
  StyledCardRoot,
  StyledIconedButton,
  StyledInstructions,
  StyledTypographyHour,
  StyledTypographyName,
} from '../Style';
import React, { useEffect, useState } from 'react';
import * as moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FHIR } from '../../../../Utils/Services/FHIR';
import normalizeFhirValueSet from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';

import { Grid } from '@material-ui/core';
import { StyledSelectTemplateButton } from '../../../../Assets/Elements/StyledSelectTempleteButton';

import PDF from 'Assets/Images/pdf.png';
import StyledSwitch from '../../../../Assets/Elements/StyledSwitch';

import { Controller, FormContext, useFormContext } from 'react-hook-form';

const AddCardInstruction = ({
  user,
  edit,
  encounter,
  collectedTestAndTreatmentsFromFhir,
  index,
  handlePopUpProps,
  callBack,
  control,
  item,
  watch,
  setValue,
  register,
  watchInstructions,
}) => {
  const { t } = useTranslation();

  const [
    currentTestTreatmentsInstructionsKey,
    setCurrentTestTreatmentsInstructionsKey,
  ] = useState('');

  const [instructionFocused, setInstructionFocused] = useState([]);

  const [
    currentTestTreatmentsInstructionsDetails,
    setCurrentTestTreatmentsInstructionsDetails,
  ] = useState([]);

  const [
    currentTestTreatmentsInstructionsLetters,
    setCurrentTestTreatmentsInstructionsLetters,
  ] = useState([]);

  const handleChange = async (value) => {
    const listsDetailsAndLetters = [];
    setCurrentTestTreatmentsInstructionsKey(value);
    listsDetailsAndLetters.push(
      FHIR('ValueSet', 'doWork', {
        functionName: 'getValueSet',
        functionParams: { id: `letter_${value}` },
      }),
    );
    listsDetailsAndLetters.push(
      FHIR('ValueSet', 'doWork', {
        functionName: 'getValueSet',
        functionParams: { id: `details_${value}` },
      }),
    );
    const listsDetailsAndLettersAfterAwait = await Promise.all(
      listsDetailsAndLetters,
    );

    listsDetailsAndLettersAfterAwait['letters'] =
      listsDetailsAndLettersAfterAwait[0];
    delete listsDetailsAndLettersAfterAwait[0];

    listsDetailsAndLettersAfterAwait['details'] =
      listsDetailsAndLettersAfterAwait[1];
    delete listsDetailsAndLettersAfterAwait[1];
    let detailsObj = [];
    let lettersObj = [];

    {
      Object.entries(listsDetailsAndLettersAfterAwait).map((elem, key) => {
        if (elem && elem[1] && elem[1].status && elem[1].status === 200) {
          elem[1].data.expansion.contains.map((data) => {
            switch (elem[0]) {
              case 'letters':
                lettersObj.push({
                  title: dataNormalized.name,
                  code: dataNormalized.code,
                });
                break;
              case 'details':
                const dataNormalized = normalizeFhirValueSet(data);
                detailsObj.push({
                  title: dataNormalized.name,
                  code: dataNormalized.code,
                });
                break;
            }
          });
        }
      });

      setCurrentTestTreatmentsInstructionsLetters(lettersObj);
      setCurrentTestTreatmentsInstructionsDetails(detailsObj);
    }
    return value;
  };
  let count = 0;
  const handleFocusBlur = (name, trueFalse) => {
    const instructionFocusBlurTemp = [...instructionFocused];
    instructionFocusBlurTemp[name] = trueFalse;
    setInstructionFocused(instructionFocusBlurTemp);
  };
  return item ? (
    <React.Fragment>
      <StyledCardRoot>
        <StyledCardDetails>
          <StyledCardContent>
            <StyledTypographyName component='h5' variant='h5'>
              {edit ? user.name.toString() : ''}
            </StyledTypographyName>
            <StyledTypographyHour variant='subtitle1' color='textSecondary'>
              {' '}
              {edit
                ? moment.utc(encounter.extensionStatusUpdateDate).format('LT')
                : ''}{' '}
            </StyledTypographyHour>
          </StyledCardContent>
          <StyledCardName></StyledCardName>
        </StyledCardDetails>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Controller
              name={`Instruction[${index}].test_treatment`}
              control={control}
              defaultValue={item.test_treatment}
              rule={{ required: 'it is required' }}
              onChange={([event]) => {
                handleChange(event.target.value);
                setValue(
                  `Instruction[${index}].test_treatment`,
                  event.target.value,
                );
                return event.target.value;
              }}
              as={
                <CustomizedTextField
                  iconColor='#1976d2'
                  width='100%'
                  select
                  label={t('Test/Treatment')}>
                  {collectedTestAndTreatmentsFromFhir &&
                    collectedTestAndTreatmentsFromFhir.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value.code}>
                          {t(value.title)}
                        </MenuItem>
                      );
                    })}
                </CustomizedTextField>
              }
            />
          </Grid>
          {currentTestTreatmentsInstructionsDetails &&
          currentTestTreatmentsInstructionsDetails.length > 0 ? (
            <Grid item xs={3}>
              <Controller
                defaultValue={item.test_treatment_type}
                name={`Instruction[${index}].test_treatment_type`}
                control={control}
                onChange={([event]) => {
                  setValue(
                    `Instruction[${index}].test_treatment_type`,
                    event.target.value,
                  );
                  return event.target.value;
                }}
                as={
                  <CustomizedTextField
                    iconColor='#1976d2'
                    width='100%'
                    select
                    label={t('X-Ray Type')}>
                    {currentTestTreatmentsInstructionsDetails &&
                      currentTestTreatmentsInstructionsDetails.map(
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
            </Grid>
          ) : (
            <Grid item xs={3}></Grid>
          )}
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <StyledIconedButton
              name={`Instruction[${index}].test_treatment_referral`}>
              <div>
                <img src={PDF} />
              </div>
              <p>{t('Referral for x-ray')}</p>
            </StyledIconedButton>
          </Grid>

          <Grid item xs={6}>
            <Controller
              name={`Instruction[${index}].instructions`}
              control={control}
              defaultValue={item.instructions}
              /* onFocus={(evt) => {
                handleFocusBlur(`Instruction[${index}].instructions`, true);
              }}
              onBlur={(evt) => {
                handleFocusBlur(`Instruction[${index}].instructions`, false);
              }}
              onChange={([event]) => {
                setValue(
                  `Instruction[${index}].instructions`,
                  event.target.value,
                );

                watchInstructions =
                  watch(`Instruction[${index}]`) &&
                  watch(`Instruction[${index}]`).instructions;

                return event.target.value;
              }}*/

              as={
                <CustomizedTextField
                  InputLabelProps={{
                    shrink:
                      watch(`Instruction[${index}]`) &&
                      watch(`Instruction[${index}]`).instructions
                        ? true
                        : false,
                  }}
                  /*  control={control}*/
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
              disabled={currentTestTreatmentsInstructionsKey ? false : true}
              onClick={() =>
                handlePopUpProps(
                  t('X-Ray recommendations'),
                  `templates_${currentTestTreatmentsInstructionsKey}`, //to change
                  'tests_and_treatments', //to change
                  callBack,
                  `Instruction[${index}].instructions`,
                  watch(`Instruction[${index}]`) &&
                    watch(`Instruction[${index}]`).instructions,
                )
              }>
              {t('Select template')}
            </StyledSelectTemplateButton>
          </Grid>

          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'center'}>
            <span>
              <b>{t('Status')}</b>
            </span>

            <StyledSwitch
              register={register}
              defaultChecked={item.test_treatment_status}
              onChange={([event]) => {
                setValue(
                  `Instruction[${index}].test_treatment_status`,
                  event.target.checked,
                );
                return event.target.checked;
              }}
              name={`Instruction[${index}].test_treatment_status`}
              control={control}
              label_1={'Not done'}
              label_2={'Performed'}
              marginLeft={'70px'}
              marginRight={'70px'}
              width={'200px'}
              margin={'10px 14px'}
            />
          </Grid>
          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'center'}>
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
              as={
                <CustomizedTextField
                  multiline
                  width={'85%'}
                  label={t('remark')}
                />
              }
            />
          </Grid>
        </Grid>
      </StyledCardRoot>
    </React.Fragment>
  ) : null;
};

export default AddCardInstruction;
