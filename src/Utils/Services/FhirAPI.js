import {tokenInstanceGenerator} from './AxiosWithTokenInstance';
import {ApiTokens} from './ApiTokens';
import moment from 'moment';

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @fileOverview Where all the apis that uses the normal FhirApi Token
 */

const fhirTokenInstance = () => tokenInstanceGenerator(ApiTokens.FHIR.tokenName);

const fhirBasePath = 'apis/fhir/v4';

// const appointmentsWithPatientsBasePath = summary => `${fhirBasePath}/Appointment?_include=Appointment:patient&status:not=arrived&_sort=date`;
const appointmentsWithPatientsBasePath = summary => `${fhirBasePath}/Appointment?status:not=arrived&_sort=date${summary ? '&_summary=count' : '&_include=Appointment:patient'}`;

export const getAppointmentsWithPatients = (summary = false, date = '', organization = '', serviceType = '') => {
    return fhirTokenInstance().get(`${appointmentsWithPatientsBasePath(summary)}${date ? `&date=eq${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}`);
};

export const getValueSet = id => {
    return fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${id}/$expand`);
};

export const updateAppointmentStatus = (appointmentId, value) => {
    return fhirTokenInstance().patch(`${fhirBasePath}/Appointment/${appointmentId}`, {
        op: 'replace',
        path: '/status',
        value,
    });
};

export const createNewEncounter = (appointment, facility) => {
    return fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
        'priority': {
            'coding': [
                {
                    'code': appointment.priority,
                },
            ],
        },
        'status': 'planned',
        'serviceType': {
            'coding': [
                {
                    'code': appointment.serviceTypeCode,
                },
            ],
        },
        'reasonCode': {
            'coding': [
                {
                    'code': appointment.examinationCode,
                },
            ],
        },
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
    return fhirTokenInstance().get(`${fhirBasePath}/Organization?active=1`);
};

export const getHealhcareService = (organization) => {
    return fhirTokenInstance().get(`${fhirBasePath}/HealthcareService?organization=${organization}`);
};

// const encountersWithPatientsBasePath = summary => '/Encounter?_include=Encounter:patient&_sort=date';
const encountersWithPatientsBasePath = summary => `/Encounter?_sort=date${summary ? '&_summary=count' : '&_include=Encounter:patient'}`;

export const getEncountersWithPatients = (summary = false, date = '', serviceProvider = '', serviceType = '', statuses = []) => {
    let statusesString = '';
    for (let status of statuses) {
        statusesString = statusesString.concat(`&status=${status}`);
    }
    return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath(summary)}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}`);
};
