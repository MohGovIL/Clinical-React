import {tokenInstanceGenerator} from "./AxiosWithTokenInstance";
import {ApiTokens} from "./ApiTokens";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const appointmentWithPatientsBasePath = 'apis/fhir/v4/Appointment?_include=Appointment:patient';

export const getAppointmentsWithPatients = async (date = '', organization = '', serviceType = '') => {
    try {
        return await fhirTokenInstance().get(`${appointmentWithPatientsBasePath}${date ? `&date=${date}` : date}${organization ? `&actor:HealthcareService.organization=${organization}` : organization}${serviceType ? `&service-type=${serviceType}` : serviceType}`);
    } catch (err) {
        console.log(err)
    }
};

export const getValueSet = async list => {
    try {
        return await fhirTokenInstance().get(`apis/fhir/v4/ValueSet/${list}`);
    } catch (err) {
        console.log(err);
    }
};

export const updateAppointmentStatus = async (appointmentId, value) => {
    try {
        return await fhirTokenInstance().patch(`apis/fhir/v4/Appointment/${appointmentId}`, {
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
        return await fhirTokenInstance().post('apis/fhir/v4/Encounter', {
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
        return await fhirTokenInstance().get('apis/fhir/v4/Organization?active=1');
    } catch (err) {
        console.log(err)
    }
};

export const getHealhcareService = async (organization) => {
    try {
        return await fhirTokenInstance().get(`apis/fhir/v4/HealthcareService?organization=${organization}`);
    } catch (err) {
        console.log(err)
    }
};
