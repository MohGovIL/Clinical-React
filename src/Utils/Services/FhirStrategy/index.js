import React, { useState } from 'react';

// 1) You should create new object like Appointment,Encounter,HealthCareService ......
// 2) Then you should use FhirStrategy.setStrategy(with the object you want);  .
// 3) Call doWork from the FhirStrategy .


export class FhirStrategy  {

    constructor(obj){
        this.strategy = obj;
    };

    setStrategy(obj){
        this.strategy = obj;
    };

    doWork(params){
        return this.strategy.doWork(params)
    };


}

