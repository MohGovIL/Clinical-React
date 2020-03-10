import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";
import normalizeFhirPatient from "../Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirPatient";

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


    } else {
        //for future Lexicographic search in ID open this
        //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
        let byNameData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}name=${value}`);
        //for future Lexicographic search in ID open this
        //data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData,data) : null;
        data = byNameData.data.total > 0 ? FHIRPersontoDataArray(byNameData,data) : data;
        if (data && data.length > 1){
            data = sortPatientRulesByLexicogrphicsSort(data,value);
        }

    }

    return data;
};

function _buildList(patient) {

    let arr = [];
    let resource = patient.resource;
    /*
       id: patient.id,
       identifier,
       firstName,
       lastName,
       middleName,
       mobileCellPhone,
       homePhone,
       email,
       gender: patient.gender,
       birthDate: patient.birthDate,
*/

    if (resource) {
        let normalizedPerson = normalizeFhirPatient(resource);
        return normalizedPerson;
    } else {
        return null;
    }
};

function FHIRPersontoDataArray(pushthisData,data) {

    if(!data) {
        data = [];
    }

    let currentDataToFill = data;
    if (pushthisData && pushthisData.data && pushthisData.data.total > 0) {
        let entry = pushthisData.data.entry;

        entry.map((patient, patientIndex) => {
            let pushThisPerson = _buildList(patient);
            if (pushThisPerson) {
                let PushThisPersonIdentifier = pushThisPerson.id;
                let canPushThisPatient = true;
                for (let i = 0; i < currentDataToFill.length; i++) {
                    let dataIdentifier = currentDataToFill[i].id;

                    if (PushThisPersonIdentifier === dataIdentifier) {
                        canPushThisPatient = false;
                    }

                }

                if (canPushThisPatient) {
                    currentDataToFill.push(pushThisPerson);
                }
            }
        });

    }
    return currentDataToFill;
};

// sort by value
function sortByValue(items,field) {
    items.sort(function (a, b) {
        return a[field] - b[field];
    });
    return items;
}

// sort by name
function sortByName(items,field) {

    items.sort(function (a, b) {
        var nameA =  a[field].toUpperCase(); // ignore upper and lowercase
        var nameB =  b[field].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    return items;
}

// sort by name
function sortByNameContains(items,field,value) {

    items.sort(function (a, b) {
        var nameA =  a[field].toUpperCase(); // ignore upper and lowercase
        var nameB =  b[field].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB && nameA.includes(value) && nameB.includes(value)) {
            return -1;
        }
        if (nameA > nameB && nameA.includes(value) && nameB.includes(value)) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    return items;
}

function sortPatientRulesByLexicogrphicsSort(items , value) {

    /*
       id: patient.id,
       identifier,
       firstName,
       lastName,
       middleName,
       mobileCellPhone,
       homePhone,
       email,
       gender: patient.gender,
       birthDate: patient.birthDate,
*/
 /*   console.log("-----------------------ORIGINAL-LIST-------------------------");
    await console.log(items);
    console.log("-----------------------LAST-NAME-SORT------------------------");*/
    items = sortByName(items, 'lastName');
    /*console.log(items);
    console.log("-----------------------FIRSt-NAME-SORT------------------------");*/
    items = sortByName(items, 'firstName');
    items = sortByNameContains(items, 'firstName',value);
    items = sortByNameContains(items, 'lastName',value);
  /*  console.log(items);*/

    return items;
}
