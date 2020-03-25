/**
 * @author Yuriy Gershem yuriyge@matrix.co.il
 * getEmailRegexPattern - function returns a pattern RegEx for checking email
 * getCellPhoneRegexPattern - function returns a pattern RegEx for checking phone number by format: NN|NNN-(NNN)-NNNN
 */

export const getEmailRegexPattern = () => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
};

export const getCellPhoneRegexPattern = () => {
    return /^\(?([0-9]{2,3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
};
