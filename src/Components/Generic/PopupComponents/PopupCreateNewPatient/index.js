import React, {useState, useEffect} from "react";
import * as Moment from "moment";
import CustomizedPopup from "Assets/Elements/CustomizedPopup";
import {useTranslation} from "react-i18next";
import {useForm, Controller} from "react-hook-form";
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
import moment from "moment";
import {store} from "../../../../index";
import {setEncounterAndPatient} from "Store/Actions/ActiveActions";
import normalizeFhirEncounter from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter";
import normalizeFhirAppointment from "Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment";
import {baseRoutePath} from "Utils/Helpers/baseRoutePath";
import {useHistory} from 'react-router-dom';
import {validateLuhnAlgorithm} from "Utils/Helpers/validation/validateLuhnAlgorithm";

const PopupCreateNewPatient = ({popupOpen, handlePopupClose, languageDirection, formatDate, facility}) => {
    const {t} = useTranslation();

    const [idTypesList, setIdTypesList] = useState([]);
    const [genderList, setGenderList] = useState([]);
    const [kupatHolimList, setKupatHolimList] = useState([]);

    const [patientData, setPatientData] = useState([])
    const [patientIdentifier, setPatientIdentifier] = useState(0);
    const [patientIdNumber, setPatientIdNumber] = useState("");
    const [patientGender, setPatientGender] = useState(0);
    const [patientIdType, setPatientIdType] = useState(0);
    const [patientBirthDate, setPatientBirthDate] = useState(null);
    const [patientHealthManageOrganizationValue, setPatientKupatHolim] = useState(0);

    const patientIdTypeMain = "teudat_zehut";
    const [formViewMode, setFormMode] = useState('write');
    const [isFound, setIsFound] = useState(false);

    const [errorIdNumber, setErrorIdNumber] = useState(false);
    const [errorIdNumberText, setErrorIdNumberText] = useState('');

    const textFieldSelectNotEmptyRule = {validate: {value: value => (value !== undefined && value !== 0) || 'error' }};
    const history = useHistory();

    let patientInitialValues = {
        idNumber: '',
        firstName: '',
        lastName: '',
        mobilePhone: '',
        patientEmail: '',
        birthDate: null,
    };

    //const methods = useForm({
    const {register, control, errors, reset, setError, clearError, handleSubmit, triggerValidation, setValue, getValues, formState} = useForm({
        mode: "onChange",
        validateCriteriaMode: "all"
    });

    const onSubmit = (data, e) => {

        console.log("===============data of form==================");
        if (!formState.isValid) {
            console.log(data);
            console.log(errors);
            console.log('blocked');
            setFormMode('view');
        } else {
            console.log(data);
            console.log(errors);

            if (!validateLuhnAlgorithm(data.idNumber) && data.idNumberType  === patientIdTypeMain) {
                console.log(data.idNumberType  + '===' + patientIdTypeMain);
                setError("idNumber", "notValid", "The number entered is incorrect");
                setErrorIdNumber(true);
                setErrorIdNumberText(t(errors?.idNumber?.message));
                setFormMode('write');
            }
            console.log("we will save a new patient, hooray!!!!");
        }
        console.log("===============data of form==================");
    };

    //Register TextField components in react-hook-forms
    useEffect(() => {
        register({name: "idNumberType"}, textFieldSelectNotEmptyRule);
        register({name: "gender"}, textFieldSelectNotEmptyRule);
        register({name: "healthManageOrganization"}, textFieldSelectNotEmptyRule);
    }, []);

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
                    const {data: {entry}} = kupatHolim_list;
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
            setValue("birthDate", newBirthDate, true);
            setPatientBirthDate(newBirthDate);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    useEffect(() => {
        (async () => {
            if (/*patientIdType !== 0 &&*/ patientIdNumber && patientIdNumber.length > 0) {
                setIsFound(true);
                const result = await triggerValidation("idNumber");
                try {
                    FHIR('Patient', 'doWork', {
                        "functionName": 'searchPatientById',
                        'functionParams': {identifierValue: patientIdNumber}
                    }).then(patients => {

                        if (patients && result && patients.id > 0) {
                            patients.birthDate = Moment(patients.birthDate, "YYYY-MM-DD");
                            setValue("firstName", patients.firstName);
                            setValue("lastName", patients.lastName);
                            setValue("birthDate", Moment(patients.birthDate).format(formatDate));
                            setValue("mobilePhone", patients.mobileCellPhone);
                            setValue("patientEmail", patients.email);
                            setValue("idNumberType", patients.identifierType);
                            setValue("gender", patients.gender);
                            setValue("healthManageOrganization", patients.managingOrganization);

                            setPatientIdentifier(patients.id);
                            setPatientBirthDate(patients.birthDate);
                            setPatientData(patients);
                            setPatientIdType(patients.identifierType);
                            setPatientGender(patients.gender);
                            setPatientKupatHolim(patients.managingOrganization);

                            setError("idNumber", "patientExist", "The patient exists in the system");
                            setErrorIdNumber(true);
                            setErrorIdNumberText(t(errors?.idNumber?.message));
                            setFormMode('view');
                        } else {
                            if (!validateLuhnAlgorithm(patientIdNumber) && patientIdType === patientIdTypeMain) {
                                setError("idNumber", "notValid", "The number entered is incorrect");
                                setErrorIdNumber(true);
                                setErrorIdNumberText(t(errors?.idNumber?.message));
                                setFormMode('write');
                            } else {
                                clearIdNumber();
                                setFormMode('write');
                            }
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        })();
    }, [patientIdNumber, patientIdType, isFound]);

    const handleIdTypeChange = (event) => {
        try {
            setValue("idNumberType", event.target.value, true);
            setPatientIdType(event.target.value);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    const handleGenderChange = (event) => {
        try {
            setValue("gender", event.target.value, true);
            setPatientGender(event.target.value);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    const handleChangeHealthManageOrg = (event) => {
        try {
            setValue("healthManageOrganization", event.target.value, true);
            setPatientKupatHolim(event.target.value);
        } catch (e) {
            console.log("Error: " + e);
        }
    };

    const getIsFound = () => {
        return isFound;
    }

    const clearIdNumber = () => {
        clearError("idNumber");
        setErrorIdNumber(false);
        setErrorIdNumberText('');
    };

    const patientAdmissionAction = () => {
        let currentDate = moment().format("YYYY-MM-DD");
        (async () => {
            try {
                FHIR('Appointment', 'doWork', {
                    "functionName": 'getAppointmentPerPatient',
                    'functionParams': {dayPosition: 'current', date: currentDate, patient: patientIdentifier}
                }).then(appointments => {
                    //If appointment exists, will check for encounter
                    if (appointments && appointments.data && appointments.data.total === 1) {
                        let appointment = normalizeFhirAppointment(appointments.data.entry[1].resource);
                        //set data to reducers appointment and change route tp patientAdmission
                        let encounterData = FHIR("Encounter", "doWork", {
                            functionName: "createNewEncounter",
                            functionParams: {
                                facility: facility,
                                appointment: appointment
                            }
                        });
                        store.dispatch(setEncounterAndPatient(normalizeFhirEncounter(encounterData), patientData));
                        history.push({
                            pathname: `${baseRoutePath()}/imaging/patientAdmission`,
                        });
                    } else {
                        if (patientData !== null) {
                            let encounterData = FHIR("Encounter", "doWork", {
                                functionName: "createNewEncounter",
                                functionParams: {
                                    facility: facility,
                                    practitioner: 'practitioner',
                                    patient: patientData,
                                    status: "planned"
                                }
                            });
                            store.dispatch(setEncounterAndPatient(normalizeFhirEncounter(encounterData), patientData));
                            history.push({
                                pathname: `${baseRoutePath()}/imaging/patientAdmission`,
                            });
                        }
                    }
                });
            } catch (e) {
                console.log("Error: " + e);
            }
        })();
    };

    const handlePopupCloseAndClear = () => {
        reset(patientInitialValues);
        setPatientIdNumber('');
        setValue("idNumber","");

        clearIdNumber();
        setFormMode('write');
        setPatientIdType(0);
        setPatientGender(0);
        setPatientKupatHolim(0);
        setPatientBirthDate(null);

        register({name: "idNumberType"}, textFieldSelectNotEmptyRule);
        register({name: "gender"}, textFieldSelectNotEmptyRule);
        register({name: "healthManageOrganization"}, textFieldSelectNotEmptyRule);

        handlePopupClose();
    };
    //End block of handle's function

    const bottomButtonsData = [
        {
            'label': t('Save patient'),
            'variant': "text",
            'color': "primary",
            'mode': formViewMode,
            'other': {'type': "submit", 'form': "createNewPatient"}
        },
        {
            'label': t('Patient Admission'),
            'variant': "contained",
            'color': "primary",
            'onClickHandler': patientAdmissionAction //user function
        },
        {
            'label': t('Create appointment'),
            'variant': "contained",
            'color': "primary",
            'onClickHandler': handlePopupClose //user function
        }
    ];

    const PopupTextFieldOpts = {
        'color': 'primary',
        'variant': 'filled',
        'disabled': formViewMode === 'view',
        'autoComplete': 'off',
    };



    return (
        <CustomizedPopup isOpen={popupOpen} onClose={handlePopupCloseAndClear}
                         title={t('Add New Patient')}
                         content_dividers={false}
                         bottomButtons={bottomButtonsData}
                         dialogMaxWidth={'md'}
        >
            {/*<FormContext {...methods}>*/}
            <form onSubmit={handleSubmit(onSubmit)} id={"createNewPatient"}>
                <StyledForm languageDirection={languageDirection}>
                    <StyledBox>
                        <StyledColumnFirst>
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-idNumber"
                                name="idNumber"
                                defaultValue={patientIdNumber}
                                label={t("id number")}
                                required
                                rules={{
                                    validate: value => {
                                        const formValues = getValues("idNumberType");
                                        setPatientIdNumber(formValues.idNumber.trim());
                                        return getIsFound() === true;
                                    }
                                }}
                                color={'primary'}
                                variant={'filled'}
                                error={errorIdNumber}
                                helperText={errorIdNumberText}
                                inputProps={{
                                        autoComplete: 'off',
                                }}
                            />
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-firstName"
                                name="firstName"
                                defaultValue={patientInitialValues.firstName}
                                label={t("First Name")}
                                required
                                {...PopupTextFieldOpts}
                            />
                            <TextField
                                id="standard-gender"
                                name="gender"
                                value={patientGender}
                                label={t("Sex")}
                                required
                                select
                                onChange={handleGenderChange}
                                defaultValue={{}}
                                SelectProps={{
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
                                error={errors.gender ? true : false}
                                helperText={errors.gender ? t("is a required field.") : null}
                                InputProps={{
                                    endAdornment: (errors.gender &&
                                        <InputAdornment position="end">
                                            <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                        </InputAdornment>
                                    ),
                                }}
                                {...PopupTextFieldOpts}
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
                                value={patientHealthManageOrganizationValue}
                                label={t("Kupat Cholim")}
                                required={patientIdType === patientIdTypeMain}
                                select
                                onChange={handleChangeHealthManageOrg}
                                SelectProps={{
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
                                {...PopupTextFieldOpts}
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
                                required
                                select
                                onChange={handleIdTypeChange}
                                SelectProps={{
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
                                    endAdornment: (errors.idNumberType &&
                                        <InputAdornment position="end">
                                            <ErrorOutlineIcon htmlColor={"#ff0000"}/>
                                        </InputAdornment>
                                    ),
                                }}
                                {...PopupTextFieldOpts}
                            >
                                {idTypesList.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option.code} name={option.code}>
                                        {t(option.name)}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Controller
                                as={TextField}
                                control={control}
                                id="standard-lastName"
                                name="lastName"
                                defaultValue={patientInitialValues.lastName}
                                label={t("Last Name")}
                                required
                                {...PopupTextFieldOpts}
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
                                            value: patientBirthDate,
                                            mask: {formatDate},
                                            InputProps: {
                                                autoComplete: 'off',
                                            },
                                            disableFuture: true,
                                            color: 'primary',
                                            variant: 'inline',
                                            inputVariant: "filled",
                                            onChange: handleChangeBirthDate,
                                            autoOk: true,
                                            disabled: formViewMode === 'view',
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
                                defaultValue={patientInitialValues.mobilePhone}
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
                                {...PopupTextFieldOpts}
                            />
                        </StyledColumnSecond>
                    </StyledBox>
                    <StyledRowEmail>
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
                            {...PopupTextFieldOpts}
                        />
                    </StyledRowEmail>
                </StyledForm>
            </form>
            {/*</FormContext>*/}
        </CustomizedPopup>
    )
};
const mapStateToProps = state => {
    return {
        languageDirection: state.settings.lang_dir,
        formatDate: state.settings.format_date,
        facility: state.settings.facility,
    }
};

export default connect(mapStateToProps, null)(PopupCreateNewPatient);
