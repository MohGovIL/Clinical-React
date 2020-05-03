/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {object} questionnaireResponse
 * @returns {object}
 */
const denormalizeFhirQuestionnaireResponse = (questionnaireResponse) => {
  const denormalizedFhirQuestionnaireResponse = {};

  for (const questionnaireResponseKey in questionnaireResponse) {
    if (questionnaireResponse.hasOwnProperty(questionnaireResponseKey)) {
      // questionnaireResponse[questionnaireResponseKey];
      switch (questionnaireResponseKey) {
        case 'questionnaire':
          denormalizedFhirQuestionnaireResponse[
            'questionnaire'
          ] = `Questionnaire/${questionnaireResponse[questionnaireResponseKey]}`;
          break;
        case 'status':
          denormalizedFhirQuestionnaireResponse['status'] =
            questionnaireResponse[questionnaireResponseKey];
          break;
        case 'patient':
          denormalizedFhirQuestionnaireResponse['subject'] = {
            reference: `Patient/${questionnaireResponse[questionnaireResponseKey]}`,
          };
          break;
        case 'encounter':
          denormalizedFhirQuestionnaireResponse['encounter'] = {
            reference: `Encounter/${questionnaireResponse[questionnaireResponseKey]}`,
          };
          break;
        case 'authored':
          denormalizedFhirQuestionnaireResponse['authored'] =
            questionnaireResponse[questionnaireResponseKey];
          break;
        case 'author':
          denormalizedFhirQuestionnaireResponse['author'] = {
            reference: `Practitioner/${questionnaireResponse[questionnaireResponseKey]}`,
          };
          break;
        case 'source':
          denormalizedFhirQuestionnaireResponse['source'] = {
            reference: `Patient/${questionnaireResponse[questionnaireResponseKey]}`,
          };
          break;
        case 'items':
          denormalizedFhirQuestionnaireResponse['item'] =
            questionnaireResponse[questionnaireResponseKey];
          break;
        default:
          break;
      }
    }
  }
  return denormalizedFhirQuestionnaireResponse;
};

export default denormalizeFhirQuestionnaireResponse;
