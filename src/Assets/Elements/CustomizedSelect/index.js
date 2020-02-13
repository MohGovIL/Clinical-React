import React, {useState} from 'react';
import StyledSelect from './Style'
import {useTranslation} from "react-i18next";
import CustomizedSelectOption from "./CustomizedSelectOption";
import {updateAppointmentStatus} from "../../../Utils/Services/FhirAPI";
import {ExpandMore} from "@material-ui/icons/";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param background_color
 * @param icon_color
 * @param textcolor
 * @param value
 * @param onChange
 * @param options
 * @param appointmentId
 * @returns {Component}
 * @constructor
 */
const CustomizedSelect = ({background_color, icon_color, text_color, value, onChange, options, appointmentId, label}) => {

    // const [statusValue, setStatusValue] = useState(value);

    const {t} = useTranslation();

    return (
        <React.Fragment>
            {label ? <b>{label}</b> : null}
            <StyledSelect onChange={(event) => onChange(event)} native background_color={background_color} icon_color={icon_color}
                          text_color={text_color}
                          IconComponent={() => (<ExpandMore className={"MuiSelect-icon"} />)}
                          disableUnderline={true}
                          autoWidth={true}
                          value={value}>
                {options.map((option, optionIndex) => <CustomizedSelectOption value={option.code}
                                                                              key={optionIndex}>{t(option.display)}</CustomizedSelectOption>)}

            </StyledSelect>
        </React.Fragment>
    );
};

export default CustomizedSelect;
