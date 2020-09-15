/**
 * Helpers for format date.
 * Convertion using moment.js
 * Support working with UTC or local timezone
 */

import { store } from 'index';
import moment from 'moment-timezone';

const UTC = 'UTC';

/**
 * @author Amiel Elboim amielel@matrix.co.il
 * @param {dateTime} date
 * @param {dateFormat} string
 * @return {string} datetime formatted according of the system setting
 */
export const formatDateTime = (dateTime, dateFormat) => {
    return momentInit(dateTime).format(`${dateFormat} HH:mm`);
}

/**
 * @author Amiel Elboim amielel@matrix.co.il
 * @param {dateTime} date
 * @param {dateFormat} string
 * @return {string} date formatted according of the system setting
 */
export const formatShortDate = (date, format) => {
    return momentInit(date).format(format);
}

/**
 * @author Amiel Elboim amielel@matrix.co.il
 * @param {dateTime} date
 * @return {string} only hours and minutes
 */
export const formatTime = (date) => {
    return momentInit(date).format('HH:mm');
}

/**
 * @author Amiel Elboim amielel@matrix.co.il
 * @param {dateFormat} string
 * @param {withTime} string
 * @return {string} current date formatted
 */
export const currentDate = (dateFormat, withTime = false) => {
    if (withTime) {
        return momentInit().format(`${dateFormat} HH:mm`);
    } else {
        return momentInit().format(dateFormat);
    }

}

/**
 * @author Amiel Elboim amielel@matrix.co.il
 * @param {date} string
 * @param {fromFormat} format of sent date
 * @return {string} date ready to send to fhir server
 */
export const fhirFormatDate = (date = null, fromFormat = 'YYYY-MM-DD') => {

    let timeZone  = store.getState().settings.time_zone;
    let momentObject = date !== null ? moment(date, fromFormat) : moment();

    if ( timeZone !== UTC) {
        //switch to zone from settings before send to server
        return momentObject.tz(timeZone).format('YYYY-MM-DD')
    } else {
        //switch to utc before send to server
        return momentObject.utc().format('YYYY-MM-DD')
    }

}


/**
 * @author Amiel Elboim amielel@matrix.co.il
 * @param {date} string
 * @param {fromFormat} format of sent date
 * @return {string} datetime ready to send to fhir server
 */
export const fhirFormatDateTime  = (date = null, fromFormat = 'YYYY-MM-DD HH:mm:ss') => {

    let timeZone  = store.getState().settings.time_zone;
    let momentObject = date !== null ? moment(date, fromFormat) : moment();

    if ( timeZone !== UTC) {
        //switch to zone from settings before send to server
        return momentObject.tz(timeZone).format('YYYY-MM-DDTHH:mm:ssZ')
    } else {
        //switch to utc before send to server
        return momentObject.utc().format('YYYY-MM-DDTHH:mm:ss[Z]')
    }

}


const momentInit = (date, format) => {

    if (store.getState().settings.time_zone === UTC) {
        //switch time to local if server saves at UTC
        return moment(date, format).local();
    } else {
        return moment(date, format);
    }
}

