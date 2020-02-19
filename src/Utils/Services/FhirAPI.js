import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const fhirBasePath = 'apis/fhir/v4';

const appointmentWithPatientsBasePath = `${fhirBasePath}/Appointment?_include=Appointment:patient`;

export const getAppointmentsWithPatients = async (summary = false, date = '', organization = '', serviceType = '') => {
    try {
        return await fhirTokenInstance().get(`${appointmentWithPatientsBasePath}${date ? `&date=${date}` : date}${organization ? `&actor:HealthcareService.organization=${organization}` : organization}${serviceType ? `&service-type=${serviceType}` : serviceType}${summary ? `&_summary=count` : ''}`);
    } catch (err) {
        console.log(err)
    }
};

export const getValueSet = async list => {
    try {
        return await fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${list}`);
    } catch (err) {
        console.log(err);
    }
};

export const updateAppointmentStatus = async (appointmentId, value) => {
    try {
        return await fhirTokenInstance().patch(`${fhirBasePath}/Appointment/${appointmentId}`, {
            op: "replace",
            path: "/status",
            value
        })
    } catch (err) {
        console.log(err)
    }
};

export const createNewEncounter = async () => {
    try {
        return await fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
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

    } catch (err) {
        console.log(err)
    }
};

export const getOrganization = async () => {
    try {
        return await fhirTokenInstance().get(`${fhirBasePath}/Organization?active=1`);
    } catch (err) {
        console.log(err)
    }
};

export const getHealhcareService = async (organization) => {
    try {
        return await fhirTokenInstance().get(`${fhirBasePath}/HealthcareService?organization=${organization}`);
    } catch (err) {
        console.log(err)
    }
};

export const getEncountersWithPatients = async (date = '') => {
    try {
        return await fhirTokenInstance().get(`${fhirBasePath}/Encounter?_include=Encounter:patient${date ? `&date=${date}` : date}&_sort=date&status=arrived&status=triaged&status=in-progress`);
    } catch (err) {
        console.log(err);
    }
};
