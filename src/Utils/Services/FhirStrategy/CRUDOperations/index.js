
// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FhirStrategy.setStrategy(with the object you want);  .
// 3) Call doWork from the FhirStrategy .

const CRUDOperationsCalls={

    search: (params,fhirTokenInstance) =>{
       return fhirTokenInstance().get(params);
    },
    read : (params,fhirTokenInstance) => {
        return fhirTokenInstance().get(params);
    },
    patch : (params,fhirTokenInstance)=>{
        fhirTokenInstance().patch(params)
    },
    update : function (params,fhirTokenInstance) {
        return fhirTokenInstance().update(params)
    },
    create : function (params,fhirTokenInstance) {
        return fhirTokenInstance().create(params)
    },
    __default__:null
}

export function CRUDOperations (action,fhirToken,url){
    const transformer = CRUDOperationsCalls[action] ?? CRUDOperationsCalls.__default__;
    return transformer(url,fhirToken);
}
