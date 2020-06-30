//DiagnosisAndRecommendations

import { connect } from 'react-redux';
import React from 'react';
import DiagnosisAndTreatment from './DiagnosisAndTreatment';
import RecommendationsOnRelease from './RecommendationsOnRelease ';
import DecisionOnRelease from './DecisionOnRelease';
import StyledDiagnosisAndRecommendations from './Style';
import { useForm, FormContext } from 'react-hook-form';

import { StyledButton } from 'Assets/Elements/StyledButton';
import { FHIR } from 'Utils/Services/FHIR';
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
  const { handleSubmit, setValue, register, unregister } = methods;

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  React.useEffect(() => {
    (async () => {
      try {
        const q = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: {
            QuestionnaireName: 'diagnosis_and_recommendations_questionnaire',
          },
        });
        const Questionnaire = q.data.entry[1].resource;
        register({ name: 'questionnaireId' });
        setValue('questionnaireId', Questionnaire.id);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => unregister('questionnaireId');
  }, [register, setValue, unregister]);
  return (
    <StyledDiagnosisAndRecommendations>
      <FormContext
        {...methods}
        permission={encounter.status === 'finished' ? 'view' : permission}
        serviceType={encounter.serviceTypeCode}
        reasonCode={encounter.examinationCode}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DiagnosisAndTreatment />
          <RecommendationsOnRelease />
          <DecisionOnRelease />
          <StyledButton
            color='primary'
            type='submit'
            disabled={permission === 'view' ? true : false}>
            SUBMIT
          </StyledButton>
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
