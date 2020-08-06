const normalizeFhirMedicationStatement = (medicationStatement) => {
  if (!medicationStatement)
    throw new Error(
      'normalizeFhirMedicationStatement: empty medicationStatement',
    );

  let id = medicationStatement.id || '';
  let status = medicationStatement.status || '';
  let categoryCode = '';
  let categorySystem = '';
  let categoryText = '';
  let medicationCodeableConceptCode = '';
  let medicationCodeableConceptSystem = '';
  let patient = '';
  let effectivePeriodStart = '';
  let effectivePeriodEnd = '';
  let dateAsserted = medicationStatement.dateAsserted || '';
  let informationSource = '';
  let note = '';

  if (medicationStatement.category) {
    categoryText = medicationStatement.category.text || '';
    if (
      medicationStatement.category.coding &&
      medicationStatement.category.coding.length
    ) {
      categoryCode = medicationStatement.category.coding[0].code || '';
      categorySystem = medicationStatement.category.coding[0].system || '';
    }
  }

  if (
    medicationStatement.medicationCodeableConcept &&
    medicationStatement.medicationCodeableConcept.coding &&
    medicationStatement.medicationCodeableConcept.coding.length
  ) {
    medicationCodeableConceptCode =
      medicationStatement.medicationCodeableConcept.coding[0].code || '';
    medicationCodeableConceptSystem =
      medicationStatement.medicationCodeableConcept.coding[0].system || '';
  }

  if (medicationStatement.subject) {
    patient = medicationStatement.subject.reference.split('/')[1] || '';
  }

  if (medicationStatement.effectivePeriod) {
    effectivePeriodStart = medicationStatement.effectivePeriod.start || '';
    effectivePeriodEnd = medicationStatement.effectivePeriod.end || '';
  }

  if (medicationStatement.informationSource) {
    informationSource =
      medicationStatement.informationSource.reference.split('/')[1] || '';
  }

  if (medicationStatement.note && medicationStatement.note.length) {
    note = medicationStatement.note[0].text || '';
  }

  return {
    id,
    status,
    categoryCode,
    categorySystem,
    categoryText,
    medicationCodeableConceptCode,
    medicationCodeableConceptSystem,
    patient,
    effectivePeriodStart,
    effectivePeriodEnd,
    dateAsserted,
    informationSource,
    note,
  };
};

export default normalizeFhirMedicationStatement;
