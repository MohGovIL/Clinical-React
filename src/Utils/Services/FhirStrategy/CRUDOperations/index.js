

var CRUDOperations = function(){
    this.fhirTokenInstance = null;
}
// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FhirStrategy.setStrategy(with the object you want);  .
// 3) Call doWork from the FhirStrategy .

CRUDOperations.prototype ={

    setFhirTokenInstance : (fhirToken)=>{
        this.fhirTokenInstance = fhirToken;
    },
    search : (params) =>{
        this.fhirTokenInstance().get(params);
    },
    read : (params) => {
        this.fhirTokenInstance().get(params);
    },
    patch : (params)=>{
        this.fhirTokenInstance().patch(params)
    },
    update : function (params) {
        this.fhirTokenInstance().update(params)
    },
    create : function (params) {
        this.fhirTokenInstance().create(params)
    }
}
