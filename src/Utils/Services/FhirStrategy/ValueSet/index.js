import {getValueSet} from "../../FhirAPI";

const ValueSet = () => {
    let fhirTokenInstance = null;
    let fhirBasePath = null;

    const doWork = (params) => {
        fhirTokenInstance = params.fhirTokenInstance;
        fhirBasePath = params.fhirBasePath;
    };

    const getValueSet = id => {
        return fhirTokenInstance().get(`${fhirBasePath}/ValueSet/${id}/$expand`);
    };

    const requestValueSet =  async (id) => {

        const {data: {expansion: {contains}}} = await getValueSet(id);
        let options = [];
        if(contains) {
            for (let status of contains) {
                options[status.code] = status.display;
            }
        }

        return options;
    };

};

export default ValueSet;
