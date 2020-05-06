/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} documentReference
 * @returns {object}
 */
const denormalizerFhirDocumentReference = (documentReference) => {
  const denormalizedDocumentReference = {};
  let context = {};
  let attachment = {};
  for (const documentReferenceKey in documentReference) {
    if (documentReference.hasOwnProperty(documentReferenceKey)) {
      // documentReference[documentReferenceKey];
      switch (documentReferenceKey) {
        case 'categoryCode':
          denormalizedDocumentReference['category'] = [
            {
              coding: [
                {
                  code: documentReference[documentReferenceKey],
                },
              ],
            },
          ];
          break;
        case 'author':
          denormalizedDocumentReference['author'] = [
            {
              reference: `Practitioner/${documentReference[documentReferenceKey]}`,
            },
          ];
          break;
        case 'contentType':
          attachment['contentType'] = documentReference[documentReferenceKey];
          break;
        case 'data':
          attachment['data'] = documentReference[documentReferenceKey];
          break;
        case 'url':
          attachment['url'] = documentReference[documentReferenceKey];
          break;
        case 'encounter':
          context['encounter'] = [
            {
              reference: `Encounter/${documentReference[documentReferenceKey]}`,
            },
          ];
          break;
        case 'patient':
          context['sourcePatientInfo'] = {
            reference: `Patient/${documentReference[documentReferenceKey]}`,
          };
          break;
        default:
          break;
      }
    }
  }
  if (Object.values(context).length) {
    denormalizedDocumentReference['context'] = context;
  }
  if (Object.values(attachment).length) {
    denormalizedDocumentReference['content'] = [
      {
        attachment: attachment,
      },
    ];
  }
  return denormalizedDocumentReference;
};

export default denormalizerFhirDocumentReference;
