/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */
import React, { useEffect, useState } from 'react';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirCondition from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirCondition';
import normalizeFhirMedicationStatement from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeMedicationStatement';
import MedicalIssue from 'Assets/Elements/MedicalIssue';
import { useTranslation } from 'react-i18next';
import normalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirQuestionnaireResponse';

const MedicalIssues = ({ patientId, prevEncounterId, encounterId }) => {
  const { t } = useTranslation();

  const [patientSensitivities, setPatientSensitivities] = useState([]);
  const [patientBackgroundDiseases, setPatientBackgroundDiseases] = useState(
    [],
  );
  const [patientChronicMedications, setPatientChronicMedications] = useState(
    [],
  );

  const [medicalProblemIsUpdated, setMedicalProblemIsUpdated] = useState(0); //for online update

  useEffect(() => {
    const getMedicalIssues = async () => {
      try {
        const sensitivitiesLinkId = '5';
        const backgroundDiseasesLinkId = '6';
        const chronicMedicationLinkId = '7';

        const questionnaireResponseArray = [];

        const q = await FHIR('Questionnaire', 'doWork', {
          functionName: 'getQuestionnaire',
          functionParams: {
            QuestionnaireName: 'medical_admission_questionnaire',
          },
        });
        questionnaireResponseArray.push(
          FHIR('QuestionnaireResponse', 'doWork', {
            functionName: 'getQuestionnaireResponse',
            functionParams: {
              encounterId,
              patientId,
              questionnaireId: q.data.entry[1].resource.id,
            },
          }),
        );
        if (prevEncounterId) {
          questionnaireResponseArray.push(
            FHIR('QuestionnaireResponse', 'doWork', {
              functionName: 'getQuestionnaireResponse',
              functionParams: {
                encounterId: prevEncounterId,
                patientId,
                questionnaireId: q.data.entry[1].resource.id,
              },
            }),
          );
        }
        const responses = await Promise.all(questionnaireResponseArray);

        if (responses[0].data.total) {
          // There is curr encounter response

          const qr = normalizeFhirQuestionnaireResponse(
            responses[0].data.entry[1].resource,
          );
          const isSensetive = Boolean(
            +qr.item.find((i) => i.linkId === sensitivitiesLinkId)['answer'][0][
              'valueBoolean'
            ],
          );

          const isBackgroundDiseases = Boolean(
            +qr.item.find((i) => i.linkId === backgroundDiseasesLinkId)[
              'answer'
            ][0]['valueBoolean'],
          );

          const isChronicMedication = Boolean(
            +qr.item.find((i) => i.linkId === chronicMedicationLinkId)[
              'answer'
            ][0]['valueBoolean'],
          );
        } else {
          // There is no curr encounter response
          if (prevEncounterId && responses[1].data.total) {
            // There is a prev encounter response
            setPrevResponse(
              normalizeFhirQuestionnaireResponse(
                responses[1].data.entry[1].resource,
              ),
            );
          } else {
            // There is no curr and no prev encounter response
          }
        }

        // const ALL_MEDICAL_ISSUES = [];
        // ALL_MEDICAL_ISSUES.push(
        //   FHIR('Condition', 'doWork', {
        //     functionName: 'getConditionListByParams',
        //     functionParams: {
        //       category: 'sensitive',
        //       subject: patientId,
        //       status: 'active',
        //     },
        //   }),
        // );
        // ALL_MEDICAL_ISSUES.push(
        //   FHIR('Condition', 'doWork', {
        //     functionName: 'getConditionListByParams',
        //     functionParams: {
        //       category: 'medical_problem',
        //       subject: patientId,
        //       status: 'active',
        //     },
        //   }),
        // );
        // ALL_MEDICAL_ISSUES.push(
        //   FHIR('MedicationStatement', 'doWork', {
        //     functionName: 'getMedicationStatementListByParams',
        //     functionParams: {
        //       category: 'medication',
        //       patient: patientId,
        //       status: 'active',
        //     },
        //   }),
        // );
        // const [
        //   sensitivities,
        //   backgroundDiseases,
        //   chronicMedication,
        // ] = await Promise.all(ALL_MEDICAL_ISSUES);

        // if (sensitivities.data.total) {
        //   const normalizedSensitivities = [];
        //   sensitivities.data.entry.forEach((sensitivity) => {
        //     if (sensitivity.resource) {
        //       normalizedSensitivities.push(normalizeFhirCondition(sensitivity));
        //     }
        //   });
        //   setPatientSensitivities(normalizedSensitivities);
        // }

        // if (backgroundDiseases.data.total) {
        //   const normalizedBackgroundDiseases = [];
        //   backgroundDiseases.data.entry.forEach((disease) => {
        //     if (disease.resource) {
        //       normalizedBackgroundDiseases.push(
        //         normalizeFhirCondition(disease),
        //       );
        //     }
        //   });
        //   setPatientBackgroundDiseases(normalizedBackgroundDiseases);
        // }

        // if (chronicMedication.data.total) {
        //   const normalizedChronicMedication = [];
        //   chronicMedication.data.entry.forEach((medication) => {
        //     if (medication.resource) {
        //       normalizedChronicMedication.push(
        //         normalizeFhirMedicationStatement(medication),
        //       );
        //     }
        //   });
        //   setPatientChronicMedications(normalizedChronicMedication);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    getMedicalIssues();
  }, [patientId, encounterId, prevEncounterId]);

  return (
    <React.Fragment>
      <MedicalIssue
        linkId={'5'}
        items={patientSensitivities}
        prevResponse={prevResponse}
        currResponse={currResponse}
        title={t('Sensitivities')}
      />
      <MedicalIssue
        linkId={'6'}
        items={patientBackgroundDiseases}
        prevResponse={prevResponse}
        currResponse={currResponse}
        title={t('Background diseases')}
      />
      <MedicalIssue
        linkId={'7'}
        items={patientChronicMedications}
        prevResponse={prevResponse}
        currResponse={currResponse}
        title={t('Chronic medications')}
      />
    </React.Fragment>
  );
};
export default MedicalIssues;
