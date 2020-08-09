const denormalizeFhirMedicationStatement = (medicationStatement) => {
  const denormalizedFhirMedicationStatement = {};
  for (const medicationStatementKey in medicationStatement) {
    if (medicationStatement.hasOwnProperty(medicationStatementKey)) {
      const element = medicationStatement[medicationStatementKey];
      switch (medicationStatementKey) {
        case 'status':
          denormalizedFhirMedicationStatement['status'] = element;
          break;
        case '':
          break;
        default:
          break;
      }
    }
  }

  return denormalizedFhirMedicationStatement;
};

export default denormalizeFhirMedicationStatement;
