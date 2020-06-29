/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a encounter strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - idangi@matrix.co.il
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import moment from 'moment';
import { CRUDOperations } from '../CRUDOperations';
import { store } from '../../../../index';
import denormalizeFhirEncounter from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirEncounter';

const EncounterStates = {
  doWork: (parameters) => {
    let componentFhirURL = '/Encounter';
    let paramsToCRUD = parameters.functionParams; //convertParamsToUrl(parameters.functionParams);
    paramsToCRUD.url = componentFhirURL;
    return EncounterStates[parameters.functionName](paramsToCRUD);
  },
  codingArr: (arr) => {
    return arr.map((arrEl) => ({ code: arrEl }));
  },
  createNewEncounter: (params) => {
    //There are two possibilities of data sent to createNewEncountrt
    //1) with appointment ;
    //2) without appointment

    //i have also added this user Id needed to be saved as written in PC-260 PC-261
    const userID = params.userID
      ? params.userID
      : store.getState().login.userID;

    //without appointment
    if (!params.appointment) {
      //there is no appointment

      return CRUDOperations('create', `${params.url}`, {
        serviceProvider: {
          reference: `Organization/${params.facility}`,
        },
        status: 'planned',
        period: {
          start: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
        subject: {
          reference: `Patient/${params.patient.id}`,
        },
        priority: {
          coding: [
            {
              code: 0,
            },
          ],
        },
        participant: [
          {
            individual: {
              reference: `Practitioner/${userID}`,
            },
          },
        ],
      });
    } else {
      //with appointment

      let coding = EncounterStates['codingArr'](
        params.appointment.serviceTypeCode,
      );
      const serviceType = {
        coding,
      };
      // Todo fix reasonCode in here can't do it since I don't have the encounter normalizer fix from develop.
      // coding = codingArr(params.appointment.examinationCode);
      // const reasonCode = params.appointment.examinationCode
      // params.appointment.examination.forEach(element => {

      // });
      let reasonCode = null;
      if (params.appointment.examinationCode) {
        reasonCode = params.appointment.examinationCode.map((examination) => {
          return {
            coding: [
              {
                code: examination,
              },
            ],
          };
        });
      }
      //return fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
      return CRUDOperations('create', `${params.url}`, {
        priority: {
          coding: [
            {
              code: `${params.appointment.priority}`,
            },
          ],
        },
        status: 'planned',
        serviceType,
        reasonCode,
        subject: {
          reference: `Patient/${params.appointment.patient}`,
        },
        appointment: [
          {
            reference: `Appointment/${params.appointment.id}`,
          },
        ],
        period: {
          start: moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
        },
        serviceProvider: {
          reference: `Organization/${params.facility}`,
        },
        participant: [
          {
            individual: {
              reference: `Practitioner/${userID}`,
            },
          },
        ],
      });
    }
  },
  encountersWithPatientsBasePath: (summary) =>
    `${summary ? '_summary=count' : '_include=Encounter:patient'}`,

  getEncountersWithPatients: (params) => {
    let summary = params.summary;
    let date = params.date;
    let serviceProvider = params.organization;
    let serviceType = params.serviceType;
    let statuses = params.statuses;
    let extendedStatuses = params.extendedStatuses;
    let statusesString = '';
    if (extendedStatuses) {
      for (let status of extendedStatuses) {
        statusesString = statusesString.concat(`&status-extended=${status}`);
      }
      if (statuses) {
        for (let status of statuses) {
          statusesString = statusesString.concat(`&status-extended=${status}`);
        }
      }
    } else if (statuses) {
      for (let status of statuses) {
        statusesString = statusesString.concat(`&status=${status}`);
      }
    }

    let summaryStat = EncounterStates['encountersWithPatientsBasePath'](
      summary,
    );
    //return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath(summary)}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
    return CRUDOperations(
      'search',
      `${params.url}?${summaryStat}${statusesString ? statusesString : ''}${
        date ? `&date=eq${date}` : ''
      }${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${
        serviceType ? `&service-type=${serviceType}` : ''
      }${summary ? `&_summary=count` : ''}${
        params.sortParams && summary === false
          ? `&_sort=${params.sortParams}`
          : ''
      }`,
    );
  },
  getCurrentEncounterPerPatient: (params) => {
    let date = params.date,
      patient = params.patient,
      url = params.url,
      specialOrder = `&${params.specialOrder ? params.specialOrder : ''}`;
    //PC-216 endpoint: /Encounter?date=eq<TODAY>&patient=<PID>
    try {
      return CRUDOperations(
        'search',
        `${url}?date=eq${date}${specialOrder}&patient=${patient}`,
      );
      //return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=eq${date}&patient=${patient}`);
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getNextPrevEncounterPerPatient: (params) => {
    //PC-216 endpoint: /Encounter?date=le<DATE>&_count=1&_sort=-date&patient=<PID>
    let date = params.date,
      patient = params.patient,
      prev = params.prev,
      url = params.url,
      specialOrder = `${
        params.specialOrder ? params.specialOrder : '_sort=-date'
      }`;

    try {
      if (prev) {
        //return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=le${date}&_count=1&_sort=-date&patient=${patient}`);
        return CRUDOperations(
          'search',
          `${url}?date=le${date}&_count=1&${specialOrder}&patient=${patient}`,
        );
      } else {
        return CRUDOperations(
          'search',
          `${url}?date=gt${date}&_count=1&${specialOrder}&patient=${patient}`,
        );
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getNextPrevEncountersPerPatient: (params) => {
    let date = params.date,
      patient = params.patient,
      prev = params.prev,
      url = params.url,
      specialOrder = params.specialOrder ? params.specialOrder : '_sort=-date';

    //PC-216 endpoint: /Encounter?date=le<DATE>&_count=1&_sort=-date&patient=<PID>
    try {
      if (prev) {
        return CRUDOperations(
          'search',
          `${url}?date=le${date}&${specialOrder}&patient=${patient}`,
        );
      } else {
        return CRUDOperations(
          'search',
          `${url}?date=gt${date}&${specialOrder}&patient=${patient}`,
        );
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  updateEncounter: (params) => {
    const denormalizedEncounter = denormalizeFhirEncounter(params.encounter);
    return CRUDOperations(
      'update',
      `${params.url}/${params.encounterId}`,
      denormalizedEncounter,
    );
  },
  deleteEncounter: (params) => {
    return CRUDOperations('delete', `${params.url}/${params.encounterId}`);
  },
  searchEncounter: (params) => {
    /**
     * To get all Encounters just don't send any searchParams
     */
    let searchParamsIndex = 0;
    let searchString = '';
    if (params.searchParams) {
      for (const searchParamsKey in params.searchParams) {
        if (params.searchParams.hasOwnProperty(searchParamsKey)) {
          searchParamsIndex += 1;
          if (searchParamsIndex === 1) {
            searchString += '?';
          } else {
            searchString += '&';
          }
          const searchParam = `${searchParamsKey}=${params.searchParams[searchParamsKey]}`;
          searchString += searchParam;
        }
      }
    }
    return CRUDOperations('search', `${params.url}${searchString}`);
  },
  patchEncounter: (params) => {
    const patchArr = [];
    for (const patchKey in params.encounterPatchParams) {
      if (params.encounterPatchParams.hasOwnProperty(patchKey)) {
        const element = params.encounterPatchParams[patchKey];
        switch (patchKey) {
          case 'extensionSecondaryStatus':
            patchArr.push({
              op: 'replace',
              path: '/extension/',
              value: {
                valueString: element,
                url: 'http://clinikal/extensions/encounter/secondaryStatus',
              },
            });
            break;

          default:
            break;
        }
      }
    }
    return CRUDOperations(
      'patch',
      `${params.url}/${params.encountersId}`,
      patchArr,
    );
  },
};

export default function Encounter(action = null, params = null) {
  if (action) {
    const transformer = EncounterStates[action] ?? EncounterStates.__default__;
    return transformer(params);
  }
}
