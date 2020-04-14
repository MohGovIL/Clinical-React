import React, {useState, useEffect} from "react";
import * as Moment from "moment";
import CustomizedPopup from "../../CustomizedPopup";
import {useTranslation} from "react-i18next";
import {Controller, useForm} from "react-hook-form";
import {InputAdornment, MenuItem, TextField} from "@material-ui/core";
import {StyledColumnFirst, StyledColumnSecond, StyledForm, StyledRowEmail, StyledBox} from "./Style";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {connect} from "react-redux";
import CustomizedDatePicker from "../../CustomizedDatePicker";
import {getCellPhoneRegexPattern, getEmailRegexPattern} from "../../../../Utils/Helpers/validation/patterns";
import {getOrganizationTypeKupatHolim, getValueSet} from "../../../../Utils/Services/FhirAPI";
import {normalizeValueData} from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";
import {emptyArrayAll} from "../../../../Utils/Helpers/emptyArray";
import normalizeFhirValueSet from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet";

const PopupNewPatient = ({popupOpen, handlePopupClose, languageDirection, formatDate}) => {
    const {t} = useTranslation();

    const [idTypesList, setIdTypesList] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [kupatHolimList, setKupatHolimList] = useState([]);

    const {register, control, errors, handleSubmit, reset, setValue} = useForm({
        mode: "onBlur",
        // defaultValues: {
        //     birthDate: patientBirthDate
        // }
    });

    const onSubmit = (data, e) => {
    };

    useEffect(() => {
        //Load id types list
        (async () => {
            try {
                const {data: {expansion: {contains}}} = await getValueSet('identifier_type_list');
                let options = emptyArrayAll(t("Choose"));
                for (let status of contains) {
                    options.push(normalizeFhirValueSet(status));
                }
                setIdTypesList(options);
            } catch (err) {
                console.log(err);
            }
        })();

        //Load KupatHolim list
        let array = emptyArrayAll(t("Choose"));
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
                setKupatHolimList(array);
            } catch (e) {
                console.log("Error during load list of kupat holim");
            }
        })();

        //Load gender list
        (async () => {
            try {
                const {data: {expansion: {contains}}} = await getValueSet('gender');
                let options = emptyArrayAll(t("Choose"));
                for (let status of contains) {
                    options.push(normalizeFhirValueSet(status));
                }
                setGenderList(options);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const bottomButtonsData = [
        {
            'label': t('Save patient'),
            'variant': "text",
            'color': "primary",
            'type': "submit"
        },
        {
            'label': t('Patient Admission'),
            'variant': "contained",
            'color': "primary",
            'onClickHandler': handlePopupClose //user function
        },
        {
            'label': t('Create Appointment'),
            'variant': "contained",
            'color': "primary",
            'onClickHandler': handlePopupClose //user function
        }
    ];

    const TextFieldOpts = {
        'color': 'primary',
        'variant': 'filled'
    };

    return (
        <CustomizedPopup isOpen={popupOpen} onClose={handlePopupClose}
                         title={t('Add New Patient')}
                         content_dividers={false}
                         bottomButtons={bottomButtonsData}
                         dialogMaxWidth={'md'}
        >
            <StyledForm onSubmit={handleSubmit(onSubmit)} languageDirection={languageDirection}>
                <StyledBox>
                    <StyledColumnFirst>
                        <Controller
                            as={TextField}
                            control={control}
                            id="standard-idNumber"
                            name="idNumber"
                            // defaultValue={patientInitialValues.firstName}
                            label={t("id number")}
                            required
                            {...TextFieldOpts}
                        />
                        <Controller
                            as={TextField}
                            control={control}
                            id="standard-firstName"
                            name="firstName"
                            // defaultValue={patientInitialValues.firstName}
                            label={t("First Name")}
                            required
                            {...TextFieldOpts}
                        />
                        <TextField
                            id="standard-gender"
                            name="gender"
                            // value={patientInitialValues.healthManageOrganizationValue}
                            label={t("Gender")}
                            required
                            select
                            // onChange={handleChangeKupatHolim}
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
                                // disableUnderline: edit_mode === 1 ? false : true,
                                endAdornment: (errors.healthManageOrganization &&
                                    <InputAdornment position="end">
                                        <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                    </InputAdornment>
                                ),
                            }}
                            {...TextFieldOpts}
                        >
                            {genderList.map((option, optionIndex) => (
                                <MenuItem key={optionIndex} value={option.code}>
                                    {t(option.name)}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="standard-healthManageOrganization"
                            name="healthManageOrganization"
                            // value={patientInitialValues.healthManageOrganizationValue}
                            label={t("Kupat Cholim")}
                            required
                            select
                            // onChange={handleChangeKupatHolim}
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
                                endAdornment: (errors.healthManageOrganization &&
                                    <InputAdornment position="end">
                                        <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                    </InputAdornment>
                                ),
                            }}
                            {...TextFieldOpts}
                        >
                            {kupatHolimList.map((option, optionIndex) => (
                                <MenuItem key={optionIndex} value={option.code}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </StyledColumnFirst>
                    <StyledColumnSecond>
                        <TextField
                            id="standard-idNumberType"
                            name="idNumberType"
                            // value={patientInitialValues.healthManageOrganizationValue}
                            label={t("ID type")}
                            required
                            select
                            // onChange={handleChangeKupatHolim}
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
                            error={errors.idNumberType ? true : false}
                            helperText={errors.idNumberType ? t("is a required field.") : null}
                            InputProps={{
                                // disableUnderline: edit_mode === 1 ? false : true,
                                endAdornment: (errors.idNumberType &&
                                    <InputAdornment position="end">
                                        <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                    </InputAdornment>
                                ),
                            }}
                            {...TextFieldOpts}
                        >
                            {idTypesList.map((option, optionIndex) => (
                                <MenuItem key={optionIndex} value={option.code}>
                                    {t(option.name)}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Controller
                            as={TextField}
                            control={control}
                            id="standard-lastName"
                            name="lastName"
                            // defaultValue={patientInitialValues.firstName}
                            label={t("Last Name")}
                            required
                            {...TextFieldOpts}
                        />
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
                                        required: true,
                                        disableToolbar: false,
                                        label: t("birth day"),
                                        //inputValue: patientBirthDate,
                                        //mask: {formatDate},
                                        InputProps: {
                                            // disableUnderline: edit_mode === 1 ? false : true,
                                        },
                                        disableFuture: true,
                                        color: 'primary',
                                        variant: 'inline',
                                        inputVariant: "filled",
                                        // onChange: handleChangeBirthDate,
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
                        <Controller
                            as={TextField}
                            control={control}
                            id="standard-mobilePhone"
                            name="mobilePhone"
                            // defaultValue={patientInitialValues.mobilePhone}
                            label={t("Cell phone")}
                            rules={{
                                pattern: getCellPhoneRegexPattern()
                            }}
                            error={errors.mobilePhone ? true : false}
                            helperText={errors.mobilePhone ? t("The number entered is incorrect") : null}
                            InputProps={{
                                // disableUnderline: edit_mode === 1 ? false : true,
                                endAdornment: (errors.mobilePhone &&
                                    <InputAdornment position="end">
                                        <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                    </InputAdornment>
                                ),
                            }}
                            required
                            {...TextFieldOpts}
                        />
                    </StyledColumnSecond>
                </StyledBox>
                <StyledRowEmail>
                    <Controller
                        as={TextField}
                        control={control}
                        id="standard-patientEmail"
                        name="patientEmail"
                        // defaultValue={patientInitialValues.patientEmail}
                        label={t("Mail address")}
                        error={errors.patientEmail ? true : false}
                        helperText={errors.patientEmail ? t("Invalid email address") : null}
                        InputProps={{
                            // disableUnderline: edit_mode === 1 ? false : true,
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
                </StyledRowEmail>
            </StyledForm>
        </CustomizedPopup>
    )
};
const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir,
        formatDate: state.settings.format_date,
    }
};

export default connect(mapStateToProps, null)(PopupNewPatient);
