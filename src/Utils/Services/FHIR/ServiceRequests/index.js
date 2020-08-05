/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a ServiceRequests strategy
 */

import { CRUDOperations } from 'Utils/Services/FHIR/CRUDOperations';
/* TODO : import denormalizeFhirServiceRequest from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirServiceRequest';*/

/**
 *
 * @type {{deleteServiceRequest: ServiceRequests.deleteServiceRequest, doWork: (function(*): *),
 * createNewServiceRequest: ServiceRequests.createNewServiceRequest,
 * updateServiceRequest: ServiceRequests.updateServiceRequest,
 * getServiceRequests: (function(*): *)}}
 */
const ServiceRequests = {
  doWork: (parameters) => {
    let componentFhirURL = '/ServiceRequest';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return ServiceRequests[parameters.functionName](paramsToCRUD);
  },

  createNewServiceRequest: (params) => {
    return CRUDOperations('create', `${params.url}`, params.data);
  },
  updateServiceRequest: (params) => {
    return CRUDOperations('update', `${params.url}/${params.id}`, params.data);
  },
  deleteServiceRequest: (params) => {
    //Todo in the future
  },
  getServiceRequests: (params) => {
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

export default function ServiceRequest(action = null, params = null) {
  if (action) {
    const transformer = ServiceRequests[action] ?? ServiceRequests.__default__;
    return transformer(params);
  }
}
