/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param appointment - object
 * @param patientsObj - object
 * @returns {{}}
 */
const normalizeFhirAppointment = (appointment, patientsObj)  => {
    const patientInAppointmentId = appointment.participant?.find(actorObj => actorObj.actor.reference.includes('Patient')).actor.reference.split("/")[1];
    const healthcareService = appointment.participant?.find(actorObj => !actorObj.actor.reference.includes('Patient')).actor.display;
    return {
        id: appointment.id,
        priority: appointment.priority,
        status: appointment.status,
        healthcareService,
        examination: appointment.serviceType[0]?.text,
        examinationCode: appointment.serviceType[0]?.coding?.code,
        time: appointment.start,
        participants: patientInAppointmentId ? {...patientsObj[patientInAppointmentId]} : undefined
    };
};

export default normalizeFhirAppointment;
