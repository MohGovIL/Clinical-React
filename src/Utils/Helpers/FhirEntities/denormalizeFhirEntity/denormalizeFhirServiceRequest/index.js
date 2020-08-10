/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param {object} serviceRequests
 * @returns {object}
 * remark not yet completed since never tested or used.
 */

const denormalizeFhirServiceRequest = ({ serviceRequest }) => {
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

  denormalizedServiceRequest.code = {
    coding: [
      {
        system: `http://clinikal/valueset/${serviceRequest.test_treatment}`,
        code: serviceRequest.test_treatment,
      },
    ],
  };

  denormalizedServiceRequest.orderDetail = [
    {
      coding: [
        {
          system: `http://clinikal/valueset/details_${serviceRequest.test_treatment}`,
          code: serviceRequest.test_treatment_type,
        },
      ],
    },
  ];

  if (serviceRequest.reasonCode && serviceRequest.reasonCode.length > 0) {
    const reasonCodes = [];
    serviceRequest.reasonCode.map((value, index) => {
      reasonCodes.push({
        coding: [
          {
            code: value,
          },
        ],
      });
    });
    denormalizedServiceRequest.reasonCode = reasonCodes;
  }

  if (serviceRequest.occurrence)
    denormalizedServiceRequest.occurrenceDateTime = serviceRequest.occurrence;
  if (serviceRequest.authoredOn)
    denormalizedServiceRequest.authoredOn = serviceRequest.authoredOn;
  if (serviceRequest.requester)
    denormalizedServiceRequest.reference = {
      reference: `Practitioner/${serviceRequest.requester}`,
    };
  if (serviceRequest.performer)
    denormalizedServiceRequest.performer = [
      { reference: `Practitioner/${serviceRequest.practitioner}` },
    ];

  return denormalizedServiceRequest;
};

export default denormalizeFhirServiceRequest;
