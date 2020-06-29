//DiagnosisAndRecommendations

import { connect } from 'react-redux';
import React from 'react';
import DiagnosisAndTreatment from './DiagnosisAndTreatment';
import RecommendationsOnRelease from './RecommendationsOnRelease ';
import DecisionOnRelease from './DecisionOnRelease';
import StyledDiagnosisAndRecommendations from './Style';
import { useForm, FormContext } from 'react-hook-form';
import { StyledButton } from 'Assets/Elements/StyledButton';
const DiagnosisAndRecommendations = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  history,
  verticalName,
  permission,
}) => {
  const methods = useForm({
    mode: 'onBlur',
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };
  return (
    <StyledDiagnosisAndRecommendations>
      <FormContext
        {...methods}
        permission={encounter.status === 'finished' ? 'view' : permission}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DiagnosisAndTreatment />
          <RecommendationsOnRelease />
          <DecisionOnRelease />
          {/* <StyledButton
            color='primary'
            type='submit'
            disabled={permission === 'view' ? true : false}>
            SUBMIT
          </StyledButton> */}
        </form>
      </FormContext>
    </StyledDiagnosisAndRecommendations>
  );
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
