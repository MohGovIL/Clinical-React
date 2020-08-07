/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} serviceRequests
 * @returns {object}
 * remark not yet completed since never tested or used.
 */

const denormalizeFhirServiceRequest = ({
  serviceRequest,
  valueSetRequests,
  valueSetDetails,
}) => {
  if (!serviceRequest) return;

  const denormalizedServiceRequest = {
    id: serviceRequest.serviceReqID,
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

  if (valueSetRequests) {
    denormalizedServiceRequest.code = {
      coding: [
        {
          system: `http://clinikal/valueset/${serviceRequest.test_treatment}`,
          code: serviceRequest.test_treatment,
        },
      ],
      text: valueSetRequests[serviceRequest.test_treatment],
    };
  }

  if (valueSetDetails) {
    denormalizedServiceRequest.orderDetail = [
      {
        coding: [
          {
            system: `http://clinikal/valueset/details_${serviceRequest.test_treatment}`,
            code: serviceRequest.test_treatment_type,
          },
        ],
        text: valueSetDetails[serviceRequest.test_treatment_type],
      },
    ];
  }

  return denormalizedServiceRequest;
};

export default denormalizeFhirServiceRequest;
