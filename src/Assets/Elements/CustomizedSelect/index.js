import React, {useState} from 'react';
import StyledSelect from './Style'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useTranslation} from "react-i18next";
import CustomizedSelectOption from "./CustomizedSelectOption";
import {updateAppointmentStatus} from "../../../Utils/Services/FhirAPI";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param background_color
 * @param icon_color
 * @param value
 * @param onChange
 * @param options
 * @param appointmentId
 * @returns {Component}
 * @constructor
 */
const CustomizedSelect = ({background_color, icon_color, value, onChange, options, appointmentId}) => {

    const [statusValue, setStatusValue] = useState(value);

    const {t} = useTranslation();

    //TODO
    //Put it in a separate place and pass it on
    //So you could give different onChange functions
    const onChangeHandler = async e => {
        try {
            const {data} = await updateAppointmentStatus(appointmentId, e.target.value);
            setStatusValue(data.status)
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <StyledSelect onChange={onChangeHandler} native background_color={background_color} icon_color={icon_color}
                      IconComponent={ExpandMoreIcon} value={statusValue}>
            {options.map((option, optionIndex) => <CustomizedSelectOption value={option.code}
                                                                          key={optionIndex}>{t(option.display)}</CustomizedSelectOption>)}
        </StyledSelect>
    );
};

export default CustomizedSelect;
