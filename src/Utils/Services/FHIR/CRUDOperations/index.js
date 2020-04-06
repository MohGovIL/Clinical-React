
// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FHIR.setStrategy(with the object you want);  .
// 3) Call doWork from the FHIR .

import {tokenInstanceGenerator} from "../../AxiosWithTokenInstance";
import {ApiTokens} from "../../ApiTokens";

const CRUDOperationsCalls={

    search:  (params, fhirTokenInstance) => {
        const resolved =  CRUDOperationsCalls['read'](params,fhirTokenInstance);
        return resolved;
    },
    read : (params, fhirTokenInstance) => {
        const resolved =  fhirTokenInstance().get(params);
        return resolved;
    },
    patch : (params,fhirTokenInstance,data)=>{

        const resolved = fhirTokenInstance().patch(params,data);
        return resolved;
    },
    update :  function (params, fhirTokenInstance,data) {
        const resolved =   fhirTokenInstance().update(params,data);
        return resolved;

    },
    create :  function (params, fhirTokenInstance,data) {
        const resolved =   fhirTokenInstance().post(params,data);
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
