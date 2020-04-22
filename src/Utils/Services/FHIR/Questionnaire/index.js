/**
 * @author Idan Gigi - gigiidan@gmail.com
 */

import { CRUDOperations } from '../CRUDOperations/index';

const QuestionnaireStats = {
    doWork: (parameters = null) => {
        let componentFhirURL = "/Questionnaire";
        parameters.url = componentFhirURL;
        return QuestionnaireStats[parameters.functionName](parameters);
    },
    getQuestionnaire: (params) => {
        return CRUDOperations('search', `${params.url}?name=${params.functionParams.QuestionnaireName}&status=active`) //TODO need to understand what is the difference between Questionnaire and QuestionnaireRerespond
    }
};

export default function Questionnaire(action = null, params = null) {
  if (action) {
    const transformer = QuestionnaireStats[action] ?? QuestionnaireStats.__default__;
    return transformer(params);
  }
}
