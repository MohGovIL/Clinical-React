/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param appointmentsData - An array of appointments data {data.entry} or <var holding the promise data>.data.entry
 * Related API getAppointment
 * @returns {[]} Returns an array of Objects
 */

export const normalizeAppointmentData = (appointmentsData) => {
    const appointmentsArray = [];
    const patientsObj = {};
    //Looping over the appointments data and store all the Patients in an array like a dictionary for O(1)
    for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
        const entry = appointmentsData[entryIndex].resource;
        if (entry.resourceType === 'Patient') {
            const patientsObjItem = {
                id: entry.id,
                identifier: entry.identifier[0].value,
                firstName: entry.name[0].given[0],
                middleName: entry.name[0].given[1],
                lastName: entry.name[0].family,
                telecom: [entry.telecom],
                gender: entry.gender,
                birthDate: entry.birthDate,
            };
            patientsObj[`${entry.id}`] = {patientsObjItem};
        }
    }
    for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
        const entry = appointmentsData[entryIndex].resource;
        if (entry.resourceType === 'Appointment') {
            const patientInAppointment = entry.participant.find(actorObj => actorObj.actor.reference.includes('Patient'));
            const healthCareService = entry.participant.find(actorObj => !actorObj.actor.reference.includes('Patient'));
            const appointmentsArrayItem = {
                status: entry.status,
                healthcareService: healthCareService.actor.display,
                examination: entry.serviceType[0].text,
                time: entry.start,
                participants: {...patientsObj[patientInAppointment.actor.reference.split("/")[1]]}
            };
            appointmentsArray.push(appointmentsArrayItem);
        }
    }
    return appointmentsArray;
};
