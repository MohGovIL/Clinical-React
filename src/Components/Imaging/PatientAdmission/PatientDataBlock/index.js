import React, {useEffect, useState} from 'react';
import * as Moment from "moment";
import {connect} from "react-redux";
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

import {Avatar, IconButton, Divider, Typography, TextField, MenuItem} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {StyledFormGroup} from "../../../../Components/Imaging/PatientAdmission/PatientDetailsBlock/Style";
// import {StyledButton, StyledMenu} from "../../../../Assets/Elements/CustomizedSelect/Style";
import {getOrganizationTypeKupatHolim} from "../../../../Utils/Services/FhirAPI";
import {normalizeValueData} from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";

const PatientDataBlock = ({appointmentId, patientData, onEditButtonClick, edit_mode, appointmentsData, formatDate}) => {
    const {t} = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientIdentifier, setPatientIdentifier] = useState({});
    const [patientAge, setPatientAge] = useState(0);

    const [patientEncounter, setPatientEncounter] = useState(0);
    const [patientKupatHolimList, setPatientKupatHolimList] = useState([]);

    const [patientInitialValues, setPatientInitialValues] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        healthManageOrganization: {code: 0, name: t("All")},
        mobilePhone: '',
        patientEmail: '',
    });

    const {register, control, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);
    const TextFieldOpts = {
        'disabled': edit_mode === 1 ? false : true,
        'InputProps': {disableUnderline: edit_mode === 1 ? false : true},
        'color': edit_mode === 1 ? "primary" : 'primary',
        'variant': edit_mode === 1 ? "filled" : 'standard',
        'inputRef': edit_mode === 0 ? null : register,
    };

    useEffect(() => {
        try {
            setAvatarIcon(patientData.gender === "male" ? maleIcon : patientData.gender === "female" ? femaleIcon : "")
            //use format date of FHIR date - YYYY-MM-DD only
            setPatientAge(ageCalculator(patientData.birthDate));
            setPatientIdentifier(patientData.identifier || {});

            if (appointmentsData !== undefined) {
                //TO DO - in future use you need to change to encountersData
                setPatientEncounter(appointmentsData[appointmentId] || 0);
            }

            //It is necessary to get data from the server and fill the array.
            setPatientKupatHolimList([{code: 7, name: t("hmo_3")}]); //TO DO - change to dynamic mode from DB

            setPatientInitialValues({
                firstName: patientData.firstName || '',
                lastName: patientData.lastName || '',
                birthDate: Moment(patientData.birthDate).format(formatDate) || '',
                healthManageOrganization: {code: 7, name: t("hmo_3")},
                mobilePhone: patientData.mobileCellPhone || patientData.homePhone || '',
                patientEmail: patientData.email || '',
            });

        } catch (e) {
            console.log(e);
        }
    }, [patientData.id]);

    const handleUndoEdittingClick = () => {
        onEditButtonClick(0);
    }

    const emptyArrayAll = () => {
        return [{
            code: 0,
            name: t("All")
        }]
    };

    const handleLoadListKupatHolim = () => {
        let array = emptyArrayAll();

        //If object is empty - load kupat holi, from server
        if (Object.keys(patientKupatHolimList).length <= 1 && edit_mode === 1) {
            (async () => {
                try {
                    const {data: {entry: dataServiceType}} = await getOrganizationTypeKupatHolim();
                    for (let entry of dataServiceType) {
                        if (entry.resource !== undefined) {
                            entry.resource.name = t(entry.resource.name);
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

    const handleChangeKupatHolim = event => {
        try {
            const res = patientKupatHolimList.find(obj => {
                return obj.code == event.target.value;
            });
            setPatientInitialValues({
                ...patientInitialValues,
                healthManageOrganization: {code: event.target.value, name: res.name}
            });
        } catch (e) {
            console.log("Error: " + e);
        }
    };
    // {
    //     console.log("===========111==============")
    //     console.log(patientInitialValues)
    //     console.log("===========111==============")
    // }
    return (
        <React.Fragment>
            <StyledGlobalStyle disable_vertical_scroll={edit_mode === 0 ? false : true}/>
            <StyledDiv edit_mode={edit_mode}>
                <StyledAvatarIdBlock>
                    {
                        edit_mode === 0 ? (
                            <IconButton onClick={() => {
                                window.scrollTo(0, 0);
                                onEditButtonClick(1)
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
                        <span>{patientIdentifier.type == "ID" ? t("Id. Number") : t("Passport")} {patientIdentifier.value}</span>
                        <span>{patientData.gender == "male" ? t("Son") : t("Daughter")} {patientAge}</span>
                    </StyledAgeIdBlock>

                </StyledAvatarIdBlock>
                <Divider/>
                <StyledTextInput edit_mode={edit_mode}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <StyledFormGroup>
                            {edit_mode === 1 &&
                            <TextField
                                id="standard-firstName"
                                name="firstName"
                                defaultValue={patientInitialValues.firstName}
                                label={t("First name")}
                                required
                                {...TextFieldOpts}
                            />
                            }
                            {edit_mode === 1 &&
                            <TextField
                                id="standard-lastName"
                                name="lastName"
                                defaultValue={patientInitialValues.lastName}
                                label={t("Last name")}
                                required
                                {...TextFieldOpts}
                            />
                            }
                            <TextField
                                id="standard-birthDate"
                                name="birthDate"
                                defaultValue={patientInitialValues.birthDate}
                                label={t("birth day")}
                                required
                                {...TextFieldOpts}
                            />
                            <TextField
                                id="standard-healthManageOrganization"
                                name="healthManageOrganization"
                                defaultValue={edit_mode === 1 ? patientInitialValues.healthManageOrganization.code : patientInitialValues.healthManageOrganization.name}
                                label={t("Kupat Cholim")}
                                required
                                select={edit_mode === 1 ? true : false}
                                onChange={handleChangeKupatHolim}
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
                                {...TextFieldOpts}
                            >
                                {patientKupatHolimList.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option.code}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                // inputRef={register}
                                id="standard-mobilePhone"
                                name="mobilePhone"
                                defaultValue={patientInitialValues.mobilePhone}
                                label={t("Cell phone")}
                                required
                                {...TextFieldOpts}
                            />
                            <TextField
                                // inputRef={register}
                                id="standard-patientEmail"
                                name="patientEmail"
                                defaultValue={patientInitialValues.patientEmail}
                                label={t("Mail address")}
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

const mapStateToProps = state => {
    return {
        appointmentsData: state.fhirData.appointments,
        formatDate: state.settings.format_date
        //TO DO - uncomment after encounter data
        // encountersData: state.fhirData.encounters,
    };
};

export default connect(mapStateToProps, null)(PatientDataBlock);

