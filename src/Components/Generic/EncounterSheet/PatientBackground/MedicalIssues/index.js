/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */
import React, { useEffect, useState } from 'react';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirCondition from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirCondition';
import normalizeFhirMedicationStatement from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirMedicationStatement';
import MedicalIssue from 'Assets/Elements/MedicalIssue';
import { useTranslation } from 'react-i18next';
import normalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirQuestionnaireResponse';
import {ParseQuestionnaireResponseBoolean} from "Utils/Helpers/FhirEntities/helpers/ParseQuestionnaireResponseItem";

const MedicalIssues = ({ patientId, prevEncounterId, encounterId, handleLoading }) => {
  const { t } = useTranslation();

  const [patientSensitivities, setPatientSensitivities] = useState([]);
  const [patientBackgroundDiseases, setPatientBackgroundDiseases] = useState(
    [],
  );
  const [patientChronicMedications, setPatientChronicMedications] = useState(
    [],
  );

  const [medicalProblemIsUpdated, setMedicalProblemIsUpdated] = useState(0); //for online update

  const sensitivitiesLinkId = '5';
  const backgroundDiseasesLinkId = '6';
  const chronicMedicationLinkId = '7';

  const extractItems = (normalizedQr) => {
    const isSensitive =  ParseQuestionnaireResponseBoolean(normalizedQr, sensitivitiesLinkId);
    const isBackgroundDiseases = ParseQuestionnaireResponseBoolean(normalizedQr, backgroundDiseasesLinkId);
    const isChronicMedication = ParseQuestionnaireResponseBoolean(normalizedQr, chronicMedicationLinkId);
    return [isSensitive, isBackgroundDiseases, isChronicMedication];
  };

  useEffect(() => {

    handleLoading('sensitivities');
    const getMedicalIssues = async () => {
      try {
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
          const currQr = normalizeFhirQuestionnaireResponse(
            responses[0].data.entry[1].resource,
          );
          const [
            sensitive,
            backgroundDiseases,
            chronicMedication,
          ] = extractItems(currQr);
          if (sensitive) {
            const sensitives = await FHIR('Condition', 'doWork', {
              functionName: 'getConditionListByParams',
              functionParams: {
                category: 'sensitive',
                subject: patientId,
                status: 'active',
                encounter:currQr.encounter
              },
            });
            const sensitivesArr = [];
            sensitives.data.entry.forEach((sens) => {
              if (sens.resource) {
                sensitivesArr.push(
                  normalizeFhirCondition(sens.resource)['codeText'],
                );
              }
            });
            setPatientSensitivities(sensitivesArr);
            handleLoading('sensitivities');
          } else {
            setPatientSensitivities(null);
            handleLoading('sensitivities');
          }
          if (backgroundDiseases) {
            const background = await FHIR('Condition', 'doWork', {
              functionName: 'getConditionListByParams',
              functionParams: {
                category: 'medical_problem',
                subject: patientId,
                status: 'active',
                encounter:currQr.encounter
              },
            });
            const backgroundArr = [];
            background.data.entry.forEach((back) => {
              if (back.resource) {
                backgroundArr.push(
                  normalizeFhirCondition(back.resource)['codeText'],
                );
              }
            });
            setPatientBackgroundDiseases(backgroundArr);
            handleLoading('backgroundDiseases');
          } else {
            setPatientBackgroundDiseases(null);
            handleLoading('backgroundDiseases');
          }
          if (chronicMedication) {
            const chronic = await FHIR('MedicationStatement', 'doWork', {
              functionName: 'getMedicationStatementListByParams',
              functionParams: {
                category: 'medication',
                patient: patientId,
                status: 'active',
                encounter:currQr.encounter
              },
            });
            const chronicArr = [];
            chronic.data.entry.forEach((chro) => {
              if (chro.resource) {
                chronicArr.push(
                  normalizeFhirMedicationStatement(chro.resource)[
                    'medicationCodeableConceptText'
                  ],
                );
              }
            });
            setPatientChronicMedications(chronicArr);
            handleLoading('chronicMedications');
          } else {
            setPatientChronicMedications(null);
            handleLoading('chronicMedications');
          }
        } else if (prevEncounterId && responses[1] && responses[1].data.total) {
          // There is a prev encounter response
          const prevQr = normalizeFhirQuestionnaireResponse(
            responses[1].data.entry[1].resource,
          );
          const [
            sensitive,
            backgroundDiseases,
            chronicMedication,
          ] = extractItems(prevQr);
          if (sensitive) {
            const sensitives = await FHIR('Condition', 'doWork', {
              functionName: 'getConditionListByParams',
              functionParams: {
                category: 'sensitive',
                subject: patientId,
                status: 'active',
                encounter:prevQr.encounter
              },
            });
            const sensitivesArr = [];
            sensitives.data.entry.forEach((sens) => {
              if (sens.resource) {
                sensitivesArr.push(normalizeFhirCondition(sens.resource)['codeText']);
              }
            });
            setPatientSensitivities(sensitivesArr);
            handleLoading('sensitivities');
          } else {
            setPatientSensitivities(null);
            handleLoading('sensitivities');
          }
          if (backgroundDiseases) {
            const background = await FHIR('Condition', 'doWork', {
              functionName: 'getConditionListByParams',
              functionParams: {
                category: 'medical_problem',
                subject: patientId,
                status: 'active',
                encounter:prevQr.encounter
              },
            });
            const backgroundArr = [];
            background.data.entry.forEach((back) => {
              if (back.resource) {
                backgroundArr.push(normalizeFhirCondition(back.resource)['codeText']);
              }
            });
            setPatientBackgroundDiseases(backgroundArr);
            handleLoading('backgroundDiseases');
          } else {
            setPatientBackgroundDiseases(null);
            handleLoading('backgroundDiseases');
          }
          if (chronicMedication) {
            const chronic = await FHIR('MedicationStatement', 'doWork', {
              functionName: 'getMedicationStatementListByParams',
              functionParams: {
                category: 'medication',
                patient: patientId,
                status: 'active',
                encounter:prevQr.encounter
              },
            });
            const chronicArr = [];
            chronic.data.entry.forEach((chro) => {
              if (chro.resource) {
                chronicArr.push(
                  normalizeFhirMedicationStatement(chro.resource)['medicationCodeableConceptText']
                );
              }
            });
            setPatientChronicMedications(chronicArr);
            handleLoading('chronicMedications');
          } else {
            setPatientChronicMedications(null);
            handleLoading('chronicMedications');
          }
        } else {
          // There is no curr and no prev encounter response
          handleLoading('chronicMedications');
          handleLoading('backgroundDiseases');
          handleLoading('sensitivities');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMedicalIssues();
  }, [patientId, encounterId, prevEncounterId]);

  return (
    <React.Fragment>
      <MedicalIssue items={patientSensitivities} title={t('Sensitivities')} />
      <MedicalIssue
        items={patientBackgroundDiseases}
        title={t('Background diseases')}
      />
      <MedicalIssue
        items={patientChronicMedications}
        title={t('Chronic medications')}
        langDirection={'ltr'}
      />
    </React.Fragment>
  );
};
export default MedicalIssues;
