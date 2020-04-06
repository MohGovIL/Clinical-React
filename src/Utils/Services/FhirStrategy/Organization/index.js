
import {CRUDOperations} from "../CRUDOperations";

const OrganizationStats =   {
    doWork : (parameters) => {
        let  componentFhirURL = "/Organization";
        parameters.url =  componentFhirURL;
        return OrganizationStats[parameters.functionName](parameters);
    },
    getOrganizationTypeKupatHolim : async (params) => {
        //return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=71`);
        return await CRUDOperations('search', `${params.url}?type=71`);

    },

    getOrganization : async (params) => {
       // return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=11`);
        return await CRUDOperations('search', `${params.url}?type=11`);
    }
};

export default function Organization(action = null, params = null) {

    if (action) {
        const transformer = OrganizationStats[action] ?? OrganizationStats.__default__;
        return transformer(params);
    }
}
