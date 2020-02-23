import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const fhirBasePath = 'apis/fhir/v4';

const appointmentsWithPatientsBasePath = `${fhirBasePath}/Appointment?_include=Appointment:patient`;

export const getAppointmentsWithPatients = async (summary = false, date = '', organization = '', serviceType = '') => {
    try {
        return await fhirTokenInstance().get(`${appointmentsWithPatientsBasePath}${date ? `&date=${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
    } catch (err) {
        console.log(err)
    }
};

export const getValueSet = async id => {
    try {
        return await fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${id}/$expand`);
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

const encountersWithPatientsBasePath = '/Encounter?_include=Encounter:patient';

export const getEncountersWithPatients = async (summary = false, date = '', serviceProvider = '', serviceType = '') => {
    try {
        return await fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath}${date ? `&date=${date}` : date}&_sort=date&status=arrived&status=triaged&status=in-progress${serviceProvider ? `&service-provider=${serviceProvider}` : serviceProvider}${serviceType ? `service-type=${serviceType}` : serviceType}`);
    } catch (err) {
        console.log(err);
    }
};
