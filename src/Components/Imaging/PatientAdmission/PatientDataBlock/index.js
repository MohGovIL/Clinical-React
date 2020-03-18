import React, { useEffect, useState } from 'react';
import * as Moment from "moment";
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from "react-i18next";

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
// import MaskedInput from 'react-text-mask';
import { Avatar, IconButton, Divider, Typography, TextField, MenuItem, Select, InputLabel, InputAdornment } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import { StyledFormGroup } from "../../../../Components/Imaging/PatientAdmission/PatientDetailsBlock/Style";
// import {StyledButton, StyledMenu} from "../../../../Assets/Elements/CustomizedSelect/Style";
import { getOrganizationTypeKupatHolim } from "../../../../Utils/Services/FhirAPI";
import { normalizeValueData } from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";
// import * as yup from "yup";


const PatientDataBlock = ({ appointmentData, patientData, onEditButtonClick, edit_mode, formatDate }) => {

    const { t } = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientIdentifier, setPatientIdentifier] = useState({});
    const [patientAge, setPatientAge] = useState(0);

    const [patientEncounter, setPatientEncounter] = useState(0);
    const [patientKupatHolimList, setPatientKupatHolimList] = useState([]);
    const [healthManageOrgId, setHealthManageOrgId] = useState('');


    // const PatientDataBlockSchema = yup.object().shape({
    //     birthDate: yup.string().required(),
    //     age: yup
    //         .number()
    //         .required()
    //         .positive()
    //         .integer(),
    //     website: yup.string().url()
    // });

    const { register, control, errors, handleSubmit, reset, setValue } = useForm();

    const onSubmit = (data, e) => {
        console.log(data);
        onEditButtonClick(0);
    };

    const emptyArrayAll = () => {
        return [{
            code: 0,
            name: t("All")
        }]
    };

    const TextFieldOpts = {
        'disabled': edit_mode === 1 ? false : true,
        //'InputProps': {disableUnderline: edit_mode === 1 ? false : true},
        'color': edit_mode === 1 ? "primary" : 'primary',
        'variant': edit_mode === 1 ? "filled" : 'standard',
    };

    useEffect(() => {
        try {
            setAvatarIcon(patientData.gender === "male" ? maleIcon : patientData.gender === "female" ? femaleIcon : "");
            //use format date of FHIR date - YYYY-MM-DD only
            setPatientAge(ageCalculator(patientData.birthDate));
            setPatientIdentifier(patientData.identifier || {});

            if (appointmentData !== undefined) {
                //TO DO - in future use you need to change to encounterData
                setPatientEncounter(appointmentData || 0);
            }

            //It is necessary to get data from the server and fill the array.
            let array = emptyArrayAll();
            (async () => {
                try {
                    const { data: { entry: dataServiceType } } = await getOrganizationTypeKupatHolim();
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
    }, [patientData.id]);

    useEffect(() => {
        let rules={ validate: {value: value => value !== 0 || 'error message'}};
        register({name: "healthManageOrganization"}, rules);
    }, []);

    if (patientKupatHolimList.length == 0) {
        return null;
    }

    const handleUndoEdittingClick = () => {
        onEditButtonClick(0);
        reset(patientInitialValues);
        register({ name: "healthManageOrganization" });
    };

    const organizationData = patientKupatHolimList.find(obj => {
        return obj.code == (!isNaN(healthManageOrgId) && parseInt(healthManageOrgId) > 0 ? healthManageOrgId : patientData.managingOrganization);
    });

    let patientInitialValues = {
        firstName: patientData.firstName || '',
        lastName: patientData.lastName || '',
        birthDate: Moment(patientData.birthDate).format(formatDate) || '',
        healthManageOrganization: patientData.managingOrganization || 0,
        healthManageOrganizationValue: edit_mode === 1 ? organizationData.code : organizationData.name,
        mobilePhone: patientData.mobileCellPhone || patientData.homePhone || '',
        patientEmail: patientData.email || '',
    };

    const handleChangeKupatHolim = event => {
        try {
            const res = patientKupatHolimList.find(obj => {
                return obj.code == event.target.value;
            });
            setValue("healthManageOrganization", event.target.value);
            setHealthManageOrgId(event.target.value);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    return (
        <React.Fragment>
            <StyledGlobalStyle disable_vertical_scroll={edit_mode === 0 ? false : true} />
            <StyledDiv edit_mode={edit_mode}>
                <StyledAvatarIdBlock>
                    {
                        edit_mode === 0 ? (
                            <IconButton onClick={() => {
                                window.scrollTo(0, 0);
                                onEditButtonClick(1)        //'InputProps': {disableUnderline: edit_mode === 1 ? false : true},

                            }}>
                                <EditIcon />
                            </IconButton>
                        ) : (
                                <StyledEmptyIconEdit />
                            )
                    }
                    {/*patientEncounter.priority == 2 - the high priority*/}
                    <StyledRoundAvatar
                        show_red_circle={edit_mode === 0 && patientEncounter.priority == 2 ? true : false}>
                        <Avatar alt={""} src={avatarIcon} />
                    </StyledRoundAvatar>

                    <Typography variant="h5" noWrap={true}>
                        {edit_mode === 0 ? patientData.firstName + " " + patientData.lastName : ''}
                    </Typography>

                    <StyledAgeIdBlock>
                        <span>{patientIdentifier.type == "ID" ? t("Id. Number") : t("Passport")} {patientIdentifier.value}</span>
                        <span>{patientData.gender == "male" ? t("Son") : t("Daughter")} {patientAge}</span>
                    </StyledAgeIdBlock>

                </StyledAvatarIdBlock>
                <Divider />
                <StyledTextInput edit_mode={edit_mode}>
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
                                    // error={errors.lastName ? true : false}
                                    // helperText={errors.lastName ? t("Date must be in a date format") : null}
                                    // rules={{ pattern: /^[a-zA-Z.+\s'-]+$/}}
                                    required
                                    {...TextFieldOpts}
                                />
                            }
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-birthDate"
                                name="birthDate"
                                placeholder={formatDate}
                                defaultValue={patientInitialValues.birthDate}
                                label={t("birth day")}
                                required
                                error={errors.birthDate ? true : false}
                                helperText={errors.birthDate ? t("Date must be in a date format") : null}
                                InputProps={{
                                    disableUnderline: edit_mode === 1 ? false : true,
                                    endAdornment: (errors.birthDate &&
                                        <InputAdornment position="end">
                                            <ErrorOutlineIcon htmlColor={"#ff0000"} />
                                        </InputAdornment>
                                    ),
                                }}
                                rules={{
                                    validate: {
                                        value: value => Moment(value, formatDate, true).isValid() === true
                                    }
                                }}
                                {...TextFieldOpts}
                            />
                            <TextField
                                id="standard-healthManageOrganization"
                                name="healthManageOrganization"
                                defaultValue={patientInitialValues.healthManageOrganizationValue}
                                label={t("Kupat Cholim")}
                                required
                                select={edit_mode === 1 ? true : false}
                                onChange={handleChangeKupatHolim}
                                SelectProps={{
                                    // onOpen: handleLoadListKupatHolim,
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
                                    pattern: /^\(?([0-9]{2,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
                                }}
                                error={errors.mobilePhone ? true : false}
                                helperText={errors.mobilePhone ? t("The number entered is incorrect") : null}
                                InputProps={{
                                    disableUnderline: edit_mode === 1 ? false : true,
                                    endAdornment: (errors.mobilePhone &&
                                        <InputAdornment position="end">
                                            <ErrorOutlineIcon htmlColor={"#ff0000"} />
                                        </InputAdornment>
                                    ),
                                }}
                                required
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
                                            <ErrorOutlineIcon htmlColor={"#ff0000"} />
                                        </InputAdornment>
                                    ),
                                }}
                                rules={{
                                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
                                }}
                                {...TextFieldOpts}
                            />
                        </StyledFormGroup>
                        {edit_mode === 1 &&
                            <StyledButtonBlock>
                                <CustomizedTableButton variant={"text"} color={"primary"} label={t("Undo editing")}
                                    onClickHandler={handleUndoEdittingClick} />
                                <CustomizedTableButton variant={"contained"} color={"primary"} label={t("save")}
                                    type={"submit"} />
                            </StyledButtonBlock>
                        }

                    </form>
                </StyledTextInput>
            </StyledDiv>
        </React.Fragment>

    );
};

export default PatientDataBlock;

