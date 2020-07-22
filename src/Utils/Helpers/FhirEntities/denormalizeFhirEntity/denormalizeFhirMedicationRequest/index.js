export const denormalizeFhirMedicationRequest = (medicationRequest) => {
  if (Object.prototype.toString.call(medicationRequest === '[object Object]')) {
    const maxDosePerAdministration = {};
    const method = {};
    const route = {};
    const timing = {
      repeat: {
        boundsPeriod: {},
      },
      code: {},
    };
    const medicationCodeableConcept = { coding: [{}] };
    const dosageInstruction = [{}];
    const denormalizedMedicationRequest = {};
    for (const medicationRequestKey in medicationRequest) {
      if (medicationRequest.hasOwnProperty(medicationRequestKey)) {
        const element = medicationRequest[medicationRequestKey];
        switch (medicationRequestKey) {
          case 'status':
            denormalizedMedicationRequest['status'] = element;
            break;
          case 'medicationCodeableConceptCode':
            medicationCodeableConcept.coding[0]['code'] = element;
            break;
          case 'medicationCodeableConceptDisplay':
            medicationCodeableConcept.coding[0]['display'] = element;
            break;
          case 'medicationCodeableConceptSystem':
            medicationCodeableConcept.coding[0]['system'] = element;
            break;
          case 'patient':
            denormalizedMedicationRequest['subject'] = {
              reference: `Patient/${element}`,
            };
            break;
          case 'encounter':
            denormalizedMedicationRequest['encounter'] = {
              reference: `Encounter/${element}`,
            };
            break;
          case 'authoredOn':
            denormalizedMedicationRequest['authoredOn'] = element;
            break;
          case 'requester':
            denormalizedMedicationRequest['requester'] = {
              reference: `Practitioner/${element}`,
            };
            break;
          case 'recorder':
            denormalizedMedicationRequest['recorder'] = {
              reference: `Practitioner/${element}`,
            };
            break;
          case 'note':
            denormalizedMedicationRequest['note'] = [
              {
                text: element,
              },
            ];
            break;
          case 'substitution':
            denormalizedMedicationRequest['substitution'] = {
              allowedBoolean: element,
            };
            break;
          case 'timingRepeatStart':
            timing.repeat.boundsPeriod['start'] = element;
            break;
          case 'timingRepeatEnd':
            timing.repeat.boundsPeriod['end'] = element;
            break;
          case 'timingCode':
            timing.code['coding'] = [
              {
                system: medicationRequest['timingSystem'],
                code: element,
              },
            ];
            break;
          case 'timingText':
            timing.code['text'] = element;
            break;
          case 'siteCode':
            dosageInstruction[0]['site'] = {
              coding: [
                {
                  code: element,
                  system: medicationRequest['siteSystem'],
                },
              ],
            };
            break;
          case 'routeCode':
            route['coding'] = [
              {
                system: medicationRequest['routeSystem'],
                coding: element,
              },
            ];
            break;
          case 'routeText':
            route['text'] = element;
            break;
          case 'methodCode':
            method['coding'] = [
              {
                code: element,
                system: medicationRequest['methodCode'],
              },
            ];
            break;
          case 'methodText':
            method['text'] = element;
            break;
          case 'doseQuantity':
            dosageInstruction[0]['doseAndRate'] = [
              {
                doseQuantity: {
                  value: element,
                },
              },
            ];
            break;
          case 'maxDosePerAdministrationValue':
            maxDosePerAdministration['value'] = element;
            break;
          case 'maxDosePerAdministrationUnit':
            maxDosePerAdministration['unit'] = element;
            break;
          case 'maxDosePerAdministrationSystem':
            maxDosePerAdministration['system'] = element;
            break;
          case 'maxDosePerAdministrationCode':
            maxDosePerAdministration['code'] = element;
            break;
          default:
            break;
        }
      }
    }
    if (Object.keys(medicationCodeableConcept.coding[0]).length)
      denormalizedMedicationRequest.medicationCodeableConcept = medicationCodeableConcept;

    if (
      Object.keys(timing.repeat.boundsPeriod).length ||
      Object.keys(timing.code).length
    )
      dosageInstruction[0]['timing'] = timing;

    if (Object.keys(route).length) dosageInstruction[0]['route'] = route;

    if (Object.keys(method).length) dosageInstruction[0]['method'] = method;

    if (Object.keys(maxDosePerAdministration).length)
      dosageInstruction[0][
        'maxDosePerAdministration'
      ] = maxDosePerAdministration;

    if (Object.keys(dosageInstruction[0]).length)
      denormalizedMedicationRequest['dosageInstruction'] = dosageInstruction;
    return denormalizedMedicationRequest;
  } else {
    return 'Error';
  }
};
