import React, {useEffect, useState} from 'react';
import * as Moment from "moment";
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from "react-i18next";

import {
    StyledDiv,
    StyledRoundAvatar,
    StyledAgeIdBlock,
    StyledTextInput,
    StyledAvatarIdBlock,
    StyledButtonBlock,
    StyledEmptyIconEdit,
    StyledGlobalStyle
} from "./Style";
import maleIcon from '../../../../Assets/Images/maleIcon.png';
import femaleIcon from '../../../../Assets/Images/womanIcon.png';
import CustomizedTableButton from '../../../../Assets/Elements/CustomizedTable/CustomizedTableButton';
import ageCalculator from "../../../../Utils/Helpers/ageCalculator";
import {Avatar, IconButton, Divider, Typography, TextField, MenuItem, InputAdornment} from '@material-ui/core';
import CustomizedDatePicker from "../../../../Assets/Elements/CustomizedDatePicker";
import EditIcon from '@material-ui/icons/Edit';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {updatePatientData} from "../../../../Utils/Services/FhirAPI";
import {
    StyledFormGroup,
    StyledPatientDetails
} from "../../../../Components/Imaging/PatientAdmission/PatientDetailsBlock/Style";
import {getOrganizationTypeKupatHolim} from "../../../../Utils/Services/FhirAPI";
import {normalizeValueData} from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";
import {connect} from "react-redux";
import {setPatientDataAfterSave} from "../../../../Store/Actions/FhirActions/fhirActions";
import normalizeFhirPatient from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirPatient";
import {getCellPhoneRegexPattern, getEmailRegexPattern} from "../../../../Utils/Helpers/validation/patterns";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const PatientDataBlock = ({appointmentData, patientData, onEditButtonClick, edit_mode, languageDirection, formatDate, setPatientDataAfterSave, priority}) => {

    const {t} = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientIdentifier, setPatientIdentifier] = useState({});
    const [patientAge, setPatientAge] = useState(0);
    const [patientBirthDate, setPatientBirthDate] = useState(Moment(patientData.birthDate).format(formatDate) || '');

    const [patientEncounter, setPatientEncounter] = useState(0);
    const [patientKupatHolimList, setPatientKupatHolimList] = useState([]);
    const [healthManageOrgId, setHealthManageOrgId] = useState('');

    const {register, control, errors, handleSubmit, reset, setValue} = useForm({
        mode: "onBlur",
        defaultValues: {
            birthDate: patientBirthDate
        }
    });

    const onSubmit = (data, e) => {
        (async () => {
            try {
                data.birthDate = Moment(data.birthDate, formatDate).format("YYYY-MM-DD");
                const answer = await updatePatientData(patientData.id, data);
                const patient = {
                    [patientData.id]: normalizeFhirPatient(answer.data)
                };
                setPatientDataAfterSave(patient);
            } catch (err) {
                console.log(err);
            }
        })();
        onEditButtonClick(0);
    };

    const emptyArrayAll = () => {
        return [{
            code: 0,
            name: t("Choose")
        }]
    };

    const textFieldSelectNotEmptyRule = {validate: {value: value => parseInt(value) !== 0}};

    const TextFieldOpts = {
        'disabled': edit_mode === 1 ? false : true,
        'color': edit_mode === 1 ? "primary" : 'primary',
        'variant': edit_mode === 1 ? "filled" : 'standard',
        'InputLabelProps': {
            shrink: true
        }
    };

    useEffect(() => {
        try {
            setAvatarIcon(patientData.gender === "male" ? maleIcon : patientData.gender === "female" ? femaleIcon : "");
            //use format date of FHIR date - YYYY-MM-DD only
            setPatientAge(ageCalculator(patientData.birthDate));
            setPatientIdentifier({type: patientData.identifierType, value: patientData.identifier} || {});
            if (appointmentData !== undefined) {
                //TO DO - in future use you need to change to encounterData
                setPatientEncounter(appointmentData || 0);
            }

            //It is necessary to get data from the server and fill the array.
            let array = emptyArrayAll();
            (async () => {
                try {
                    const {data: {entry: dataServiceType}} = await getOrganizationTypeKupatHolim();
                    for (let entry of dataServiceType) {
                        if (entry.resource !== undefined) {
                            entry.resource.name = t(entry.resource.name);
                            let setLabelKupatHolim = normalizeValueData(entry.resource);
                            array.push(setLabelKupatHolim);
                        }
                    }
                    setPatientKupatHolimList(array);
                } catch (e) {
                    console.log("Error during load list of kupat holim");
                }
            })();
        } catch (e) {
            console.log(e);
        }
    }, [patientData.id, patientData.birthDate]);

    useEffect(() => {
        register({name: "healthManageOrganization"}, textFieldSelectNotEmptyRule);
        register({name: "birthDate"});
    }, []);

    if (patientKupatHolimList.length == 0 || patientData.birthDate.length == 0) {
        return null;
    }

    const organizationData = patientKupatHolimList.find(obj => {
        return obj.code == (!isNaN(healthManageOrgId) && parseInt(healthManageOrgId) >= 0 ? healthManageOrgId : (patientData.managingOrganization === null || patientData.managingOrganization == undefined ? 0 : patientData.managingOrganization));
    });

    let patientInitialValues = {
        firstName: patientData.firstName || '',
        lastName: patientData.lastName || '',
        healthManageOrganization: patientData.managingOrganization || 0,
        healthManageOrganizationValue: edit_mode === 1 ? organizationData.code : organizationData.name,
        mobilePhone: patientData.mobileCellPhone || '',
        patientEmail: patientData.email || '',
    };

    const handleUndoEdittingClick = () => {
        onEditButtonClick(0);
        reset(patientInitialValues);
        setPatientBirthDate(Moment(patientData.birthDate).format(formatDate));
        register({name: "healthManageOrganization"}, textFieldSelectNotEmptyRule);
        register({name: "birthDate"});
    };

    const handleChangeKupatHolim = event => {
        try {
            setValue("healthManageOrganization", event.target.value, true);
            setHealthManageOrgId(event.target.value);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    const handleChangeBirthDate = date => {
        try {
            let newBirthDate = date.format(formatDate).toString();
            setValue("birthDate", newBirthDate, true);
            setPatientBirthDate(newBirthDate);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    return (
        <React.Fragment>
            <StyledGlobalStyle disable_vertical_scroll={edit_mode === 0 ? false : true}/>
            <StyledDiv edit_mode={edit_mode}>
                <StyledAvatarIdBlock>
                    {
                        edit_mode === 0 ? (
                            <IconButton onClick={() => {
                                window.scrollTo(0, 0);
                                onEditButtonClick(1);
                            }}>
                                <EditIcon/>
                            </IconButton>
                        ) : (
                            <StyledEmptyIconEdit/>
                        )
                    }
                    {/*patientEncounter.priority == 2 - the high priority*/}
                    <StyledRoundAvatar
                        show_red_circle={edit_mode === 0 && priority > 1 ? true : false}>
                        <Avatar alt={""} src={avatarIcon}/>
                    </StyledRoundAvatar>

                    <Typography variant="h5" noWrap={true}>
                        {edit_mode === 0 ? patientData.firstName + " " + patientData.lastName : ''}
                    </Typography>

                    <StyledAgeIdBlock>
                        <span>{t(patientIdentifier.type)} {patientIdentifier.value}</span>
                        <span>{t(patientData.ageGenderType)} {patientAge}</span>
                    </StyledAgeIdBlock>

                </StyledAvatarIdBlock>
                <Divider/>
                <StyledTextInput edit_mode={edit_mode} languageDirection={languageDirection}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StyledFormGroup>
                            {edit_mode === 1 &&
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-firstName"
                                name="firstName"
                                defaultValue={patientInitialValues.firstName}
                                label={t("First name")}
                                required
                                {...TextFieldOpts}
                            />
                            }
                            {edit_mode === 1 &&
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-lastName"
                                name="lastName"
                                defaultValue={patientInitialValues.lastName}
                                label={t("Last name")}
                                required
                                {...TextFieldOpts}
                            />
                            }
                            <Controller
                                name="birthDate"
                                control={control}
                                rules={{
                                    validate: {
                                        value: value => Moment(value, formatDate, true).isValid() === true
                                    }
                                }}
                                as={
                                    <CustomizedDatePicker
                                        PickerProps={{
                                            id: "standard-birthDate",
                                            format: "DD/MM/YYYY",
                                            name: "birthDate",
                                            required: edit_mode === 1 ? true : false,
                                            disableToolbar: false,
                                            label: t("birth day"),
                                            inputValue: patientBirthDate,
                                            mask: {formatDate},
                                            InputProps: {
                                                disableUnderline: edit_mode === 1 ? false : true,
                                            },
                                            disableFuture: true,
                                            color: edit_mode === 1 ? "primary" : 'primary',
                                            disabled: edit_mode === 1 ? false : true,
                                            variant: 'inline',
                                            inputVariant: edit_mode === 1 ? "filled" : 'standard',
                                            onChange: handleChangeBirthDate,
                                            autoOk: true,
                                            error: errors.birthDate ? true : false,
                                            helperText: errors.birthDate ? t("Date must be in a date format") : null,
                                        }}
                                        CustomizedProps={{
                                            keyBoardInput: true,
                                            showNextArrow: false,
                                            showPrevArrow: false,
                                        }}
                                    />
                                }
                            />
                            <TextField
                                id="standard-healthManageOrganization"
                                name="healthManageOrganization"
                                value={patientInitialValues.healthManageOrganizationValue}
                                label={t("Kupat Cholim")}
                                required={edit_mode === 1 ? true : false}
                                select={edit_mode === 1 ? true : false}
                                onChange={handleChangeKupatHolim}
                                SelectProps={{
                                    // onOpen: handleLoadListKupatHolim,
                                    IconComponent: (() => (
                                    <IconButton>
                                     <KeyboardArrowDownIcon />
                                    </IconButton>
                                    )),
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
                                error={errors.healthManageOrganization ? true : false}
                                helperText={errors.healthManageOrganization ? t("is a required field.") : null}
                                InputProps={{
                                    disableUnderline: edit_mode === 1 ? false : true,
                                    endAdornment: (errors.healthManageOrganization &&
                                        <InputAdornment position="end">
                                            <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                        </InputAdornment>
                                    ),
                                }}
                                {...TextFieldOpts}
                            >
                                {patientKupatHolimList.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option.code}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-mobilePhone"
                                name="mobilePhone"
                                defaultValue={patientInitialValues.mobilePhone}
                                label={t("Cell phone")}
                                rules={{
                                    pattern: getCellPhoneRegexPattern()
                                }}
                                error={errors.mobilePhone ? true : false}
                                helperText={errors.mobilePhone ? t("The number entered is incorrect") : null}
                                InputProps={{
                                    disableUnderline: edit_mode === 1 ? false : true,
                                    endAdornment: (errors.mobilePhone &&
                                        <InputAdornment position="end">
                                            <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                        </InputAdornment>
                                    ),
                                }}
                                required={edit_mode === 1 ? true : false}
                                {...TextFieldOpts}
                            />
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-patientEmail"
                                name="patientEmail"
                                defaultValue={patientInitialValues.patientEmail}
                                label={t("Mail address")}
                                error={errors.patientEmail ? true : false}
                                helperText={errors.patientEmail ? t("Invalid email address") : null}
                                InputProps={{
                                    disableUnderline: edit_mode === 1 ? false : true,
                                    endAdornment: (errors.patientEmail &&
                                        <InputAdornment position="end">
                                            <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                        </InputAdornment>
                                    ),
                                }}
                                rules={{
                                    pattern: getEmailRegexPattern()
                                }}
                                {...TextFieldOpts}
                            />
                        </StyledFormGroup>
                        {edit_mode === 1 &&
                        <StyledButtonBlock>
                            <CustomizedTableButton variant={"text"} color={"primary"} label={t("Undo editing")}
                                                   onClickHandler={handleUndoEdittingClick}/>
                            <CustomizedTableButton variant={"contained"} color={"primary"} label={t("save")}
                                                   type={"submit"}/>
                        </StyledButtonBlock>
                        }

                    </form>
                </StyledTextInput>
            </StyledDiv>
        </React.Fragment>

    );
};

export default connect(null, {setPatientDataAfterSave})(PatientDataBlock);
