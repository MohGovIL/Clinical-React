import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import ReactDOM from 'react-dom';
import {
  StyledCardContent,
  StyledCardDetails,
  StyledCardName,
  StyledCardRoot,
  StyledConstantHeaders,
  StyledIconedButton,
  StyledInstructions,
  StyledTreatmentInstructionsButton,
  StyledTypographyHour,
  StyledTypographyName,
} from '../Style';
import * as moment from 'moment';
import { Grid } from '@material-ui/core';
import CustomizedTextField from '../../../../Assets/Elements/CustomizedTextField';
import MenuItem from '@material-ui/core/MenuItem';

import { StyledSelectTemplateButton } from '../../../../Assets/Elements/StyledSelectTempleteButton';
import StyledSwitch from '../../../../Assets/Elements/StyledSwitch';
import { useTranslation } from 'react-i18next';
import { FHIR } from '../../../../Utils/Services/FHIR';
import normalizeFhirValueSet from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { connect } from 'react-redux';
import normalizeFhirUser from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import PopUpFormTemplates from '../../../Generic/PopupComponents/PopUpFormTemplates';
import PDF from '../../../../Assets/Images/pdf.png';
import PLUS from '../../../../Assets/Images/plus.png';
let renderCount = 0;

const InstructionsForTreatment = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
  currentUser,
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

  const { register, control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      test_treatment: '',
      test_treatment_type: '',
      test_treatment_referral: '',
      instructions: '',
      details: '',
      test_treatment_remark: '',
      test_treatment_status: true,
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'Instructions',
    },
  );

  const onSubmit = (data) => console.log('data', data);

  renderCount++;
  const addNewInstruction = (evt) => {
    prepend({});
  };
  const [
    collectedTestAndTreatmentsFromFhir,
    setCollectedTestAndTreatmentsFromFhir,
  ] = useState([]);

  const [
    currentTestTreatmentsInstructions,
    setCurrentTestTreatmentsInstructions,
  ] = useState([]);

  useEffect(() => {
    (async () => {
      const testAndTreatmentsValuesetFromFhir = await FHIR(
        'ValueSet',
        'doWork',
        {
          functionName: 'getValueSet',
          functionParams: { id: 'tests_and_treatments' },
        },
      );

      const testAndTreatmentObj = [];

      testAndTreatmentsValuesetFromFhir.data.expansion.contains.map(
        (testAndTreatment) => {
          const normalizedTestAndTreatmentsFromFhirValueSet = normalizeFhirValueSet(
            testAndTreatment,
          );
          testAndTreatmentObj.push({
            title: normalizedTestAndTreatmentsFromFhirValueSet.name,
            code: normalizedTestAndTreatmentsFromFhirValueSet.code,
          });
        },
      );

      setCollectedTestAndTreatmentsFromFhir(testAndTreatmentObj);
    })();
  }, []);
  let user = normalizeFhirUser(currentUser);
  let edit = encounter.status === 'finished' ? false : true; // is this form in edit mode or in view mode
  const [defaultContext, setDefaultContext] = useState('');
  const handlePopUpClose = () => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: false,
      };
    });
  };

  const [popUpProps, setPopUpProps] = React.useState({
    popupOpen: false,
    formID: '',
    encounter,
    formFieldsTitle: '',
    defaultContext,
    setDefaultContext,
    handlePopupClose: handlePopUpClose,
    setTemplatesTextReturned: null,
    name: '',
  });

  const handlePopUpProps = (
    title,
    fields,
    id,
    callBack,
    name,
    defaultContext,
  ) => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: true,
        formFieldsTitle: title,
        formFields: fields,
        formID: id,
        setTemplatesTextReturned: callBack,
        name,
        defaultContext: defaultContext,
      };
    });
  };
  let watchInstructions = [];

  const callBack = (data, name) => {
    setDefaultContext(data);
    setValue(name, data);
  };
  return (
    <>
      <PopUpFormTemplates {...popUpProps} />
      <StyledConstantHeaders>
        {t('Instructions for treatment')}
      </StyledConstantHeaders>
      <StyledTreatmentInstructionsButton onClick={addNewInstruction}>
        <img alt='plus icon' src={PLUS} />
        {t('Instructions for treatment')}
      </StyledTreatmentInstructionsButton>
      <hr />
      <StyledInstructions id='newRefInstructions'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Field Array </h1>
          <p>The following demo allow you to delete, append, prepend items</p>
          <span className='counter'>Render Count: {renderCount}</span>

          {fields.map((item, index) => {
            return (
              <div key={item.id}>
                <React.Fragment>
                  <StyledCardRoot>
                    <StyledCardDetails>
                      <StyledCardContent>
                        <StyledTypographyName component='h5' variant='h5'>
                          {edit ? user.name.toString() : ''}
                        </StyledTypographyName>
                        <StyledTypographyHour
                          variant='subtitle1'
                          color='textSecondary'>
                          {' '}
                          {edit
                            ? moment
                                .utc(encounter.extensionStatusUpdateDate)
                                .format('LT')
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
                                collectedTestAndTreatmentsFromFhir.map(
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
                                        <MenuItem
                                          key={index}
                                          value={value.code}>
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
                          disabled={
                            currentTestTreatmentsInstructionsKey ? false : true
                          }
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
              </div>
            );
          })}

          <section>
            <button
              type='button'
              onClick={() => {
                append({ firstName: 'appendBill', lastName: 'appendLuo' });
              }}>
              append
            </button>
            <button
              type='button'
              onClick={() =>
                prepend({
                  firstName: 'prependFirstName',
                  lastName: 'prependLastName',
                })
              }>
              prepend
            </button>
            <button
              type='button'
              onClick={() =>
                insert(parseInt(2, 10), {
                  firstName: 'insertFirstName',
                  lastName: 'insertLastName',
                })
              }>
              insert at
            </button>

            <button type='button' onClick={() => swap(1, 2)}>
              swap
            </button>

            <button type='button' onClick={() => move(1, 2)}>
              move
            </button>

            <button type='button' onClick={() => remove(1)}>
              remove at
            </button>

            <button
              type='button'
              onClick={() =>
                reset({
                  test: [{ firstName: 'Bill', lastName: 'Luo' }],
                })
              }>
              reset
            </button>
          </section>

          <input type='submit' />
        </form>
      </StyledInstructions>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
    currentUser: state.active.activeUser,
  };
};
export default connect(mapStateToProps, null)(InstructionsForTreatment);
