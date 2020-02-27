import React, {useEffect, useState} from 'react';
import {StyledDiv, StyledRoundAvatar, StyledAgeIdBlock, StyledTextInput, StyledAvatarIdBlock} from "./Style";
import maleIcon from '../../../../Assets/Images/maleIcon.png';
import femaleIcon from '../../../../Assets/Images/womanIcon.png';
import * as Moment from "moment";

import {Avatar, IconButton, Divider, Typography, TextField, InputLabel} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
// import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTranslation} from "react-i18next";
// import {StyledDatePicker} from "../../../../Assets/Elements/CustomizedDatePicker/Styles";
// import {devicesValue} from "../../../../../../../../client-app/src/Assets/Themes/BreakPoints";

const PatientDataBlock = ({patientData}) => {
    const {t} = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientAge, setPatientAge] = useState(0);
    const [patientBirthDate, setPatientBirthDate] = useState('');
    const [patientIdentifier, setPatientIdentifier] = useState({});

    //const matches = useMediaQuery(`(min-width:${devicesValue.desktop}px)`);

    useEffect(() => {
        setAvatarIcon(patientData.gender == "male" ? maleIcon : patientData.gender == "female" ? femaleIcon : "")
        //use format date of FHIR date - YYYY-MM-DD only
        setPatientAge(Math.floor(Moment(new Date()).diff(Moment(patientData.birthDate, "YYYY-MM-DD"), 'years', true)));
        setPatientBirthDate(patientData.birthDate || '');
        setPatientIdentifier(patientData.identifier || {});

        console.log("======================");
        console.log(patientData);
        console.log("======================");
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

                <StyledRoundAvatar>
                    <Avatar alt={""} src={avatarIcon}/>
                </StyledRoundAvatar>

                <Typography variant="h5" noWrap={true}>
                    {patientData.firstName + " " + patientData.lastName}
                </Typography>

                <StyledAgeIdBlock>
                    <p className={"identifier"}>{patientIdentifier.type == "ID" ? t("Id. Number") : t("Passport")} {patientIdentifier.value}</p>
                    <p className={"age"}>{patientData.gender == "male" ? t("Son") : t("Daughter")} {patientAge}</p>
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
                        value="Cholim"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        readOnly
                    />

                    <InputLabel>{t("Cell phone")}</InputLabel>
                    <TextField
                        id="standard-kupatCholim"
                        value="2"
                        InputProps={{
                            disableUnderline: true,
                        }}
                        readOnly
                    />
                    <InputLabel>{t("Mail address")}</InputLabel>
                    <TextField
                        id="standard-kupatCholim"
                        value="Cholim"
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

export default PatientDataBlock;
