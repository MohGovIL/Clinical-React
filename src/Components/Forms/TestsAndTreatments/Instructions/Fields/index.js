import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';

import TestTreatment from '../TestTreatment';
import TestTreatmentInstructions from '../TestTreatmentType';
import {
  StyledCardContent,
  StyledCardDetails,
  StyledCardName,
  StyledCardRoot,
  StyledConstantHeaders,
  StyledInstructions,
  StyledTreatmentInstructionsButton,
  StyledTypographyHour,
  StyledTypographyName,
} from '../../Style';
import TestTreatmentType from '../TestTreatmentType';
import * as moment from 'moment';
import { connect } from 'react-redux';
import normalizeFhirUser from '../../../../../Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirUser';
import PLUS from 'Assets/Images/plus.png';
import { useTranslation } from 'react-i18next';
const Fields = ({ encounter, currentUser }) => {
  const { control } = useFormContext();
  const { fields, insert, prepend, append, remove } = useFieldArray({
    control,
    name: 'Instruction',
  });
  let user = normalizeFhirUser(currentUser);
  const edit = true;

  const addNewInstruction = () => {
    if (fields.length > 0) {
      insert(parseInt(0, 10), {
        test_treatment: '',
        test_treatment_type: '',
      });
    } else {
      append({ test_treatment: '', test_treatment_type: '' });
    }
    /* prepend({ test_treatment: '', test_treatment_type: '' });*/
  };
  const { t } = useTranslation();
  return (
    <>
      <StyledConstantHeaders>
        {t('Instructions for treatment')}
      </StyledConstantHeaders>
      <StyledTreatmentInstructionsButton onClick={addNewInstruction}>
        <img alt='plus icon' src={PLUS} />
        {t('Instructions for treatment')}
      </StyledTreatmentInstructionsButton>
      <hr />
      <StyledInstructions id='newRefInstructions'>
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <StyledCardRoot>
                <StyledCardDetails>
                  <StyledCardContent>
                    <StyledTypographyName component='h5' variant='h5'>
                      {edit ? user.name.toString() : ''}
                    </StyledTypographyName>
                    <StyledTypographyHour
                      variant='subtitle1'
                      color='textSecondary'>
                      {' '}
                      {edit
                        ? moment
                            .utc(encounter.extensionStatusUpdateDate)
                            .format('LT')
                        : ''}{' '}
                    </StyledTypographyHour>
                  </StyledCardContent>
                  <StyledCardName></StyledCardName>
                </StyledCardDetails>

                <Grid container spacing={4}>
                  <Grid item xs={3}>
                    <TestTreatment index={index} item={item} />
                  </Grid>
                  <Grid item xs={3}>
                    <TestTreatmentType index={index} item={item} />
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </StyledCardRoot>
            </div>
          );
        })}
      </StyledInstructions>
    </>
  );
};

/**
 *
 * @param state
 * @returns {{formatDate: any, currentUser: {}, languageDirection: any, patient: {}, encounter: {}}}
 */
const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    currentUser: state.active.activeUser,
  };
};
export default connect(mapStateToProps, null)(Fields);
