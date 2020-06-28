//DiagnosisAndRecommendations

import { connect } from 'react-redux';
import React from 'react';
import Title from 'Assets/Elements/Title';
import { StyledFormGroup } from './Style';
import DiagnosisAndTreatment from './DiagnosisAndTreatment';

const DiagnosisAndRecommendations = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
}) => {
  return <DiagnosisAndTreatment />;
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
