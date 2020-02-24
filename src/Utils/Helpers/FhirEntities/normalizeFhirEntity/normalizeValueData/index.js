/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param valueData
 * @returns {{}}
 */
export const normalizeValueData = valueData => {
    if (valueData.resourceType) {
        return {
            code: valueData.id,
            name: valueData.name
        }
    }
};

export const normalizeHealhcareServiceValueData = valueData => {
    if (valueData.resourceType) {
        return {
            code: valueData.type[0].coding[0].code,
            name: valueData.type[0].text,
        }
    }
};
