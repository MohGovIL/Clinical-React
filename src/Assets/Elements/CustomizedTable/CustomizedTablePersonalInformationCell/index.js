import React from 'react';
import StyledCustomizedTablePersonalInformationCell from './Style';
import maleIcon from 'Assets/Images/maleIcon.png';
import femaleIcon from 'Assets/Images/womanIcon.png';
import PersonalData from './PersonalData';
import GenderIcon from './GenderIcon';
import {useTranslation} from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

const CustomizedTablePersonalInformationCell = ({gender, id, idType, firstName, lastName, align, priority}) => {

    const {t} = useTranslation();

    return (
        <StyledCustomizedTablePersonalInformationCell align={align}>
            <GenderIcon priority={priority} alt={'gender icon'} src={gender === 'male' ? maleIcon : femaleIcon}/>
            <PersonalData>
                {firstName.length + lastName.length >= 19 ?
                    <Tooltip title={`${firstName} ${lastName}`} placement={'bottom'}>
                        <span>{`${firstName} ${lastName}`}</span>
                    </Tooltip>
                    :
                    <span>{`${firstName} ${lastName}`}</span>
                }
                {`${t(idType)} ${id}`}
            </PersonalData>
        </StyledCustomizedTablePersonalInformationCell>
    );
};

export default CustomizedTablePersonalInformationCell;
