/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param medicationstatement {object}
 * @returns {object}
 */

const normalizeFhirMedicationStatement = (medicationStatement) => {
  const patient = medicationStatement.subject
    ? medicationStatement.subject.reference.split('/')[1]
    : null;
  const informationSource = medicationStatement.informationSource
    ? medicationStatement.informationSource.reference.split('/')[1]
    : null;

  let Status = '';
  let categoryCode = '';
  let categorySystem = '';
  let title = '';
  let medicationCodeableConceptCode = '';
  let medicationCodeableConceptSystem = '';
  let effectivePeriodStart = '';
  let effectivePeriodEnd = '';
  let note = '';

  if (medicationStatement.status && medicationStatement.status.length > 0) {
    Status = medicationStatement.status;
  }

  if (
    medicationStatement.category &&
    Object.keys(medicationStatement.category).length > 0
  ) {
    if (
      medicationStatement.category.coding[0] &&
      Object.keys(medicationStatement.category.coding[0]).length > 0
    ) {
      categoryCode = medicationStatement.category.coding[0].code;
      categorySystem = medicationStatement.category.coding[0].system;
    }
    if (medicationStatement.category.text && medicationStatement.category.text.length > 0) {
      title = medicationStatement.category.text;
    }
  }

  if (medicationStatement.medicationCodeableConcept && Object.keys(medicationStatement.medicationCodeableConcept).length > 0) {
    if (medicationStatement.medicationCodeableConcept.coding && medicationStatement.medicationCodeableConcept.coding.length) {
      medicationCodeableConceptCode = medicationStatement.medicationCodeableConcept.coding[0].code;
      medicationCodeableConceptSystem = medicationStatement.medicationCodeableConcept.coding[0].system;
    }
  }

  if (medicationStatement.effectivePeriod && Object.keys(medicationStatement.effectivePeriod).length > 0) {
    effectivePeriodStart = medicationStatement.effectivePeriod?.start;
    effectivePeriodEnd = medicationStatement.effectivePeriod?.end ;
  }

  if (medicationStatement.note && medicationStatement.note.length > 0) {
    note = medicationStatement.note[0].text;
  }

  return {
    id: medicationStatement.id,
    categoryCode,
    categorySystem,
    title,
    Status,
    medicationCodeableConceptCode,
    medicationCodeableConceptSystem,
    patient,
    effectivePeriodStart,
    effectivePeriodEnd,
    informationSource,
    note,
  };
};

export default normalizeFhirMedicationStatement;
