import React, {useState, useEffect} from "react";
import * as Moment from "moment";
import CustomizedPopup from "Assets/Elements/CustomizedPopup";
import {useTranslation} from "react-i18next";
import {useForm, FormContext, useFormContext, Controller} from "react-hook-form";
import {InputAdornment, MenuItem, TextField} from "@material-ui/core";
import {StyledColumnFirst, StyledColumnSecond, StyledForm, StyledRowEmail, StyledBox} from "./Style";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import {connect} from "react-redux";
import CustomizedDatePicker from "Assets/Elements/CustomizedDatePicker";
import {getCellPhoneRegexPattern, getEmailRegexPattern} from "Utils/Helpers/validation/patterns";
import {normalizeValueData} from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";
import {emptyArrayAll} from "Utils/Helpers/emptyArray";
import normalizeFhirValueSet from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet";
import {FHIR} from "Utils/Services/FHIR";

const PopupCreateNewPatient = ({popupOpen, handlePopupClose, languageDirection, formatDate}) => {
    const {t} = useTranslation();

    const [idTypesList, setIdTypesList] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [kupatHolimList, setKupatHolimList] = useState([]);

    const [patientGender, setPatientGender] = useState("");
    const [patientIdType, setPatientIdType] = useState(0);
    const [patientBirthDate, setPatientBirthDate] = useState(0);

    const methods = useForm({
        //mode: "onBlur",
        // defaultValues: {
        //     birthDate: patientBirthDate
        // }
    });

    const onSubmit = (data, e) => {
        //console.log("===============data of form==================");
        //console.log(data);
        //console.log("===============data of form==================");
    };

    //useEffect block
    useEffect(() => {
        //Load id types list
        (() => {
            try {
                FHIR('ValueSet', 'doWork', {
                    "functionName": 'getValueSet',
                    'functionParams': {id: 'identifier_type_list'}
                }).then(type_list => {
                    const {data: {expansion: {contains}}} = type_list;
                    let options = emptyArrayAll(t("Choose"));
                    for (let status of contains) {
                        options.push(normalizeFhirValueSet(status));
                    }
                    setIdTypesList(options);
                });
            } catch (e) {
                console.log(e);
            }
        })();

        //Load KupatHolim list
        (() => {
            try {
                FHIR('Organization', 'doWork', {
                    "functionName": 'getOrganizationTypeKupatHolim',
                    //'functionParams': {id: 'gender'}
                }).then(kupatHolim_list => {
                    const {data : {entry}} = kupatHolim_list;
                    let array = emptyArrayAll(t("Choose"));
                    for (let row of entry) {
                        if (row.resource !== undefined) {
                            row.resource.name = t(row.resource.name);
                            let setLabelKupatHolim = normalizeValueData(row.resource);
                            array.push(setLabelKupatHolim);
                        }
                    }
                    setKupatHolimList(array);
                });
            } catch (e) {
                console.log(e);
            }
        })();

        //Load gender list
        (() => {
            try {
                FHIR('ValueSet', 'doWork', {
                    "functionName": 'getValueSet',
                    'functionParams': {id: 'gender'}
                }).then(gender_list => {
                    const {data: {expansion: {contains}}} = gender_list;
                    let options = emptyArrayAll(t("Choose"));
                    for (let status of contains) {
                        options.push(normalizeFhirValueSet(status));
                    }
                    setGenderList(options);
                });
            } catch (e) {
                console.log(e);
            }
        })();

    }, []);
    //end of useEffect block

    //Block of handle's function
    const handleChangeBirthDate = date => {
        try {
            let newBirthDate = date.format(formatDate).toString();
            methods.setValue("birthDate", newBirthDate, true);
            setPatientBirthDate(newBirthDate);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    const handleIdTypeChange = (event) => {
        setPatientIdType(event.target.value);
    }

    const handleGenderChange = (event) => {
        setPatientGender(event.target.value);
    }
    //End block of handle's function

    const bottomButtonsData = [
        {
            'label': t('Save patient'),
            'variant': "text",
            'color': "primary",
            'other': {'type': "submit", 'form': "createNewPatient"}
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
            <FormContext {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} id={"createNewPatient"}>
                    <StyledForm languageDirection={languageDirection}>
                        <StyledBox>
                            <StyledColumnFirst>
                                <Controller
                                    as={TextField}
                                    control={methods.control}
                                    id="standard-idNumber"
                                    name="idNumber"
                                    defaultValue={""}
                                    //onChange={()=>{console.log(methods)}}
                                    label={t("id number")}
                                    // required
                                    {...TextFieldOpts}
                                />
                                <Controller
                                    as={TextField}
                                    control={methods.control}
                                    id="standard-firstName"
                                    name="firstName"
                                    // defaultValue={patientInitialValues.firstName}
                                    label={t("First Name")}
                                    // required
                                    {...TextFieldOpts}
                                />
                                <TextField
                                    id="standard-gender"
                                    name="gender"
                                    value={patientGender}
                                    label={t("Gender")}
                                    // required
                                    select
                                    onChange={handleGenderChange}
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
                                    error={methods.errors.healthManageOrganization ? true : false}
                                    helperText={methods.errors.healthManageOrganization ? t("is a required field.") : null}
                                    InputProps={{
                                        // disableUnderline: edit_mode === 1 ? false : true,
                                        endAdornment: (methods.errors.healthManageOrganization &&
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
                                    // required
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
                                    error={methods.errors.healthManageOrganization ? true : false}
                                    helperText={methods.errors.healthManageOrganization ? t("is a required field.") : null}
                                    InputProps={{
                                        endAdornment: (methods.errors.healthManageOrganization &&
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
                                    value={patientIdType}
                                    label={t("ID type")}
                                    // required
                                    select
                                    onChange={handleIdTypeChange}
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
                                    error={methods.errors.idNumberType ? true : false}
                                    helperText={methods.errors.idNumberType ? t("is a required field.") : null}
                                    InputProps={{
                                        // disableUnderline: edit_mode === 1 ? false : true,
                                        endAdornment: (methods.errors.idNumberType &&
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
                                    control={methods.control}
                                    id="standard-lastName"
                                    name="lastName"
                                    // defaultValue={patientInitialValues.firstName}
                                    label={t("Last Name")}
                                    // required
                                    {...TextFieldOpts}
                                />
                                <Controller
                                    name="birthDate"
                                    control={methods.control}
                                    rules={{
                                        //validate: {
                                        //    value: value => Moment(value, formatDate, true).isValid() === true
                                        //}
                                    }}
                                    as={
                                        <CustomizedDatePicker
                                            PickerProps={{
                                                id: "standard-birthDate",
                                                format: "DD/MM/YYYY",
                                                name: "birthDate",
                                                // required: true,
                                                disableToolbar: false,
                                                label: t("birth day"),
                                                inputValue: patientBirthDate,
                                                mask: {formatDate},
                                                InputProps: {
                                                    // disableUnderline: edit_mode === 1 ? false : true,
                                                },
                                                disableFuture: true,
                                                color: 'primary',
                                                variant: 'inline',
                                                inputVariant: "filled",
                                                onChange: handleChangeBirthDate,
                                                autoOk: true,
                                                error: methods.errors.birthDate ? true : false,
                                                helperText: methods.errors.birthDate ? t("Date must be in a date format") : null,
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
                                    control={methods.control}
                                    id="standard-mobilePhone"
                                    name="mobilePhone"
                                    // defaultValue={patientInitialValues.mobilePhone}
                                    label={t("Cell phone")}
                                    rules={{
                                        pattern: getCellPhoneRegexPattern()
                                    }}
                                    error={methods.errors.mobilePhone ? true : false}
                                    helperText={methods.errors.mobilePhone ? t("The number entered is incorrect") : null}
                                    InputProps={{
                                        // disableUnderline: edit_mode === 1 ? false : true,
                                        endAdornment: (methods.errors.mobilePhone &&
                                            <InputAdornment position="end">
                                                <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    // required
                                    {...TextFieldOpts}
                                />
                            </StyledColumnSecond>
                        </StyledBox>
                        <StyledRowEmail>
                            <Controller
                                as={TextField}
                                control={methods.control}
                                id="standard-patientEmail"
                                name="patientEmail"
                                // defaultValue={patientInitialValues.patientEmail}
                                label={t("Mail address")}
                                error={methods.errors.patientEmail ? true : false}
                                helperText={methods.errors.patientEmail ? t("Invalid email address") : null}
                                InputProps={{
                                    // disableUnderline: edit_mode === 1 ? false : true,
                                    endAdornment: (methods.errors.patientEmail &&
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
                </form>
            </FormContext>
        </CustomizedPopup>
    )
};
const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir,
        formatDate: state.settings.format_date,
    }
};

export default connect(mapStateToProps, null)(PopupCreateNewPatient);