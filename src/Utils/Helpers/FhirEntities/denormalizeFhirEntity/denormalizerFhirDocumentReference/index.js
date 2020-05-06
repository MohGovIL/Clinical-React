/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} documentReference
 * @returns {object}
 */
const denormalizerFhirDocumentReference = (documentReference) => {
  for (const documentReferenceKey in documentReference) {
    if (documentReference.hasOwnProperty(documentReferenceKey)) {
      const element = documentReference[documentReferenceKey];
    }
  }
  return {};
};

export default denormalizerFhirDocumentReference;
