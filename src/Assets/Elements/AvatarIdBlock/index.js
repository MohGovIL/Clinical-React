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
  StyledDivider,
} from './Style';
import { useTranslation } from 'react-i18next';

const AvatarIdBlock = ({
  edit_mode,
  showEditButton,
  priority,
  avatarIcon,
  patientData,
  patientIdentifier,
  patientAge,
  onEditButtonClick,
  showDivider,
}) => {
  const { t } = useTranslation();
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
      {showDivider && <StyledDivider />}
    </React.Fragment>
  );
};

export default AvatarIdBlock;
