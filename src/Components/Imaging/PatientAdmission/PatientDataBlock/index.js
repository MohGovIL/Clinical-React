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

import {Avatar, IconButton, Divider, Typography, TextField, InputLabel, MenuItem, Menu} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {StyledFormGroup} from "../../../../Components/Imaging/PatientAdmission/PatientDetailsBlock/Style";
import {StyledButton, StyledMenu} from "../../../../Assets/Elements/CustomizedSelect/Style";
import {getHealhcareService, getOrganizationTypeKupatHolim} from "../../../../Utils/Services/FhirAPI";
import {normalizeValueData} from "../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";

const PatientDataBlock = ({appointmentId, patientData, onEditButtonClick, edit_mode, appointmentsData, formatDate}) => {
    const {t} = useTranslation();

    const [avatarIcon, setAvatarIcon] = useState(null);
    const [patientAge, setPatientAge] = useState(0);
    const [patientFirstName, setPatientFirstName] = useState("");
    const [patientBirthDate, setPatientBirthDate] = useState('');
    const [patientIdentifier, setPatientIdentifier] = useState({});
    const [patientMobilePhone, setPatientMobilePhone] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientEncounter, setPatientEncounter] = useState(0);

    const [patientKupatHolim, setPatientKupatHolim] = useState({code: 0, name: t("All")});
    const [patientKupatHolimList, setPatientKupatHolimList] = useState([]);

    const {register, handleSubmit, setValue} = useForm();
    const onSubmit = data => console.log(data);

    useEffect(() => {
        try {
            setAvatarIcon(patientData.gender === "male" ? maleIcon : patientData.gender === "female" ? femaleIcon : "")
            //use format date of FHIR date - YYYY-MM-DD only
            setPatientAge(ageCalculator(patientData.birthDate));
            setPatientBirthDate(Moment(patientData.birthDate).format(formatDate) || '');
            setPatientIdentifier(patientData.identifier || {});
            setPatientMobilePhone(patientData.mobileCellPhone || patientData.homePhone || '');
            setPatientEmail(patientData.email || '');

            //Setting values to disabled fields
            setPatientFirstName(patientData.firstName);

            if (appointmentsData !== undefined) {
                //TO DO - in future use you need to change to encountersData
                setPatientEncounter(appointmentsData[appointmentId] || 0);
            }

            //It is necessary to get data from the server and fill the array.
            setPatientKupatHolim({code: 7, name: t("hmo_3")}); //TO DO - change to dynamic mode from DB
            setPatientKupatHolimList([{code: 7, name: t("hmo_3")}]); //TO DO - change to dynamic mode from DB
        } catch (e) {
            console.log(e);
        }
    }, [patientData.gender]);

    // useEffect(() => {
    //     register({name: "lastName"});
    //     register({name: "birthDate"});
    // }, [register])


    const handleReactHookFormChange = (e) => {
        // console.log("==================");
        // console.log(e.target.name);
        // console.log("==================");
        setPatientFirstName(e.target.value);
        setValue(e.target.name, e.target.value);
    };

    const handleCloseEdit = () => {

    }

    const handleSaveClick = () => {

    }

    const handleUndoEdittingClick = () => {
        onEditButtonClick(0);
    }

    let TextFieldOpts = {
        // 'inputRef': register,
        'disabled': edit_mode === 1 ? false : true,
        'InputProps': {disableUnderline: edit_mode === 1 ? false : true},
        'color': edit_mode === 1 ? "primary" : 'primary',
        'variant': edit_mode === 1 ? "filled" : 'standard',
        // 'variant': edit_mode === true ? "filled" : 'standard',
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
            setPatientKupatHolim({code: event.target.value, name: res.name});
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
                                inputRef={register}
                                id="standard-firstName"
                                name="firstName"
                                onChange={handleReactHookFormChange}
                                value={patientFirstName}
                                label={t("First name")}
                                required
                                {...TextFieldOpts}
                            />
                            }
                            {edit_mode === 1 &&
                            <TextField
                                inputRef={register}
                                id="standard-lastName"
                                name="lastName"
                                onChange={handleReactHookFormChange}
                                value={patientData.lastName}
                                label={t("Last name")}
                                required
                                {...TextFieldOpts}
                            />
                            }
                            <TextField
                                id="standard-birthDate"
                                name="birthDate"
                                value={patientBirthDate}
                                label={t("birth day")}
                                required
                                {...TextFieldOpts}
                            />
                            <TextField
                                id="standard-kupatCholim"
                                name="kupatCholim"
                                value={edit_mode === 1 ? patientKupatHolim.code : patientKupatHolim.name}
                                label={t("Kupat Cholim")}
                                required
                                select={edit_mode === 1 ? true : false}
                                {...TextFieldOpts}

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
                            >
                                {patientKupatHolimList.map((option, optionIndex) => (
                                    <MenuItem key={optionIndex} value={option.code}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="standard-mobilePhone"
                                name="mobilePhone"
                                value={patientMobilePhone}
                                label={t("Cell phone")}
                                required
                                {...TextFieldOpts}
                            />
                            <TextField
                                id="standard-patientEmail"
                                name="patientEmail"
                                value={patientEmail}
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

