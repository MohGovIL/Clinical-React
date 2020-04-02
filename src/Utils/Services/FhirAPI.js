import {tokenInstanceGenerator} from './AxiosWithTokenInstance';
import {ApiTokens} from './ApiTokens';
import moment from 'moment';
import {FHIRPersontoDataArray, sortPatientRulesByLexicogrphicsSort, sortPatientRulesByNumberSort} from "./SearchLogic";
import {normalizeHealthCareServiceValueData} from "../Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const fhirBasePath = 'apis/fhir/v4';

// const appointmentsWithPatientsBasePath = summary => `${fhirBasePath}/Appointment?_include=Appointment:patient&status:not=arrived&_sort=date`;
const appointmentsWithPatientsBasePath = summary => `${fhirBasePath}/Appointment?status:not=arrived&_sort=priority,date,service-type${summary ? '&_summary=count' : '&_include=Appointment:patient'}`;

export const getAppointmentsWithPatients = (summary = false, date = '', organization = '', serviceType = '') => {
    return fhirTokenInstance().get(`${appointmentsWithPatientsBasePath(summary)}${date ? `&date=eq${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}`);
};

export const getValueSet = id => {
    return fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${id}/$expand`);
};

export const updateAppointmentStatus = (appointmentId, value) => {
    return fhirTokenInstance().patch(`${fhirBasePath}/Appointment/${appointmentId}`, [{
        op: 'replace',
        path: '/status',
        value,
    }]);
};

export const updatePatientData = (patientId, value) => {
    return fhirTokenInstance().patch(`${fhirBasePath}/Patient/${patientId}`, [
        {op: 'replace', path: '/name/0/family', value: value.lastName},
        {op: 'replace', path: '/name/0/given', value: [value.firstName, ""]},
        {op: 'replace', path: '/telecom/1', value: {system: "email", value: value.patientEmail}},
        {op: 'replace', path: '/telecom/2', value: {system: "phone", value: value.mobilePhone, use: "mobile"}},
        {op: 'replace', path: '/birthDate', value: value.birthDate},
        {
            op: 'replace',
            path: '/managingOrganization',
            value: {reference: "Organization/" + value.healthManageOrganization}
        },
    ])
};

const codingArr = arr => {
    return arr.map(arrEl => ({'code': arrEl}))
}

export const createNewEncounter = (appointment, facility) => {
    let coding = codingArr(appointment.serviceTypeCode);
    const serviceType = {
        coding
    };
    // Todo fix reasonCode in here can't do it since I don't have the encounter normalizer fix from develop.
    // coding = codingArr(appointment.examinationCode);
    // const reasonCode = appointment.examinationCode
    // appointment.examination.forEach(element => {

    // });
    const reasonCode = appointment.examinationCode.map(examination => {
        return {
            "coding": [
                {
                    "code": examination
                }
            ]
        }
    })
    return fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
        'priority': {
            'coding': [
                {
                    'code': appointment.priority,
                },
            ],
        },
        'status': 'planned',
        serviceType,
        reasonCode,
        'subject': {
            'reference': `Patient/${appointment.patient}`,
        },
        'appointment': [
            {
                'reference': `Appointment/${appointment.id}`,
            },
        ],
        'period': {
            'start': moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
        'serviceProvider': {
            'reference': `Organization/${facility}`,
        },
    });
};

export const getOrganization = () => {
    return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=11`);
};

export const getHealhcareService = (organization) => {
    return fhirTokenInstance().get(`${fhirBasePath}/HealthcareService?organization=${organization}`);
};

// const encountersWithPatientsBasePath = summary => '/Encounter?_include=Encounter:patient&_sort=date';
const encountersWithPatientsBasePath = summary => `/Encounter?_sort=priority,date,service-type${summary ? '&_summary=count' : '&_include=Encounter:patient'}`;

export const getEncountersWithPatients = (summary = false, date = '', serviceProvider = '', serviceType = '', statuses = []) => {
    let statusesString = '';
    for (let status of statuses) {
        statusesString = statusesString.concat(`&status=${status}`)
    }
    return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath(summary)}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
};

const patientsFhirSeacrh = '/Patient?';


export const searchPatients = async (value) => {


    let data = null;
    let mobileData = null;
    if (isNumeric(value)) {

        let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
        let mobileData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}mobile:contains=${value}`);

        data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData, data) : data;
        data = mobileData.data.total > 0 ? FHIRPersontoDataArray(mobileData, data) : data;
        data = sortPatientRulesByNumberSort(data, value.trim());

    } else {
        //for future Lexicographic search in ID open this
        //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
        let byNameData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}name=${value}`);
        //for future Lexicographic search in ID open this
        //data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData,data) : null;
        data = byNameData.data.total > 0 ? FHIRPersontoDataArray(byNameData, data) : data;
        if (data && data.length > 1) {
            data = sortPatientRulesByLexicogrphicsSort(data, value.trim());
        }

    }

    return data;
};

export const getOrganizationTypeKupatHolim = () => {
    return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=71`);
};

export const getNextPrevAppointmentPerPatient = (date, patient,prev) =>{
    //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
    try {
        if (prev) {
            return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=le${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
        } else {
            return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
        }
    }
    catch(err){
        console.log(err);
        return null;
    }
};
export const getCurrentEncounterPerPatient = (date,patient) =>{
    //PC-216 endpoint: /Encounter?date=eq<TODAY>&patient=<PID>
    try {
        return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=eq${date}&patient=${patient}`);
    }
    catch(err){
        console.log(err);
        return null;
    }
};

export const getNextPrevEncounterPerPatient = (date,patient,prev) =>{
    //PC-216 endpoint: /Encounter?date=le<DATE>&_count=1&_sort=-date&patient=<PID>
    try {
        if (prev) {
            return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=le${date}&_count=1&_sort=-date&patient=${patient}`);
        } else {
            return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=gt${date}&_count=1&_sort=-date&patient=${patient}`);
        }
    }
    catch(err){
        console.log(err);
        return null;
    }

};

export const requestValueSet =  async (id) => {

    const {data: {expansion: {contains}}} = await getValueSet(id);
    let options = [];
    if(contains) {
        for (let status of contains) {
            options[status.code] = status.display;
        }
    }

    return options;
}

export const getHealthCareServiceByOrganization = async (organizationId) => {

    let array = [];
    const {data: {entry: dataServiceType}} = await getHealhcareService(organizationId);
    if(dataServiceType) {
        for (let entry of dataServiceType) {
            if (entry.resource !== undefined) {
                const setLabelServiceType = normalizeHealthCareServiceValueData(entry.resource);
                array[setLabelServiceType.code] = setLabelServiceType.name;
            }
        }
    }

    return array;
}
