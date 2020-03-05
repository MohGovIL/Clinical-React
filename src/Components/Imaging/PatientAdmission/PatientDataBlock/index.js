import React, {useEffect, useState} from 'react';
import * as Moment from "moment";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";

import {
    StyledDiv,
    StyledRoundAvatar,
    StyledAgeIdBlock,
    StyledTextInput,
    StyledAvatarIdBlock,
    StyledButtonBlock
} from "./Style";
import maleIcon from '../../../../Assets/Images/maleIcon.png';
import femaleIcon from '../../../../Assets/Images/womanIcon.png';
import CustomizedTableButton from '../../../../Assets/Elements/CustomizedTable/CustomizedTableButton';
import ageCalculator from "../../../../Utils/Helpers/ageCalculator";

import {Avatar, IconButton, Divider, Typography, TextField, InputLabel} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {StyledFormGroup} from "../../../../Components/Imaging/PatientAdmission/PatientDetailsBlock/Style";


const PatientDataBlock = ({appointmentId, patientData, onEditButtonClick, edit_mode, appointmentsData}) => {
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
            setAvatarIcon(patientData.gender === "male" ? maleIcon : patientData.gender === "female" ? femaleIcon : "")
            //use format date of FHIR date - YYYY-MM-DD only
            setPatientAge(ageCalculator(patientData.birthDate));
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

    const handleCloseEdit = () => {
        // setEdit(false);
    }

    const handleSaveClick = () => {

    }

    const handleUndoEdittingClick = () => {
        onEditButtonClick(0);
    }

    let TextFieldOpts = {
        'disabled': edit_mode === 1 ? false : true,
        'InputProps': {disableUnderline: edit_mode === 1 ? false : true},
        'color': edit_mode === 1 ? "primary" : 'primary',
        'variant': edit_mode === 1 ? "filled" : 'filled',
        // 'variant': edit_mode === true ? "filled" : 'standard',
    };

    let labelRequiredOpts = {
        'required': edit_mode === 1 ? true : false
    };
console.log("======================");
console.log(TextFieldOpts);
console.log("======================");
//aria-hidden={"true"}
    return (
        <React.Fragment>
            <StyledDiv edit_mode={edit_mode}>
                <StyledAvatarIdBlock>
                    {edit_mode === 0 &&
                    <IconButton onClick={() => {
                        onEditButtonClick(1)
                    }}>
                        <EditIcon/>
                    </IconButton>
                    }
                    <StyledRoundAvatar encounterPriority={patientEncounter.priority}>
                        <Avatar alt={""} src={avatarIcon}/>
                    </StyledRoundAvatar>

                    <Typography variant="h5" noWrap={true}>
                        {edit_mode === 0 ? patientData.firstName + " " + patientData.lastName : ''}
                    </Typography>

                    <StyledAgeIdBlock>
                        <span>{patientIdentifier.type == "ID" ? t("Id. Number") : t("Passport")} {patientIdentifier.value}</span>
                        <span>{patientData.gender == "male" ? t("Son") : t("Daughter")} {patientAge}</span>
                    </StyledAgeIdBlock>

                </StyledAvatarIdBlock>
                <Divider/>
                <StyledTextInput>
                    <form noValidate autoComplete="off">
                        <StyledFormGroup>
                            {edit_mode === 1 &&
                            <TextField
                                id="standard-firstName"
                                value={patientData.firstName}
                                onChange={handleBirthdayChange}
                                label={t("First name")}
                                required
                                {...TextFieldOpts}
                            />
                            }
                            {edit_mode === 1 &&
                            <TextField
                                id="standard-lastName"
                                value={patientData.lastName}
                                onChange={handleBirthdayChange}
                                label={t("Last name")}
                                required
                                {...TextFieldOpts}
                            />

                        }
                        <TextField
                            id="standard-birthDate"
                            value={patientBirthDate}
                            onChange={handleBirthdayChange}
                            label={t("birth day")}
                            required
                            {...TextFieldOpts}
                        />
                        <TextField
                            id="standard-kupatCholim"
                            value={patientKupatHolim}
                            label={t("Kupat Cholim")}
                            required
                            {...TextFieldOpts}

                        />
                        <TextField
                            id="standard-mobilePhone"
                            value={patientMobilePhone}
                            label={t("Cell phone")}
                            required
                            {...TextFieldOpts}
                        />
                        <TextField
                            id="standard-patientEmail"
                            value={patientEmail}
                            label={t("Mail address")}
                            {...TextFieldOpts}
                        />
                        </StyledFormGroup>
                        {edit_mode === 1 &&
                        <StyledButtonBlock>
                            <CustomizedTableButton variant={"text"} color={"primary"} label={t("Undo editing")}
                                                   onClickHandler={handleUndoEdittingClick}/>
                            <CustomizedTableButton variant={"contained"} color={"primary"} label={t("save")}/>
                        </StyledButtonBlock>
                        }

                    </form>
                </StyledTextInput>
            </StyledDiv>
        </React.Fragment>
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

