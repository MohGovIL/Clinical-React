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
import PDF from 'Assets/Images/pdf.png';
import StyledSwitch from '../../../Assets/Elements/StyledSwitch';
import { StyledInsulation } from '../MedicalAdmission/UrgentAndInsulation/Style';
import TextField from '@material-ui/core/TextField';
import { FormContext, useFormContext } from 'react-hook-form';
import PopUpFormTemplates from '../../Generic/PopupComponents/PopUpFormTemplates';
const AddCardInstruction = ({
  user,
  edit,
  encounter,
  collectedTestAndTreatmentsFromFhir,
  currentTestTreatmentsInstructions,
  setCurrentTestTreatmentsInstructions,
  index,
  handlePopUpProps,
  callBack,
  popUpProps,
}) => {
  const { t } = useTranslation();
  const [
    currentTestTreatmentsInstructionsDetails,
    setCurrentTestTreatmentsInstructionsDetails,
  ] = useState([]);

  const [
    currentTestTreatmentsInstructionsDetailsSelectedId,
    setCurrentTestTreatmentsInstructionsDetailsSelectedId,
  ] = useState('');

  const [
    currentTestTreatmentsInstructionsLetters,
    setCurrentTestTreatmentsInstructionsLetters,
  ] = useState([]);
  const handleChangeOfDetails = async (event) => {
    setCurrentTestTreatmentsInstructionsDetailsSelectedId(event.target.value);
  };
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
    <React.Fragment>
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
          <Grid item xs={3}>
            <CustomizedTextField
              name={'test_treatment'}
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
            <Grid item xs={3}>
              <CustomizedTextField
                name={'test_treatment_type'}
                onChange={handleChangeOfDetails}
                value={
                  currentTestTreatmentsInstructionsDetailsSelectedId
                    ? currentTestTreatmentsInstructionsDetailsSelectedId
                    : ''
                }
                iconColor='#1976d2'
                width='100%'
                select
                label={t('X-Ray Type')}>
                <MenuItem value={''}>
                  <em>{t('Choose')}</em>
                </MenuItem>

                {currentTestTreatmentsInstructionsDetails.map(
                  (value, index) => {
                    return (
                      <MenuItem key={index} value={value.code}>
                        {t(value.title)}
                      </MenuItem>
                    );
                  },
                )}
              </CustomizedTextField>
            </Grid>
          ) : (
            <Grid item xs={3}></Grid>
          )}
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            {/*{encounter.status !== "finished" && true  }
          //see em-84 - to be continued*/}
            <StyledIconedButton name={'test_treatment_referral'}>
              <div>
                <img src={PDF} />
              </div>
              <p>{t('Referral for x-ray')}</p>
            </StyledIconedButton>
          </Grid>

          <Grid item xs={6}>
            <CustomizedTextField
              name='instructions'
              /*  inputRef={register}*/
              label={t('Instructions')}
              width='100%'
              multiline
            />
          </Grid>
          <Grid item xs={2}>
            <StyledSelectTemplateButton
              name={'test_treatment_recommendations'}
              /* disabled={permission === 'view' ? true : false}*/
              onClick={() =>
                handlePopUpProps(
                  t('X-Ray recommendations'),
                  'templates_x_ray', //to change
                  'tests_and_treatments', //to change
                  callBack,
                  'x_ray_details',
                )
              }>
              {t('Select template')}
            </StyledSelectTemplateButton>
          </Grid>

          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'center'}>
            <span>
              <b>{t('Status')}</b>
            </span>
            {/* Requested service - switch */}
            <StyledSwitch
              name='test_treatment_status'
              //register={register}
              label_1={'Not done'}
              label_2={'Performed'}
              marginLeft={'70px'}
              marginRight={'70px'}
              width={'200px'}
              margin={'10px 14px'}
            />
          </Grid>
          <Grid
            container
            direction={'row'}
            justify={'flex-start'}
            alignItems={'center'}>
            <CustomizedTextField
              /*disabled={permission === 'view' ? true : false}*/
              /* inputRef={register}*/
              name='test_treatment_remark'
              multiline
              width={'85%'}
              label={t('remark')}
            />
          </Grid>
        </Grid>
      </StyledCardRoot>
    </React.Fragment>
  );
};

export default AddCardInstruction;
