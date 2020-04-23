// Other
import React, { useEffect, useState } from 'react';
import matchSorter from 'match-sorter';
import { getCellPhoneRegexPattern } from 'Utils/Helpers/validation/patterns';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
// import { DevTool } from 'react-hook-form-devtools'; // Used to see the state of the form

// Helpers
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import normalizeFhirRelatedPerson from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirRelatedPerson';
import { calculateFileSize } from 'Utils/Helpers/calculateFileSize';

// Styles
import {
  StyledForm,
  StyledPatientDetails,
  StyledFormGroup,
  StyledDivider,
  StyledTextField,
  StyledAutoComplete,
  StyledKeyboardDatePicker,
  StyledChip,
  StyledButton,
} from './Style';
import { useTranslation } from 'react-i18next';

// Assets, Customized elements
import Title from 'Assets/Elements/Title';
import ListboxComponent from './ListboxComponent/index';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import ChipWithImage from 'Assets/Elements/StyledChip';

// Material-UI Icons
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import CheckBox from '@material-ui/icons/CheckBox';
import Close from '@material-ui/icons/Close';
import CheckBoxOutlineBlankOutlined from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import Scanner from '@material-ui/icons/Scanner';
import AddCircle from '@material-ui/icons/AddCircle';

// Material-UI core, lab, pickers components
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

// APIs
import { getCities, getStreets } from 'Utils/Services/API';
import moment from 'moment';
import { getValueSet } from 'Utils/Services/FhirAPI';
import { FHIR } from 'Utils/Services/FHIR';

const PatientDetailsBlock = ({
  patientData,
  edit_mode,
  encounterData,
  formatDate,
}) => {
  const { t } = useTranslation();

  const { control, handleSubmit, errors, setValue, register } = useForm({
    mode: 'onBlur',
  });

  // Escorted Information
  // Escorted Information - vars
  const [isEscorted, setIsEscorted] = useState(false);
  const [relatedPerson, setRelatedPerson] = useState({});
  // Escorted Information - functions
  const isEscortedSwitchOnChangeHandle = () => {
    setIsEscorted((prevState) => !prevState);
  };

  // Contact Information
  // Contact Information - cities var
  const [cities, setCities] = useState([]);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const loadingCities = citiesOpen && cities.length === 0;
  // Contact Information - streets var
  const [streets, setStreets] = useState([]);
  const [streetsOpen, setStreetsOpen] = useState(false);
  const loadingStreets = streetsOpen && streets.length === 0;
  // Contact Information - tabs var
  const [contactInformationTabValue, setContactInformationTabValue] = useState(
    0,
  );
  // Contact Information - tabs function
  const contactInformationTabValueChangeHandler = (event, newValue) => {
    setContactInformationTabValue(newValue);
  };
  // Contact Information - address city - var
  const [addressCity, setAddressCity] = useState({});
  // Contact Information - PObox city - var
  const [POBoxCity, setPOBoxCity] = useState({});
  // Contact Information - functions / useEffect
  // Contact Information - functions / useEffect - reset cities and streets
  useEffect(() => {
    if (!citiesOpen) {
      setCities([]);
    }
    if (!streetsOpen) {
      setStreets([]);
    }
    // if (!servicesTypeOpen) {
    //   setPendingValue([]);
    // }
  }, [citiesOpen, streetsOpen]);
  // Contact Information - functions / useEffect - loading cities
  useEffect(() => {
    let active = true;

    if (!loadingCities) {
      return undefined;
    }

    (async () => {
      try {
        const cities = await getCities();
        if (active) {
          setCities(
            Object.keys(cities.data).map((cityKey) => {
              let cityObj = {};
              cityObj.code = cities.data[cityKey];
              cityObj.name = t(cities.data[cityKey]);

              return cityObj;
            }),
          );
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingCities]);
  // Contact Information - functions / useEffect - loading streets
  useEffect(() => {
    let active = true;

    if (!loadingStreets) {
      return undefined;
    }

    (async () => {
      try {
        const streets = await getStreets(addressCity.code.split('_')[1]);
        if (active) {
          if (streets.data.length) {
            setStreets(
              Object.keys(streets.data).map((streetKey) => {
                let streetObj = {};
                streetObj.code = streets.data[streetKey];
                streetObj.name = t(streets.data[streetKey]);

                return streetObj;
              }),
            );
          } else {
            const emptyResultsObj = {
              code: 'no_result',
              name: t('No Results'),
            };
            const emptyResults = [emptyResultsObj];
            setStreets(emptyResults);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingStreets]);

  // Requested service
  // Requested service - is urgent - vars
  const [isUrgent, setIsUrgent] = useState(false);
  // Requested service - is urgent - functions
  const isUrgentSwitchOnChangeHandler = () => {
    setIsUrgent((prevState) => !prevState);
  };
  // Requested service - select examination - vars
  const [selectedServicesType, setSelectedServicesType] = useState([]);
  const [pendingValue, setPendingValue] = useState([]);
  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);
  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;
  // Requested service - select examination - functions / useEffect
  const selectExaminationOnChangeHandler = (event, newValue) => {
    setPendingValue(newValue);
  };
  const selectExaminationOnOpenHandler = () => {
    setPendingValue(selectedServicesType);
    setServicesTypeOpen(true);
  };
  const selectExaminationOnCloseHandler = () => {
    setValue('selectTest', selectedServicesType, true);
    setServicesTypeOpen(false);
  };
  const filterOptions = (options, { inputValue }) => {
    if (pendingValue.length) {
      options = matchSorter(options, pendingValue[0].serviceType.code, {
        keys: ['serviceType.code'],
      });
    }
    return matchSorter(options, inputValue, {
      keys: [
        (item) => t(item.reasonCode.name),
        'reasonCode.code',
        (item) => t(item.serviceType.name),
      ],
    });
  };
  useEffect(() => {
    let active = true;

    if (!loadingServicesType) {
      return undefined;
    }

    (async () => {
      try {
        const serviceTypeResponse = await getValueSet('service_types');
        if (active) {
          const options = [];
          const servicesTypeObj = {};
          const allReasonsCode = await Promise.all(
            serviceTypeResponse.data.expansion.contains.map((serviceType) => {
              const normalizedServiceType = normalizeFhirValueSet(serviceType);
              servicesTypeObj[normalizedServiceType.code] = {
                ...normalizedServiceType,
              };
              return getValueSet(`reason_codes_${normalizedServiceType.code}`);
            }),
          );

          for (
            let reasonsIndex = 0;
            reasonsIndex < allReasonsCode.length;
            reasonsIndex++
          ) {
            allReasonsCode[reasonsIndex].data.expansion.contains.forEach(
              (reasonCode) => {
                const optionObj = {};
                optionObj['serviceType'] = {
                  ...servicesTypeObj[
                    allReasonsCode[reasonsIndex].data.id.split('_')[2]
                  ],
                };
                optionObj['reasonCode'] = normalizeFhirValueSet(reasonCode);
                options.push(optionObj);
              },
            );
          }
          setServicesType(options);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingServicesType]);
  // Requested service - select examination - chips - functions
  const chipOnDeleteHandler = (chipToDeleteIndex) => () => {
    setSelectedServicesType(
      selectedServicesType.filter(
        (_, selectedIndex) => chipToDeleteIndex !== selectedIndex,
      ),
    );
  };
  // Commitment And Payment - vars
  const [
    commitmentAndPaymentCommitmentDate,
    setCommitmentAndPaymentCommitmentDate,
  ] = useState(new Date());
  const [
    commitmentAndPaymentCommitmentValidity,
    setCommitmentAndPaymentCommitmentValidity,
  ] = useState(new Date());
  const [
    commitmentAndPaymentTabValue,
    setCommitmentAndPaymentTabValue,
  ] = useState(0);
  // Commitment And Payment - functions
  const validateDate = (date, type) => {
    switch (type) {
      case 'before':
        return moment(date).isSameOrBefore(moment(new Date()));

      case 'after':
        return moment(date).isSameOrAfter(moment(new Date()));

      default:
        return false;
    }
  };
  const dateOnChangeHandler = (date, valueName, set) => {
    try {
      setValue(valueName, date, true);
      set(date);
    } catch (e) {
      console.log('Error: ' + e);
    }
  };
  const setCommitmentAndPaymentTabValueChangeHandler = (event, newValue) => {
    setCommitmentAndPaymentTabValue(newValue);
  };

  // Files scan
  // Files scan - vars
  // Files scan - vars - states
  const [referralFile, setReferralFile] = useState({});
  const [commitmentFile, setCommitmentFile] = useState({});
  const [additionalDocumentFile, setAdditionalDocumentFile] = useState({});
  const [numOfAdditionalDocument, setNumOfAdditionalDocument] = useState([]);
  const [
    nameOfAdditionalDocumentFile,
    setNameOfAdditionalDocumentFile,
  ] = useState('');
  // Files scan - vars - refs
  const referralRef = React.useRef();
  const commitmentRef = React.useRef();
  const additionalDocumentRef = React.useRef();
  // Files scan - vars - globals
  const FILES_OBJ = { type: 'MB', valueInBytes: 1000000, maxSize: 2, fix: 1 };
  // Files scan - functions
  function onChangeFileHandler(ref, setState, fileName) {
    const files = ref.current.files;
    const [BoolAnswer, SizeInMB] = calculateFileSize(
      files[files.length - 1].size,
      FILES_OBJ.valueInBytes,
      FILES_OBJ.fix,
      FILES_OBJ.maxSize,
    );
    if (!BoolAnswer) {
      const fileObj = {
        name: `${fileName}_${moment().format('L')}_${moment().format(
          'HH:mm',
        )}_${files[files.length - 1].name}`,
        size: SizeInMB,
      };
      setState({ ...fileObj });
    } else {
      ref.current.value = '';
    }
  }
  const onClickFileHandler = (ref) => {
    const objUrl = URL.createObjectURL(ref.current.files[0]);
    window.open(objUrl, ref.current.files[0].name);
  };
  const onDeleteFileHandler = (ref, setState) => {
    ref.current.value = '';
    const emptyObj = {};
    setState(emptyObj);
  };
  const onClickAdditionalDocumentHandler = () => {
    numOfAdditionalDocument.length !== 1 &&
      setNumOfAdditionalDocument((prevState) => {
        let clonePrevState = prevState;
        clonePrevState.push(clonePrevState.length);
        return [...clonePrevState];
      });
  };
  const onChangeAdditionalDocumentHandler = (e) => {
    setNameOfAdditionalDocumentFile(e.target.value);
  };

  //Sending the form
  const onSubmit = (data) => {
    // 1. Check if the encounter has ref to any appointment if there is any ref change their status to 'arrived'
    // 2. Change the encounter status to arrived ONLY if the current status of the encounter is 'planned'
    // 3. Save the commitment data
    // 4. Go back to PatientTracking route
    console.log(data);
  };
  // Default values
  useEffect(() => {
    if (patientData.city) {
      const defaultAddressCityObj = {
        name: t(patientData.city),
        code: patientData.city,
      };
      setAddressCity(defaultAddressCityObj);
      setPOBoxCity(defaultAddressCityObj);
    }
    if (encounterData) {
      if (encounterData.examination && encounterData.examination.length) {
        const selectedArr = encounterData.examination.map(
          (reasonCodeEl, reasonCodeElIndex) => {
            return {
              serviceType: {
                name: encounterData.serviceType,
                code: encounterData.serviceTypeCode,
              },
              reasonCode: {
                name: reasonCodeEl,
                code: encounterData.examinationCode[reasonCodeElIndex],
              },
            };
          },
        );
        setSelectedServicesType(selectedArr);
      }
      if (encounterData.priority > 1) {
        setIsUrgent(true);
      }
      if (encounterData.relatedPerson) {
        (async () => {
          try {
            if (encounterData.relatedPerson) {
              const relatedPerson = await FHIR('RelatedPerson', 'doWork', {
                functionName: 'getRelatedPerson',
                functionParams: {
                  RelatedPersonId: encounterData.relatedPerson,
                },
              });
              const normalizedRelatedPerson = normalizeFhirRelatedPerson(
                relatedPerson.data,
              );
              setRelatedPerson({ ...normalizedRelatedPerson });
            }
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }
    (async () => {
      try {
        const questionnaire = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: { QuestionnaireName: 'commitment_questionnaire' },
        });
      } catch (error) {
        console.log(error);
      }
      // TODO when there will be data inside store the needed data inside a state.
    })();
  }, [encounterData, patientData]);

  return (
    <StyledPatientDetails edit={edit_mode}>
      <StyledForm onSubmit={handleSubmit(onSubmit)} novalidate>
        {/* Patient Details */}
        <Title
          marginTop={'55px'}
          fontSize={'28px'}
          color={'#002398'}
          label={'Patient Details'}
        />
        {/* Escorted */}
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={t('Accompanying patient')}
            bold
          />
          <StyledDivider variant={'fullWidth'} />
          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'center'}>
            <span>{t('Patient arrived with an escort?')}</span>
            {/* Escorted Information Switch */}
            <StyledSwitch
              onChange={isEscortedSwitchOnChangeHandle}
              checked={isEscorted}
              label_1={'No'}
              label_2={'Yes'}
              marginLeft={'40px'}
              marginRight={'40px'}
            />
          </Grid>
        </StyledFormGroup>
        {/* Escorted Information */}
        {isEscorted && (
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={t('Escort details')}
              bold
            />
            <StyledDivider variant={'fullWidth'} />
            {/* Escorted Information name */}
            <Controller
              as={<StyledTextField label={t('Escort name')} />}
              name={'escortName'}
              control={control}
              defaultValue=''
            />
            {/* Escorted Information cell phone */}
            <Controller
              as={<StyledTextField label={t('Escort cell phone')} />}
              name={'escortMobilePhone'}
              control={control}
              defaultValue=''
              rules={{
                pattern: getCellPhoneRegexPattern(),
              }}
              error={errors.escortMobilePhone && true}
              helperText={
                errors.escortMobilePhone && t('The number entered is incorrect')
              }
            />
          </StyledFormGroup>
        )}
        {/* Contact Information */}
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={t('Contact Information')}
            bold
          />
          <StyledDivider variant={'fullWidth'} />
          {/* Contact Information tabs */}
          <Tabs
            value={contactInformationTabValue}
            onChange={contactInformationTabValueChangeHandler}
            indicatorColor='primary'
            textColor='primary'
            variant='standard'
            aria-label='full width tabs example'>
            <Tab label={t('Address')} />
            <Tab label={t('PO box')} />
          </Tabs>
          {/* Contact Information tabs - address */}
          {contactInformationTabValue === 0 ? (
            <React.Fragment>
              {/* Contact Information - address - city */}
              <StyledAutoComplete
                id='addressCity'
                open={citiesOpen}
                onOpen={() => {
                  setCitiesOpen(true);
                }}
                onClose={() => {
                  setCitiesOpen(false);
                }}
                loading={loadingCities}
                options={cities}
                value={addressCity}
                onChange={(event, newValue) => {
                  setAddressCity(newValue);
                }}
                getOptionLabel={(option) =>
                  Object.keys(option).length === 0 &&
                  option.constructor === Object
                    ? ''
                    : option.name
                }
                noOptionsText={t('No Results')}
                loadingText={t('Loading')}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    label={t('City')}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          <InputAdornment position={'end'}>
                            {loadingCities ? (
                              <CircularProgress color={'inherit'} size={20} />
                            ) : null}
                            {citiesOpen ? <ExpandLess /> : <ExpandMore />}
                          </InputAdornment>
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              {/* Contact Information - address - streets */}
              <Autocomplete
                options={streets}
                loading={loadingStreets}
                open={streetsOpen}
                onOpen={() => addressCity.name && setStreetsOpen(true)}
                onClose={() => setStreetsOpen(false)}
                id='addressStreet'
                getOptionLabel={(option) => (option === '' ? '' : option.name)}
                noOptionsText={t('No Results')}
                loadingText={t('Loading')}
                getOptionDisabled={(option) => option.code === 'no_result'}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,

                      endAdornment: (
                        <InputAdornment position={'end'}>
                          {loadingStreets ? (
                            <CircularProgress color={'inherit'} size={20} />
                          ) : null}
                          {streetsOpen ? <ExpandLess /> : <ExpandMore />}
                        </InputAdornment>
                      ),
                    }}
                    label={t('Street')}
                  />
                )}
              />
              {/* Contact Information - address - house number */}
              <Controller
                name={'addressHouseNumber'}
                control={control}
                defaultValue={patientData.streetNumber}
                as={
                  <StyledTextField
                    id={'addressHouseNumber'}
                    label={t('House number')}
                  />
                }
              />
              {/* Contact Information - address - postal code */}
              <Controller
                defaultValue={patientData.postalCode || ''}
                name={'addressPostalCode'}
                as={
                  <StyledTextField
                    id={'addressPostalCode'}
                    label={t('Postal code')}
                    type='number'
                  />
                }
                rules={{ maxLength: { value: 7 } }}
                control={control}
                error={errors.addressPostalCode && true}
                helperText={errors.addressPostalCode && 'יש להזין 7 ספרות'}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* Contact Information - POBox - city */}
              <StyledAutoComplete
                name='POBoxCity'
                id='POBoxCity'
                open={citiesOpen}
                onOpen={() => {
                  setCitiesOpen(true);
                }}
                onClose={() => {
                  setCitiesOpen(false);
                }}
                onChange={(event, newValue) => {
                  setPOBoxCity(newValue);
                }}
                value={POBoxCity}
                loading={loadingCities}
                options={cities}
                getOptionLabel={(option) => option.name}
                noOptionsText={t('No Results')}
                loadingText={t('Loading')}
                renderInput={(params) => (
                  <StyledTextField
                    {...params}
                    label={t('City')}
                    InputProps={{
                      ...params.InputProps,

                      endAdornment: (
                        <React.Fragment>
                          <InputAdornment position={'end'}>
                            {loadingCities ? (
                              <CircularProgress color={'inherit'} size={20} />
                            ) : null}
                            {citiesOpen ? <ExpandLess /> : <ExpandMore />}
                          </InputAdornment>
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              {/* Contact Information - POBox - POBox */}
              <Controller
                name={'POBox'}
                control={control}
                as={<StyledTextField id={'POBox'} label={t('PO box')} />}
              />
              {/* Contact Information - POBox - postal code */}
              <Controller
                defaultValue={patientData.postalCode}
                name={'POBoxPostalCode'}
                as={
                  <StyledTextField
                    id={'POBoxPostalCode'}
                    label={t('Postal code')}
                    InputLabelProps={{ shrink: patientData.postalCode && true }}
                  />
                }
                control={control}
              />
            </React.Fragment>
          )}
        </StyledFormGroup>
        <span>
          {t('To find a zip code on the Israel post site')}{' '}
          <a
            href={
              'https://mypost.israelpost.co.il/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%9E%D7%99%D7%A7%D7%95%D7%93/'
            }
            target={'_blank'}
            rel='noopener noreferrer'>
            {t('Click here')}
          </a>
        </span>
        {/* Visit Details */}
        <Title
          marginTop={'80px'}
          fontSize={'28px'}
          color={'#002398'}
          label={'Visit Details'}
        />
        {/* Requested service */}
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={'Requested service'}
            bold
          />
          <StyledDivider variant={'fullWidth'} />
          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'center'}>
            <span>{t('Is urgent?')}</span>
            {/* Requested service - switch */}
            <StyledSwitch
              onChange={isUrgentSwitchOnChangeHandler}
              checked={isUrgent}
              label_1={'No'}
              label_2={'Yes'}
              marginLeft={'40px'}
              marginRight={'40px'}
            />
          </Grid>
          {/* Requested service - select test */}
          <Controller
            name='selectTest'
            control={control}
            rules={{
              validate: {
                value: (value) => value && value.length > 0,
              },
            }}
            onChangeName={selectExaminationOnChangeHandler}
            as={
              <Autocomplete
                filterOptions={filterOptions}
                multiple
                noOptionsText={t('No Results')}
                loadingText={t('Loading')}
                open={servicesTypeOpen}
                loading={loadingServicesType}
                onOpen={selectExaminationOnOpenHandler}
                onClose={selectExaminationOnCloseHandler}
                value={pendingValue}
                onChange={selectExaminationOnChangeHandler}
                disableCloseOnSelect
                renderTags={() => null}
                renderOption={(option, state) => (
                  <Grid container justify='flex-end' alignItems='center'>
                    <Grid item xs={3}>
                      <Checkbox
                        color='primary'
                        icon={<CheckBoxOutlineBlankOutlined />}
                        checkedIcon={<CheckBox />}
                        checked={state.selected}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText>{option.reasonCode.code}</ListItemText>
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText primary={t(option.serviceType.name)} />
                    </Grid>
                    <Grid item xs={3}>
                      <ListItemText primary={t(option.reasonCode.name)} />
                    </Grid>
                  </Grid>
                )}
                ListboxComponent={ListboxComponent}
                ListboxProps={{
                  pendingValue: pendingValue,
                  setSelectedServicesType: setSelectedServicesType,
                  setClose: setServicesTypeOpen,
                  setValue: setValue,
                }}
                options={servicesType}
                renderInput={(params) => (
                  <StyledTextField
                    error={errors.selectTest && true}
                    helperText={
                      errors.selectTest &&
                      t('The test performed during the visit must be selected')
                    }
                    {...params}
                    label={`${t('Select test')} *`}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          <InputAdornment position={'end'}>
                            {loadingServicesType ? (
                              <CircularProgress color={'inherit'} size={20} />
                            ) : null}
                            {servicesTypeOpen ? <ExpandLess /> : <ExpandMore />}
                          </InputAdornment>
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            }
          />
          {/* Requested service - selected test - chips */}
          <Grid container direction='row' wrap='wrap'>
            {selectedServicesType.map((selected, selectedIndex) => (
              <StyledChip
                deleteIcon={<Close fontSize='small' />}
                onDelete={chipOnDeleteHandler(selectedIndex)}
                key={selectedIndex}
                label={`${selected.reasonCode.code} | ${t(
                  selected.serviceType.name,
                )} | ${t(selected.reasonCode.name)}`}
              />
            ))}
          </Grid>
        </StyledFormGroup>
        {/* Commitment and payment */}
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={t('Commitment and payment')}
            bold
          />
          <Title
            fontSize={'14px'}
            color={'#000b40'}
            label={t('Please fill in the payer details for the current test')}
          />
          <StyledDivider variant='fullWidth' />
          {/* Commitment and payment - tabs */}
          <Tabs
            value={commitmentAndPaymentTabValue}
            onChange={setCommitmentAndPaymentTabValueChangeHandler}
            indicatorColor='primary'
            textColor='primary'
            variant='standard'
            aria-label='full width tabs example'>
            <Tab label={t('HMO')} />
            {/* <Tab label={t('insurance company')} /> */}
            {/* <Tab label={t('Private')} /> */}
          </Tabs>
          {commitmentAndPaymentTabValue === 0 && (
            <React.Fragment>
              <Controller
                name='commitmentAndPaymentHMO'
                as={
                  <StyledTextField
                    label={t('HMO')}
                    id={'commitmentAndPaymentHMO'}
                  />
                }
                defaultValue={patientData.managingOrganization || ''}
                control={control}
              />
              <StyledTextField
                name='commitmentAndPaymentReferenceForPaymentCommitment'
                inputRef={register({
                  required: true,
                })}
                label={`${t('Reference for payment commitment')} *`}
                id={'commitmentAndPaymentReferenceForPaymentCommitment'}
                type='number'
              />
              <Controller
                name='commitmentAndPaymentCommitmentDate'
                rules={{
                  validate: {
                    value: (value) => validateDate(value, 'before'),
                  },
                  required: true,
                }}
                control={control}
                as={
                  <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                    <StyledKeyboardDatePicker
                      disableToolbar
                      autoOk
                      variant='inline'
                      format={formatDate}
                      mask={formatDate}
                      margin='normal'
                      id='commitmentAndPaymentCommitmentDate'
                      label={`${t('Commitment date')} *`}
                      value={commitmentAndPaymentCommitmentDate}
                      onChange={(date) =>
                        dateOnChangeHandler(
                          date,
                          'commitmentAndPaymentCommitmentDate',
                          setCommitmentAndPaymentCommitmentDate,
                        )
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      error={errors.commitmentAndPaymentCommitmentDate && true}
                      helperText={
                        errors.commitmentAndPaymentCommitmentDate &&
                        t('An equal date or less than today must be entered')
                      }
                    />
                  </MuiPickersUtilsProvider>
                }
              />
              <Controller
                name='commitmentAndPaymentCommitmentValidity'
                control={control}
                rules={{
                  validate: {
                    value: (value) => validateDate(value, 'after'),
                  },
                  required: true,
                }}
                as={
                  <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                    <StyledKeyboardDatePicker
                      autoOk
                      mask={formatDate}
                      disableToolbar
                      variant='inline'
                      format={formatDate}
                      margin='normal'
                      id='commitmentAndPaymentCommitmentValidity'
                      label={`${t('Commitment validity')} *`}
                      value={commitmentAndPaymentCommitmentValidity}
                      onChange={(date) =>
                        dateOnChangeHandler(
                          date,
                          'commitmentAndPaymentCommitmentValidity',
                          setCommitmentAndPaymentCommitmentValidity,
                        )
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      error={
                        errors.commitmentAndPaymentCommitmentValidity && true
                      }
                      helperText={
                        errors.commitmentAndPaymentCommitmentValidity &&
                        t('An equal or greater date must be entered than today')
                      }
                    />
                  </MuiPickersUtilsProvider>
                }
              />
              <StyledTextField
                name='commitmentAndPaymentDoctorsName'
                inputRef={register({
                  required: true,
                })}
                label={`${t('Doctors name')} *`}
                id={'commitmentAndPaymentDoctorsName'}
              />
              <StyledTextField
                name='commitmentAndPaymentDoctorsLicense'
                inputRef={register({
                  required: true,
                })}
                label={`${t('Doctors license')} *`}
                id={'commitmentAndPaymentDoctorsLicense'}
                type='number'
              />
            </React.Fragment>
          )}
        </StyledFormGroup>
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={t('Upload documents')}
            bold
          />
          <Title
            fontSize={'14px'}
            color={'#000b40'}
            label={`${t('Uploading documents with a maximum size of up to')} ${
              FILES_OBJ.maxSize
            }${FILES_OBJ.type}`}
          />
          <StyledDivider variant='fullWidth' />
          {/* ReferralRef  */}
          <Grid container alignItems='center' style={{ marginBottom: '41px' }}>
            <Grid item xs={3}>
              <label style={{ color: '#000b40' }} htmlFor='referral'>
                {`${t('Referral')} *`}
              </label>
            </Grid>
            <Grid item xs={9}>
              <input
                name='ReferralFile'
                ref={referralRef}
                id='referral'
                type='file'
                accept='.pdf,.gpf,.png,.gif,.jpg'
                onChange={() =>
                  onChangeFileHandler(referralRef, setReferralFile, 'Referral')
                }
              />
              {Object.values(referralFile).length > 0 ? (
                <ChipWithImage
                  htmlFor='referral'
                  label={referralFile.name}
                  size={referralFile.size}
                  onDelete={() =>
                    onDeleteFileHandler(referralRef, setReferralFile)
                  }
                  onClick={() => onClickFileHandler(referralRef)}
                />
              ) : (
                <label htmlFor='referral'>
                  <StyledButton
                    variant='outlined'
                    color='primary'
                    component='span'
                    size={'large'}
                    startIcon={<Scanner />}>
                    {t('Upload document')}
                  </StyledButton>
                </label>
              )}
            </Grid>
          </Grid>
          {/* CommitmentRef  */}
          <Grid container alignItems='center' style={{ marginBottom: '41px' }}>
            <Grid item xs={3}>
              <label style={{ color: '#000b40' }} htmlFor='commitment'>
                {`${t('Commitment')} *`}
              </label>
            </Grid>
            <Grid item xs={9}>
              <input
                name='CommitmentFile'
                ref={commitmentRef}
                id='commitment'
                type='file'
                accept='.pdf,.gpf,.png,.gif,.jpg'
                onChange={() =>
                  onChangeFileHandler(
                    commitmentRef,
                    setCommitmentFile,
                    'Commitment',
                  )
                }
              />
              {Object.values(commitmentFile).length > 0 ? (
                <ChipWithImage
                  htmlFor='commitment'
                  label={commitmentFile.name}
                  size={commitmentFile.size}
                  onDelete={() =>
                    onDeleteFileHandler(commitmentRef, setCommitmentFile)
                  }
                  onClick={() => onClickFileHandler(commitmentRef)}
                />
              ) : (
                <label htmlFor='commitment'>
                  <StyledButton
                    variant='outlined'
                    color='primary'
                    component='span'
                    size={'large'}
                    startIcon={<Scanner />}>
                    {t('Upload document')}
                  </StyledButton>
                </label>
              )}
            </Grid>
          </Grid>
          {/* AdditionalDocumentRef */}
          {numOfAdditionalDocument.map((_, additionalDocumentIndex) => {
            return (
              <Grid container alignItems='center' key={additionalDocumentIndex}>
                <Grid item xs={3}>
                  <StyledTextField
                    onChange={onChangeAdditionalDocumentHandler}
                    label={`${t('Additional document')}`}
                    required
                  />
                </Grid>
                <Grid item xs={9}>
                  <input
                    ref={additionalDocumentRef}
                    id='additionalDocument'
                    type='file'
                    accept='.pdf,.gpf,.png,.gif,.jpg'
                    onChange={() =>
                      onChangeFileHandler(
                        additionalDocumentRef,
                        setAdditionalDocumentFile,
                        nameOfAdditionalDocumentFile || 'Document1',
                      )
                    }
                  />
                  {Object.values(additionalDocumentFile).length > 0 ? (
                    <ChipWithImage
                      htmlFor='additionalDocument'
                      label={additionalDocumentFile.name}
                      size={additionalDocumentFile.size}
                      onDelete={() =>
                        onDeleteFileHandler(
                          additionalDocumentRef,
                          setAdditionalDocumentFile,
                        )
                      }
                      onClick={() => onClickFileHandler(additionalDocumentRef)}
                    />
                  ) : (
                    <label htmlFor='additionalDocument'>
                      <StyledButton
                        variant='outlined'
                        color='primary'
                        component='span'
                        size={'large'}
                        startIcon={<Scanner />}>
                        {t('Upload document')}
                      </StyledButton>
                    </label>
                  )}
                </Grid>
              </Grid>
            );
          })}
          <Grid container alignItems='center'>
            <AddCircle
              style={{ color: '#002398', cursor: 'pointer' }}
              onClick={onClickAdditionalDocumentHandler}
            />
            <Title
              margin='0 8px 0 8px'
              bold
              color={'#002398'}
              label={'Additional document'}
            />
          </Grid>
        </StyledFormGroup>
        <StyledFormGroup>
          <Grid container direction='row' justify='flex-end'>
            <Grid item xs={3}>
              <StyledButton
                color='primary'
                variant='outlined'
                type='submit'
                letterSpacing={'0.1'}>
                {t('Save & Close')}
              </StyledButton>
            </Grid>
            <Grid item xs={3}>
              <StyledButton
                color='primary'
                variant='contained'
                type='submit'
                fontWeight={'bold'}>
                {t('Medical questionnaire')}
              </StyledButton>
            </Grid>
          </Grid>
        </StyledFormGroup>
      </StyledForm>
      {/* <DevTool control={control} /> */}
    </StyledPatientDetails>
  );
};
const mapStateToProps = (state) => {
  return {
    languageDirection: state.settings.lang_dir,
  };
};
export default connect(mapStateToProps, null)(PatientDetailsBlock);
