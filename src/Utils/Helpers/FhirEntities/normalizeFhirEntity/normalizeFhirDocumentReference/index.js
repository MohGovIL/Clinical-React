/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} documentReference
 * @returns {object}
 */
const normalizeFhirDocumentReference = (documentReference) => {
  let id = '';
  let category = '';
  let categoryCode = '';
  let author = '';
  let contentType = '';
  let data = '';
  let url = '';
  let encounter = '';
  let patient = '';
  if (documentReference.category) {
    if (documentReference.category[0].coding) {
      if (documentReference.category[0].coding[0].code) {
        categoryCode = documentReference.category[0].coding[0].code;
      }
      if (documentReference.category[0].coding[0].display) {
        category = documentReference.category[0].coding[0].display;
      }
    }
  }
  if (documentReference.author) {
    if (documentReference.author[0].reference) {
      author = documentReference.author[0].reference;
    }
  }
  if (documentReference.content) {
    if (documentReference.content[0].attachment) {
      if (documentReference.content[0].attachment.contentType) {
        contentType = documentReference.content[0].attachment.contentType;
      }
      if (documentReference.content[0].attachment.data) {
        data = documentReference.content[0].attachment.data;
      }
      if (documentReference.content[0].attachment.url) {
        url = documentReference.content[0].attachment.url;
      }
    }
  }
  if (documentReference.context) {
    if (documentReference.context.sourcePatientInfo) {
      if (documentReference.context.sourcePatientInfo.reference) {
        patient = documentReference.context.sourcePatientInfo.reference.split(
          '/',
        )[1];
      }
    }
    if (documentReference.context.encounter) {
      if (documentReference.context.encounter[0]) {
        if (documentReference.context.encounter[0].reference) {
          encounter = documentReference.context.encounter[0].reference.split(
            '/',
          )[1];
        }
      }
    }
  }
  return {
    id: documentReference.id || id,
    category,
    categoryCode,
    author,
    contentType,
    data,
    url,
    encounter,
    patient,
  };
};

export default normalizeFhirDocumentReference;
