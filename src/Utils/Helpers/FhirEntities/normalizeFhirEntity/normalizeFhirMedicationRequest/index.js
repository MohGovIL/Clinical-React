/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} medicationRequest
 * @returns "Error" | normalizedFhirMedicationRequest
 */
const normalizeFhirMedicationRequest = (medicationRequest) => {
  if (Object.prototype.toString.call(medicationRequest === '[object Object]')) {
    let medicationCodeableConceptCode = '';
    let medicationCodeableConceptDisplay = '';
    let medicationCodeableConceptSystem = '';
    let patient = '';
    let encounter = '';
    let requester = '';
    let recorder = '';
    let note = '';
    let substitution = '';
    let timingRepeatStart = '';
    let timingRepeatEnd = '';
    let timingCode = '';
    let timingText = '';
    let timingSystem = '';
    let siteSystem = '';
    let siteCode = '';
    let routeCode = '';
    let routeSystem = '';
    let routeText = '';
    let methodCode = '';
    let methodSystem = '';
    let methodText = '';
    let doseQuantity = '';
    let maxDosePerAdministrationValue = '';
    let maxDosePerAdministrationUnit = '';
    let maxDosePerAdministrationSystem = '';
    let maxDosePerAdministrationCode = '';
    if (
      medicationRequest.dosageInstruction &&
      medicationRequest.dosageInstruction.length
    ) {
      const dosageInstruction = medicationRequest.dosageInstruction[0];
      if (dosageInstruction.timing) {
        if (
          dosageInstruction.timing.repeat &&
          dosageInstruction.timing.repeat.boundsPeriod
        ) {
          timingRepeatStart =
            dosageInstruction.timing.repeat.boundsPeriod.start;
          timingRepeatEnd = dosageInstruction.timing.repeat.boundsPeriod.end;
        }
        if (dosageInstruction.timing.code && dosageInstruction.timing.code) {
          timingText = dosageInstruction.timing.code.text;
          if (
            dosageInstruction.timing.code.coding &&
            dosageInstruction.timing.code.coding.length
          ) {
            timingCode = dosageInstruction.timing.code.coding[0].code;
            timingSystem = dosageInstruction.timing.code.coding[0].system;
          }
        }
      }
      if (
        dosageInstruction.site &&
        dosageInstruction.site.coding &&
        dosageInstruction.site.coding.length
      ) {
        siteSystem = dosageInstruction.site.coding[0].system;
        siteCode = dosageInstruction.site.coding[0].code;
      }
      if (dosageInstruction.route) {
        routeText = dosageInstruction.route.text;
        if (
          dosageInstruction.route.coding &&
          dosageInstruction.route.coding.length
        ) {
          routeCode = dosageInstruction.route.coding[0].code;
          routeSystem = dosageInstruction.route.coding[0].system;
        }
      }
      if (dosageInstruction.method) {
        methodText = dosageInstruction.method.text;
        if (
          dosageInstruction.method.coding &&
          dosageInstruction.method.coding.length
        ) {
          methodSystem = dosageInstruction.method.coding[0].system;
          methodCode = dosageInstruction.method.coding[0].code;
        }
      }
      if (
        dosageInstruction.doseAndRate &&
        dosageInstruction.doseAndRate.length &&
        dosageInstruction.doseAndRate[0].doseQuantity
      ) {
        doseQuantity = dosageInstruction.doseAndRate[0].doseQuantity.value;
      }
      if (dosageInstruction.maxDosePerAdministration) {
        maxDosePerAdministrationValue =
          dosageInstruction.maxDosePerAdministration.value;
        maxDosePerAdministrationCode =
          dosageInstruction.maxDosePerAdministration.code;
        maxDosePerAdministrationSystem =
          dosageInstruction.maxDosePerAdministration.system;
        maxDosePerAdministrationUnit =
          dosageInstruction.maxDosePerAdministration.unit;
      }
    }
    if (
      medicationRequest.medicationCodeableConcept &&
      medicationRequest.medicationCodeableConcept.coding &&
      medicationRequest.medicationCodeableConcept.coding.length
    ) {
      if (medicationRequest.medicationCodeableConcept.coding[0].system)
        medicationCodeableConceptSystem =
          medicationRequest.medicationCodeableConcept.coding[0].system;
      if (medicationRequest.medicationCodeableConcept.coding[0].code)
        medicationCodeableConceptCode =
          medicationRequest.medicationCodeableConcept.coding[0].code;
      if (medicationRequest.medicationCodeableConcept.coding[0].display)
        medicationCodeableConceptDisplay =
          medicationRequest.medicationCodeableConcept.coding[0].display;
    }

    if (medicationRequest.subject && medicationRequest.subject.reference)
      patient = medicationRequest.subject.reference.split('/')[1];

    if (medicationRequest.encounter && medicationRequest.encounter.reference)
      encounter = medicationRequest.encounter.reference.split('/')[1];

    if (medicationRequest.requester && medicationRequest.requester.reference)
      requester = medicationRequest.requester.reference.split('/')[1];
    if (medicationRequest.recorder && medicationRequest.recorder.reference)
      recorder = medicationRequest.recorder.reference.split('/')[1];
    if (medicationRequest.note && medicationRequest.note.length)
      note = medicationRequest.note[0].text;

    if (
      medicationRequest.substitution &&
      medicationRequest.substitution.allowedBoolean
    )
      substitution = medicationRequest.substitution.allowedBoolean;
    return {
      id: medicationRequest.id || '',
      status: medicationRequest.status || '',
      medicationCodeableConceptCode,
      medicationCodeableConceptDisplay,
      medicationCodeableConceptSystem,
      patient,
      encounter,
      authoredOn: medicationRequest.authoredOn || '',
      requester,
      recorder,
      note,
      substitution,
      timingRepeatStart,
      timingRepeatEnd,
      timingCode,
      timingText,
      timingSystem,
      siteSystem,
      siteCode,
      routeCode,
      routeSystem,
      routeText,
      methodCode,
      methodSystem,
      methodText,
      doseQuantity,
      maxDosePerAdministrationValue,
      maxDosePerAdministrationUnit,
      maxDosePerAdministrationSystem,
      maxDosePerAdministrationCode,
    };
  } else {
    return 'Error';
  }
};

export default normalizeFhirMedicationRequest;
