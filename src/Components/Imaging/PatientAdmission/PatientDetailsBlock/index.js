import React, { useEffect, useState } from 'react';
import matchSorter from 'match-sorter';
import {
  StyledForm,
  StyledPatientDetails,
  StyledFormGroup,
  StyledDivider,
  StyledTextField,
  StyledAutoComplete,
  StyledSwitch,
  StyledChip,
} from './Style';
import CustomizedButton from '../../../../Assets/Elements/CustomizedTable/CustomizedTableButton';
import { useTranslation } from 'react-i18next';
import Title from '../../../../Assets/Elements/Title';
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
} from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getCities, getStreets } from '../../../../Utils/Services/API';
import { getValueSet } from '../../../../Utils/Services/FhirAPI';
import normalizeFhirValueSet from '../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import {
  Checkbox,
  ListItemText,
  Grid,
  CircularProgress,
  Tab,
  Tabs,
  Switch,
  ListSubheader,
} from '@material-ui/core';

const PatientDetailsBlock = ({ patientData, edit_mode, encounterData }) => {
  const { t } = useTranslation();
  const { register, control, handleSubmit } = useForm({
    submitFocusError: true,
    mode: 'onBlur',
  });
  const icon = <Close fontSize='small' />;
  const [addressCity, setAddressCity] = useState({});

  const [selecetedServicesType, setSelecetedServicesType] = useState([]);
  const [pendingValue, setPendingValue] = useState([]);

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

  const onDeleteHandler = chipToDeleteIndex => () => {
    setSelecetedServicesType(
      selecetedServicesType.filter(
        (_, selectedIndex) => chipToDeleteIndex !== selectedIndex,
      ),
    );
  };

  const filterOptions = (options, { inputValue }) => {
    if (selecetedServicesType.length) {
      options = matchSorter(
        options,
        selecetedServicesType[0].serviceType.code,
        { keys: ['serviceType.code'] },
      );
    }
    return matchSorter(options, inputValue, {
      keys: [
        item => t(item.reasonCode.name),
        'reasonCode.code',
        item => t(item.serviceType.name),
      ],
    });
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
        const serviceTypeResponse = await getValueSet('service_types');
        if (active) {
          const options = [];
          const servicesTypeObj = {};
          const allReasonsCode = await Promise.all(
            serviceTypeResponse.data.expansion.contains.map(serviceType => {
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
              reasonCode => {
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
      setPendingValue([])
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
            filterOptions={filterOptions}
            multiple
            noOptionsText={t('No Results')}
            loadingText={t('Loading')}
            open={servicesTypeOpen}
            loading={loadingServicesType}
            onOpen={() => {
              setPendingValue(selecetedServicesType)
              setServicesTypeOpen(true)}}
            onClose={(event) => {
              setServicesTypeOpen(false);
            }}
            value={pendingValue}
            onChange={(event, newValue) => {
              setPendingValue(newValue);
            }}
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
              )
            }
            ListboxComponent={ListboxComponent}
            ListboxProps={{pendingValue: pendingValue, setSelecetedServicesType: setSelecetedServicesType, setClose: setServicesTypeOpen}}
            options={servicesType}
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

const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref,
) {
  const {setClose, pendingValue, setSelecetedServicesType, ...other} = props
  const { t } = useTranslation();
  const onConfirmHandler = () => {
    setSelecetedServicesType(pendingValue);
    setClose(true);
  };
  return (
    <div
      style={{ position: 'relative', maxHeight: '300px', overflowY: 'scroll', marginBottom: '64px' }}
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
          ${
            // props.children.filter(child => child.props['aria-selected']).length
            pendingValue.length
          } `}
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
