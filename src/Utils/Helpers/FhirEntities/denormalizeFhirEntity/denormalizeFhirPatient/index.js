/**
 * @author Idan Gigi idangi@matrix.co.il, Yuriy Gershem yuriyge@matrix.co.il
 * @param {object} patient
 * @returns {object} denormalizationFhirPatient
 */
const denormalizeFhirPatient = (patient) => {
    const telecom = [];
    const identifierObj = {};
    const name = {};
    const denormalizedPatient = {};

    for (const patientKey in patient) {
        if (patient.hasOwnProperty(patientKey)) {
            switch (patientKey) {
                case 'birthDate':
                    denormalizedPatient['birthDate'] = patient[patientKey];
                    break;
                case 'managingOrganization':
                    denormalizedPatient['managingOrganization'] = {
                        reference: `Organization/${patient[patientKey]}`,
                    };
                    break;
                case 'email':
                    telecom.push({
                        system: 'email',
                        value: patient[patientKey],
                    });
                    break;
                case 'mobileCellPhone':
                    telecom.push({
                        system: 'phone',
                        value: patient[patientKey],
                        use: 'mobile',
                    });
                    break;
                case 'homePhone':
                    telecom.push({
                        system: 'phone',
                        value: patient[patientKey],
                        use: 'home',
                    });
                    break;
                case 'firstName':
                    name['given'] = [patient[patientKey]];
                    break;
                case 'lastName':
                    name['family'] = patient[patientKey];
                    break;
                case 'identifierType':
                    identifierObj['type'] = {
                        coding: [
                            {
                                code: patient[patientKey],
                            },
                        ],
                    };
                    break;
                case 'identifier':
                    identifierObj['value'] = patient[patientKey];
                    break;
                case 'gender':
                    denormalizedPatient['gender'] = patient[patientKey];
                    break;
                default:
                    break;
            }
        }
    }
    if (patient.identifierType || patient.identifier) {
        denormalizedPatient['identifier'] = { ...identifierObj };
    }

    if (telecom.length > 0) {
        denormalizedPatient['telecom'] = telecom;
    }

    if (patient.firstName || patient.lastName) {
        denormalizedPatient['name'] = { ...name };
    }
    return denormalizedPatient;
};

export default denormalizeFhirPatient;
