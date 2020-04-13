/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a encounter strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - gigiidan@gmail.com
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import moment from "moment";
import {CRUDOperations} from "../CRUDOperations";

const EncounterStates = {

    doWork: (parameters) => {

        let componentFhirURL = "/Encounter";
        parameters.url = componentFhirURL;
        return EncounterStates[parameters.functionName](parameters);
    },
    codingArr: arr => {
        return arr.map(arrEl => ({'code': arrEl}))
    },
    createNewEncounter: (params) => {
        //params.functionParams.appointment, params.functionParams.facility

        let coding = EncounterStates['codingArr'](params.functionParams.appointment.serviceTypeCode);
        const serviceType = {
            coding
        };
        // Todo fix reasonCode in here can't do it since I don't have the encounter normalizer fix from develop.
        // coding = codingArr(params.functionParams.appointment.examinationCode);
        // const reasonCode = params.functionParams.appointment.examinationCode
        // params.functionParams.appointment.examination.forEach(element => {

        // });
        const reasonCode = params.functionParams.appointment.examinationCode.map(examination => {
            return {
                "coding": [
                    {
                        "code": examination
                    }
                ]
            }
        })
        //return fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
        return CRUDOperations('create', `${params.url}`, {
            'priority': {
                'coding': [
                    {
                        'code': params.functionParams.appointment.priority,
                    },
                ],
            },
            'status': 'planned',
            serviceType,
            reasonCode,
            'subject': {
                'reference': `Patient/${params.functionParams.appointment.patient}`,
            },
            'appointment': [
                {
                    'reference': `Appointment/${params.functionParams.appointment.id}`,
                },
            ],
            'period': {
                'start': moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
            },
            'serviceProvider': {
                'reference': `Organization/${params.functionParams.facility}`,
            },
        });
    },
    encountersWithPatientsBasePath: summary => `_sort=date${summary ? '&_summary=count' : '&_include=Encounter:patient'}`,

    getEncountersWithPatients: (params) => {
        let summary = params.functionParams.summary
        let date = params.functionParams.date;
        let serviceProvider = params.functionParams.serviceProvider;
        let serviceType = '';
        let statuses = params.functionParams.statuses;

        let statusesString = '';
        for (let status of statuses) {
            statusesString = statusesString.concat(`&status=${status}`)
        }
        let summaryStat = EncounterStates['encountersWithPatientsBasePath'](summary)
        //return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath(summary)}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
        return CRUDOperations('search', `${params.url}?${summaryStat}&${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`)
    },
    getCurrentEncounterPerPatient: (params) => {

        let date = params.functionParams.date;
        let patient = params.functionParams.patient;


        //PC-216 endpoint: /Encounter?date=eq<TODAY>&patient=<PID>
        try {
            return CRUDOperations('search', `${params.url}?date=eq${date}&patient=${patient}`)
            //return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=eq${date}&patient=${patient}`);
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getNextPrevEncounterPerPatient: (params) => {

        //PC-216 endpoint: /Encounter?date=le<DATE>&_count=1&_sort=-date&patient=<PID>
        let date = params.functionParams.date;
        let patient = params.functionParams.patient;
        let prev = params.functionParams.prev;
        try {
            if (prev) {
                //return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=le${date}&_count=1&_sort=-date&patient=${patient}`);
                return CRUDOperations('search', `${params.url}?date=le${date}&_count=1&_sort=-date&patient=${patient}`);
            } else {
                // return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=gt${date}&_count=1&_sort=-date&patient=${patient}`);
                return CRUDOperations('search', `${params.url}?date=gt${date}&_count=1&_sort=-date&patient=${patient}`);
            }
        } catch (err) {
            console.log(err);
            return null;
        }

    }
};

export default function Encounter(action = null, params = null) {

    if (action) {
        const transformer = EncounterStates[action] ?? EncounterStates.__default__;
        return transformer(params);
    }
};

