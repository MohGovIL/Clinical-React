const Organization = () => {
    let fhirTokenInstance = null;
    let fhirBasePath = null;

    const doWork = (params) => {
        fhirTokenInstance = params.fhirTokenInstance;
        fhirBasePath = params.fhirBasePath;
    };
    const getOrganizationTypeKupatHolim = () => {
        return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=71`);
    };

    const getOrganization = () => {
        return fhirTokenInstance().get(`${fhirBasePath}/Organization?type=11`);
    };
};

export default Organization;
