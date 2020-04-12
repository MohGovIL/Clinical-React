import {
    FHIRPersontoDataArray,
    sortPatientRulesByLexicogrphicsSort,
    sortPatientRulesByNumberSort
} from "../../SearchLogic";
import {CRUDOperations} from "../CRUDOperations";

const PatientStats = {
    doWork: (parameters = null) => {
        let componentFhirURL = "/Patient";
        /*   let fhirTokenInstance = null;
           let fhirBasePath = null;
           let paramsToCRUD = parameters.functionParams;//convertParamsToUrl(parameters.functionParams);
           paramsToCRUD.url = parameters.fhirBasePath + componentFhirURL;*/
        parameters.url = componentFhirURL;
        return PatientStats[parameters.functionName](parameters);
    },
    isNumeric: n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    searchPatients: async (params) => {
        let data = null;
        try {
            if (PatientStats['isNumeric'](params.functionParams.searchValue)) {

                //this is a check -  that the code is waiting for result
                //PatientStats['timeout'](5000);

                //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
                let identifierData = await CRUDOperations('search', params.url + "?" + "identifier:contains=" + params.functionParams.searchValue);
                //let mobileData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}mobile:contains=${value}`);
                let mobileData = await CRUDOperations('search', params.url + "?" + "mobile:contains=" + params.functionParams.searchValue);

                data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData, data) : data;
                data = mobileData.data.total > 0 ? FHIRPersontoDataArray(mobileData, data) : data;
                data = sortPatientRulesByNumberSort(data, params.functionParams.searchValue.trim());

            } else {

                //for future Lexicographic search in ID open this
                //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
                //let byNameData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}name=${value}`);

                //this is a check -  that the code is waiting for result
                //PatientStats['timeout'](5000);

                let byNameData = await CRUDOperations('search', params.url + "?" + 'name=' + params.functionParams.searchValue);

                //for future Lexicographic search in ID open this
                //data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData,data) : null;
                data = byNameData.data.total > 0 ? FHIRPersontoDataArray(byNameData, data) : data;
                if (data && data.length > 1) {
                    data = sortPatientRulesByLexicogrphicsSort(data, params.functionParams.searchValue.trim());
                }

            }
        } catch (err) {
            console.log(err);
        }
        return data;
    },
    timeout: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    updatePatientData: async (params) => {

        return await CRUDOperations('patch', `${params.url}/${params.functionParams.patientData}`, [
            {op: 'replace', path: '/name/0/family', value: params.functionParams.data.lastName},
            {op: 'replace', path: '/name/0/given', value: [params.functionParams.data.firstName, ""]},
            {
                op: 'replace',
                path: '/telecom/1',
                value: {system: "email", value: params.functionParams.data.patientEmail}
            },
            {
                op: 'replace',
                path: '/telecom/2',
                value: {system: "phone", value: params.functionParams.data.mobilePhone, use: "mobile"}
            },
            {op: 'replace', path: '/birthDate', value: params.functionParams.data.birthDate},
            {
                op: 'replace',
                path: '/managingOrganization',
                value: {reference: "Organization/" + params.functionParams.data.healthManageOrganization}
            },
        ])
        /*return fhirTokenInstance().patch(`${fhirBasePath}/Patient/${params.patientId}`, [
            {op: 'replace', path: '/name/0/family', value: params.value.lastName},
            {op: 'replace', path: '/name/0/given', value: [params.value.firstName, ""]},
            {op: 'replace', path: '/telecom/1', value: {system: "email", value: params.value.patientEmail}},
            {op: 'replace', path: '/telecom/2', value: {system: "phone", value: params.value.mobilePhone, use: "mobile"}},
            {op: 'replace', path: '/birthDate', value: params.value.birthDate},
            {
                op: 'replace',
                path: '/managingOrganization',
                value: {reference: "Organization/" + params.value.healthManageOrganization}
            },
        ])*/
    }
};

export default function Patient(action = null, params = null) {

    if (action) {
        const transformer = PatientStats[action] ?? PatientStats.__default__;
        return transformer(params);
    }
}
