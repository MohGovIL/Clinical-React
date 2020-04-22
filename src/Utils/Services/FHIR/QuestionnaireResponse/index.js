/**
 * @author Idan Gigi - gigiidan@gmail.com
 */

import { CRUDOperations } from '../CRUDOperations/index';

const QuestionnaireResponseStats = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/QuestionnaireResponse';
    parameters.url = componentFhirURL;
    return QuestionnaireResponseStats[parameters.functionName](parameters);
  },
  getQuestionnaireResponse: (params) => {
    return CRUDOperations(
      'search',
      `${params.url}?encounter=${params.functionParams.encounterId}&patient=${params.functionParams.patientId}&questionnaire=${params.functionParams.questionnaireId}`,
    );
  },
};

export default function Questionnaire(action = null, params = null) {
  if (action) {
    const transformer =
      QuestionnaireResponseStats[action] ??
      QuestionnaireResponseStats.__default__;
    return transformer(params);
  }
}
