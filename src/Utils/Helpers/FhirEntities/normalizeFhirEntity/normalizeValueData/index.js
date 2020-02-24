/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param valueData
 * @returns {{}}
 */
const normalizeValueData = valueData => {
    if (valueData.resourceType) {
        return {
            code: parseInt(valueData.id) === NaN ? valueData.id : parseInt(valueData.id),
            name: valueData.name
        }
    }
};

export const normalizeHealhcareServiceValueData = valueData => {
    if (valueData.resourceType) {
        return {
            code: parseInt(valueData.type[0].coding[0].code) === NaN ? valueData.type[0].coding[0].code : parseInt(valueData.type[0].coding[0].code),
            name: valueData.type[0].text,
        }
    }
};

export default normalizeValueData;
