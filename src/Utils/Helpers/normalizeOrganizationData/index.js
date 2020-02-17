/**
 * @author Yuiry Gershem yuriyge@matrix.co.il
 * @param organization
 * @returns {{}}
 */
export const normalizeOrganizationData = organization => {
    if (organization.resourceType) {
        return {
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
};
