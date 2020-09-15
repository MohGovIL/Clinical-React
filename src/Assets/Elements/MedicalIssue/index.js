/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import {
  StyledDiv,
  StyledTitleTypography,
  StyledTypography,
  StyledChip,
  StyledContentBlock,
} from './Style';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';

const MedicalIssue = ({ title, items, currResponse, prevResponse, linkId }) => {
  const { t } = useTranslation();

  return (
    <StyledDiv>
      <StyledTitleTypography variant='h6' gutterBottom>
        {title}
      </StyledTitleTypography>
      <Divider />
      <StyledContentBlock>
        {items.length ? (
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
        ) : currResponse || prevResponse ? (
          <StyledTypography>{t('Not known')}</StyledTypography>
        ) : null}
      </StyledContentBlock>
    </StyledDiv>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    props: ownProps,
  };
};
export default connect(mapStateToProps, null)(MedicalIssue);
