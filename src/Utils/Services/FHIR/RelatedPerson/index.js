/**
 * @author Idan Gigi - gigiidan@gmail.com
 */

import { CRUDOperations } from '../CRUDOperations/index';

const RelatedPersonStats = {
    doWork: (parameters = null) => {
        let componentFhirURL = "/RelatedPerson";
        parameters.url = componentFhirURL;
        return RelatedPersonStats[parameters.functionName](parameters);
    },
    getRelatedPerson: (params) => {
        return CRUDOperations('search', `${params.url}/${params.functionParams.RelatedPersonId}`)
    }
};

export default function RelatedPerson(action = null, params = null) {
  if (action) {
    const transformer = RelatedPersonStats[action] ?? RelatedPersonStats.__default__;
    return transformer(params);
  }
}
