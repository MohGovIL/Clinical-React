import React, {useState} from 'react';
import {StyledForm, StyledPatientDetails, StyledFormGroup, StyledDivider, StyledTextField} from "./Style"
import {useTranslation} from "react-i18next";
import Title from "../../../../Assets/Elements/Title";
import Switch from "@material-ui/core/Switch";
import {useForm, Controller} from "react-hook-form";
import {connect} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const PatientDetailsBlock = ({languageDirection}) => {
    const {t} = useTranslation();

    const {register, handleSubmit, watch, errors, control} = useForm();

    const onSubmit = data => {
        console.log(data)
    };


    const [value, setValue] = useState(0);

    const [addressCity, setAddressCity] = useState('');

    const [street, setStreet] = useState('');

    const tabsChangeHandler = (event, newValue) => {
        setValue(newValue);
    };
    const cityChangeHandler = event => {
        setAddressCity(event.target.value);
    };
    const streetChangeHandler = event => {
        setStreet(event.target.value);
    };

    return (
        <StyledPatientDetails>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <Title fontSize={'28px'} color={'#002398'} label={'Patient Details'}/>
                <StyledFormGroup title={t('Accompanying patient')}>
                    <Title fontSize={'18px'} color={'#000b40'} label={'Accompanying patient'} bold/>
                    <StyledDivider variant={"fullWidth"}/>
                    <span>{t('Patient arrived with an escort?')}</span><Controller defaultValue={true} control={control}
                                                                                   as={<Switch color={"primary"}/>}
                                                                                   name={'accompanyingPatientSwitch'}/>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Title fontSize={'18px'} color={'#000b40'} label={t('Escort details')} bold/>
                    <StyledDivider variant={"fullWidth"}/>
                    <StyledTextField id={'escortName'} label={t('Escort name')}/>
                    <StyledTextField id={'escortMobilePhone'} label={t('Escort cell phone ')}/>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Title fontSize={'18px'} color={'#000b40'} label={t('Contact Information')} bold/>
                    <StyledDivider variant={"fullWidth"}/>
                    <Tabs
                        value={value}
                        onChange={tabsChangeHandler}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="standard"
                        aria-label="full width tabs example">
                        <Tab label={t('Address')}/>
                        <Tab label={t('PO box')}/>
                    </Tabs>
                    {value === 0 ?
                        <React.Fragment>
                            <InputLabel id="addressCity">{t('City')}</InputLabel>
                            <Select
                                labelId="addressCity"
                                id="addressCity"
                                value={addressCity}
                                onChange={cityChangeHandler}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <InputLabel id="addressStreet">{t('Street')}</InputLabel>
                            <Select
                                labelId="addressStreet"
                                id="addressStreet"
                                value={street}
                                onChange={streetChangeHandler}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <StyledTextField id={'addressHouseNumber'} label={t('House number')}/>
                            <StyledTextField id={'addressPostalCode'} label={t('Postal code')}/>
                        </React.Fragment>
                        : <React.Fragment>
                            <StyledTextField id={'POBoxCity'} label={t('City')}/>
                            <StyledTextField id={'POBox'} label={t('PO box')}/>
                            <StyledTextField id={'POBoxPostalCode'} label={t('Postal code')}/>
                        </React.Fragment> }
                </StyledFormGroup>
                <span>{t('To find a zip code on the Israel post site')} <a href={'https://mypost.israelpost.co.il/%D7%A9%D7%99%D7%A8%D7%95%D7%AA%D7%99%D7%9D/%D7%90%D7%99%D7%AA%D7%95%D7%A8-%D7%9E%D7%99%D7%A7%D7%95%D7%93/'} target={"_blank"}>{t('click here')}</a></span>
            </StyledForm>
        </StyledPatientDetails>
    );
};
const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir,
    }
};
export default connect(mapStateToProps, null)(PatientDetailsBlock);
