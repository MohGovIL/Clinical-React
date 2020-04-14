import React, {useState, useEffect} from "react";
import CustomizedPopup from "../../CustomizedPopup";
import {useTranslation} from "react-i18next";
import {Controller, useForm} from "react-hook-form";
import {InputAdornment, MenuItem, TextField} from "@material-ui/core";
import {StyledColumnFirst, StyledColumnSecond, StyledForm} from "./Style";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const PopupNewPatient = ({popupOpen, handlePopupClose}) => {
    const {t} = useTranslation();
    const {register, control, errors, handleSubmit, reset, setValue} = useForm({
        mode: "onBlur",
        // defaultValues: {
        //     birthDate: patientBirthDate
        // }
    });

    const onSubmit = (data, e) => {
    };


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

    const idTypeList = [
        {
            "code": "id_number",
            "name": t("id_type_1")
        },
        {
            "code": "passport",
            "name": t("id_type_2")
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
                         dialogMaxWidth={'800px'}
        >
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
                </StyledColumnFirst>
                <StyledColumnSecond>
                    <TextField
                        id="standard-idNumberType"
                        name="idNumberType"
                        // value={patientInitialValues.healthManageOrganizationValue}
                        label={t("Id Number Type")}
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
                        // error={errors.healthManageOrganization ? true : false}
                        // helperText={errors.healthManageOrganization ? t("is a required field.") : null}
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
                        {idTypeList.map((option, optionIndex) => (
                            <MenuItem key={optionIndex} value={option.code}>
                                {option.name}
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
                </StyledColumnSecond>
            </StyledForm>
            {/*{withSubPopup &&*/}
            {/*<><br/>*/}
            {/*    <Button variant="outlined" color="primary" onClick={handlePopupNextOpen}>*/}
            {/*        Open next dialog*/}
            {/*    </Button>*/}
            {/*    <CustomizedPopup isOpen={popupNextOpen} onClose={handlePopupNextClose}*/}
            {/*                     title={text('Sub Popup[title]', 'Sub Popup title')}*/}
            {/*    >*/}
            {/*        Customized popup sub-component content*/}
            {/*    </CustomizedPopup>*/}
            {/*</>*/}
            {/*}*/}
        </CustomizedPopup>
    )
};

export default PopupNewPatient;
