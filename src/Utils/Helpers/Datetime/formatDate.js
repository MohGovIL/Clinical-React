/**
 * @author Dror Golan drorgo@matrix.co.il, Idan Gigi idangi@matrix.co.il
 * @param {string} acoMappingId
 * @return {string} 'hide' | 'view' | 'write'
 * @calibrate  data inside components tabs
 */

import { store } from 'index';
import moment from 'moment-timezone';

const UTC = 'UTC';

export const formatDateTime = (dateTime, dateFormat) => {
    return momentInit(dateTime).format(`${dateFormat} HH:mm`);
}

export const formatShortDate = (date, format) => {
    return momentInit(date).format(format);
}

export const formatTime = (date) => {
    console.log(date)
    console.log(momentInit(date).format('YYYY-MM-DD HH:mm:ss'))
    return momentInit(date).format('HH:mm');
}

export const currentDate = (dateFormat, withTime = false) => {
    if (withTime) {
        return momentInit().format(`${dateFormat} HH:mm`);
    } else {
        return momentInit().format(dateFormat);
    }

}

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

export const fhirFormatDateTime  = (date = null, fromFormat = 'YYYY-MM-DD HH:mm:ss') => {

    let timeZone  = store.getState().settings.time_zone;
    let momentObject = date !== null ? moment(date, fromFormat) : moment();

    if ( timeZone !== UTC) {
        //switch to zone from settings before send to server
        return momentObject.tz(timeZone).format('YYYY-MM-DDTHH:mm:ss[Z]')
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

