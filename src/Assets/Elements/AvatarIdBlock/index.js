/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */
import React, { useEffect, useState } from 'react';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {
  StyledAgeIdBlock,
  StyledAvatarIdBlock,
  StyledEmptyIconEdit,
  StyledRoundAvatar,
  StyledDivider,
} from './Style';
import { useTranslation } from 'react-i18next';
import maleIcon from 'Assets/Images/maleIcon.png';
import femaleIcon from 'Assets/Images/womanIcon.png';
import ageCalculator from 'Utils/Helpers/ageCalculator';

const AvatarIdBlock = ({
  edit_mode,
  showEditButton,
  priority,
  patientData,
  onEditButtonClick,
  showDivider,
}) => {
  const { t } = useTranslation();
  const [patientAvatarIcon, setPatientAvatarIcon] = useState(null);
  const [patientAge, setPatientAge] = useState(0);
  const [patientIdentifier, setPatientIdentifier] = useState({});

  useEffect(() => {
    try {
      setPatientAvatarIcon(
        patientData.gender === 'male'
          ? maleIcon
          : patientData.gender === 'female'
          ? femaleIcon
          : '',
      );

      //use format date of FHIR date - YYYY-MM-DD only
      setPatientAge(ageCalculator(patientData.birthDate));
      setPatientIdentifier(
        {
          type: patientData.identifierTypeText,
          value: patientData.identifier,
        } || {},
      );
    } catch (e) {
      console.log('AvatarIdBlock[Error]: ' + e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientData.id, patientData.birthDate]);

  return (
    <React.Fragment>
      <StyledAvatarIdBlock>
        {showEditButton && edit_mode === 0 ? (
          <IconButton
            onClick={() => {
              window.scrollTo(0, 0);
              onEditButtonClick(1);
            }}>
            <EditIcon />
          </IconButton>
        ) : (
          <StyledEmptyIconEdit />
        )}
        {/*patientEncounter.priority == 2 - the high priority*/}
        <StyledRoundAvatar
          show_red_circle={edit_mode === 0 && priority > 1 ? true : false}>
          <Avatar alt={''} src={patientAvatarIcon} />
        </StyledRoundAvatar>

        <Typography variant='h5' noWrap={true}>
          {edit_mode === 0
            ? patientData.firstName + ' ' + patientData.lastName
            : ''}
        </Typography>

        <StyledAgeIdBlock>
          <span>
            {t(patientIdentifier.type)} {patientIdentifier.value}
          </span>
          <span>
            {t(patientData.ageGenderType)} {patientAge}
          </span>
        </StyledAgeIdBlock>
      </StyledAvatarIdBlock>
      {showDivider && <StyledDivider />}
    </React.Fragment>
  );
};

export default AvatarIdBlock;
