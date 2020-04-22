import React from 'react';
import StyledCustomizedTablePersonalInformationDiv from './Style';
import maleIcon from 'Assets/Images/maleIcon.png';
import femaleIcon from 'Assets/Images/womanIcon.png';
import PersonalData from './PersonalData';
import GenderIcon from './GenderIcon';
import { useTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
const CustomizedTablePersonalInformationCell = ({
  gender,
  id,
  idType,
  firstName,
  lastName,
  align,
  priority,
  padding,
}) => {
  const { t } = useTranslation();

  return (
    <TableCell align={align} padding={padding}>
      <StyledCustomizedTablePersonalInformationDiv>
        <GenderIcon
          priority={priority}
          alt={'gender icon'}
          src={gender === 'male' ? maleIcon : femaleIcon}
        />
        <PersonalData>
          {firstName.length + lastName.length >= 19 ? (
            <Tooltip title={`${firstName} ${lastName}`} placement={'bottom'}>
              <span>{`${firstName} ${lastName}`}</span>
            </Tooltip>
          ) : (
            <span>{`${firstName} ${lastName}`}</span>
          )}
          {`${t(idType)} ${id}`}
        </PersonalData>
      </StyledCustomizedTablePersonalInformationDiv>
    </TableCell>
  );
};

export default CustomizedTablePersonalInformationCell;
