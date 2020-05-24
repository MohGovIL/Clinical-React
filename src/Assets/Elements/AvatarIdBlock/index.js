/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */
import React from 'react';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {
  StyledAgeIdBlock,
  StyledAvatarIdBlock,
  StyledEmptyIconEdit,
  StyledRoundAvatar,
} from './Style';
import { useTranslation } from 'react-i18next';

const AvatarIdBlock = ({
  edit_mode,
  priority,
  avatarIcon,
  patientData,
  patientIdentifier,
  patientAge,
  onEditButtonClick,
}) => {
  const { t } = useTranslation();
  return (
    <StyledAvatarIdBlock>
      {edit_mode === 0 ? (
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
        <Avatar alt={''} src={avatarIcon} />
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
  );
};
export default AvatarIdBlock;
