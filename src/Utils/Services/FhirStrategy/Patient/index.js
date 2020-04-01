import {
    FHIRPersontoDataArray,
    sortPatientRulesByLexicogrphicsSort,
    sortPatientRulesByNumberSort
} from "../../SearchLogic";

const Patient = () => {
    const patientsFhirSeacrh = '/Patient?';
    let fhirTokenInstance = null;
    let fhirBasePath = null;

    const doWork = (params) => {
        fhirTokenInstance = params.fhirTokenInstance;
        fhirBasePath = params.fhirBasePath;
    };

    const isNumeric = n => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    const searchPatients = async (value) => {
        let data = null;

        if (isNumeric(value)) {

            let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
            let mobileData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}mobile:contains=${value}`);

            data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData, data) : data;
            data = mobileData.data.total > 0 ? FHIRPersontoDataArray(mobileData, data) : data;
            data = sortPatientRulesByNumberSort(data, value.trim());

        } else {
            //for future Lexicographic search in ID open this
            //let identifierData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}identifier:contains=${value}`);
            let byNameData = await fhirTokenInstance().get(`${fhirBasePath}${patientsFhirSeacrh}name=${value}`);
            //for future Lexicographic search in ID open this
            //data = identifierData.data.total > 0 ? FHIRPersontoDataArray(identifierData,data) : null;
            data = byNameData.data.total > 0 ? FHIRPersontoDataArray(byNameData, data) : data;
            if (data && data.length > 1) {
                data = sortPatientRulesByLexicogrphicsSort(data, value.trim());
            }

        }

        return data;
    };

    const updatePatientData = (patientId, value) => {
        return fhirTokenInstance().patch(`${fhirBasePath}/Patient/${patientId}`, [
            {op: 'replace', path: '/name/0/family', value: value.lastName},
            {op: 'replace', path: '/name/0/given', value: [value.firstName, ""]},
            {op: 'replace', path: '/telecom/1', value: {system: "email", value: value.patientEmail}},
            {op: 'replace', path: '/telecom/2', value: {system: "phone", value: value.mobilePhone, use: "mobile"}},
            {op: 'replace', path: '/birthDate', value: value.birthDate},
            {
                op: 'replace',
                path: '/managingOrganization',
                value: {reference: "Organization/" + value.healthManageOrganization}
            },
        ])
    };
};

export default Patient;
