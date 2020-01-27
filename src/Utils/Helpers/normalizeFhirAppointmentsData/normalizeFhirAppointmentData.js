/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param appointmentsData - An array of appointments data {data.entry} or <var holding the promise data>.data.entry
 * Related API getAppointment
 * @returns {[]} Returns an array of Objects
 */
import normalizeFhirPatient from "./normalizeFhirPatient";
import normalizeFhirAppointment from "./normalizeFhirAppointment";

export const normalizeAppointmentData = (appointmentsData) => {
    const appointmentsArray = [];
    const patientsObj = {};
    //Looping over the appointments data and store all the Patients in an array like a dictionary
    for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
        const entry = appointmentsData[entryIndex].resource;
        if (entry.resourceType === 'Patient') {
            const patient = normalizeFhirPatient(entry);
            patientsObj[`${patient.id}`] = {patient};
        }
    }
    for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
        const entry = appointmentsData[entryIndex].resource;
        if (entry.resourceType === 'Appointment') {
            const appointment = normalizeFhirAppointment(entry, patientsObj);
            appointmentsArray.push(appointment);
        }
    }
    return appointmentsArray;
};
