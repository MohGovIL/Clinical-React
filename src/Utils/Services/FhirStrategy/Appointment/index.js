/*
import React, {useEffect, useState} from 'react';
import {CRUDOperations} from "../CRUDOperations"
import {convertParamsToUrl} from "../CommonFunctions";

class Appointment extend React.Component{

    let componentFhirURL = null;

    fhirTokenInstance = null;

    CRUD = null;

    url = null;

    paramsToCRUD = null;


    constructor(runThisFunction, params) {
        componentFhirURL = "/Appointment?";

        fhirTokenInstance = null;

        CRUD = CRUDOperations;

        url = null;

        paramsToCRUD = null;

    }



    doWork = (params) => {

        CRUD.setFhirTokenInstance(params.fhirTokenInstance);
        url = params.fhirBasePath + componentFhirURL;
        paramsToCRUD = convertParamsToUrl(params.functionParams);
        CRUD.params.function(params.functionParams);
    };

    /!* const search = (params) =>{

     };

     const read = (params) => {

     };

     const patch = (params)=>{

     };

     const update = (params) {

     };

     const create = (params) {

     };*!/


    const
    getNextPrevAppointmentPerPatient = (date, patient, prev) => {
        //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
        try {
            if (prev) {
                return CRUD.search(url, `date=le${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            } else {
                return CRUD.search(url, `date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    const
    appointmentsWithPatientsBasePath = summary => `${url}?status:not=arrived&_sort=date${summary ? '&_summary=count' : '&_include=Appointment:patient'}`;

    const
    getAppointmentsWithPatients = (summary = false, date = '', organization = '', serviceType = '') => {
        return fhirTokenInstance().get(`${appointmentsWithPatientsBasePath(summary)}${date ? `&date=eq${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}`);
    };


    const
    updateAppointmentStatus = (appointmentId, value) => {
        return fhirTokenInstance().patch(`${url}/${appointmentId}`, [{
            op: 'replace',
            path: '/status',
            value,
        }]);
    };


}

export default Appointment;
*/


import React, {useState} from 'react';
import {CRUDOperations} from "../CRUDOperations";
import {convertParamsToUrl} from "../CommonFunctions";

const AppointmentStates = {


    doWork: (parameters = null) => {



        let  componentFhirURL = "/Appointment?";


        let paramsToCRUD = parameters.functionParams;//convertParamsToUrl(parameters.functionParams);
        paramsToCRUD.url = parameters.fhirBasePath + componentFhirURL;
        let fhirTokenInstance = parameters.fhirTokenInstance;


        AppointmentStates[parameters.functionName](paramsToCRUD,fhirTokenInstance);
    },
    getNextPrevAppointmentPerPatient: (fhirTokenInstance,params) => {

        let CRUD = CRUDOperations('search',fhirTokenInstance,params);

        //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
        try {
            if (params.prev) {
            //    return CRUD.search(url, `date=le${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            } else {
             //   return CRUD.search(url, `date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    appointmentsWithPatientsBasePath: summary => `status:not=arrived&_sort=date${summary ? '&_summary=count' : '&_include=Appointment:patient'}`,

    getAppointmentsWithPatients: async (params = null, fhirTokenInstance) => {
        if (!params.url)
            return;
        if (params) {
            let arrayOfsearchParams = [];
            let search = "";
            search += AppointmentStates['appointmentsWithPatientsBasePath'](params.summary) + "&";
            if (params.date) arrayOfsearchParams['date'] = params.date;
            if (params.organization) arrayOfsearchParams['actor:HealthcareService.organization'] = params.organization;
            if (params.serviceType) arrayOfsearchParams['service-type'] = params.serviceType;
            search += convertParamsToUrl(arrayOfsearchParams);

            return await CRUDOperations('search', fhirTokenInstance, params.url + search);
        }

    }
};


export default function Appointment(action = null, params = null) {

    if (action) {
        const transformer = AppointmentStates[action] ?? AppointmentStates.__default__;
        return transformer(params);
    }
}
