import MenuItem from '@material-ui/core/MenuItem';
import CustomizedTextField from '../../../Assets/Elements/CustomizedTextField';
import {
  StyledCardContent,
  StyledCardDetails,
  StyledCardName,
  StyledCardRoot,
  StyledIconedButton,
  StyledTypographyHour,
  StyledTypographyName,
} from './Style';
import React, { useState } from 'react';
import * as moment from 'moment';
import { useTranslation } from 'react-i18next';
import { FHIR } from '../../../Utils/Services/FHIR';
import normalizeFhirValueSet from '../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import TableBody from '@material-ui/core/TableBody';
import { Grid } from '@material-ui/core';
import { StyledSelectTemplateButton } from '../../../Assets/Elements/StyledSelectTempleteButton';
import { StyledFormGroup } from '../../../Assets/Elements/StyledFormGroup';
import { StyledButton } from '../../../Assets/Elements/StyledButton';
import { StyledIconButton } from '../../../Assets/Elements/HeaderPatient/Style';

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
  const [
    currentTestTreatmentsInstructionsDetails,
    setCurrentTestTreatmentsInstructionsDetails,
  ] = useState([]);

  const [
    currentTestTreatmentsInstructionsLetters,
    setCurrentTestTreatmentsInstructionsLetters,
  ] = useState([]);

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

    listsDetailsAndLettersAfterAwait['letters'] =
      listsDetailsAndLettersAfterAwait[0];
    delete listsDetailsAndLettersAfterAwait[0];

    listsDetailsAndLettersAfterAwait['details'] =
      listsDetailsAndLettersAfterAwait[1];
    delete listsDetailsAndLettersAfterAwait[1];
    let detailsObj = [];
    let lettersObj = [];

    {
      Object.entries(listsDetailsAndLettersAfterAwait).map((elem, key) => {
        if (elem && elem[1] && elem[1].status && elem[1].status === 200) {
          elem[1].data.expansion.contains.map((data) => {
            switch (elem[0]) {
              case 'letters':
                lettersObj.push({
                  title: dataNormalized.name,
                  code: dataNormalized.code,
                });
                break;
              case 'details':
                const dataNormalized = normalizeFhirValueSet(data);
                detailsObj.push({
                  title: dataNormalized.name,
                  code: dataNormalized.code,
                });
                break;
            }
          });
        }
      });

      setCurrentTestTreatmentsInstructionsLetters(lettersObj);
      setCurrentTestTreatmentsInstructionsDetails(detailsObj);
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
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <CustomizedTextField
            onChange={handleChange}
            value={currentTestTreatmentsInstructions[index].value}
            iconColor='#1976d2'
            width='100%'
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
        </Grid>
        {currentTestTreatmentsInstructionsDetails &&
        currentTestTreatmentsInstructionsDetails.length > 0 ? (
          <Grid item xs={4}>
            <CustomizedTextField
              onChange={handleChange}
              value={currentTestTreatmentsInstructions[index].value}
              iconColor='#1976d2'
              width='100%'
              select
              label={t('2')}>
              <MenuItem value={''}>
                <em>{t('Choose')}</em>
              </MenuItem>

              {currentTestTreatmentsInstructionsDetails.map((value, index) => {
                return (
                  <MenuItem key={index} value={value.code}>
                    {t(value.title)}
                  </MenuItem>
                );
              })}
            </CustomizedTextField>
          </Grid>
        ) : (
          <Grid item xs={4}></Grid>
        )}
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          {/*{encounter.status !== "finished" && true  }
          //see em-84 - to be continued*/}
          <StyledIconedButton>{t('Refferal for x-ray')}</StyledIconedButton>
        </Grid>

        <Grid item xs={8}>
          <CustomizedTextField
            name='recommendations'
            /*  inputRef={register}*/
            label={'recommendations'}
            width='100%'
            multiline
            /*InputLabelProps={{
              shrink: diagnosisAndTreatmentFields['findingsDetails']
                ? true
                : false,
            }}
            disabled={permission === 'view' ? true : false}*/
          />
        </Grid>
        <Grid item xs={2}>
          <StyledButton
            width='113px'
            height='32px'
            color='primary'
            variant='outlined'
            size='small'
            margin='33px 18px'
            /*  disabled={permission === 'view' ? true : false}*/
            /* onClick={() =>
              handlePopUpProps(
                findingsDetails,
                'findings_details',
                'diagnosis_and_recommendations',
                callBack,
                'findingsDetails',
              )
            }*/
          >
            {t('Select template')}
          </StyledButton>
        </Grid>
      </Grid>
    </StyledCardRoot>
  );
};

export default AddCardInstruction;
