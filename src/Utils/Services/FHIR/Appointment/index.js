/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a appointment strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - gigiidan@gmail.com
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import React, {useState} from 'react';
import {CRUDOperations} from "../CRUDOperations";
import {convertParamsToUrl} from "../CommonFunctions";

const AppointmentStates = {
    doWork: (parameters = null) => {

        let componentFhirURL = "/Appointment";
        let paramsToCRUD = parameters.functionParams;//convertParamsToUrl(parameters.functionParams);
        paramsToCRUD.url = componentFhirURL;
        return AppointmentStates[parameters.functionName](paramsToCRUD);
    },
    getAppointmentPerPatient: (params) => {
        //let CRUD = await CRUDOperations('search', params);
        //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
        //instead params.prev: dayPosition = 'prev'|'next'|'current'
        let date_eq = (params.dayPosition === 'prev' ? 'le' : (params.dayPosition === 'next' ? 'ge' : ''));
        try {
            return CRUDOperations('search', params.url + "?" + `date=${date_eq}${params.date}&_count=1&_sort=date&patient=${params.patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            //return CRUD.search(url, `date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    appointmentsWithPatientsBasePath: summary => `status:not=arrived&_sort=date,priority,service-type${summary ? '&_summary=count' : '&_include=Appointment:patient'}`,

    getAppointmentsWithPatients: (params = null) => {
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

            return CRUDOperations('search', params.url + "?" + search);
        }

    }
};


export default function Appointment(action = null, params = null) {

    if (action) {
        const transformer = AppointmentStates[action] ?? AppointmentStates.__default__;
        return transformer(params);
    }
}
