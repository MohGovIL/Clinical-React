import {getValueSet} from "../../FhirAPI";
import {CRUDOperations} from "../CRUDOperations";

const ValueSetStates =  {
    doWork: (parameters = null) => {
        let  componentFhirURL = "/ValueSet";
        let paramsToCRUD = parameters.functionParams;//convertParamsToUrl(parameters.functionParams);
        paramsToCRUD.url = componentFhirURL;
        return ValueSetStates[parameters.functionName](paramsToCRUD);
    },

    getValueSet : async (params) => {
        debugger;
        //console.log( await fhirTokenInstance().get(`apis/fhir/v4/ValueSet/encounter_statuses/$expand`));
       const valueSet =  await CRUDOperations('read',  `${params.url}/${params.id}/$expand`);
       return valueSet;

    },
    requestValueSet : async (params) => {
        const valueSet = await ValueSetStates['getValueSet'](params);
        if(valueSet && valueSet.data && valueSet.expansion) {
            const {data: {expansion: {contains}}} = await ValueSetStates['getValueSet'](params);
            let options = [];
            if (contains) {
                for (let status of contains) {
                    options[status.code] = status.display;
                }
            }

            return options;
        }
        return [];
    }

};

export default async function ValueSet(action = null, params = null) {

    if (action) {
        const transformer = ValueSetStates[action] ?? ValueSetStates.__default__;
        return await transformer(params);
    }
}


