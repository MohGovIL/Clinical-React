import React, {useState} from 'react';
import CRUDOperations from "../CRUDOperations"
import {convertParamsToUrl} from "../CommonFunctions";

const Appointment = () => {
    const componentFhirURL = "/Appointment?";
    let fhirTokenInstance = null;
    let CRUD = new CRUDOperations();
    let url = null
    let paramsToCRUD = null;


    const doWork = (params) => {
        CRUD.setFhirTokenInstance(params.fhirTokenInstance);
        url = params.fhirBasePath + componentFhirURL;
        paramsToCRUD = convertParamsToUrl(params.functionParams);
        CRUD.params.function(params.functionParams);
    };

    /* const search = (params) =>{

     };

     const read = (params) => {

     };

     const patch = (params)=>{

     };

     const update = (params) {

     };

     const create = (params) {

     };*/


    const getNextPrevAppointmentPerPatient = (date, patient, prev) => {
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

    const appointmentsWithPatientsBasePath = summary => `${baseAppointmentsPath}?status:not=arrived&_sort=date${summary ? '&_summary=count' : '&_include=Appointment:patient'}`;

    const getAppointmentsWithPatients = (summary = false, date = '', organization = '', serviceType = '') => {
        return fhirTokenInstance().get(`${appointmentsWithPatientsBasePath(summary)}${date ? `&date=eq${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}`);
    };


    const updateAppointmentStatus = (appointmentId, value) => {
        return fhirTokenInstance().patch(`${baseAppointmentsPath}/${appointmentId}`, [{
            op: 'replace',
            path: '/status',
            value,
        }]);
    };


}

export default Appointment;
