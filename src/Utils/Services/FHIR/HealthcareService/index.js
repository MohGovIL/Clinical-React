import {normalizeHealthCareServiceValueData} from "../../../Helpers/FhirEntities/normalizeFhirEntity/normalizeValueData";
import {getHealhcareService} from "../../FhirAPI";

const HealthcareService = () => {
    let fhirTokenInstance = null;
    let fhirBasePath = null;

    const doWork = (params) => {
        fhirTokenInstance = params.fhirTokenInstance;
        fhirBasePath = params.fhirBasePath;
    };
    const getHealhcareService = (organization) => {
        return fhirTokenInstance().get(`${fhirBasePath}/HealthcareService?organization=${organization}`);
    };
    const getHealthCareServiceByOrganization = async (organizationId) => {

        let array = [];
        const {data: {entry: dataServiceType}} = await getHealhcareService(organizationId);
        if(dataServiceType) {
            for (let entry of dataServiceType) {
                if (entry.resource !== undefined) {
                    const setLabelServiceType = normalizeHealthCareServiceValueData(entry.resource);
                    array[setLabelServiceType.code] = setLabelServiceType.name;
                }
            }
        }

        return array;
    };
};

export default HealthcareService;
