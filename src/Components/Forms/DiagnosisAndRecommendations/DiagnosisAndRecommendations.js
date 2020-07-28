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
import { FHIR } from 'Utils/Services/FHIR';
import PopUpFormTemplates from 'Components/Generic/PopupComponents/PopUpFormTemplates';
import SaveForm from 'Components/Forms/GeneralComponents/SaveForm';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
import { baseRoutePath } from 'Utils/Helpers/baseRoutePath';
import { store } from 'index';
import normalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirQuestionnaireResponse';
const DiagnosisAndRecommendations = ({
  patient,
  encounter,
  formatDate,
  languageDirection,
  verticalName,
  permission,
}) => {
  const history = useHistory();
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
  const { handleSubmit, setValue, register, unregister, getValues } = methods;
  const { t } = useTranslation();
  const answerType = (type, data) => {
    if (type === 'string') {
      return [
        {
          valueString: data,
        },
      ];
    } else if (type === 'integer') {
      return [
        {
          valueInteger: data,
        },
      ];
    } else {
      return `No such type: ${type}`;
    }
  };

  const [qItem, setQItem] = React.useState([]);
  const [
    normalizedQuestionnaireResponse,
    setNormalizedQuestionnaireResponse,
  ] = React.useState({});
  React.useEffect(() => {
    (async () => {
      try {
        const q = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: {
            QuestionnaireName: 'diagnosis_and_recommendations_questionnaire',
          },
        });
        const questionnaireResponse = await FHIR(
          'QuestionnaireResponse',
          'doWork',
          {
            functionName: 'getQuestionnaireResponse',
            functionParams: {
              encounterId: encounter.id,
              patientId: patient.id,
              questionnaireId: q.data.entry[1].resource.id,
            },
          },
        );
        if (questionnaireResponse.data.total) {
          setNormalizedQuestionnaireResponse(
            normalizeFhirQuestionnaireResponse(
              questionnaireResponse.data.entry[1].resource,
            ),
          );
        }
        const Questionnaire = q.data.entry[1].resource;
        register({ name: 'questionnaireId' });
        setValue('questionnaireId', Questionnaire.id);
        setQItem(Questionnaire);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => unregister('questionnaireId');
  }, [register, setValue, unregister, encounter.id, patient.id]);

  const [requiredErrors, setRequiredErrors] = React.useState([
    {
      quantity: '',
      drugForm: '',
      drugRoute: '',
      intervals: '',
      duration: '',
    },
  ]);

  const requiredFields = React.useMemo(() => {
    return {
      quantity: {
        name: 'quantity',
        required: function (data) {
          return data && data.length > 0;
        },
      },
      drugForm: {
        name: 'drugForm',
        required: function (data) {
          return data && data.length > 0;
        },
      },
      drugRoute: {
        name: 'drugRoute',
        required: function (data) {
          return data && data.length > 0;
        },
      },
      intervals: {
        name: 'intervals',
        required: function (data) {
          return data && data.length > 0;
        },
      },
      duration: {
        name: 'duration',
        required: function (data) {
          return data && data.length > 0;
        },
      },
    };
  }, []);

  const isRequiredValidation = (data) => {
    let clean = true;
    if (!data['drugRecommendation']) {
      return clean;
    }
    for (
      let medicineIndex = 0;
      medicineIndex < requiredErrors.length;
      medicineIndex++
    ) {
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
              cloneState[medicineIndex][field.name] = t(
                'A value must be entered in the field',
              );
              return cloneState;
            });
            clean = false;
          }
        }
      }
    }
    return clean;
  };

  const onSubmit = async (data) => {
    if (isRequiredValidation(data)) {
      try {
        const APIsArray = [];
        const items = qItem.item.map((i) => {
          const item = {
            linkId: i.linkId,
            text: i.text,
          };
          switch (i.linkId) {
            case '1':
              if (data.findingsDetails)
                item['answer'] = answerType(i.type, data.findingsDetails);
              break;
            case '2':
              if (data.diagnosisDetails)
                item['answer'] = answerType(i.type, data.diagnosisDetails);
              break;
            case '3':
              if (data.treatmentDetails)
                item['answer'] = answerType(i.type, data.treatmentDetails);
              break;
            case '4':
              if (data.instructionsForFurtherTreatment)
                item['answer'] = answerType(
                  i.type,
                  data.instructionsForFurtherTreatment,
                );
              break;
            case '5':
              if (data.decision)
                item['answer'] = answerType(i.type, data.decision);
              break;
            case '6':
              if (data.evacuationWay)
                item['answer'] = answerType(i.type, data.evacuationWay);
              break;
            case '7':
              if (data.numberOfDays)
                item['answer'] = answerType(i.type, data.numberOfDays);
              break;
            default:
              break;
          }
          return item;
        });
        if (Object.keys(normalizedQuestionnaireResponse).length) {
          APIsArray.push(
            FHIR('QuestionnaireResponse', 'doWork', {
              functionName: 'patchQuestionnaireResponse',
              questionnaireResponseId: normalizedQuestionnaireResponse.id,
              questionnaireResponseParams: {
                item: items,
              },
            }),
          );
        } else {
          APIsArray.push(
            FHIR('QuestionnaireResponse', 'doWork', {
              functionName: 'createQuestionnaireResponse',
              functionParams: {
                questionnaireResponse: {
                  questionnaire: data.questionnaireId,
                  status: 'completed',
                  patient: patient.id,
                  encounter: encounter.id,
                  authored: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
                  source: patient.id,
                  item: items,
                },
              },
            }),
          );
        }
        //Updating encounter
        const cloneEncounter = { ...encounter };
        cloneEncounter.extensionSecondaryStatus = data.nextStatus;
        cloneEncounter.status = 'in-progress';
        cloneEncounter.practitioner = store.getState().login.userID;

        APIsArray.push(
          FHIR('Encounter', 'doWork', {
            functionName: 'updateEncounter',
            functionParams: {
              encounterId: encounter.id,
              encounter: cloneEncounter,
            },
          }),
        );
        if (data.drugRecommendation && data.drugRecommendation.length) {
          data.drugRecommendation.forEach((drug, drugIndex) => {
            const medicationRequest = {};

            medicationRequest['status'] = 'active';
            medicationRequest['patient'] = patient.id;
            medicationRequest['encounter'] = encounter.id;
            medicationRequest['requester'] = store.getState().login.userID;
            medicationRequest['recorder'] = store.getState().login.userID;
            medicationRequest['note'] = drug.instructionsForTheDrug;
            medicationRequest['routeCode'] = drug.drugRoute;
            medicationRequest['medicationCodeableConceptCode'] = drug.drugName;
            medicationRequest['timingCode'] = drug.intervals;
            medicationRequest['doseQuantity'] = drug.quantity;
            medicationRequest['methodCode'] = drug.drugForm;
            medicationRequest['timingRepeatStart'] = moment(
              drug.toDate,
              formatDate,
            )
              .subtract(drug.duration, 'days')
              .format('YYYY-MM-DD');
            medicationRequest['timingRepeatEnd'] = moment(
              drug.toDate,
              formatDate,
            ).format('YYYY-MM-DD');
            medicationRequest['authoredOn'] = moment().format(
              'YYYY-MM-DDTHH:mm:ss[Z]',
            );

            if (data.medicationRequest && data.medicationRequest[drugIndex]) {
              APIsArray.push(
                FHIR('MedicationRequest', 'doWork', {
                  functionName: 'updateMedicationRequest',
                  functionParams: {
                    medicationRequest,
                    _id: data.medicationRequest[drugIndex],
                  },
                }),
              );
            } else {
              APIsArray.push(
                FHIR('MedicationRequest', 'doWork', {
                  functionName: 'createMedicationRequest',
                  functionParams: {
                    medicationRequest,
                  },
                }),
              );
            }
          });
          const res = await Promise.all[APIsArray];
          console.log(res);
          history.push(`${baseRoutePath()}/generic/patientTracking`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePopUpClose = () => {
    setPopUpProps((prevState) => {
      return {
        ...prevState,
        popupOpen: false,
      };
    });
  };

  const [defaultContext, setDefaultContext] = React.useState('');
  const [popUpProps, setPopUpProps] = React.useState({
    popupOpen: false,
    formID: '',
    encounter,
    formFieldsTitle: '',
    defaultContext,
    setDefaultContext,
    handlePopupClose: handlePopUpClose,
    setTemplatesTextReturned: null,
    name: '',
  });
  const statuses = [
    { label: 'Waiting for nurse', value: 'waiting_for_nurse' },
    { label: 'Waiting for doctor', value: 'waiting_for_doctor' },
    { label: 'Waiting for release', value: 'waiting_for_release' },
  ];
  return (
    <StyledDiagnosisAndRecommendations>
      <PopUpFormTemplates {...popUpProps} />
      <FormContext
        {...methods}
        setPopUpProps={setPopUpProps}
        permission={encounter.status === 'finished' ? 'view' : permission}
        serviceType={encounter.serviceTypeCode}
        reasonCode={encounter.examinationCode}
        requiredErrors={requiredErrors}
        setRequiredErrors={setRequiredErrors}
        questionnaireResponse={normalizedQuestionnaireResponse}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DiagnosisAndTreatment />
          <RecommendationsOnRelease />
          <DrugRecommendation
            encounterId={encounter.id}
            formatDate={formatDate}
          />
          <DecisionOnRelease />
          <SaveForm statuses={statuses} />
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
