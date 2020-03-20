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
// import {updatePatientData} from "../../Services/FhirAPI";
import {updatePatientData} from "../../../../Utils/Services/FhirAPI";
import {StyledFormGroup} from "../../../../Components/Imaging/PatientAdmission/PatientDetailsBlock/Style";
import {getOrganizationTypeKupatHolim} from "../../../../Utils/Services/FhirAPI";
import {normalizeValueData} from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";
import {connect} from "react-redux";
import {setPatientDataAfterSave} from "../../../../Store/Actions/FhirActions/fhirActions";
import normalizeFhirPatient from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirPatient";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import {DatePicker} from '@material-ui/pickers/';


const PatientDataBlock = ({appointmentData, patientData, onEditButtonClick, edit_mode, languageDirection, formatDate, setPatientDataAfterSave}) => {

    const {t} = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientIdentifier, setPatientIdentifier] = useState({});
    const [patientAge, setPatientAge] = useState(0);

    const [patientEncounter, setPatientEncounter] = useState(0);
    const [patientKupatHolimList, setPatientKupatHolimList] = useState([]);
    const [healthManageOrgId, setHealthManageOrgId] = useState('');

    const {register, control, errors, handleSubmit, reset, setValue} = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data, e) => {
        (async () => {
            try {
                console.log("=========react hook form========");
                console.log(data);
                console.log("=========react hook form========");
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
    }, []);

    if (patientKupatHolimList.length == 0) {
        return null;
    }

    const handleUndoEdittingClick = () => {
        onEditButtonClick(0);
        reset(patientInitialValues);
        register({name: "healthManageOrganization"}, textFieldSelectNotEmptyRule);
    };

    const organizationData = patientKupatHolimList.find(obj => {
        return obj.code == (!isNaN(healthManageOrgId) && parseInt(healthManageOrgId) >= 0 ? healthManageOrgId : patientData.managingOrganization);
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
            setValue("healthManageOrganization", event.target.value, true);
            setHealthManageOrgId(event.target.value);
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
                        show_red_circle={edit_mode === 0 && patientEncounter.priority == 2 ? true : false}>
                        <Avatar alt={""} src={avatarIcon}/>
                    </StyledRoundAvatar>

                    <Typography variant="h5" noWrap={true}>
                        {edit_mode === 0 ? patientData.firstName + " " + patientData.lastName : ''}
                    </Typography>

                    <StyledAgeIdBlock>
                        <span>{patientIdentifier.type == "idtype_1" ? t("Id. Number") : t("Passport")} {patientIdentifier.value}</span>
                        <span>{patientData.gender == "male" ? t("Son") : t("Daughter")} {patientAge}</span>
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
                                as={
                                    <MuiPickersUtilsProvider utils={MomentUtils} moment={Moment}>
                                            <DatePicker
                                                disableToolbar
                                                format={"DD/MM/YYYY"}
                                                variant="inline"
                                                color={"primary"}
                                                required
                                                value={patientInitialValues.birthDate}
                                                label={t("birth day")}
                                                onChange={( ) => { }}
                                                InputProps={{
                                                    disableUnderline: edit_mode === 1 ? false : true,
                                                    endAdornment: (errors.birthDate &&
                                                        <InputAdornment position="end">
                                                            <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                autoOk
                                                error={errors.birthDate ? true : false}
                                                helperText={errors.birthDate ? t("Date must be in a date format") : null}
                                                {...TextFieldOpts}
                                            />
                                    </MuiPickersUtilsProvider>
                                }
                                control={control}
                                id="standard-birthDate"
                                name="birthDate"
                                placeholder={formatDate}
                                rules={{
                                    validate: {
                                        value: value => Moment(value, formatDate, true).isValid() === true
                                    }
                                }}
                            />
                            <TextField
                                id="standard-healthManageOrganization"
                                name="healthManageOrganization"
                                value={patientInitialValues.healthManageOrganizationValue}
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
                                    pattern: /^\(?([0-9]{2,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
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
                                            <ErrorOutlineIcon htmlColor={"#ff0000"}/>
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
//export default connect(mapStateToProps, {setFilterOrganizationAction, setFilterServiceTypeAction})(FilterBox);

