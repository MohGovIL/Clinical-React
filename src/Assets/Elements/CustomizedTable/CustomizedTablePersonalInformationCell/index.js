import React from 'react';
import StyledCustomizedTablePersonalInformationCell from './Style';
import maleIcon from '../../../Images/maleIcon.png';
import femaleIcon from '../../../Images/womanIcon.png';
import PersonalData from "./PersonalData";
import {useTranslation} from "react-i18next";
import GenderIcon from "./GenderIcon";

const CustomizedTablePersonalInformationCell = ({gender, id, firstName, lastName, align, priority}) => {

    const {t} = useTranslation();

    return (
        <StyledCustomizedTablePersonalInformationCell align={align}>
            <GenderIcon priority={priority} alt={'gender icon'} src={gender === 'male' ? maleIcon : femaleIcon}/>
            <PersonalData>
                <span>
                    {`${firstName} ${lastName}`}
                </span>
                {`${t('Federal Tax ID')} ${id}`}
            </PersonalData>
        </StyledCustomizedTablePersonalInformationCell>
    );
};

export default CustomizedTablePersonalInformationCell;
