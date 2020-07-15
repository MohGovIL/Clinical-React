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
import { FHIR } from '../../../Utils/Services/FHIR';
import normalizeFhirValueSet from '../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';

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

  const handleChange = async (event) => {
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
    const listsDetailsAndLetters = [];
    listsDetailsAndLetters.push(
      FHIR('ValueSet', 'doWork', {
        functionName: 'getValueSet',
        functionParams: { id: `letter_${event.target.value}` },
      }),
    );
    listsDetailsAndLetters.push(
      FHIR('ValueSet', 'doWork', {
        functionName: 'getValueSet',
        functionParams: { id: `details_${event.target.value}` },
      }),
    );
    const listsDetailsAndLettersAfterAwait = await Promise.all(
      listsDetailsAndLetters,
    );

    listsDetailsAndLettersAfterAwait.map((elem, key) => {
      if (elem.data && elem.data !== '') {
        elem.data.expansion.contains.map((data, index) => {
          const normalizedTestAndTreatmentsFromFhirValueSet = normalizeFhirValueSet(
            data,
          );
          let detailsObj = [];
          let lettersObj = [];

          switch (index) {
            case 0:
              detailsObj.push({
                title: data.name,
                code: data.code,
              });
              break;
            case 1:
              lettersObj.push({
                title: data.name,
                code: data.code,
              });
              break;
          }
        });
      }
    });
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
