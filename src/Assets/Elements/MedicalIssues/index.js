/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import {
  StyledTitleTypography,
  StyledTypography,
  StyledChip,
  StyledContentBlock,
} from './Style';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { FHIR } from '../../../Utils/Services/FHIR';

const MedicalIssues = ({ title }) => {
  const { t } = useTranslation();

  useEffect(() => {
    (() => {
      try {
        FHIR('Condition', 'doWork', {
          functionName: 'getConditionSensitivesList',
          functionParams: { id: 'identifier_type_list' },
        }).then((someList) => {});
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();

    (() => {
      try {
        FHIR('Condition', 'doWork', {
          functionName: 'getConditionMedicalProblemList',
          functionParams: { id: 'identifier_type_list' },
        }).then((someList) => {});
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();
  });

  return (
    <React.Fragment>
      <StyledTitleTypography variant='h6' gutterBottom>
        {title}
      </StyledTitleTypography>
      <Divider />
      <StyledContentBlock>
        {/*<StyledTypography>{t('UNknown')}</StyledTypography>*/}
        <Grid container spacing={2}>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <StyledChip color='primary' label={'111'} />
              </Grid>
              <Grid item>
                <StyledChip color='primary' label={'222'} />
              </Grid>
              <Grid item>
                <StyledChip color='primary' label={'333'} />
              </Grid>
              <Grid item>
                <StyledChip color='primary' label={'444'} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledContentBlock>
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    languageDirection: state.settings.lang_dir,
    props: ownProps,
  };
};
export default connect(mapStateToProps, null)(MedicalIssues);
