import React, {useState} from 'react';
import {CRUDOperations} from "../CRUDOperations";
import {convertParamsToUrl} from "../CommonFunctions";
const AppointmentStates = {
    doWork: (parameters = null) => {
        let  componentFhirURL = "/Appointment";
        let paramsToCRUD = parameters.functionParams;//convertParamsToUrl(parameters.functionParams);
        paramsToCRUD.url =  componentFhirURL;
        return AppointmentStates[parameters.functionName](paramsToCRUD);
    },
    getNextPrevAppointmentPerPatient: async (params) => {

        let CRUD = await CRUDOperations('search', params);

        //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
        try {
            if (params.prev) {
                return await CRUDOperations('search',  params.url +"?"+ `date=le${params.date}&_count=1&_sort=date&patient=${params.patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
                //    return CRUD.search(url, `date=le${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            } else {
                return await CRUDOperations('search',  params.url +"?"+ `date=ge${params.date}&_count=1&_sort=date&patient=${params.patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
                //   return CRUD.search(url, `date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    appointmentsWithPatientsBasePath: summary => `status:not=arrived&_sort=date${summary ? '&_summary=count' : '&_include=Appointment:patient'}`,

    getAppointmentsWithPatients: async (params = null) => {
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
debugger;
            return await CRUDOperations('search',  params.url +"?"+ search);
        }

    }
};


export default async function Appointment(action = null, params = null) {

    if (action) {
        const transformer = AppointmentStates[action] ?? AppointmentStates.__default__;
        return await transformer(params);
    }
}
