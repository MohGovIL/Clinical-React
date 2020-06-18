/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @returns {*}
 * @constructor
 */
import React, { useEffect, useState } from 'react';
import { FHIR } from 'Utils/Services/FHIR';
import normalizeFhirCondition from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirCondition';
import normalizeFhirMedicationStatement
  from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeMedicationStatement';
import MedicalIssue from 'Assets/Elements/MedicalIssue';
import { useTranslation } from 'react-i18next';

const MedicalIssues = ({ patient }) => {
  const { t } = useTranslation();

  const [listAllergy, setAllergyList] = useState([]);
  const [listMedicalProblem, setMedicalProblem] = useState([]);
  const [listMedicationStatement, setMedicationStatement] = useState([]);

  const [medicalProblemIsUpdated, setMedicalProblemIsUpdated] = useState(0); //for online update
  useEffect(() => {
    (async () => {
      try {
        const listAllergyResult = await FHIR('Condition', 'doWork', {
          functionName: 'getConditionListByParams',
          functionParams: {
            category: 'allergy',
            subject: patient.id,
            status: '1',
          },
        });
        if (listAllergyResult.data && listAllergyResult.data.total > 0) {
          let normalizedlistAllergy = [];
          // eslint-disable-next-line
          listAllergyResult.data.entry.map((res, id) => {
            if (res.resource && res.resource.resourceType === 'Condition') {
              let allergy = normalizeFhirCondition(res.resource);
              normalizedlistAllergy.push(allergy);
            }
          });
          setAllergyList(normalizedlistAllergy);
        }
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();

    (async () => {
      try {
        const listMedicalProblemResult = await FHIR('Condition', 'doWork', {
          functionName: 'getConditionListByParams',
          functionParams: {
            category: 'medical_problem',
            subject: patient.id,
            status: '1',
          },
        });
        if (
          listMedicalProblemResult.data &&
          listMedicalProblemResult.data.total > 0
        ) {
          let normalizedListMedicalProblem = [];
          // eslint-disable-next-line
          listMedicalProblemResult.data.entry.map((res, id) => {
            if (res.resource && res.resource.resourceType === 'Condition') {
              let medicalProblem = normalizeFhirCondition(res.resource);
              normalizedListMedicalProblem.push(medicalProblem);
            }
          });
          setMedicalProblem(normalizedListMedicalProblem);
        }
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();

    //Load Medical Issues - chronic medication list
    (async () => {
      try {
        const listMedicationStatementResult = await FHIR('MedicationStatement', 'doWork', {
          functionName: 'getMedicationStatementListByParams',
          functionParams: {
            category: 'medication',
            patient: patient.id,
            status: 'active',
          },
        });
        if (
          listMedicationStatementResult.data &&
          listMedicationStatementResult.data.total > 0
        ) {
          let normalizedListMedicationStatement = [];
          // eslint-disable-next-line
          listMedicationStatementResult.data.entry.map((res, id) => {
            if (res.resource && res.resource.resourceType === 'MedicationStatement') {
              let medicationStatement = normalizeFhirMedicationStatement(res.resource);
              normalizedListMedicationStatement.push(medicationStatement);
            }
          });
          setMedicationStatement(normalizedListMedicationStatement);
        }
      } catch (e) {
        console.log('Error: ' + e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medicalProblemIsUpdated]);

  return (
    <React.Fragment>
      <MedicalIssue title={t('Sensitivities')} items={listAllergy} />
      <MedicalIssue
        title={t('Background diseases')}
        items={listMedicalProblem}
      />
      <MedicalIssue
        title={t('Chronic medications')}
        items={listMedicationStatement}
      />
    </React.Fragment>
  );
};
export default MedicalIssues;
