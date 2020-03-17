import React from 'react';
import StyledCustomizedTablePersonalInformationCell from './Style';
import maleIcon from '../../../Images/maleIcon.png';
import femaleIcon from '../../../Images/womanIcon.png';
import PersonalData from './PersonalData';
import {useTranslation} from 'react-i18next';
import GenderIcon from './GenderIcon';
import {Tooltip, Typography} from '@material-ui/core';

const CustomizedTablePersonalInformationCell = ({gender, id, firstName, lastName, align, priority}) => {

    const {t} = useTranslation();

    return (
        <StyledCustomizedTablePersonalInformationCell align={align}>
            <GenderIcon priority={priority} alt={'gender icon'} src={gender === 'male' ? maleIcon : femaleIcon}/>
            <PersonalData>
                {firstName.length + lastName.length >= 19 ?
                    <Tooltip title={`${firstName} ${lastName}`} placement={'bottom'}>
                        <Typography noWrap={true} display='inline' style={{width: '125px'}} >{`${firstName} ${lastName}`}</Typography>
                    </Tooltip>
                    :
                    <Typography noWrap={true} display='inline' >{`${firstName} ${lastName}`}</Typography>
                }
                {`${t('Federal Tax ID')} ${id}`}
            </PersonalData>
        </StyledCustomizedTablePersonalInformationCell>
    );
};

export default CustomizedTablePersonalInformationCell;
