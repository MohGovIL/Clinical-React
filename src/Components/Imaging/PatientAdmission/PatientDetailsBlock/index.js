import React, { useEffect, useState } from 'react';
import {
  StyledForm,
  StyledPatientDetails,
  StyledFormGroup,
  StyledDivider,
  StyledTextField,
  StyledAutoComplete,
  StyledSwitch,
} from './Style';
import { useTranslation } from 'react-i18next';
import Title from '../../../../Assets/Elements/Title';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DevTool } from 'react-hook-form-devtools';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ExpandMore, ExpandLess, CheckBox, CheckBoxOutlineBlank } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getCities, getStreets } from '../../../../Utils/Services/API';
import { getValueSet } from '../../../../Utils/Services/FhirAPI';
import Grid from '@material-ui/core/Grid';
import normalizeFhirValueSet from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { Typography, Checkbox } from '@material-ui/core';

const PatientDetailsBlock = ({ patientData, edit_mode, encounterData }) => {
  const { t } = useTranslation();
  const { register, control, handleSubmit } = useForm({
    submitFocusError: true,
    mode: 'onBlur',
  });

  const [addressCity, setAddressCity] = useState({});

  const [selecetedServicesType, setSelecetedServicesType] = useState([]);

  const [cities, setCities] = useState([]);
  const [citiesOpen, setCitiesOpen] = useState(false);

  const [streets, setStreets] = useState([]);
  const [streetsOpen, setStreetsOpen] = useState(false);

  const [servicesType, setServicesType] = useState([]);
  const [servicesTypeOpen, setServicesTypeOpen] = useState(false);

  const loadingCities = citiesOpen && cities.length === 0;
  const loadingStreets = streetsOpen && streets.length === 0;
  const loadingServicesType = servicesTypeOpen && servicesType.length === 0;

  const [isEscorted, setIsEscorted] = useState(false);
  const isEscortedSwitchOnChangeHandle = () => {
    setIsEscorted(prevState => !prevState);
  };

  const [isUrgent, setIsUrgent] = useState(false);
  const isUrgentSwitchOnChangeHandler = () => {
    setIsUrgent(prevState => !prevState);
  };

  //Tabs
  const [tabValue, setTabValue] = useState(0);

  //Sending the form
  const onSubmit = data => {
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
    }
    if (encounterData) {
      if (encounterData.priority > 1) {
        setIsUrgent(true);
      }
    }
  }, [encounterData, patientData]);
  //Loading services type
  useEffect(() => {
    let active = true;

    if (!loadingServicesType) {
      return undefined;
    }

    (async () => {
      try {
        if (encounterData.servicesType) {
          const reasonsCodeResponse = await getValueSet(
            `${encounterData.servicesTypeCode}`,
          );
          if (active) {
            console.log('I have a service type from appointment YES!');
          }
        } else {
          const serviceTypeResponse = await getValueSet('service_types');
          if (active) {
            setServicesType(
              serviceTypeResponse.data.expansion.contains.map(serviceTypeObj =>
                normalizeFhirValueSet(serviceTypeObj),
              ),
            );
            // let servicesTypeObj = {};
            // serviceTypeResponse.data.expansion.contains.map(
            //   async serviceType => {
            //     const serviceTypeReasonCode = await getValueSet(
            //       `reason_codes_${normalizeFhirValueSet(serviceType).code}`,
            //     );
            //     serviceTypeReasonCode.data.expansion.contains.map();
            //   },
            // );
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingServicesType]);
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
            Object.keys(cities.data).map(cityKey => {
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
              Object.keys(streets.data).map(streetKey => {
                let streetObj = {};
                streetObj.code = streets.data[streetKey];
                streetObj.name = t(streets.data[streetKey]);

                return streetObj;
              }),
            );
          } else {
            const emptyResultsObj = {};
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
      setServicesType([]);
    }
  }, [citiesOpen, streetsOpen, servicesTypeOpen]);

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
          <Title fontSize={'18px'} variant={'fullWidth'} />
          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'baseline'}>
            <span>{t('Patient arrived with an escort?')}</span>
            {/* <StyledSwitch
              size={'medium'}
              color={'primary'}
              onChange={switchOnChangeHandle}
              value={isEscorted}
              beforeContent={t('yes')}
              afterContent={t('no')}
            /> */}
            <Switch
              size={'medium'}
              color={'primary'}
              onChange={isEscortedSwitchOnChangeHandle}
              checked={isEscorted}
            />
          </Grid>
        </StyledFormGroup>
        {isEscorted ? (
          <StyledFormGroup>
            <Title
              fontSize={'18px'}
              color={'#000b40'}
              label={t('Escort details')}
              bold
            />
            <StyledDivider variant={'fullWidth'} />
            <StyledTextField
              inputRef={register}
              name={'escortName'}
              id={'escortName'}
              label={t('Escort name')}
            />
            <StyledTextField
              inputRef={register}
              name={'escortMobilePhone'}
              id={'escortMobilePhone'}
              label={t('Escort cell phone ')}
            />
          </StyledFormGroup>
        ) : null}
        <StyledFormGroup>
          <Title
            fontSize={'18px'}
            color={'#000b40'}
            label={t('Contact Information')}
            bold
          />
          <StyledDivider variant={'fullWidth'} />
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => {
              setTabValue(newValue);
            }}
            indicatorColor='primary'
            textColor='primary'
            variant='standard'
            aria-label='full width tabs example'>
            <Tab label={t('Address')} />
            <Tab label={t('PO box')} />
          </Tabs>
          {tabValue === 0 ? (
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
                getOptionLabel={option =>
                  Object.keys(option).length === 0 &&
                  option.constructor === Object
                    ? ''
                    : option.name
                }
                noOptionsText={t('No Results')}
                loadingText={t('Loading')}
                renderInput={params => (
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
                getOptionLabel={option => (option === '' ? '' : option.name)}
                noOptionsText={t('No Results')}
                loadingText={t('Loading')}
                getOptionDisabled={option => option.code === 'no_result'}
                renderInput={params => (
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
                as={
                  <StyledTextField
                    id={'addressHouseNumber'}
                    label={t('House number')}
                  />
                }
              />
              <Controller
                defaultValue={patientData.postalCode}
                name={'addressPostalCode'}
                as={
                  <StyledTextField
                    id={'addressPostalCode'}
                    label={t('Postal code')}
                  />
                }
                control={control}
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
                value={addressCity}
                loading={loadingCities}
                options={cities}
                getOptionLabel={option => option.name}
                noOptionsText={t('No Results')}
                loadingText={t('Loading')}
                renderInput={params => (
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
            target={'_blank'}>
            {t('click here')}
          </a>
        </span>

        <Title
          marginTop={'80px'}
          fontSize={'28px'}
          color={'#002398'}
          label={'Patient Details'}
        />
        {/* REQUESTED SERVICE */}
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
            alignItems={'baseline'}>
            <span>{t('Is urgent?')}</span>
            <Switch
              size={'medium'}
              color={'primary'}
              onChange={isUrgentSwitchOnChangeHandler}
              checked={isUrgent}
            />
          </Grid>
          
          <Autocomplete
            multiple
            renderTags={() => null} //So it won't show tags inside
            id='servicesType'
            open={servicesTypeOpen}
            onOpen={() => {
              setServicesTypeOpen(true);
            }}
            onClose={() => {
              setServicesTypeOpen(false);
            }}
            loading={loadingServicesType}
            options={servicesType}
            value={selecetedServicesType}
            onChange={(event, newValue) => {
              setServicesType(newValue);
            }}
            getOptionLabel={option => option.name
              // Object.keys(option).length === 0 && option.constructor === Object
              //   ? ''
              //   : option.name
            }
            disablePortal
            disableCloseOnSelect // Used for multiple selects
            noOptionsText={t('No Results')}
            loadingText={t('Loading')}
            renderOption={(option, { selected }) => (
              <React.Fragment>
                { selected ?  <CheckBox /> : <CheckBoxOutlineBlank />}
                {option.name}
              </React.Fragment>
            )}
            renderInput={params => (
              <StyledTextField
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
        </StyledFormGroup>
      </StyledForm>
      {/* <DevTool control={control} /> */}
    </StyledPatientDetails>
  );
};
const mapStateToProps = state => {
  return {
    languageDirection: state.settings.lang_dir,
  };
};
export default connect(mapStateToProps, null)(PatientDetailsBlock);
