import * as Moment from "moment";

/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * @param birthDay - birth date of patient
 * @returns {string} - age of patient
 */

const ageCalculator = (birthDay) => {
    return Math.floor(Moment(new Date()).diff(Moment(birthDay, "YYYY-MM-DD"), 'years', true))
}

export default ageCalculator;
