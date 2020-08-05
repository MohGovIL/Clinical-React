/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} serviceRequests
 * @returns {object}
 * remark not yet completed since never tested or used.
 */

const denormalizeFhirServiceRequest = (
  serviceRequest,
  valueSetRequests,
  valueSetDetails,
) => {
  const denormalizedServiceRequest = {
    id: serviceRequest.id,
    resourceType: 'ServiceRequest',
    intent: 'order',
    status: serviceRequest.status === 'not_done' ? 'active' : 'completed',
    category: [
      {
        coding: [
          {
            system: 'http://clinikal/valueset/service_types',
            code: '1',
          },
        ],
        text: 'Emergency Medicine',
      },
    ],
    code: {
      coding: [
        {
          system: `http://clinikal/valueset/${
            valueSetRequests[serviceRequest.categoryCode]
          }`,
          code: serviceRequest.categoryCode,
        },
      ],
      text: valueSetRequests[serviceRequest.categoryCode],
    },
    orderDetail: [
      {
        coding: [
          {
            system: `http://clinikal/valueset/${
              valueSetRequests[serviceRequest.instructionCode]
            }`,
            code: serviceRequest.instructionCode,
          },
        ],
        text: valueSetDetails[serviceRequest.instructionCode],
      },
    ],
    subject: {
      reference: `Patient/${serviceRequest.patient}`,
    },
    encounter: {
      reference: `Encounter/${serviceRequest.encounter}`,
    },
    occurrenceDateTime: serviceRequest.occurrence,
    authoredOn: serviceRequest.authoredOn,
    requester: {
      reference: `Practitioner/${serviceRequest.requester}`,
    },
    performer: [
      {
        reference: `Practitioner/${serviceRequest.practitioner}`,
      },
    ],
    reasonCode: [
      {
        coding: [
          {
            code: serviceRequest.reasonCode,
          },
        ],
      },
    ],
    reasonReference: [
      {
        reference: `DocumentReference/${serviceRequest.reasonReferenceDocId}`,
      },
    ],
    note: [
      {
        text: serviceRequest.note,
      },
    ],
    patientInstruction: serviceRequest.patientInstruction,
  };
  return denormalizedServiceRequest;
};

export default denormalizeFhirServiceRequest;
