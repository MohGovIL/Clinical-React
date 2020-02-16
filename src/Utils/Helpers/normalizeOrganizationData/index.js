/**
 * @author Yuiry Gershem yuriyge@matrix.co.il
 * @param organization
 * @returns {{}}
 */
export const normalizeOrganizationData = organization => {
    if (organization.resourceType) {
        return {
            // id: patient.id,
            // identifier: patient.identifier[0].value,
            // firstName: patient.name[0].given[0],
            // middleName: patient.name[0].given.filter((_, middleNameIndex) => middleNameIndex !== 0).join(' '),
            // lastName: patient.name[0].family,
            // mobileCellPhone: patient.telecom?.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'mobile')?.value,
            // homePhone: patient.telecom?.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'home')?.value,
            // email:  patient.telecom?.find(telecomItem => telecomItem.system === 'email')?.value,
            // gender: patient.gender,
            // birthDate: patient.birthDate,
            code: organization.id,
            name: organization.name
        }
    }
};

export const normalizeServiceTypeData = serviceType => {
    return {
        code: serviceType.id,
        name: serviceType.name
    }
    // if (organization.resourceType) {
    //     return {
    //         // id: patient.id,
    //         // identifier: patient.identifier[0].value,
    //         // firstName: patient.name[0].given[0],
    //         // middleName: patient.name[0].given.filter((_, middleNameIndex) => middleNameIndex !== 0).join(' '),
    //         // lastName: patient.name[0].family,
    //         // mobileCellPhone: patient.telecom?.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'mobile')?.value,
    //         // homePhone: patient.telecom?.find(telecomItem => telecomItem.system === 'phone' && telecomItem.use === 'home')?.value,
    //         // email:  patient.telecom?.find(telecomItem => telecomItem.system === 'email')?.value,
    //         // gender: patient.gender,
    //         // birthDate: patient.birthDate,
    //         code: organization.id,
    //         name: organization.name
    //     }
    // }
};
