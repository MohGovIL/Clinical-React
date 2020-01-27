/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param appointment - object
 * @param patientsObj - object
 * @returns {{}}
 */
const normalizeFhirAppointment = (appointment, patientsObj)  => {
    const patientInAppointmentId = appointment.participant?.find(actorObj => actorObj.actor.reference.includes('Patient')).actor.reference.split("/")[1];
    const healthCareService = appointment.participant?.find(actorObj => !actorObj.actor.reference.includes('Patient')).actor.display;
    return {
        status: appointment.status,
        healthCareService,
        examination: appointment.serviceType[0]?.text,
        time: appointment.start,
        participants: patientInAppointmentId ? {...patientsObj[patientInAppointmentId]} : undefined
    };
};

export default normalizeFhirAppointment;
