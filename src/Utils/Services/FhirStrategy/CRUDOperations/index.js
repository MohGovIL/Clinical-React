
// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FhirStrategy.setStrategy(with the object you want);  .
// 3) Call doWork from the FhirStrategy .

import {tokenInstanceGenerator} from "../../AxiosWithTokenInstance";
import {ApiTokens} from "../../ApiTokens";

const CRUDOperationsCalls={

    search: async (params, fhirTokenInstance) => {
        debugger;
        const resolved = await fhirTokenInstance().get(params);
        return resolved;
    },
    read : async (params, fhirTokenInstance) => {
        debugger;
        const resolved = await fhirTokenInstance().get(params);
        return resolved;
    },
    patch : (params,fhirTokenInstance,data)=>{
        debugger;
        const resolved = fhirTokenInstance().patch(params,data);
        return resolved;
    },
    update : async function (params, fhirTokenInstance,data) {
        const resolved =  await fhirTokenInstance().update(params,data);
        return resolved;

    },
    create : async function (params, fhirTokenInstance,data) {
        const resolved =  await fhirTokenInstance().create(params,data);
        return resolved;

    },
    __default__:null
}

export function CRUDOperations (action,url,data){
    let fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);
    let fhirBasePath = 'apis/fhir/v4';
    const transformer = CRUDOperationsCalls[action] ?? CRUDOperationsCalls.__default__;
    return transformer(fhirBasePath+ url,fhirTokenInstance,data);
}
