//DiagnosisAndRecommendations

import { connect } from 'react-redux';
import React from 'react';
import DiagnosisAndTreatment from './DiagnosisAndTreatment';
import RecommendationsOnRelease from './RecommendationsOnRelease ';
import DecisionOnRelease from './DecisionOnRelease';
import DrugRecommendation from './DrugRecommendation';
import StyledDiagnosisAndRecommendations from './Style';
import { useForm, FormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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
    defaultValues: {
      drugRecommendation: [
        {
          drugName: '',
          quantity: '',
          drugForm: '',
          drugRoute: '',
          intervals: '',
          duration: '',
          toDate: '',
          instructionsForTheDrug: '',
        },
      ],
    },
  });
  const { handleSubmit, setValue, register, unregister } = methods;
  const { t } = useTranslation();
  const onSubmit = (data) => {
    console.log(isRequiredValidation(data));
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

  const [requiredErrors, setRequiredErrors] = React.useState([
    {
      quantity: '',
      drugForm: '',
      drugRoute: '',
      intervals: '',
      duration: '',
    },
  ]);
  const requiredFields = {
    quantity: {
      name: 'quantity',
      required: function (data) {
        return data.length > 0;
      },
    },
    drugForm: {
      name: 'drugForm',
      required: function (data) {
        return data.length > 0;
      },
    },
    drugRoute: {
      name: 'drugRoute',
      required: function (data) {
        return data.length > 0;
      },
    },
    intervals: {
      name: 'intervals',
      required: function (data) {
        return data.length > 0;
      },
    },
    duration: {
      name: 'duration',
      required: function (data) {
        return data.length > 0;
      },
    },
  };

  const isRequiredValidation = (data) => {
    let clean = true;
    if (!data['drugRecommendation']) {
      return clean;
    }
    requiredErrors.forEach((medicine, medicineIndex) => {
      for (const fieldKey in requiredFields) {
        if (requiredFields.hasOwnProperty(fieldKey)) {
          let answer;
          const field = requiredFields[fieldKey];
          answer = field.required(
            data['drugRecommendation'][medicineIndex][field.name],
          );
          if (answer) {
            setRequiredErrors((prevState) => {
              const cloneState = [...prevState];
              cloneState[medicineIndex][field.name] = '';
              return cloneState;
            });
          } else {
            setRequiredErrors((prevState) => {
              const cloneState = [...prevState];
              cloneState[medicineIndex][field.name] = t('Value is required');
              return cloneState;
            });
            clean = false;
          }
        }
      }
    });

    return clean;
  };
  return (
    <StyledDiagnosisAndRecommendations>
      <FormContext
        {...methods}
        permission={encounter.status === 'finished' ? 'view' : permission}
        serviceType={encounter.serviceTypeCode}
        reasonCode={encounter.examinationCode}
        requiredErrors={requiredErrors}
        setRequiredErrors={setRequiredErrors}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DiagnosisAndTreatment />
          <RecommendationsOnRelease />
          <DrugRecommendation />
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
