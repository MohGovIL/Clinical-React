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

import {Avatar, IconButton, Divider, Typography, TextField, InputLabel, MenuItem, Menu} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {StyledFormGroup} from "../../../../Components/Imaging/PatientAdmission/PatientDetailsBlock/Style";
import {StyledButton, StyledMenu} from "../../../../Assets/Elements/CustomizedSelect/Style";
import {getHealhcareService, getOrganizationTypeKupatHolim} from "../../../../Utils/Services/FhirAPI";
import {normalizeValueData} from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";

const PatientDataBlock = ({appointmentId, patientData, onEditButtonClick, edit_mode, appointmentsData}) => {
    const {t} = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientAge, setPatientAge] = useState(0);
    const [patientBirthDate, setPatientBirthDate] = useState('');
    const [patientIdentifier, setPatientIdentifier] = useState({});
    const [patientMobilePhone, setPatientMobilePhone] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientEncounter, setPatientEncounter] = useState(0);
    const [patientKupatHolim, setPatientKupatHolim] = useState(0);
    const [patientKupatHolimList, setPatientKupatHolimList] = useState([{code: 0, name: "All"}]);

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
            setPatientKupatHolim(6); //TO DO - change to dynamic mode from DB
            setPatientKupatHolimList([{code: 0, name: "Clalit"}]); //TO DO - change to dynamic mode from DB
        } catch (e) {
            console.log(e);
        }
    }, [patientData.gender]);


    const handleBirthdayChange = () => {
        console.log("handleBirthdayChange");
    };

    const handleCloseEdit = () => {

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

    const emptyArrayAll = () => {
        return [{
            code: 0,
            name: t("All")
        }]
    };

    const handleLoadListKupatHolim = () => {
        let array = emptyArrayAll();

        //If object is empty - load kupat holi, from server
        if (Object.keys(patientKupatHolimList).length <= 1) {
            (async () => {
                try {
                    const {data: {entry: dataServiceType}} = await getOrganizationTypeKupatHolim();
                    for (let entry of dataServiceType) {
                        if (entry.resource !== undefined) {
                            const setLabelKupatHolim = normalizeValueData(entry.resource);
                            array.push(setLabelKupatHolim);
                        }
                    }
                    setPatientKupatHolimList(array);
                } catch (e) {
                    console.log("Error during load list of kupat holim");
                }
            })();
        }
    }

    const handleClick = event => {
        try {
            const res = patientKupatHolimList.find(obj => {
                return obj.code == event.target.value
            });
            setPatientKupatHolim(res.code);
            console.log("=======================");
            console.log(res.name);
            console.log(patientKupatHolimList);
            console.log("=======================");

        } catch (e) {
            console.log("Error");
        }
    };
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
                                select={edit_mode === 1 ? true : false}
                                {...TextFieldOpts}

                                onClick={handleClick}
                                SelectProps={{
                                    onOpen: handleLoadListKupatHolim,
                                    MenuProps: {
                                        elevation: 0,
                                        keepMounted: true,
                                        getContentAnchorEl: null,
                                        anchorOrigin: {
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        },
                                        transformOrigin: {
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }
                                    }
                                }}
                            >
                                {patientKupatHolimList.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option.code}
                                              selected={option.code === patientKupatHolim}>
                                        {t(option.name)}
                                    </MenuItem>
                                ))}
                            </TextField>
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

