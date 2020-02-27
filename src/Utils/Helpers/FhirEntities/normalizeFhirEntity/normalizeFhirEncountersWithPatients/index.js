import normalizeFhirPatient from "../normalizeFhirPatient";
import normalizeFhirEncounter from "../normalizeFhirEncounter";

/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param encountersData - An array of appointments data and patient if there are any {data.entry}
 * @returns [] Returns an array. array[0] stores the patientsObj, array[1] stores the appointmentsObj.
 * patientsObj stores all the patients each patient key is his ID.
 * encountersObj stores all the appointments each appointment key is his ID.
 */

export const normalizeFhirEncountersWithPatients = encountersData => {
    const response = [];
    const encountersObj = {};
    const patientsObj = {};
    //Looping over the encounters data and store all the Patients in an array like a dictionary
    for (let entryIndex = 0; entryIndex < encountersData.length; entryIndex++) {
        if (encountersData[entryIndex].resource) {
            const entry = encountersData[entryIndex].resource;
            if (entry.resourceType === 'Patient') {
                const patient = normalizeFhirPatient(entry);
                patientsObj[`${patient.id}`] = {...patient};
            }
        }
    }
    response[0] = patientsObj;
    for (let entryIndex = 0; entryIndex < encountersData.length; entryIndex++) {
        if (encountersData[entryIndex].resource) {
            const entry = encountersData[entryIndex].resource;
            if (entry.resourceType === 'Encounter') {
                const encounter = normalizeFhirEncounter(entry);
                encountersObj[`${encounter.id}`] = {...encounter}
            }
        }
    }
    response[1] = encountersObj;
    return response;
};
