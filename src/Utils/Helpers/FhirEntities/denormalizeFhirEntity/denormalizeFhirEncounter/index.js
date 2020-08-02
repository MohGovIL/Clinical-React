/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} encounter
 * @returns {object}
 */
const denormalizeFhirEncounter = (encounter) => {
  const denormalizedEncounter = {};
  const participant = [];
  const extensions = [];
  for (const encounterKey in encounter) {
    if (encounter.hasOwnProperty(encounterKey)) {
      //  encounter[encounterKey];
      switch (encounterKey) {
        case 'status':
          denormalizedEncounter['status'] = encounter[encounterKey];
          break;
        case 'serviceTypeCode':
          denormalizedEncounter['serviceType'] = {
            coding: [
              {
                code: encounter[encounterKey],
              },
            ],
          };
          break;
        case 'priority':
          denormalizedEncounter['priority'] = {
            coding: [
              {
                code: encounter[encounterKey],
              },
            ],
          };
          break;
        case 'patient':
          denormalizedEncounter['subject'] = {
            reference: `Patient/${encounter[encounterKey]}`,
          };
          break;
        case 'relatedPerson':
          participant[1] = {
            individual: {
              reference: `RelatedPerson/${encounter[encounterKey]}`,
            },
          };
          break;
        case 'practitioner':
          participant[0] = {
            individual: {
              reference: `Practitioner/${encounter[encounterKey]}`,
            },
          };
          break;
        case 'appointment':
          denormalizedEncounter['appointment'] = [
            {
              reference: `Appointment/${encounter[encounterKey]}`,
            },
          ];
          break;
        case 'startTime':
          denormalizedEncounter['period'] = {
            start: encounter[encounterKey],
          };
          break;
        case 'examinationCode':
          denormalizedEncounter['reasonCode'] = encounter[encounterKey].map(
            (reasonCode) => {
              return {
                coding: [
                  {
                    code: reasonCode,
                  },
                ],
              };
            },
          );
          break;
        case 'extensionReasonCodeDetails':
          extensions.push({
            valueString: encounter[encounterKey],
            url: 'http://clinikal/extensions/reasonCodesDetail',
          });
          break;
        case 'extensionArrivalWay':
          extensions.push({
            valueString: encounter[encounterKey],
            url: 'http://clinikal/extensions/arrivalWay',
          });
          break;
        case 'extensionSecondaryStatus':
          extensions.push({
            valueString: encounter[encounterKey],
            url: 'http://clinikal/extensions/encounter/secondaryStatus',
          });
          break;
        default:
          break;
      }
    }
  }

  if (extensions.length) denormalizedEncounter['extension'] = extensions;

  if (participant.length)
    denormalizedEncounter['participant'] = [...participant];

  return denormalizedEncounter;
};

export default denormalizeFhirEncounter;
