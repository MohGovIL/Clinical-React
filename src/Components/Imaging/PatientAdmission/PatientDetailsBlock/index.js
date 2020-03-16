import React, {useEffect, useState} from 'react';
import {
    StyledForm,
    StyledPatientDetails,
    StyledFormGroup,
    StyledDivider,
    StyledTextField,
    StyledAutoComplete,
} from './Style';
import {useTranslation} from 'react-i18next';
import Title from '../../../../Assets/Elements/Title';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {DevTool} from 'react-hook-form-devtools';
import {useForm, Controller} from 'react-hook-form';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    ExpandMore,
    ExpandLess,
} from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import {getCities, getStreets} from '../../../../Utils/Services/API';
import Grid from '@material-ui/core/Grid';


const PatientDetailsBlock = ({languageDirection, patientData}) => {
    const {t} = useTranslation();
    console.log(patientData);
    const {register, control, handleSubmit} = useForm({
        mode: 'onBlur',
        submitFocusError: true
    });


    const [cities, setCities] = useState([]);
    const [citiesOpen, setCitiesOpen] = useState(false);

    const [streets, setStreets] = useState([]);
    const [streetsOpen, setStreetsOpen] = useState(false);


    const loadingCities = citiesOpen && cities.length === 0;
    const loadingStreets = streetsOpen && streets.length === 0;

    //Is escorted
    const [isEscorted, setIsEscorted] = useState(false);
    const switchOnChangeHandle = () => {
        setIsEscorted(prevState => !prevState);
    };

    //Tabs
    const [tabValue, setTabValue] = useState(0);
    const tabsChangeHandler = (event, newValue) => {
        setTabValue(newValue);
    };

    //TODO add react hook form
    const onSubmit = data => {
        console.log(data);
    };

    useEffect(() => {
        let active = true;

        if (!loadingCities) {
            return undefined;
        }

        (async () => {
            const cities = await getCities();
            debugger
            if (active) {
                setCities(Object.keys(cities.data).map(cityKey => {
                    let cityObj = {};
                    cityObj.code = cities.data[cityKey];
                    cityObj.name = t(cities.data[cityKey]);

                    return cityObj;

                }));
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingCities]);

    useEffect(
        () => {
            if (!citiesOpen) {
                setCities([]);
            }

            if (!streetsOpen) {
                setStreets([]);
            }

        }, [citiesOpen, streetsOpen]);

    return (
        <StyledPatientDetails>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Title fontSize={'28px'} color={'#002398'} label={'Patient Details'}/>
                <StyledFormGroup title={t('Accompanying patient')}>
                    <Title fontSize={'18px'} color={'#000b40'} label={'Accompanying patient'} bold/>
                    <StyledDivider variant={'fullWidth'}/>
                    <Grid container direction={'row'} justify={'flex-start'} alignItems={'baseline'}>
                        <span>{t('Patient arrived with an escort?')}</span><Switch size={'medium'} color={'primary'}
                                                                                   onChange={switchOnChangeHandle}
                                                                                   value={isEscorted}/>
                    </Grid>
                </StyledFormGroup>
                {isEscorted ?
                    <StyledFormGroup>
                        <Title fontSize={'18px'} color={'#000b40'} label={t('Escort details')} bold/>
                        <StyledDivider variant={'fullWidth'}/>
                        <StyledTextField inputRef={register} name={'escortName'} id={'escortName'} label={t('Escort name')}/>
                        <StyledTextField inputRef={register} name={'escortMobilePhone'} id={'escortMobilePhone'} label={t('Escort cell phone ')}/>
                    </StyledFormGroup>
                    :
                    null}
                <StyledFormGroup>
                    <Title fontSize={'18px'} color={'#000b40'} label={t('Contact Information')} bold/>
                    <StyledDivider variant={'fullWidth'}/>
                    <Tabs
                        value={tabValue}
                        onChange={tabsChangeHandler}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="standard"
                        aria-label="full width tabs example">
                        <Tab label={t('Address')}/>
                        <Tab label={t('PO box')}/>
                    </Tabs>
                    {tabValue === 0 ?
                        <React.Fragment>
                            <StyledAutoComplete
                                id="addressCity"
                                open={citiesOpen}
                                onOpen={() => {
                                    setCitiesOpen(true);
                                }}
                                onClose={() => {
                                    setCitiesOpen(false);
                                }}
                                loading={loadingCities}
                                options={cities}
                                getOptionSelected={(option, value) => option.name === value.name}
                                getOptionLabel={option => option.name}
                                noOptionsText={t('No Results')}
                                loadingText={t('Loading')}
                                renderInput={params => <StyledTextField {...params} label={t('City')}
                                                                        InputProps={{
                                                                            ...params.InputProps,
                                                                            [languageDirection === 'rtl' ? 'endAdornment' : 'startAdornment']: (
                                                                                <React.Fragment>
                                                                                    <InputAdornment
                                                                                        position={languageDirection === 'rtl' ? 'end' : 'start'}>{loadingCities ?
                                                                                        <CircularProgress
                                                                                            color={'inherit'}
                                                                                            size={20}/> : null}{citiesOpen ?
                                                                                        <ExpandLess/> :
                                                                                        <ExpandMore/>}
                                                                                    </InputAdornment>
                                                                                </React.Fragment>),
                                                                        }}
                                />}
                            />
                            <Autocomplete
                                options={streets}
                                loading={loadingStreets}
                                open={streetsOpen}
                                id="addressStreet"
                                renderInput={params => <StyledTextField
                                    {...params}
                                    InputProps={{
                                        ...params.InputProps,
                                        [languageDirection === 'rtl' ? 'endAdornment' : 'startAdornment']:
                                            <InputAdornment
                                                position={languageDirection === 'rtl' ? 'end' : 'start'}><ExpandMore/></InputAdornment>,
                                    }}
                                    label={t('Street')}

                                />}/>

                            <StyledTextField id={'addressHouseNumber'} label={t('House number')} />
                            <Controller defaultValue={patientData.postalCode} name={'addressPostalCode'} as={<StyledTextField id={'addressPostalCode'} label={t('Postal code')}/>} control={control} />
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <StyledTextField id={'POBoxCity'} label={t('City')}/>
                            <StyledTextField id={'POBox'} label={t('PO box')}/>
                            <Controller defaultValue={patientData.postalCode} name={'POBoxPostalCode'} as={<StyledTextField id={'POBoxPostalCode'} label={t('Postal code')}/>} control={control} />
                        </React.Fragment>}
                </StyledFormGroup>
                <span>{t('To find a zip code on the Israel post site')} <a
                    href={'https://mypost.israelpost.co.il/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%9E%D7%99%D7%A7%D7%95%D7%93/'}
                    target={'_blank'}>{t('click here')}</a></span>
            </StyledForm>
            <DevTool control={control}/>
        </StyledPatientDetails>
    );
};
const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir,
    };
};
export default connect(mapStateToProps, null)(PatientDetailsBlock);
