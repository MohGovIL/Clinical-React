import React, { useState, useEffect } from 'react';
import * as Moment from 'moment';
import CustomizedPopup from 'Assets/Elements/CustomizedPopup';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { InputAdornment, MenuItem, TextField } from '@material-ui/core';
import {
  StyledColumnFirst,
  StyledColumnSecond,
  StyledForm,
  StyledRowEmail,
  StyledBox,
} from './Style';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { connect } from 'react-redux';
import CustomizedDatePicker from 'Assets/Elements/CustomizedDatePicker';
import {
  getCellPhoneRegexPattern,
  getEmailRegexPattern,
} from 'Utils/Helpers/validation/patterns';
import { normalizeValueData } from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData';
import { emptyArrayAll } from 'Utils/Helpers/emptyArray';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { FHIR } from 'Utils/Services/FHIR';
import moment from 'moment';
import { store } from '../../../../index';
import { setEncounterAndPatient } from 'Store/Actions/ActiveActions';
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter';
import normalizeFhirAppointment from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import { useHistory } from 'react-router-dom';
import { validateLuhnAlgorithm } from 'Utils/Helpers/validation/validateLuhnAlgorithm';
import { getOnlyNumbersRegexPattern } from 'Utils/Helpers/validation/patterns';

const PopupCreateNewPatient = ({
  popupOpen,
  handlePopupClose,
  languageDirection,
  formatDate,
  facility,
}) => {
  const { t } = useTranslation();

  const [idTypesList, setIdTypesList] = useState([]);
  const [genderList, setGenderList] = useState([]);
  const [kupatHolimList, setKupatHolimList] = useState([]);

  const [patientData, setPatientData] = useState([]);
  const [patientIdentifier, setPatientIdentifier] = useState(0);
  const [patientIdNumber, setPatientIdNumber] = useState('');
  const [patientGender, setPatientGender] = useState(0);
  const [patientIdType, setPatientIdType] = useState(0);
  const [patientBirthDate, setPatientBirthDate] = useState(null);
  const [patientManagingOrganizationValue, setPatientKupatHolim] = useState(0);

  const patientIdTypeMain = 'teudat_zehut';
  const [formButtonSave, setFormButtonSave] = useState('write');
  const [formButtonCreatApp, setFormButtonCreatApp] = useState('view');
  const [formButtonPatientAdm, setFormButtonPatientAdm] = useState('view');

  const [isFound, setIsFound] = useState(false);

  const [errorRequired, setErrorRequired] = useState({
    identifier: false,
    firstName: false,
    lastName: false,
    mobileCellPhone: false,
    email: false,
  });

  const [errorIdNumber, setErrorIdNumber] = useState(false);
  const [errorIdNumberText, setErrorIdNumberText] = useState('');
  const [alertDuringSave, setAlertDuringSave] = useState({
    severity: '',
    message: '',
    show: false,
  });

  const textFieldSelectNotEmptyRule = {
    validate: {
      value: (value) => (value !== undefined && value !== 0) || 'error',
    },
  };
  const managingOrganizationSelectNotEmptyRule = {
    validate: {
      value: (value) => {
        return patientIdType !== patientIdTypeMain
          ? true
          : value !== undefined && value !== 0
          ? true
          : 'error';
      },
    },
  };

  const history = useHistory();

  let patientInitialValues = {
    identifier: '',
    firstName: '',
    lastName: '',
    mobileCellPhone: '',
    email: '',
    birthDate: null,
  };

  const {
    register,
    control,
    errors,
    reset,
    setError,
    clearError,
    handleSubmit,
    triggerValidation,
    setValue,
    getValues,
    formState,
  } = useForm({
    mode: 'onChange',
    validateCriteriaMode: 'all',
  });

  const onSubmit = (patient, e) => {
    if (errors && errors.length !== undefined) {
      setFormButtonSave('view');
    } else {
      if (
        !validateLuhnAlgorithm(patient.identifier) &&
        patient.identifierType === patientIdTypeMain
      ) {
        setError('identifier', 'notValid', 'The number entered is incorrect');
        setErrorIdNumber(true);
        setErrorIdNumberText(t(errors?.identifier?.message));
        setFormButtonSave('write');
      } else {
        (() => {
          try {
            patient.birthDate = Moment(patient.birthDate, formatDate).format(
              'YYYY-MM-DD',
            );
            FHIR('Patient', 'doWork', {
              functionName: 'createPatient',
              functionParams: {
                patient,
              },
            })
              .then((saved_patient) => {
                setFormButtonSave('view');
                setAlertDuringSave({
                  ...alertDuringSave,
                  message: t('Saved successfully'),
                  severity: 'success',
                  show: true,
                });
                setTimeout(handlePopupCloseAndClear, 750);
              })
              .catch((error) => {
                setAlertDuringSave({
                  ...alertDuringSave,
                  message: t('Error during create a new patient!'),
                  severity: 'error',
                  show: true,
                });
              });
          } catch (e) {}
        })();
      }
    }
  };

  //Register TextField components in react-hook-forms
  useEffect(() => {
    register({ name: 'identifierType' }, textFieldSelectNotEmptyRule);
    register({ name: 'gender' }, textFieldSelectNotEmptyRule);
    register(
      { name: 'managingOrganization' },
      managingOrganizationSelectNotEmptyRule,
    );
  }, []);

  //useEffect block
  useEffect(() => {
    //Load id types list
    (() => {
      try {
        FHIR('ValueSet', 'doWork', {
          functionName: 'getValueSet',
          functionParams: { id: 'identifier_type_list' },
        }).then((type_list) => {
          const {
            data: {
              expansion: { contains },
            },
          } = type_list;
          let options = emptyArrayAll(t('Choose'));
          for (let status of contains) {
            options.push(normalizeFhirValueSet(status));
          }
          setIdTypesList(options);
        });
      } catch (e) {
        console.log(e);
      }
    })();

    //Load KupatHolim list
    (() => {
      try {
        FHIR('Organization', 'doWork', {
          functionName: 'getOrganizationTypeKupatHolim',
          //'functionParams': {id: 'gender'}
        }).then((kupatHolim_list) => {
          const {
            data: { entry },
          } = kupatHolim_list;
          let array = emptyArrayAll(t('Choose'));
          for (let row of entry) {
            if (row.resource !== undefined) {
              row.resource.name = t(row.resource.name);
              let setLabelKupatHolim = normalizeValueData(row.resource);
              array.push(setLabelKupatHolim);
            }
          }
          setKupatHolimList(array);
        });
      } catch (e) {
        console.log(e);
      }
    })();

    //Load gender list
    (() => {
      try {
        FHIR('ValueSet', 'doWork', {
          functionName: 'getValueSet',
          functionParams: { id: 'gender' },
        }).then((gender_list) => {
          const {
            data: {
              expansion: { contains },
            },
          } = gender_list;
          let options = emptyArrayAll(t('Choose'));
          for (let status of contains) {
            options.push(normalizeFhirValueSet(status));
          }
          setGenderList(options);
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  //end of useEffect block

  //Block of handle's function
  const handleChangeBirthDate = (date) => {
    try {
      let newBirthDate = date.format(formatDate).toString();
      setValue('birthDate', newBirthDate, true);
      setPatientBirthDate(date);
      setErrorRequired({
        ...errorRequired,
        birthDate: false,
      });
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  //Searching patient by id,checking id number for correct value
  useEffect(() => {
    (async () => {
      if (
        /*patientIdType !== 0 &&*/ patientIdNumber &&
        patientIdNumber.length > 0
      ) {
        setIsFound(true);
        const result = await triggerValidation('identifier');
        setFormButtonCreatApp('view');
        setFormButtonPatientAdm('view');
        try {
          FHIR('Patient', 'doWork', {
            functionName: 'searchPatientById',
            functionParams: { identifierValue: patientIdNumber },
          }).then((patients) => {
            if (patients && result && patients.id > 0) {
              patients.birthDate = Moment(patients.birthDate, 'YYYY-MM-DD');
              setValue('firstName', patients.firstName);
              setValue('lastName', patients.lastName);
              setValue(
                'birthDate',
                Moment(patients.birthDate).format(formatDate),
              );
              setValue('mobileCellPhone', patients.mobileCellPhone);
              setValue('email', patients.email);
              setValue('identifierType', patients.identifierType);
              setValue('gender', patients.gender);
              setValue('managingOrganization', patients.managingOrganization);

              setPatientIdentifier(patients.id);
              setPatientBirthDate(patients.birthDate);
              setPatientData(patients);
              setPatientIdType(patients.identifierType);
              setPatientGender(patients.gender);
              setPatientKupatHolim(patients.managingOrganization);

              setError(
                'identifier',
                'patientExist',
                'The patient exists in the system',
              );
              setErrorIdNumber(true);
              setErrorIdNumberText(t(errors?.identifier?.message));

              //clear required error
              setErrorRequired({
                ...errorRequired,
                birthDate: false,
                identifier: false,
                firstName: false,
                lastName: false,
                mobileCellPhone: false,
              });
              setFormButtonSave('view');
              setFormButtonCreatApp('write');
              setFormButtonPatientAdm('write');
            } else {
              if (
                (!validateLuhnAlgorithm(patientIdNumber) &&
                  patientIdType === patientIdTypeMain) ||
                !getOnlyNumbersRegexPattern().test(patientIdNumber)
              ) {
                setError(
                  'identifier',
                  'notValid',
                  'The number entered is incorrect',
                );
                setErrorIdNumber(true);
                setErrorIdNumberText(t(errors?.identifier?.message));
                setFormButtonSave('write');
              } else {
                clearIdNumberError();
                setFormButtonSave('write');
              }
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [patientIdNumber, patientIdType]);

  const handleIdTypeChange = (event) => {
    try {
      setValue('identifierType', event.target.value, true);
      setPatientIdType(event.target.value);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const handleGenderChange = (event) => {
    try {
      setValue('gender', event.target.value, true);
      setPatientGender(event.target.value);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const handleChangeHealthManageOrg = (event) => {
    try {
      setValue('managingOrganization', event.target.value, true);
      setPatientKupatHolim(event.target.value);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };

  const getIsFound = () => {
    return isFound;
  };

  const clearIdNumberError = () => {
    clearError('identifier');
    setErrorIdNumber(false);
    setErrorIdNumberText('');
  };

  const patientAdmissionAction = () => {
    let currentDate = moment().format('YYYY-MM-DD');
    (async () => {
      try {
        FHIR('Appointment', 'doWork', {
          functionName: 'getAppointmentPerPatient',
          functionParams: {
            dayPosition: 'current',
            date: currentDate,
            patient: patientIdentifier,
          },
        }).then((appointments) => {
          //If appointment exists, will check for encounter
          if (
            appointments &&
            appointments.data &&
            appointments.data.total === 1
          ) {
            let appointment = normalizeFhirAppointment(
              appointments.data.entry[1].resource,
            );
            //set data to reducers appointment and change route tp patientAdmission
            let encounterData = FHIR('Encounter', 'doWork', {
              functionName: 'createNewEncounter',
              functionParams: {
                facility: facility,
                appointment: appointment,
              },
            });
            store.dispatch(
              setEncounterAndPatient(
                normalizeFhirEncounter(encounterData),
                patientData,
              ),
            );
            history.push({
              pathname: `${baseRoutePath()}/imaging/patientAdmission`,
            });
          } else {
            if (patientData !== null) {
              let encounterData = FHIR('Encounter', 'doWork', {
                functionName: 'createNewEncounter',
                functionParams: {
                  facility: facility,
                  practitioner: 'practitioner',
                  patient: patientData,
                  status: 'planned',
                },
              });
              store.dispatch(
                setEncounterAndPatient(
                  normalizeFhirEncounter(encounterData),
                  patientData,
                ),
              );
              history.push({
                pathname: `${baseRoutePath()}/imaging/patientAdmission`,
              });
            }
          }
        });
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();
  };

  const handlePopupCloseAndClear = () => {
    reset(patientInitialValues);
    setPatientIdNumber('');
    setValue('identifier', '');

    clearIdNumberError();
    setFormButtonSave('write');
    setPatientIdType(0);
    setPatientGender(0);
    setPatientKupatHolim(0);
    setPatientBirthDate(null);

    register({ name: 'identifierType' }, textFieldSelectNotEmptyRule);
    register({ name: 'gender' }, textFieldSelectNotEmptyRule);
    register({ name: 'managingOrganization' }, textFieldSelectNotEmptyRule);

    setAlertDuringSave({
      ...alertDuringSave,
      message: '',
      severity: '',
      show: false,
    });
    handlePopupClose();
  };
  //End block of handle's function

  const bottomButtonsData = [
    {
      label: t('Save patient'),
      variant: 'text',
      color: 'primary',
      mode: formButtonSave,
      other: { type: 'submit', form: 'createNewPatient' },
    },
    {
      label: t('Patient Admission'),
      variant: 'contained',
      color: 'primary',
      mode: formButtonPatientAdm,
      onClickHandler: patientAdmissionAction, //user function
    },
    {
      label: t('Create appointment'),
      variant: 'contained',
      color: 'primary',
      mode: formButtonCreatApp,
      onClickHandler: handlePopupClose, //user function
    },
  ];

  const PopupTextFieldOpts = {
    color: 'primary',
    variant: 'filled',
    disabled: formButtonSave === 'view',
    autoComplete: 'off',
  };

  const handlerOnInvalidField = (event) => {
    event.preventDefault();
    event.target.setCustomValidity('');
    let field = event.target.name;

    if (field == 'identifier') {
      setErrorIdNumberText(t('Value is required'));
    }
    setErrorRequired({
      ...errorRequired,
      [field]: !event.target.validity.valid ? t('Value is required') : false,
    });
  };

  return (
    <CustomizedPopup
      isOpen={popupOpen}
      onClose={handlePopupCloseAndClear}
      title={t('Add New Patient')}
      content_dividers={false}
      bottomButtons={bottomButtonsData}
      dialogMaxWidth={'md'}
      AlertMessage={alertDuringSave}>
      <form onSubmit={handleSubmit(onSubmit)} id={'createNewPatient'}>
        <StyledForm languageDirection={languageDirection}>
          <StyledBox>
            <StyledColumnFirst>
              <Controller
                as={TextField}
                control={control}
                id='standard-identifier'
                name='identifier'
                defaultValue={patientIdNumber}
                label={t('id number')}
                required
                onInvalid={handlerOnInvalidField}
                onInput={handlerOnInvalidField}
                rules={{
                  validate: (value) => {
                    const formValues = getValues('identifierType');
                    if (formValues && formValues.identifier !== undefined) {
                      setPatientIdNumber(formValues.identifier.trim());
                    }
                    return getIsFound() === true;
                  },
                }}
                color={'primary'}
                variant={'filled'}
                error={
                  errorIdNumber || (!errorRequired.identifier ? false : true)
                }
                helperText={errorIdNumberText || errorRequired.identifier}
                InputProps={{
                  autoComplete: 'off',
                  endAdornment: (!errorRequired.identifier ? false : true) && (
                    <InputAdornment position='end'>
                      <ErrorOutlineIcon htmlColor={'#ff0000'} />
                    </InputAdornment>
                  ),
                }}
              />
              <Controller
                as={TextField}
                control={control}
                id='standard-firstName'
                name='firstName'
                defaultValue={patientInitialValues.firstName}
                label={t('First Name')}
                required
                onInvalid={handlerOnInvalidField}
                onInput={handlerOnInvalidField}
                error={!errorRequired.firstName ? false : true}
                helperText={errorRequired.firstName}
                InputProps={{
                  autoComplete: 'off',
                  endAdornment: (!errorRequired.firstName ? false : true) && (
                    <InputAdornment position='end'>
                      <ErrorOutlineIcon htmlColor={'#ff0000'} />
                    </InputAdornment>
                  ),
                }}
                {...PopupTextFieldOpts}
              />
              <TextField
                id='standard-gender'
                name='gender'
                value={patientGender}
                label={t('Sex')}
                required
                select
                onChange={handleGenderChange}
                defaultValue={{}}
                SelectProps={{
                  MenuProps: {
                    elevation: 0,
                    keepMounted: true,
                    getContentAnchorEl: null,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'center',
                    },
                  },
                }}
                error={errors.gender ? true : false}
                helperText={errors.gender ? t('is a required field.') : null}
                InputProps={{
                  endAdornment: errors.gender && (
                    <InputAdornment position='end'>
                      <ErrorOutlineIcon htmlColor={'#ff0000'} />
                    </InputAdornment>
                  ),
                }}
                {...PopupTextFieldOpts}>
                {genderList.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option.code}>
                    {t(option.name)}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id='standard-managingOrganization'
                name='managingOrganization'
                value={patientManagingOrganizationValue}
                label={t('Kupat Cholim')}
                required={patientIdType === patientIdTypeMain ? true : false}
                select
                onChange={handleChangeHealthManageOrg}
                SelectProps={{
                  MenuProps: {
                    elevation: 0,
                    keepMounted: true,
                    getContentAnchorEl: null,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'center',
                    },
                  },
                }}
                error={errors.managingOrganization ? true : false}
                helperText={
                  errors.managingOrganization ? t('is a required field.') : null
                }
                InputProps={{
                  endAdornment: errors.managingOrganization && (
                    <InputAdornment position='end'>
                      <ErrorOutlineIcon htmlColor={'#ff0000'} />
                    </InputAdornment>
                  ),
                }}
                {...PopupTextFieldOpts}>
                {kupatHolimList.map((option, optionIndex) => (
                  <MenuItem key={optionIndex} value={option.code}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </StyledColumnFirst>
            <StyledColumnSecond>
              <TextField
                id='standard-identifierType'
                name='identifierType'
                value={patientIdType}
                label={t('ID type')}
                required
                select
                onChange={handleIdTypeChange}
                SelectProps={{
                  MenuProps: {
                    elevation: 0,
                    keepMounted: true,
                    getContentAnchorEl: null,
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'center',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'center',
                    },
                  },
                }}
                error={errors.identifierType ? true : false}
                helperText={
                  errors.identifierType ? t('is a required field.') : null
                }
                InputProps={{
                  endAdornment: errors.identifierType && (
                    <InputAdornment position='end'>
                      <ErrorOutlineIcon htmlColor={'#ff0000'} />
                    </InputAdornment>
                  ),
                }}
                {...PopupTextFieldOpts}>
                {idTypesList.map((option, optionIndex) => (
                  <MenuItem
                    key={optionIndex}
                    value={option.code}
                    name={option.code}>
                    {t(option.name)}
                  </MenuItem>
                ))}
              </TextField>
              <Controller
                as={TextField}
                control={control}
                id='standard-lastName'
                name='lastName'
                defaultValue={patientInitialValues.lastName}
                label={t('Last Name')}
                required
                onInvalid={handlerOnInvalidField}
                onInput={handlerOnInvalidField}
                error={!errorRequired.lastName ? false : true}
                helperText={errorRequired.lastName}
                InputProps={{
                  autoComplete: 'off',
                  endAdornment: (!errorRequired.lastName ? false : true) && (
                    <InputAdornment position='end'>
                      <ErrorOutlineIcon htmlColor={'#ff0000'} />
                    </InputAdornment>
                  ),
                }}
                {...PopupTextFieldOpts}
              />
              <Controller
                name='birthDate'
                control={control}
                rules={{
                  validate: {
                    value: (value) => {
                      if (Moment(value, formatDate, true).isValid() === true) {
                        if (
                          Moment(value, formatDate, true).isAfter() !== false
                        ) {
                          return 'Should be entered date less than today';
                        }
                      } else {
                        return 'Date is not in range';
                      }
                      return null;
                    },
                  },
                }}
                as={
                  <CustomizedDatePicker
                    PickerProps={{
                      id: 'standard-birthDate',
                      format: 'DD/MM/YYYY',
                      name: 'birthDate',
                      required: true,
                      onInvalid: handlerOnInvalidField,
                      onInput: handlerOnInvalidField,
                      disableToolbar: false,
                      label: t('birth day'),
                      value: patientBirthDate,
                      //mask: { formatDate },
                      InputProps: {
                        autoComplete: 'off',
                      },
                      disableFuture: true,
                      color: 'primary',
                      variant: 'inline',
                      inputVariant: 'filled',
                      onChange: handleChangeBirthDate,
                      autoOk: true,
                      disabled: formButtonSave === 'view',
                      error: errors.birthDate
                        ? true
                        : !errorRequired.birthDate
                        ? false
                        : true,
                      //|| (!errorRequired.birthDate ? false : true)
                      helperText: errors.birthDate
                        ? t(errors.birthDate.message)
                        : errorRequired.birthDate
                        ? errorRequired.birthDate
                        : null,
                    }}
                    CustomizedProps={{
                      keyBoardInput: true,
                      showNextArrow: false,
                      showPrevArrow: false,
                    }}
                  />
                }
              />
              <Controller
                as={TextField}
                control={control}
                id='standard-mobileCellPhone'
                name='mobileCellPhone'
                defaultValue={patientInitialValues.mobileCellPhone}
                label={t('Cell phone')}
                rules={{
                  pattern: getCellPhoneRegexPattern(),
                }}
                error={
                  errors.mobileCellPhone ||
                  (!errorRequired.mobileCellPhone ? false : true)
                    ? true
                    : false
                }
                helperText={
                  errors.mobileCellPhone
                    ? t('The number entered is incorrect')
                    : errorRequired.mobileCellPhone
                    ? errorRequired.mobileCellPhone
                    : null
                }
                InputProps={{
                  endAdornment: (errors.mobileCellPhone ||
                  !errorRequired.mobileCellPhone
                    ? false
                    : true) && (
                    <InputAdornment position='end'>
                      <ErrorOutlineIcon htmlColor={'#ff0000'} />
                    </InputAdornment>
                  ),
                }}
                required
                onInvalid={handlerOnInvalidField}
                onInput={handlerOnInvalidField}
                {...PopupTextFieldOpts}
              />
            </StyledColumnSecond>
          </StyledBox>
          <StyledRowEmail>
            <Controller
              as={TextField}
              control={control}
              id='standard-email'
              name='email'
              defaultValue={patientInitialValues.email}
              label={t('Mail address')}
              error={errors.email ? true : false}
              helperText={errors.email ? t('Invalid email address') : null}
              InputProps={{
                endAdornment: errors.email && (
                  <InputAdornment position='end'>
                    <ErrorOutlineIcon htmlColor={'#ff0000'} />
                  </InputAdornment>
                ),
              }}
              rules={{
                pattern: getEmailRegexPattern(),
              }}
              {...PopupTextFieldOpts}
            />
          </StyledRowEmail>
        </StyledForm>
      </form>
    </CustomizedPopup>
  );
};
const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    facility: state.settings.facility,
  };
};

export default connect(mapStateToProps, null)(PopupCreateNewPatient);
