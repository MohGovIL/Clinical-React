/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a appointment strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - idangi@matrix.co.il
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import { CRUDOperations } from 'Utils/Services/FHIR/CRUDOperations';
import { convertParamsToUrl } from 'Utils/Helpers/CommonFunctions';

const AppointmentStates = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/Appointment';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return AppointmentStates[parameters.functionName](paramsToCRUD);
  },
  getAppointmentPerPatient: (params) => {
    //let CRUD = await CRUDOperations('search', params);
    //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
    //instead params.prev: dayPosition = 'prev'|'next'|'current'
    let date_eq =
      params.dayPosition === 'prev'
        ? 'le'
        : params.dayPosition === 'next'
        ? 'ge'
        : '';
    try {
      return CRUDOperations(
        'search',
        params.url +
          '?' +
          `date=${date_eq}${params.date}&_count=1&_sort=date&patient=${params.patient}&status:not=arrived&status:not=noshow&status:not=cancelled`,
      );
      //return CRUD.search(url, `date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getNextPrevAppointmentPerPatient: (params) => {
    //  let CRUD = await CRUDOperations('search', params);

    //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
    try {
      if (params.prev) {
        return CRUDOperations(
          'search',
          params.url +
            '?' +
            `date=le${params.date}&_count=1&_sort=date&patient=${params.patient}&status:not=arrived&status:not=noshow&status:not=cancelled`,
        );
        //    return CRUD.search(url, `date=le${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
      } else {
        return CRUDOperations(
          'search',
          params.url +
            '?' +
            `date=ge${params.date}&_count=1&_sort=date&patient=${params.patient}&status:not=arrived&status:not=noshow&status:not=cancelled`,
        );
        //   return CRUD.search(url, `date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getNextPrevAppointmentsPerPatient: (params) => {
    let date = params.date,
      patient = params.patient,
      prev = params.prev;
    //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
    try {
      if (prev) {
        //return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=le${date}&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
        return CRUDOperations(
          'search',
          `${params.url}?date=le${date}&_sort=date&patient=${patient}&status:not=arrived&status:not=noshow&status:not=cancelled`,
        );
      } else {
        //return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=ge${date}&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
        return CRUDOperations(
          'search',
          `${params.url}?date=ge${date}&_sort=date&patient=${patient}&status:not=arrived&status:not=noshow&status:not=cancelled`,
        );
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  appointmentsWithPatientsBasePath: (summary) =>
    `status:not=arrived&_sort=date,-priority,service-type${
      summary ? '&_summary=count' : '&_include=Appointment:patient'
    }`,

  getAppointmentsWithPatients: (params = null) => {
    if (!params.url) return;
    if (params) {
      let arrayOfsearchParams = [];
      let search = '';
      search +=
        AppointmentStates['appointmentsWithPatientsBasePath'](params.summary) +
        '&';
      if (params.date) arrayOfsearchParams['date'] = params.date;
      if (params.organization)
        arrayOfsearchParams['actor:HealthcareService.organization'] =
          params.organization;
      if (params.serviceType)
        arrayOfsearchParams['service-type'] = params.serviceType;
      search += convertParamsToUrl(arrayOfsearchParams);

      return CRUDOperations('search', params.url + '?' + search);
    }
  },
  updateAppointment: (params) => {
    try {
      const patchArr = [];
      const participant = {
        op: 'replace',
        path: '/participant',
        value: [],
      };
      for (const dataKey in params.functionParams.appointmentParams) {
        if (params.functionParams.appointmentParams.hasOwnProperty(dataKey)) {
          switch (dataKey) {
            case 'priority':
              patchArr.push({
                op: 'replace',
                path: '/priority',
                value: params.functionParams.appointmentParams[dataKey],
              });
              break;
            case 'status':
              patchArr.push({
                op: 'replace',
                path: '/status',
                value: params.functionParams.appointmentParams[dataKey],
              });
              break;
            case 'startTime':
              patchArr.push({
                op: 'replace',
                path: '/start',
                value: params.functionParams.appointmentParams[dataKey],
              });
              break;
            case 'examinationCode':
              const reasonCode = params.functionParams.appointmentParams[
                dataKey
              ].map((examinationCode) => {
                return {
                  coding: [
                    {
                      code: examinationCode,
                    },
                  ],
                };
              });
              patchArr.push({
                op: 'replace',
                path: '/reasonCode',
                value: reasonCode,
              });
              break;
            case 'participantHealthcareService':
              participant.value.push({
                actor: {
                  reference: `HealthcareService/${params.functionParams.appointmentParams[dataKey]}`,
                },
              });
              break;
            case 'serviceTypeCode':
              patchArr.push({
                op: 'replace',
                path: '/serviceType',
                value: [
                  {
                    coding: [
                      {
                        code: params.functionParams.appointmentParams[dataKey],
                      },
                    ],
                  },
                ],
              });
              break;
            case 'patient':
              participant.value.push({
                actor: {
                  reference: `Patient/${params.functionParams.appointmentParams[dataKey]}`,
                },
              });
              break;
            default:
              break;
          }
        }
      }

      if (participant.value.length) {
        patchArr.push(participant);
      }
      return CRUDOperations(
        'patch',
        `${params.url}/${params.functionParams.appointmentId}`,
        patchArr,
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default function Appointment(action = null, params = null) {
  if (action) {
    const transformer =
      AppointmentStates[action] ?? AppointmentStates.__default__;
    return transformer(params);
  }
}
