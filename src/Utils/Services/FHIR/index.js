/*import React, { useState } from 'react';
import Appointment from "./Appointment";
import Encounter from "./Encounter";
import HealthcareService from "./HealthcareService";
import Organization from "./Organization";
import Patient from "./Patient";
import ValueSet from "./ValueSet";

// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FHIR.setStrategy(with the object you want);  .
// 3) Call doWork from the FHIR .


export class FHIR  {

    constructor(obj){
        this.strategy = obj;
    };

    setStrategy(obj){
        this.strategy = obj;
    };

    doWork(params){
        let strategy = this.strategy;
        return strategy.doWork(params)
    };


}*/

import React, { useState } from 'react';
import Appointment from "./Appointment";
import Encounter from "./Encounter";
import HealthcareService from "./HealthcareService";
import Organization from "./Organization";
import Patient from "./Patient";
import ValueSet from "./ValueSet";
import {tokenInstanceGenerator} from "../AxiosWithTokenInstance";
import {ApiTokens} from "../ApiTokens";

const FHIRStates = {
    Appointment: Appointment,
    Encounter: Encounter,
    HealthcareService: HealthcareService,
    Organization: Organization,
    Patient: Patient,
    ValueSet: ValueSet,
    /* More transformers */
    __default__: null
};

export const FHIR = (state = null, action = null, params = null) => new Promise((resolve, reject)=>
     {


        if (action) {
            const transformer = FHIRStates[state] ?? FHIR.__default__;
            resolve(transformer(action, params));
        }

});
