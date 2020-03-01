import React, {useEffect, useState} from 'react';
import {StyledDiv, StyledRoundAvatar, StyledAgeIdBlock, StyledTextInput, StyledAvatarIdBlock} from "./Style";
import maleIcon from '../../../../Assets/Images/maleIcon.png';
import femaleIcon from '../../../../Assets/Images/womanIcon.png';
import * as Moment from "moment";

import {Avatar, IconButton, Divider, Typography, TextField, InputLabel} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";

const PatientDataBlock = ({appointmentId, patientData, appointmentsData}) => {
    const {t} = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientAge, setPatientAge] = useState(0);
    const [patientBirthDate, setPatientBirthDate] = useState('');
    const [patientIdentifier, setPatientIdentifier] = useState({});
    const [patientMobilePhone, setPatientMobilePhone] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientEncounter, setPatientEncounter] = useState(0);
    const [patientKupatHolim, setPatientKupatHolim] = useState("leumi");

    useEffect(() => {
        try {
            setAvatarIcon(patientData.gender == "male" ? maleIcon : patientData.gender == "female" ? femaleIcon : "")
            //use format date of FHIR date - YYYY-MM-DD only
            setPatientAge(Math.floor(Moment(new Date()).diff(Moment(patientData.birthDate, "YYYY-MM-DD"), 'years', true)));
            setPatientBirthDate(patientData.birthDate || '');
            setPatientIdentifier(patientData.identifier || {});
            setPatientMobilePhone(patientData.mobileCellPhone || '');
            setPatientEmail(patientData.email || '');
            if (appointmentsData !== undefined) {
                //TO DO - in future use you need to change to encountersData
                setPatientEncounter(appointmentsData[appointmentId] || 0);
            }
        } catch (e) {
            console.log(e);
        }
    }, [patientData.gender]);


    const handleBirthdayChange = () => {
        console.log("handleBirthdayChange");
    };

    return (
        <StyledDiv>
            <StyledAvatarIdBlock>
                <IconButton>
                    <EditIcon/>
                </IconButton>

                <StyledRoundAvatar encounterPriority={patientEncounter.priority}>
                    <Avatar alt={""} src={avatarIcon}/>
                </StyledRoundAvatar>

                <Typography variant="h5" noWrap={true}>
                    {patientData.firstName + " " + patientData.lastName}
                </Typography>

                <StyledAgeIdBlock>
                    <span>{patientIdentifier.type == "ID" ? t("Id. Number") : t("Passport")} {patientIdentifier.value}</span>
                    <span>{patientData.gender == "male" ? t("Son") : t("Daughter")} {patientAge}</span>
                </StyledAgeIdBlock>

            </StyledAvatarIdBlock>
            <Divider/>
            <StyledTextInput>
                <form noValidate autoComplete="off">
                    <InputLabel>{t("birth day")}</InputLabel>
                    <TextField
                        id="standard-birthDate"
                        value={patientBirthDate}
                        onChange={handleBirthdayChange}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        readOnly
                    />

                    <InputLabel>{t("Kupat Cholim")}</InputLabel>
                    <TextField
                        id="standard-kupatCholim"
                        value={patientKupatHolim}
                        InputProps={{
                            disableUnderline: true,
                        }}

                    />

                    <InputLabel>{t("Cell phone")}</InputLabel>
                    <TextField
                        id="standard-mobilePhone"
                        value={patientMobilePhone}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        readOnly
                    />
                    <InputLabel>{t("Mail address")}</InputLabel>
                    <TextField
                        id="standard-patientEmail"
                        value={patientEmail}
                        InputProps={{
                            disableUnderline: true,
                        }}
                        readOnly
                    />
                </form>
            </StyledTextInput>
        </StyledDiv>
    );
};

const mapStateToProps = state => {
    return {
        appointmentsData: state.fhirData.appointments,
        //TO DO - uncomment after encounter data
        // encountersData: state.fhirData.encounters,
    };
};

export default connect(mapStateToProps, null)(PatientDataBlock);

