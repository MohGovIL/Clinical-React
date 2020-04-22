import React, { useEffect, useState } from 'react';
import matchSorter from 'match-sorter';
import { getCellPhoneRegexPattern } from 'Utils/Helpers/validation/patterns';
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
import CustomizedButton from 'Assets/Elements/CustomizedTable/CustomizedTableButton';
import { normalizeFhirOrganization } from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirOrganization';
import { useTranslation } from 'react-i18next';
import Title from 'Assets/Elements/Title';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DevTool } from 'react-hook-form-devtools';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import {
  ExpandMore,
  ExpandLess,
  CheckBox,
  Close,
  CheckBoxOutlineBlankOutlined,
  Scanner,
  AddCircle,
} from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getCities, getStreets } from 'Utils/Services/API';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';
import { getValueSet } from 'Utils/Services/FhirAPI';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import StyledSwitch from 'Assets/Elements/StyledSwitch';
import ChipWithImage from 'Assets/Elements/StyledChip';
import {
  Checkbox,
  ListItemText,
  Grid,
  CircularProgress,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Chip,
} from '@material-ui/core';

const PatientDetailsBlock = ({
  patientData,
  edit_mode,
  encounterData,
  formatDate,
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, errors, setValue } = useForm({
    mode: 'onBlur',
  });

  const [referralFile, setReferralFile] = useState({});
  const [commitmentFile, setCommitmentFile] = useState({});
  const [additionnalDocumentFile, setAdditionnalDocumentFile] = useState({});
  const [numOfAdditionnalDocument, setNumOfAdditionnalDocument] = useState([]);
  const [nameOfAddionalDocumentFile, setNameOfAddionalDocumentFile] = useState(
    '',
  );

  const referralRef = React.useRef();

  const commitmentRef = React.useRef();

  const additionnalDocumentRef = React.useRef();

  const MAX_SIZE = 2;

  const UNIT = {type: 'MB', valueInBytes: 1000000};

  const toFix1 = (number) => {
    return Number.parseFloat(number).toFixed(1);
  };

  const calculateSize = (size) => {
    const SizeInMB = size / UNIT.valueInBytes;
    if (SizeInMB < MAX_SIZE) {
      return [false, toFix1(SizeInMB)];
    }
    return [true, toFix1(SizeInMB)];
  };

  function onChangeFileHandler(ref, setState, fileName) {
    const files = ref.current.files;
    const [BoolAnswer, SizeInMB] = calculateSize(
      files[files.length - 1].size,
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

  const onClickAdditionnalDocumentHandler = () => {
    numOfAdditionnalDocument.length !== 1 &&
      setNumOfAdditionnalDocument((prevState) => {
        let clonePrevState = prevState;
        clonePrevState.push(clonePrevState.length);
        return [...clonePrevState];
      });
  };

  const onChangeAdditionnalDocumentHandler = (e) => {
    setNameOfAddionalDocumentFile(e.target.value);
  };

  const icon = <Close fontSize='small' />;
  const [addressCity, setAddressCity] = useState({});
  const [POBoxCity, setPOBoxCity] = useState({});

  const [selecetedServicesType, setSelecetedServicesType] = useState([]);
  const [pendingValue, setPendingValue] = useState([]);

  const [cities, setCities] = useState([]);
  const [citiesOpen, setCitiesOpen] = useState(false);

  const [streets, setStreets] = useState([]);
  const [streetsOpen, setStreetsOpen] = useState(false);

  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);

  const [HMO, setHMO] = useState({});

  const loadingCities = citiesOpen && cities.length === 0;
  const loadingStreets = streetsOpen && streets.length === 0;
  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;

  const selectExaminationOnChangeHandler = (event, newValue) => {
    setPendingValue(newValue);
  };

  const selectExaminationOnOpenHandler = () => {
    setPendingValue(selecetedServicesType);
    setServicesTypeOpen(true);
  };

  const selectExaminationOnCloseHandelr = () => {
    setValue('selectTest', selecetedServicesType, true);
    setServicesTypeOpen(false);
  };

  const [
    commitmentAndPaymentCommitmentDate,
    setCommitmentAndPaymentCommitmentDate,
  ] = useState(new Date());

  const [
    commitmentAndPaymentCommitmeValidity,
    setCommitmentAndPaymentCommitmeValidity,
  ] = useState(new Date());

  const valdiatorDate = (date, type) => {
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
  //Is escorted
  const [isEscorted, setIsEscorted] = useState(false);
  const isEscortedSwitchOnChangeHandle = () => {
    setIsEscorted((prevState) => !prevState);
  };

  const [isUrgent, setIsUrgent] = useState(false);
  const isUrgentSwitchOnChangeHandler = () => {
    setIsUrgent((prevState) => !prevState);
  };

  const onDeleteHandler = (chipToDeleteIndex) => () => {
    setSelecetedServicesType(
      selecetedServicesType.filter(
        (_, selectedIndex) => chipToDeleteIndex !== selectedIndex,
      ),
    );
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
  //Tabs
  const [contactInformationTabValue, setContactInformationTabValue] = useState(
    0,
  );
  const contactInformationTabValueChangeHandler = (event, newValue) => {
    setContactInformationTabValue(newValue);
  };

  const [
    commitmentAndPaymentTabValue,
    setCommitmentAndPaymentTabValue,
  ] = useState(0);
  const setCommitmentAndPaymentTabValueChangeHandler = (event, newValue) => {
    setCommitmentAndPaymentTabValue(newValue);
  };

  //Sending the form
  const onSubmit = (data) => {
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
        setSelecetedServicesType(selectedArr);
      }
      if (encounterData.priority > 1) {
        setIsUrgent(true);
      }
    }
    (async () => {
      try {
        if (patientData.managingOrganization) {
          // const HMO_Data = await getHMO(patientData.managingOrganization);
          const Organization = await FHIR('Organization', 'doWork', {functionName: "readOrganization", functionParams: {OrganizationId: patientData.managingOrganization}})
          const normalizedOrganization = normalizeFhirOrganization(Organization.data);
          setHMO(normalizedOrganization);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [encounterData, patientData]);
  //Loading services type
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
  // loadingServiceType add it to useEffect dep

  //Loading cities
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
  //Loading streets
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
  //Reset options for auto compelete
  useEffect(() => {
    if (!citiesOpen) {
      setCities([]);
    }
    if (!streetsOpen) {
      setStreets([]);
    }
    if (!servicesTypeOpen) {
      setPendingValue([]);
    }
  }, [citiesOpen, streetsOpen]);

  return (
    <StyledPatientDetails edit={edit_mode}>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Title
          marginTop={'55px'}
          fontSize={'28px'}
          color={'#002398'}
          label={'Patient Details'}
        />
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
        {isEscorted && (
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={t('Escort details')}
              bold
            />
            <StyledDivider variant={'fullWidth'} />
            <Controller
              as={<StyledTextField label={t('Escort name')} />}
              name={'escortName'}
              control={control}
              defaultValue=''
            />
            <Controller
              as={<StyledTextField label={t('Escort cell phone')} />}
              name={'escortMobilePhone'}
              control={control}
              defaultValue=''
              rules={{
                pattern: getCellPhoneRegexPattern(),
              }}
              error={errors.escortMobilePhone}
              helperText={
                errors.escortMobilePhone && t('The number entered is incorrect')
              }
            />
          </StyledFormGroup>
        )}
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={t('Contact Information')}
            bold
          />
          <StyledDivider variant={'fullWidth'} />
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
          {contactInformationTabValue === 0 ? (
            <React.Fragment>
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
                error={errors.addressPostalCode}
                helperText={errors.addressPostalCode && 'יש להזין 7 ספרות'}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
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
              <Controller
                name={'POBox'}
                control={control}
                as={<StyledTextField id={'POBox'} label={t('PO box')} />}
              />
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
        <Title
          marginTop={'80px'}
          fontSize={'28px'}
          color={'#002398'}
          label={'Visit Details'}
        />

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
            <StyledSwitch
              onChange={isUrgentSwitchOnChangeHandler}
              checked={isUrgent}
              label_1={'No'}
              label_2={'Yes'}
              marginLeft={'40px'}
              marginRight={'40px'}
            />
          </Grid>
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
                onClose={selectExaminationOnCloseHandelr}
                // onOpen={() => {
                //   setPendingValue(selecetedServicesType);
                //   setServicesTypeOpen(true);
                // }}
                // onClose={(event) => {
                //   setServicesTypeOpen(false);
                // }}
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
                  setSelecetedServicesType: setSelecetedServicesType,
                  setClose: setServicesTypeOpen,
                  setValue: setValue,
                }}
                options={servicesType}
                renderInput={(params) => (
                  <StyledTextField
                    error={errors.selectTest}
                    helperText={
                      errors.selectTest &&
                      t('The test performed during the visit must be selected')
                    }
                    required
                    {...params}
                    label={t('Select test')}
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

          <Grid container direction='row' wrap='wrap'>
            {selecetedServicesType.map((selected, selectedIndex) => (
              <StyledChip
                deleteIcon={icon}
                onDelete={onDeleteHandler(selectedIndex)}
                key={selectedIndex}
                label={`${selected.reasonCode.code} | ${t(
                  selected.serviceType.name,
                )} | ${t(selected.reasonCode.name)}`}
              />
            ))}
          </Grid>
        </StyledFormGroup>
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
              <StyledTextField
                label={t('HMO')}
                id={'commitmentAndPaymentHMO'}
                disabled
                value={HMO.name || ''}
              />
              <StyledTextField
                required
                label={t('Reference for payment commitment')}
                id={'commitmentAndPaymentReferenceForPaymentCommitment'}
                type='number'
              />
              <Controller
                name='commitmentAndPaymentCommitmentDate'
                rules={{
                  validate: {
                    value: (value) => valdiatorDate(value, 'before'),
                  },
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
                      required
                      id='commitmentAndPaymentCommitmentDate'
                      label={t('Commitment date')}
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
                name='commitmentAndPaymentCommitmeValidity'
                control={control}
                rules={{
                  validate: {
                    value: (value) => valdiatorDate(value, 'after'),
                  },
                }}
                as={
                  <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
                    <StyledKeyboardDatePicker
                      required
                      autoOk
                      mask={formatDate}
                      disableToolbar
                      variant='inline'
                      format={formatDate}
                      margin='normal'
                      id='commitmentAndPaymentCommitmeValidity'
                      label={t('Commitment validity')}
                      value={commitmentAndPaymentCommitmeValidity}
                      onChange={(date) =>
                        dateOnChangeHandler(
                          date,
                          'commitmentAndPaymentCommitmeValidity',
                          setCommitmentAndPaymentCommitmeValidity,
                        )
                      }
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      error={
                        errors.commitmentAndPaymentCommitmeValidity && true
                      }
                      helperText={
                        errors.commitmentAndPaymentCommitmeValidity &&
                        t('An equal or greater date must be entered than today')
                      }
                    />
                  </MuiPickersUtilsProvider>
                }
              />

              {/* </StyledTextInput> */}
              <StyledTextField
                required
                label={t('Doctors name')}
                id={'commitmentAndPaymentDoctorsName'}
              />
              <StyledTextField
                required
                label={t('Doctors license')}
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
            label={`${t('Uploading documents with a maximum size of up to')} ${MAX_SIZE}${UNIT.type}`}
          />
          <StyledDivider variant='fullWidth' />
          {/* ReferralRef  */}
          <Grid container alignItems='center' style={{ marginBottom: '41px' }}>
            <Grid item xs={3}>
              <label style={{ color: '#000b40' }} htmlFor='referral'>
                {t('Referral')}
              </label>
            </Grid>
            <Grid item xs={9}>
              <input
                ref={referralRef}
                id='referral'
                type='file'
                accept='.pdf,.gpf,.png,.gif,.jpg'
                required
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
                {t('Commitment')}
              </label>
            </Grid>
            <Grid item xs={9}>
              <input
                ref={commitmentRef}
                id='commitment'
                type='file'
                accept='.pdf,.gpf,.png,.gif,.jpg'
                required
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
          {/* AddiotionalDocumentRef */}
          {numOfAdditionnalDocument.map((_, additionnalDocumentIndex) => {
            return (
              <Grid container alignItems='center' key={additionnalDocumentIndex}>
                <Grid item xs={3}>
                  <StyledTextField
                    onChange={onChangeAdditionnalDocumentHandler}
                    label={t('Additional document')}
                  />
                </Grid>
                <Grid item xs={9}>
                  <input
                    ref={additionnalDocumentRef}
                    id='additionnalDocument'
                    type='file'
                    accept='.pdf,.gpf,.png,.gif,.jpg'
                    required
                    onChange={() =>
                      onChangeFileHandler(
                        additionnalDocumentRef,
                        setAdditionnalDocumentFile,
                        nameOfAddionalDocumentFile || 'Document1',
                      )
                    }
                  />
                  {Object.values(additionnalDocumentFile).length > 0 ? (
                    <ChipWithImage
                      htmlFor='additionnalDocument'
                      label={additionnalDocumentFile.name}
                      size={additionnalDocumentFile.size}
                      onDelete={() =>
                        onDeleteFileHandler(
                          additionnalDocumentRef,
                          setAdditionnalDocumentFile,
                        )
                      }
                      onClick={() => onClickFileHandler(additionnalDocumentRef)}
                    />
                  ) : (
                    <label htmlFor='additionnalDocument'>
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
              onClick={onClickAdditionnalDocumentHandler}
            />
            <Title
              margin='0 8px 0 8px'
              bold
              color={'#002398'}
              label={'Additional document'}
            />
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

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref,
) {
  const {
    setClose,
    pendingValue,
    setSelecetedServicesType,
    setValue,
    ...other
  } = props;
  const { t } = useTranslation();
  const onConfirmHandler = () => {
    setSelecetedServicesType((prevState) => {
      setValue('selectTest', pendingValue, true);
      return pendingValue;
    });
    // An idea on how to solve when clicking confirm to make the autoComplete to close is to give a ref to the next element or the inputElement of the autoComplete and make it focus on that element or unfocus.
    setClose(true);
  };
  return (
    <div
      style={{
        position: 'relative',
        maxHeight: '300px',
        overflowY: 'scroll',
        marginBottom: '64px',
      }}
      ref={ref}
      {...other}>
      {props.children}
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
          left: '0',
          bottom: '0',
          backgroundColor: '#ffffff',
          width: 'calc(100% - 15px - 15px)',
          padding: '0 15px 0 15px',
        }}>
        <span>
          {`${t('Is selected')}
          ${pendingValue.length} `}
        </span>
        <CustomizedButton
          label={t('OK')}
          variant='contained'
          color='primary'
          onClickHandler={onConfirmHandler}
        />
      </div>
    </div>
  );
});
