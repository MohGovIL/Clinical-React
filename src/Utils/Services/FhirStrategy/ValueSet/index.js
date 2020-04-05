import {getValueSet} from "../../FhirAPI";
import {CRUDOperations} from "../CRUDOperations";

const ValueSetStates =  {
    doWork: (parameters = null) => {
        debugger;
        let  componentFhirURL = "/ValueSet";
        let paramsToCRUD = parameters.functionParams;//convertParamsToUrl(parameters.functionParams);
        paramsToCRUD.url = componentFhirURL;
        return ValueSetStates[parameters.functionName](paramsToCRUD);
    },

    getValueSet : async (params) => {
       const valueSet =  await CRUDOperations('read',  params.url+"/"+params.id + "/$expend");
       return valueSet;
        // return fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${id}/$expand`);
    },
    requestValueSet : async (params) => {

        const {data: {expansion: {contains}}} = await ValueSetStates['getValueSet'](params);
        let options = [];
        if(contains) {
            for (let status of contains) {
                options[status.code] = status.display;
            }
        }

        return options;
    }

};

export default async function ValueSet(action = null, params = null) {

    if (action) {
        const transformer = ValueSetStates[action] ?? ValueSetStates.__default__;
        return await transformer(params);
    }
}


