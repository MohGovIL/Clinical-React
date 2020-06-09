/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */

import React from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { StyledTitleTypography, StyledTypography } from './Style';
import { useTranslation } from 'react-i18next';

const MedicalIssues = ({ title }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <StyledTitleTypography variant='h6' gutterBottom>
        {title}
      </StyledTitleTypography>
      <Divider />
      <StyledTypography>{t("UNknown")}</StyledTypography>
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
