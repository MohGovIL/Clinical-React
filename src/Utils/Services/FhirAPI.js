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
function sortByName(items,field,searchParams,field2) {
    sortInputFirst(searchParams,items,field,field2);
}

// sort by name

function sortLexicographicAlphanumeric(first,field,field2){
    let nameA = '';
    let nameB = '';
    first.sort(function (a, b) {
        if(field2){
            var nameA =  a[field][field2].toUpperCase(); // ignore upper and lowercase
            var nameB =  b[field][field2].toUpperCase(); // ignore upper and lowercase
        }else{
            var nameA =  a[field].toUpperCase(); // ignore upper and lowercase
            var nameB =  b[field].toUpperCase(); // ignore upper and lowercase
        }

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });
    return first;
}
function sortByContains(items,field,value,field2) {

    var first = [];
    var others = [];
    for (var i = 0; i < items.length; i++) {
        if(field2)
        {
            if (items[i][field][field2].includes(value)) {
                first.push(items[i]);
            } else {
                others.push(items[i]);
            }
        }
        else{
            if (items[i][field].includes(value)) {
                first.push(items[i]);
            } else {
                others.push(items[i]);
            }
        }

    }


    first = sortLexicographicAlphanumeric(first,field)
    window.dataFound = window.dataFound.concat(first);
    window.leftover = others;
}

function sortInputFirst(input, data,field,field2) {

    var first = [];
    var others = [];
    for (var i = 0; i < data.length; i++) {
        if(field2)
        {
            if (data[i][field] && data[i][field][field2] && data[i][field][field2].indexOf(input) == 0) {
                first.push(data[i]);
            } else {
                others.push(data[i]);
            }
        }
        else{
            if (data[i][field] && data[i][field].indexOf(input) == 0) {
                first.push(data[i]);
            } else {
                others.push(data[i]);
            }
        }

    }

    first = sortLexicographicAlphanumeric(first,field,field2)
    window.dataFound = window.dataFound.concat(first);
    window.leftover = others;
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
   /* items = sortByContains(items, 'lastName',value);
    items = sortByContains(items, 'firstName',value);
    items = sortByName(items, 'lastName');*/
    window.leftover = null;
    window.dataFound = [];

    sortByName(items, 'firstName',value,null);
    sortByName(window.leftover, 'lastName',value,null);
    sortByContains(window.leftover, 'firstName',value,null);
    sortByContains(window.leftover, 'lastName',value,null);
    let obj = [...window.dataFound,...window.leftover];
    return  obj;
}

function sortPatientRulesByNumberSort(items , value) {

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

    window.leftover = null;
    window.dataFound = [];

    sortByName(items, 'identifier',value,'value');
    sortByName(window.leftover, 'mobileCellPhone',value,null);
    sortByContains(window.leftover, 'identifier',value,'value');
    sortByContains(window.leftover, 'mobileCellPhone',value,null);

    let obj = [...window.dataFound,...window.leftover];
    return  obj;

    return items;
}
