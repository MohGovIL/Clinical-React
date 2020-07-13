/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a Observations strategy  which handles old fhirAPI code logic
 */

import { CRUDOperations } from 'Utils/Services/FHIR/CRUDOperations';
/* TODO : import denormalizeFhirObservation from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirObservation';*/

/**
 *
 * @type {{deleteObservation: Observations.deleteObservation, doWork: (function(*): *),
 * createNewObservation: Observations.createNewObservation,
 * updateObservation: Observations.updateObservation,
 * getObservations: (function(*): *)}}
 */
const Observations = {
  doWork: (parameters) => {
    let componentFhirURL = '/Observation';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return Observations[parameters.functionName](paramsToCRUD);
  },

  createNewObservation: (params) => {
    //Todo in the future
  },
  updateObservation: (params) => {
    //Todo in the future
  },
  deleteObservation: (params) => {
    //Todo in the future
  },
  getObservations: (params) => {
    let patient = params.patient;
    let encounter = params.encounter;
    let category = params.category;
    let sort = params._sort;
    let include = params._include;
    return CRUDOperations(
      'search',
      `${params.url}?${patient ? `patient=${patient}` : ''}${
        encounter ? `&encounter=${encounter}` : ''
      }${category ? `&category=${category}` : ''}${
        include ? `&_include=${include}` : ''
      }${sort ? `&_sort=${sort}` : ''}`,
    );
  },
};

export default function Observation(action = null, params = null) {
  if (action) {
    const transformer = Observations[action] ?? Observations.__default__;
    return transformer(params);
  }
}
