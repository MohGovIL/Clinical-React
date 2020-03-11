import React, {useState} from 'react';
import {StyledForm, StyledPatientDetails, StyledFormGroup, StyledDivider, StyledTextField} from './Style';
import {useTranslation} from 'react-i18next';
import Title from '../../../../Assets/Elements/Title';
import Switch from '@material-ui/core/Switch';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useForm, Controller} from 'react-hook-form';
import {connect} from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
    ExpandMore,
    ExpandLess,
} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

const PatientDetailsBlock = ({languageDirection}) => {
    const {t} = useTranslation();

    const addressCityClickHandler = () => {
      setCities(["Lod", "Tel-Aviv", "Petah-Tikva"])
    };

    const [cities, setCities] = useState([]);

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
    //Address city
    const [addressCity, setAddressCity] = useState('');
    const addressCityChangeHandler = event => {
        setAddressCity(event.target.value);
    };
    //Address street
    const [addressStreet, setAddressStreet] = useState('');
    const addressStreetChangeHandler = event => {
        setAddressStreet(event.target.value);
    };

    //TODO add react hook form
    const handleSubmit = () => {
        console.log('submit');
    };

    return (
        <StyledPatientDetails>
            <StyledForm onSubmit={handleSubmit}>
                <Title fontSize={'28px'} color={'#002398'} label={'Patient Details'}/>
                <StyledFormGroup title={t('Accompanying patient')}>
                    <Title fontSize={'18px'} color={'#000b40'} label={'Accompanying patient'} bold/>
                    <StyledDivider variant={'fullWidth'}/>
                    <span>{t('Patient arrived with an escort?')}</span><Switch size={'medium'} color={'primary'}
                                                                               onChange={switchOnChangeHandle}
                                                                               value={isEscorted}/>
                </StyledFormGroup>
                {isEscorted ?
                    <StyledFormGroup>
                        <Title fontSize={'18px'} color={'#000b40'} label={t('Escort details')} bold/>
                        <StyledDivider variant={'fullWidth'}/>
                        <StyledTextField id={'escortName'} label={t('Escort name')}/>
                        <StyledTextField id={'escortMobilePhone'} label={t('Escort cell phone ')}/>
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
                            <Autocomplete
                                disablePortal
                                options={cities}
                                id={'addressCity'}
                                renderInput={params => <StyledTextField {...params} label={t('City')}
                                                                        value={addressCity} InputProps={{
                                    [languageDirection === 'rtl' ? 'endAdornment' : 'startAdornment']:
                                        <InputAdornment position={'end'}>{<ExpandMore/>}</InputAdornment>,
                                }}
                                                                        onChange={addressCityChangeHandler}
                                onClick={addressCityClickHandler}/>}
                            />
                            <StyledTextField
                                label={t('Street')}
                                select
                                id="addressStreet"
                                value={addressStreet}
                                onChange={addressStreetChangeHandler}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </StyledTextField>
                            <StyledTextField id={'addressHouseNumber'} label={t('House number')}/>
                            <StyledTextField id={'addressPostalCode'} label={t('Postal code')}/>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <StyledTextField id={'POBoxCity'} label={t('City')}/>
                            <StyledTextField id={'POBox'} label={t('PO box')}/>
                            <StyledTextField id={'POBoxPostalCode'} label={t('Postal code')}/>
                        </React.Fragment>}
                </StyledFormGroup>
                <span>{t('To find a zip code on the Israel post site')} <a
                    href={'https://mypost.israelpost.co.il/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%9E%D7%99%D7%A7%D7%95%D7%93/'}
                    target={'_blank'}>{t('click here')}</a></span>
            </StyledForm>
        </StyledPatientDetails>
    );
};
const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir,
    };
};
export default connect(mapStateToProps, null)(PatientDetailsBlock);
