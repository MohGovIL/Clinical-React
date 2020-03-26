/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param valueData
 * @returns {{}}
 */
export const normalizeValueData = valueData => {
    if (valueData.resourceType) {
        return {
            code: isNaN(parseInt(valueData.id)) ? valueData.id : parseInt(valueData.id),
            name: valueData.name
        }
    }
};

export const normalizeHealthCareServiceValueData = valueData => {
    if (valueData.resourceType) {
        return {
            code: isNaN(parseInt(valueData.type[0].coding[0].code)) ? valueData.type[0].coding[0].code : parseInt(valueData.type[0].coding[0].code),
            name: valueData.name
        }
    }
};
