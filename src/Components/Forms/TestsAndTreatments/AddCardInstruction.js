import MenuItem from '@material-ui/core/MenuItem';
import CustomizedTextField from '../../../Assets/Elements/CustomizedTextField';
import {
  StyledCardContent,
  StyledCardDetails,
  StyledCardName,
  StyledCardRoot,
  StyledTypographyHour,
  StyledTypographyName,
} from './Style';
import React, { useState } from 'react';
import * as moment from 'moment';
import { useTranslation } from 'react-i18next';

const AddCardInstruction = ({
  user,
  edit,
  encounter,
  collectedTestAndTreatmentsFromFhir,
  currentTestTreatmentsInstructions,
  setCurrentTestTreatmentsInstructions,
  index,
}) => {
  const { t } = useTranslation();

  const handleChange = (event) => {
    if (
      currentTestTreatmentsInstructions &&
      currentTestTreatmentsInstructions.length > 0
    ) {
      let tempCurrentTestTreatmentsInstructions = [
        ...currentTestTreatmentsInstructions,
      ];
      tempCurrentTestTreatmentsInstructions[index].value = event.target.value;
      setCurrentTestTreatmentsInstructions(
        tempCurrentTestTreatmentsInstructions,
      );
    }
  };
  return (
    <StyledCardRoot>
      <StyledCardDetails>
        <StyledCardContent>
          <StyledTypographyName component='h5' variant='h5'>
            {edit ? user.name.toString() : ''}
          </StyledTypographyName>
          <StyledTypographyHour variant='subtitle1' color='textSecondary'>
            {' '}
            {edit
              ? moment.utc(encounter.extensionStatusUpdateDate).format('LT')
              : ''}{' '}
          </StyledTypographyHour>
        </StyledCardContent>
        <StyledCardName></StyledCardName>
      </StyledCardDetails>
      <CustomizedTextField
        onChange={handleChange}
        value={currentTestTreatmentsInstructions[index].value}
        iconColor='#1976d2'
        width='30%'
        select
        label={t('Test/Treatment')}>
        <MenuItem value={''}>
          <em>{t('Choose')}</em>
        </MenuItem>

        {collectedTestAndTreatmentsFromFhir.map((value, index) => {
          return (
            <MenuItem key={index} value={value.code}>
              {t(value.title)}
            </MenuItem>
          );
        })}
      </CustomizedTextField>
    </StyledCardRoot>
  );
};

export default AddCardInstruction;
