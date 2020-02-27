/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param patient
 * @returns {}
 */
const normalizeFhirPatient = patient => {
    let middleName = null;
    let mobileCellPhone = null;
    let homePhone = null;
    let email = null;
    let firstName = null;
    let lastName = null;
    let identifier = null;

    //Temporary fix for checking
    if (patient.identifier) {
        // let identifier = patient.identifier ? patient.identifier[0].value : null;
        identifier = {value: (patient.identifier ? patient.identifier[0].value : null), type: "ID"};
    }

    if (patient.name) {
        lastName = patient.name[0].family;
        if (patient.name[0].given) {
            firstName = patient.name[0].given[0];
            if (patient.name[0].given.length > 2) {
                middleName = patient.name[0].given.join(' ');
            } else {
                middleName = patient.name[0].given[1];
            }
        }
    }
    if (patient.telecom) {
        let found;
        found = patient.telecom.patient.telecom.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'mobile');
        found ? mobileCellPhone = found.value : mobileCellPhone = found;

        found = patient.telecom.patient.telecom.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'home');
        found ? homePhone = found.value : homePhone = found;

        found = patient.telecom.patient.telecom.find(telecomItem => telecomItem.system === 'email');
        found ? email = found.value : email = found;
        // mobileCellPhone = patient.telecom.patient.telecom.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'mobile') ?.value;
        // homePhone = patient.telecom.patient.telecom.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'home')?.value;
        // email = patient.telecom.patient.telecom.find(telecomItem => telecomItem.system === 'email')?.value;
    }
    return {
        id: patient.id,
        identifier,
        firstName,
        lastName,
        middleName,
        mobileCellPhone,
        homePhone,
        email,
        gender: patient.gender,
        birthDate: patient.birthDate,
    }
};

export default normalizeFhirPatient;
