import React from 'react';
import StyledCustomizedTablePersonalInformationCell from './Style';
import maleIcon from '../../../Images/maleIcon.png';
import womanIcon from '../../../Images/womanIcon.png';
import PersonalData from "./PersonalData";
import {useTranslation} from "react-i18next";
import GenderIcon from "./GenderIcon";

const CustomizedTablePersonalInformationCell = ({gender, id, firstName, lastName, padding, align}) => {

    const {t} = useTranslation();

    return (
        <StyledCustomizedTablePersonalInformationCell padding={padding} align={align}>
            <GenderIcon alt={'gender icon'} src={gender === 'male' ? maleIcon : womanIcon}/>
            <PersonalData>
                <span>
                    {`${firstName} ${lastName}`}
                </span>
                {`${t('Federal Tax ID')}${id}`}
            </PersonalData>
        </StyledCustomizedTablePersonalInformationCell>
    );
};

export default CustomizedTablePersonalInformationCell;
