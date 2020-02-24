import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const fhirBasePath = 'apis/fhir/v4';

const appointmentsWithPatientsBasePath = `${fhirBasePath}/Appointment?_include=Appointment:patient`;

export const getAppointmentsWithPatients =  (summary = false, date = '', organization = '', serviceType = '') => {
        return fhirTokenInstance().get(`${appointmentsWithPatientsBasePath}${date ? `&date=eq${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
};

export const getValueSet = async id => {
        return await fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${id}/$expand`);
};

export const updateAppointmentStatus = async (appointmentId, value) => {
        return await fhirTokenInstance().patch(`${fhirBasePath}/Appointment/${appointmentId}`, {
            op: "replace",
            path: "/status",
            value
        })
};

export const createNewEncounter = async () => {
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
};

export const getOrganization =  () => {
        return fhirTokenInstance().get(`${fhirBasePath}/Organization?active=1`);
};

export const getHealhcareService = (organization) => {
        return fhirTokenInstance().get(`${fhirBasePath}/HealthcareService?organization=${organization}`);
};

const encountersWithPatientsBasePath = '/Encounter?_include=Encounter:patient';

export const getEncountersWithPatients = (summary = false, date = '', serviceProvider = '', serviceType = '') => {
        return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath}${date ? `&date=${date}` : date}&_sort=date&status=arrived&status=triaged&status=in-progress${serviceProvider ? `&service-provider=${serviceProvider}` : serviceProvider}${serviceType ? `service-type=${serviceType}` : serviceType}`);
};
