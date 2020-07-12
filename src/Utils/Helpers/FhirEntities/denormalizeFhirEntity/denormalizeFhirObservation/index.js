/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} observation
 * @returns {object}
 */
const denormalizeFhirObservation = (observation) => {
  const denormalizedObservation = {};
  denormalizedObservation['component'] = [];

  const extensions = [];
  for (const observationKey in observation) {
    if (observation.hasOwnProperty(observationKey)) {
      //  observation[observationKey];
      switch (observationKey) {
        case 'resourceType':
          denormalizedObservation['resourceType'] = 'Observation';
        case 'status':
          denormalizedObservation['status'] = observation[observationKey];
          break;
        case 'patient':
          denormalizedObservation['subject'] = {
            reference: `Patient/${observation[observationKey]}`,
          };
          break;
        case 'encounter':
          denormalizedObservation['encounter'] = {
            reference: `Encounter/${observation[observationKey]}`,
          };
          break;
        case 'category':
          denormalizedObservation['category'] = [
            {
              coding: [
                {
                  system: observation.categorySystem,
                  code: observation[observationKey],
                },
              ],
              text: observation.categoryText,
            },
          ];
          break;
        case 'issued':
          denormalizedObservation['issued'] = observation[observationKey];
          break;
        case 'performer':
          denormalizedObservation['performer'] = [
            {
              reference: `Practitioner/${observation[observationKey]}`,
            },
          ];

          break;
        case 'note':
          denormalizedObservation['note'] = {
            text: observation[observationKey],
          };
          break;
        case 'component':
          observation[observationKey].map((observed, key) => {
            denormalizedObservation['component'].push({
              valueQuantity: {
                value: observed.value,
                system: 'http://loinc.org',
                code: observed.code,
              },
            });
          });

          break;
        default:
          break;
      }
    }
  }

  if (extensions.length) denormalizedObservation['extension'] = extensions;
  return denormalizedObservation;
};

export default denormalizeFhirObservation;
