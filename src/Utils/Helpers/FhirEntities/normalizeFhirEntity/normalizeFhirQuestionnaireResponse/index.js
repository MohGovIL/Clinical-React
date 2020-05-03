/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} questionnaireResponse
 * @returns {object}
 */
const normalizeFhirQuestionnaireResponse = (questionnaireResponse) => {
  let id = '';
  let questionnaire = '';
  let status = '';
  let patient = '';
  let encounter = '';
  let authored = '';
  let author = '';
  let source = '';
  let item = [];

  if (questionnaireResponse.questionnaire) {
    questionnaire = questionnaireResponse.questionnaire.split('/')[1];
  }
  if (questionnaireResponse.subject) {
    if (questionnaireResponse.subject.reference) {
      patient = questionnaireResponse.subject.reference.split('/')[1];
    }
  }
  if (questionnaireResponse.encounter) {
    if (questionnaireResponse.encounter.reference) {
      encounter = questionnaireResponse.encounter.reference.split('/')[1];
    }
  }
  if (questionnaireResponse.author) {
    if (questionnaireResponse.author.reference) {
      author = questionnaireResponse.author.reference.split('/')[1];
    }
  }
  if (questionnaireResponse.source) {
    if (questionnaireResponse.source.reference) {
      source = questionnaireResponse.source.reference.split('/')[1];
    }
  }
  if (questionnaireResponse.item.length) {
    item = [...questionnaireResponse.item];
  }

  return {
    id: questionnaireResponse.id || id,
    questionnaire,
    status: questionnaireResponse.status || status,
    patient,
    encounter,
    authored: questionnaireResponse.authored || authored,
    author,
    source,
    item,
  };
};

export default normalizeFhirQuestionnaireResponse;
