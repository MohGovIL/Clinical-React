/**
 * @author Dror Golan - drorgo@matrix.co.il
 * @fileOverview  - this is a patient strategy  which handles old fhirAPI code logic written by :
 *                   Idan Gigi - gigiidan@gmail.com
 *                   Yuriy Gershem - yuriyge@matrix.co.il
 *                   Dror Golan - drorgo@matrix.co.il
 */

import {
  FHIRPersontoDataArray,
  sortPatientRulesByLexicogrphicsSort,
  sortPatientRulesByNumberSort,
} from '../../SearchLogic';
import { CRUDOperations } from '../CRUDOperations';
import denormalizeFhirPatient from 'Utils/Helpers/FhirEntities/denormalizeFhirEntity/denormalizeFhirPatient';

const PatientStats = {
  doWork: (parameters = null) => {
    let componentFhirURL = '/Patient';
    parameters.url = componentFhirURL;
    return PatientStats[parameters.functionName](parameters);
  },
  isNumeric: (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  searchPatients: async (params) => {
    let data = null;
    try {
      if (PatientStats['isNumeric'](params.functionParams.searchValue)) {
        //this is a check -  that the code is waiting for result
        //PatientStats['timeout'](5000);

        //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
        let identifierData = await CRUDOperations(
          'search',
          params.url +
            '?' +
            'identifier:contains=' +
            params.functionParams.searchValue,
        );
        //let mobileData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}mobile:contains=${value}`);
        let mobileData = await CRUDOperations(
          'search',
          params.url +
            '?' +
            'mobile:contains=' +
            params.functionParams.searchValue,
        );

        data =
          identifierData.data.total > 0
            ? FHIRPersontoDataArray(identifierData, data)
            : data;
        data =
          mobileData.data.total > 0
            ? FHIRPersontoDataArray(mobileData, data)
            : data;
        data = sortPatientRulesByNumberSort(
          data,
          params.functionParams.searchValue.trim(),
        );
      } else {
        //for future Lexicographic search in ID open this
        //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
        //let byNameData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}name=${value}`);

        //this is a check -  that the code is waiting for result
        //PatientStats['timeout'](5000);

        let byNameData = await CRUDOperations(
          'search',
          params.url + '?' + 'name=' + params.functionParams.searchValue,
        );

        //for future Lexicographic search in ID open this
        //data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData,data) : null;
        data =
          byNameData.data.total > 0
            ? FHIRPersontoDataArray(byNameData, data)
            : data;
        if (data && data.length > 1) {
          data = sortPatientRulesByLexicogrphicsSort(
            data,
            params.functionParams.searchValue.trim(),
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
    return data;
  },
  updatePatientData: (params) => {
    return CRUDOperations(
      'patch',
      `${params.url}/${params.functionParams.patientData}`,
      [
        {
          op: 'replace',
          path: '/name/0/family',
          value: params.functionParams.data.lastName,
        },
        {
          op: 'replace',
          path: '/name/0/given',
          value: [params.functionParams.data.firstName, ''],
        },
        {
          op: 'replace',
          path: '/telecom/1',
          value: {
            system: 'email',
            value: params.functionParams.data.patientEmail,
          },
        },
        {
          op: 'replace',
          path: '/telecom/2',
          value: {
            system: 'phone',
            value: params.functionParams.data.mobilePhone,
            use: 'mobile',
          },
        },
        {
          op: 'replace',
          path: '/birthDate',
          value: params.functionParams.data.birthDate,
        },
        {
          op: 'replace',
          path: '/managingOrganization',
          value: {
            reference:
              'Organization/' +
              params.functionParams.data.healthManageOrganization,
          },
        },
      ],
    );
  },
  searchPatientById: async (params) => {
    try {
      let data = null;
      let identifierData = await CRUDOperations(
        'search',
        params.url +
          '?' +
          'identifier=' +
          params.functionParams.identifierValue +
          (params.functionParams.identifierType
            ? '&identifier.type=' + params.functionParams.identifierType
            : ''),
      );
      data =
        identifierData.data.total === 1
          ? FHIRPersontoDataArray(identifierData, data)[0]
          : data;
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  timeout: (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
  updatePatient: (params) => {
    const patchArr = [];
    const address = { op: 'replace', path: '/address/0', value: {} };
    const addressLine = { op: 'replace', path: '/address/0/line', value: [] };
    const given = { op: 'replace', path: '/name/0/given', value: [] };
    let addressType = '';
    if (params.functionParams.patientPatchParams['POBox']) {
      if (params.functionParams.patientPatchParams['streetName']) {
        addressType = 'both';
      } else {
        addressType = 'postal';
      }
    } else {
      addressType = 'physical';
    }

    if (addressType) {
      address.value['type'] = addressType;
    }

    for (const dataKey in params.functionParams.patientPatchParams) {
      if (params.functionParams.patientPatchParams.hasOwnProperty(dataKey)) {
        switch (dataKey) {
          case 'identifier':
            patchArr.push({
              op: 'replace',
              path: '/identifier/0/value',
              value: params.functionParams.patientPatchParams[dataKey],
            });
            break;
          case 'lastName':
            patchArr.push({
              op: 'replace',
              path: '/name/0/family',
              value: params.functionParams.patientPatchParams[dataKey],
            });
            break;
          case 'firstName':
            given[0] = params.functionParams.patientPatchParams[dataKey];
            break;
          case 'middleName':
            given[1] = params.functionParams.patientPatchParams[dataKey];
            break;
          case 'homePhone':
            patchArr.push({
              op: 'replace',
              path: '/telecom/0',
              value: {
                system: 'phone',
                value: params.functionParams.patientPatchParams[dataKey],
                use: 'home',
              },
            });
            break;
          case 'email':
            patchArr.push({
              op: 'replace',
              path: '/telecom/1',
              value: {
                system: 'email',
                value: params.functionParams.patientPatchParams[dataKey],
              },
            });
            break;
          case 'mobilePhone':
            patchArr.push({
              op: 'replace',
              path: '/telecom/2',
              value: {
                system: 'phone',
                value: params.functionParams.patientPatchParams[dataKey],
                use: 'mobile',
              },
            });
            break;
          case 'gender':
            patchArr.push({
              op: 'replace',
              path: '/gender',
              value: params.functionParams.patientPatchParams[dataKey],
            });
            break;
          case 'birthDate':
            patchArr.push({
              op: 'replace',
              path: '/birthDate',
              value: params.functionParams.patientPatchParams[dataKey],
            });
            break;
          case 'deceased':
            patchArr.push({
              op: 'replace',
              path: '/deceasedBoolean',
              value: params.functionParams.patientPatchParams[dataKey],
            });
            break;
          case 'deceasedDateTime':
            patchArr.push({
              op: 'replace',
              path: '/deceasedDateTime',
              value: params.functionParams.patientPatchParams[dataKey],
            });
            break;
          case 'managingOrganization':
            patchArr.push({
              op: 'replace',
              path: '/managingOrganization',
              value: params.functionParams.patientPatchParams[dataKey],
            });
            break;
          case 'city':
            address.value['city'] =
              params.functionParams.patientPatchParams[dataKey];
            break;
          case 'postalCode':
            address.value['postalCode'] =
              params.functionParams.patientPatchParams[dataKey];
            break;
          case 'country':
            address.value['country'] =
              params.functionParams.patientPatchParams[dataKey];
            break;
          case 'streetName':
            if (addressType) {
              if (addressType === 'both' || addressType === 'physical') {
                addressLine.value[0] =
                  params.functionParams.patientPatchParams[dataKey];
              }
            }
            break;
          case 'streetNumber':
            if (addressType) {
              if (addressType === 'both' || addressType === 'physical') {
                addressLine.value[1] =
                  params.functionParams.patientPatchParams[dataKey];
              }
            }
            break;
          case 'POBox':
            if (addressType) {
              if (addressType === 'both') {
                if (params.functionParams.patientPatchParams['streetNumber']) {
                  addressLine.value[2] =
                    params.functionParams.patientPatchParams[dataKey];
                } else {
                  addressLine.value[1] =
                    params.functionParams.patientPatchParams[dataKey];
                }
              } else if (addressType === 'postal') {
                addressLine.value[0] =
                  params.functionParams.patientPatchParams[dataKey];
              }
            }
            break;
          default:
            break;
        }
      }

      given.value.length && patchArr.push(given);
      Object.values(address.value).length && patchArr.push(address);
      Object.values(addressLine.value).length && patchArr.push(addressLine);
      return CRUDOperations(
        'patch',
        `${params.url}/${params.functionParams.patientId}`,
        patchArr,
      );
    }
  },
  createPatient: (params) => {
    const denormalizationFhirPatient = denormalizeFhirPatient(
      params.functionParams.patient,
    );
    return CRUDOperations(
      'create',
      `${params.url}`,
      denormalizationFhirPatient,
    );
  },
};

export default function Patient(action = null, params = null) {
  if (action) {
    const transformer = PatientStats[action] ?? PatientStats.__default__;
    return transformer(params);
  }
}
