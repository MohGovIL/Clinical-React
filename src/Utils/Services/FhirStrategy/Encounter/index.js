import moment from "moment";
import {CRUDOperations} from "../CRUDOperations";

const EncounterStates = {

    doWork : (parameters) => {
        let  componentFhirURL = "/Encounter";
        /*   let fhirTokenInstance = null;
           let fhirBasePath = null;
           let paramsToCRUD = parameters.functionParams;//convertParamsToUrl(parameters.functionParams);
           paramsToCRUD.url = parameters.fhirBasePath + componentFhirURL;*/
        parameters.url =  componentFhirURL;
        return EncounterStates[parameters.functionName](parameters);
    },
    codingArr : arr => {
        return arr.map(arrEl => ({'code': arrEl}))
    },
    createNewEncounter : (params) => {
        //params.appointment, params.facility
    let coding = EncounterStates['codingArr'](params.appointment.serviceTypeCode);
    const serviceType = {
        coding
    };
    // Todo fix reasonCode in here can't do it since I don't have the encounter normalizer fix from develop.
    // coding = codingArr(params.appointment.examinationCode);
    // const reasonCode = params.appointment.examinationCode
    // params.appointment.examination.forEach(element => {

    // });
    const reasonCode = params.appointment.examinationCode.map(examination => {
        return {
            "coding": [
                {
                    "code": examination
                }
            ]
        }
    })
    //return fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
        return CRUDOperations('post',`${params.url}/Encounter`, {
        'priority': {
            'coding': [
                {
                    'code': params.appointment.priority,
                },
            ],
        },
        'status': 'planned',
        serviceType,
        reasonCode,
        'subject': {
            'reference': `Patient/${params.appointment.patient}`,
        },
        'params.appointment': [
            {
                'reference': `Appointment/${params.appointment.id}`,
            },
        ],
        'period': {
            'start': moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
        'serviceProvider': {
            'reference': `Organization/${params.facility}`,
        },
    });
    },
    encountersWithPatientsBasePath : summary => `/Encounter?_sort=date${summary ? '&_summary=count' : '&_include=Encounter:patient'}`,

    getEncountersWithPatients : async (params) => {
        let summary = params.summary
        let date = params.date;
        let serviceProvider = params.serviceProvider;
        let serviceType = '';
        let statuses = params.statuses;

        let statusesString = '';
        for (let status of statuses) {
            statusesString = statusesString.concat(`&status=${status}`)
        }
        let summaryStat = EncounterStates['encountersWithPatientsBasePath'](summary)
        //return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath(summary)}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
        return await CRUDOperations('search', `${params.url}?${summaryStat}&${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`)
    },
    getCurrentEncounterPerPatient : async (params) => {
        let date = params.date;
        let patient = params.patient;


        //PC-216 endpoint: /Encounter?date=eq<TODAY>&patient=<PID>
        try {
            return await CRUDOperations('search', `${params.url}?date=eq${date}&patient=${patient}`)
            //return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=eq${date}&patient=${patient}`);
        } catch (err) {
            console.log(err);
            return null;
        }
    },
    getNextPrevEncounterPerPatient : async (params) => {
        //PC-216 endpoint: /Encounter?date=le<DATE>&_count=1&_sort=-date&patient=<PID>
        let date = params.date;
        let patient = params.patient;
        let prev = params.prev;
        try {
            if (prev) {
                //return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=le${date}&_count=1&_sort=-date&patient=${patient}`);
                return await CRUDOperations('search', `${params.url}?date=le${date}&_count=1&_sort=-date&patient=${patient}`);
            } else {
               // return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=gt${date}&_count=1&_sort=-date&patient=${patient}`);
                return await CRUDOperations('search', `${params.url}?date=gt${date}&_count=1&_sort=-date&patient=${patient}`);
            }
        } catch (err) {
            console.log(err);
            return null;
        }

    }
};

export default async function Encounter(action = null, params = null) {

    if (action) {
        const transformer = EncounterStates[action] ?? EncounterStates.__default__;
        return await transformer(params);
    }
};

