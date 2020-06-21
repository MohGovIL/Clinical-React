//DiagnosisAndRecommendations

import { connect } from 'react-redux';
import React from 'react';

const DiagnosisAndRecommendations = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
}) => {
  return <React.Fragment>DiagnosisAndRecommendations</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    patient: state.active.activePatient,
    encounter: state.active.activeEncounter,
    languageDirection: state.settings.lang_dir,
    formatDate: state.settings.format_date,
    verticalName: state.settings.clinikal_vertical,
  };
};
export default connect(mapStateToProps, null)(DiagnosisAndRecommendations);
