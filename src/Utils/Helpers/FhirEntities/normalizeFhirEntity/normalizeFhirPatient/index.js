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
    let identifier = '';
    let identifierType = '';
    let city = null;
    let postalCode = null;
    let country = null;


    if(patient.address.length){
        city = patient.address[0].city;
        postalCode = patient.address[0].postalCode;
        country = patient.address[0].country;
    }
    let managingOrganization = null;
    let ageGenderType = '';



    if (patient.identifier.length) {
        identifier = patient.identifier[0].value;
        identifierType = patient.identifier[0].type.coding.length && patient.identifier[0].type.coding[0].code;
    }

    //Demo data for health managing organization
    //In future we need change to: patient.managingOrganization
    managingOrganization = {
        reference: "Organization/6"
    };

    if (managingOrganization.reference && managingOrganization.reference.length > 0) {
        managingOrganization = managingOrganization ? managingOrganization.reference.split('/')[1] : null;
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
        //for temporary use system === 'mobile', instead 'phone'
        const thereIsMobilePhone = patient.telecom.filter(telecomObj => telecomObj.system === 'phone' && telecomObj.use === 'mobile');
        mobileCellPhone = thereIsMobilePhone.length ? thereIsMobilePhone[0].value : '';

        const thereIsEmail = patient.telecom.filter(telecomObj => telecomObj.system === 'email');
        email = thereIsEmail.length ? thereIsEmail[0].value : '';

        const thereIsHomePhone = patient.telecom.filter(telecomObj => telecomObj.system === 'phone' && telecomObj.use === 'home');
        homePhone = thereIsHomePhone.length ? thereIsHomePhone[0].value : '';
    }

    ageGenderType = patient.gender === 'female' ? 'age{f}' : 'age{m}';


    return {
        id: patient.id,
        city,
        postalCode,
        country,
        identifier,
        identifierType,
        firstName,
        lastName,
        middleName,
        mobileCellPhone,
        homePhone,
        email,
        gender: patient.gender,
        birthDate: patient.birthDate,
        managingOrganization,
        ageGenderType
    }
};

export default normalizeFhirPatient;
