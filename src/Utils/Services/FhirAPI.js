import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";
import normalizeFhirPatient from "../Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirPatient";
import {FHIRPersontoDataArray, sortPatientRulesByLexicogrphicsSort, sortPatientRulesByNumberSort} from "./SearchLogic";
import normalizeFhirValueSet from "../Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet";
import {normalizeHealhcareServiceValueData} from "../Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const fhirBasePath = 'apis/fhir/v4';

const appointmentsWithPatientsBasePath = `${fhirBasePath}/Appointment?_include=Appointment:patient&status:not=arrived&_sort=date`;

export const getAppointmentsWithPatients = (summary = false, date = '', organization = '', serviceType = '') => {
    return fhirTokenInstance().get(`${appointmentsWithPatientsBasePath}${date ? `&date=eq${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
};

export const getValueSet = id => {
    return fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${id}/$expand`);
};

export const updateAppointmentStatus = (appointmentId, value) => {
    return fhirTokenInstance().patch(`${fhirBasePath}/Appointment/${appointmentId}`, {
        op: "replace",
        path: "/status",
        value
    })
};

export const createNewEncounter = () => {
    return fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
        "resourceType": "Encounter",
        "status": "planned",
        "serviceType": {
            "coding": [
                {
                    "code": "5"
                }
            ]
        },
        "reasonCode": {
            "coding": [
                {
                    "code": "5"
                }
            ]
        },
        " subject": {
            "reference": "Patient/60"
        },
        "appointment": [
            {
                "reference": "Appointment/11"
            }
        ],
        "period": {
            "start": "2020-01-27 00:00:00"
        },
        "serviceProvider": {
            "reference": "Organization/3"
        }
    })
};

export const getOrganization = () => {
    return fhirTokenInstance().get(`${fhirBasePath}/Organization?active=1`);
};

export const getHealhcareService = (organization) => {
    return fhirTokenInstance().get(`${fhirBasePath}/HealthcareService?organization=${organization}`);
};

const encountersWithPatientsBasePath = '/Encounter?_include=Encounter:patient&_sort=date';

export const getEncountersWithPatients = (summary = false, date = '', serviceProvider = '', serviceType = '', statuses = []) => {
    let statusesString = '';
    for (let status of statuses) {
        statusesString = statusesString.concat(`&status=${status}`)
    }
    return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
};

const patientsFhirSeacrh = '/Patient?';


export const searchPatients = async (value) => {



    let data = null;
    let mobileData = null;
    if (isNumeric(value)) {

        let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
        let mobileData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}mobile:contains=${value}`);

        data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData,data) : data;
        data = mobileData.data.total > 0 ? FHIRPersontoDataArray(mobileData,data) : data;
        data = sortPatientRulesByNumberSort(data,value.trim());

    } else {
        //for future Lexicographic search in ID open this
        //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
        let byNameData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}name=${value}`);
        //for future Lexicographic search in ID open this
        //data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData,data) : null;
        data = byNameData.data.total > 0 ? FHIRPersontoDataArray(byNameData,data) : data;
        if (data && data.length > 1){
            data = sortPatientRulesByLexicogrphicsSort(data,value.trim());
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
            return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=le${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status=not:cancelled`);
        } else {
            return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status=not:cancelled`);
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
    for (let status of contains) {
        options[status.code]=status.display;
    }

    return options;
}

export const getHealthCareServiceByOrganization = async (organizationId) => {

    let array = [];
    const {data: {entry: dataServiceType}} = await getHealhcareService(organizationId);

    for (let entry of dataServiceType) {
        if (entry.resource !== undefined) {
            const setLabelServiceType = normalizeHealhcareServiceValueData(entry.resource);
            array[setLabelServiceType.code] = setLabelServiceType.name;
        }
    }

    return array;
}
