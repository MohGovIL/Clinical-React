/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param patient
 * @returns {{}}
 */
const normalizeFhirPatient = patient => {
    return {
        id: patient.id,
        identifier: patient.identifier[0].value,
        firstName: patient.name[0].given[0],
        middleName: patient.name[0].given.filter((_, middleNameIndex) => middleNameIndex !== 0).join(' '),
        lastName: patient.name[0].family,
        mobileCellPhone: patient.telecom?.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'mobile')?.value,
        homePhone: patient.telecom?.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'home')?.value,
        email:  patient.telecom?.find(telecomItem => telecomItem.system === 'email')?.value,
        gender: patient.gender,
        birthDate: patient.birthDate,
    }
};

export default normalizeFhirPatient;
