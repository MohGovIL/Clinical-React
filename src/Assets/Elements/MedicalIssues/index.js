/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React from 'react';
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

const MedicalIssues = ({ title, items }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <StyledTitleTypography variant='h6' gutterBottom>
        {title}
      </StyledTitleTypography>
      <Divider />
      <StyledContentBlock>
        {items.length > 0 ? (
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {items.map((issue, index) => (
                  <Grid item key={index}>
                    <StyledChip color='primary' label={t(issue.title)} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <StyledTypography>{t('UNknown')}</StyledTypography>
        )}
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
