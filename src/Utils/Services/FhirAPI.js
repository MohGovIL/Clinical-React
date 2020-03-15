import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const fhirBasePath = 'apis/fhir/v4';

const appointmentsWithPatientsBasePath = `${fhirBasePath}/Appointment?_include=Appointment:patient&status:not=arrived&_sort=date`;

export const getAppointmentsWithPatients =  (summary = false, date = '', organization = '', serviceType = '') => {
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

export const getOrganization =  () => {
        return fhirTokenInstance().get(`${fhirBasePath}/Organization?active=1`);
};

export const getHealhcareService = (organization) => {
        return fhirTokenInstance().get(`${fhirBasePath}/HealthcareService?organization=${organization}`);
};

const encountersWithPatientsBasePath = '/Encounter?_include=Encounter:patient&_sort=date';

export const getEncountersWithPatients = (summary = false, date = '', serviceProvider = '', serviceType = '', statuses = []) => {
    let statusesString = '';
        for(let status of statuses){
            statusesString = statusesString.concat(`&status=${status}`)
        }
        return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
};

export const getOrganizationTypeKupatHolim = () => {
    return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=71`);
};
