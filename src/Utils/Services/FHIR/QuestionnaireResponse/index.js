/**
 * @author Idan Gigi - gigiidan@gmail.com
 */

import { CRUDOperations } from '../CRUDOperations/index';
import denormalizeFhirQuestionnaireResponse from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirQuestionnaireResponse';

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
  createQuestionnaireResponse: (params) => {
    const denormalizedQuestionnaireResponse = denormalizeFhirQuestionnaireResponse(
      params.functionParams.questionnaireResponse,
    );
    return CRUDOperations(
      'create',
      `${params.url}`,
      denormalizedQuestionnaireResponse,
    );
  },
  patchQuestionnaireResponse: (params) => {
    const patchArr = [];
    for (const dataKey in params.functionParams.questionnaireResponseParams) {
      if (params.functionParams.questionnaireResponseParams.hasOwnProperty(dataKey)) {
        // params.functionParams.relatedPersonParams[dataKey];
        switch (dataKey) {
          case 'item':
              patchArr.push({
                op: 'replace',
                path: '/item',
                value: params.functionParams.questionnaireResponseParams[dataKey],
              })
            break;
        
          default:
            break;
        }
      }
    }
    return CRUDOperations('patch', `${params.url}/${params.questionnaireResponseId}`, patchArr)
  }
};

export default function QuestionnaireResponse(action = null, params = null) {
  if (action) {
    const transformer =
      QuestionnaireResponseStats[action] ??
      QuestionnaireResponseStats.__default__;
    return transformer(params);
  }
}
