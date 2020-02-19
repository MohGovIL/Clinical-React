import normalizeFhirPatient from "../normalizeFhirPatient";
import normalizeFhirAppointment from "../normalizeFhirAppointment";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param appointmentsData - An array of appointments data and patient if there are any {data.entry}
 * @returns [] Returns an array. array[0] stores the patientsObj, array[1] stores the appointmentsObj.
 * patientsObj stores all the patients each patient key is his ID.
 * appointmentsObj stores all the appointments each appointment key is his ID.
 */

export const normalizeFhirAppointmentsWithPatients = appointmentsData => {
    const response = [];
    const appointmentsObj = {};
    const patientsObj = {};
    //Looping over the appointments data and store all the Patients in an array like a dictionary
    for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
        if (appointmentsData[entryIndex].resource) {
            const entry = appointmentsData[entryIndex].resource;
            if (entry.resourceType === 'Patient') {
                const patient = normalizeFhirPatient(entry);
                patientsObj[`${patient.id}`] = {...patient};
            }
        }
    }
    response[0] = patientsObj;
    for (let entryIndex = 0; entryIndex < appointmentsData.length; entryIndex++) {
        if (appointmentsData[entryIndex].resource) {
            const entry = appointmentsData[entryIndex].resource;
            if (entry.resourceType === 'Appointment') {
                const appointment = normalizeFhirAppointment(entry);
                appointmentsObj[`${appointment.id}`] = {...appointment}
            }
        }
    }
    response[1] = appointmentsObj;
    return response;
};
