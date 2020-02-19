/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param valueData
 * @returns {{}}
 */
const normalizeValueData = valueData => {
    if (valueData.resourceType) {
        return {
            code: valueData.id,
            name: valueData.name
        }
    }
};
export default normalizeValueData;
