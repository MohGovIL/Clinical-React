// noinspection JSClosureCompilerSyntax
/**
 * @author Idan Gigi gigiidan@gmail.com
 * @param appointment - object
 * @returns {}
 */
const normalizeFhirAppointment = appointment => {
    let serviceType = null;
    let serviceTypeCode = null;
    if(appointment.serviceType && appointment.serviceType.length > 0){
        if(appointment.serviceType.every(serviceTypeObj => serviceTypeObj.coding)){
            serviceTypeCode = appointment.serviceType.map(serviceTypeCodeObj => serviceTypeCodeObj.coding[0].code);
            serviceType = appointment.serviceType.map(serviceTypeObj => serviceTypeObj.text);
        }
    }

    let patient = null;
    let participantHealthcareService = null;
    if (appointment.participant && appointment.participant.length > 0) {
        patient = appointment.participant.find(actorObj => actorObj.actor.reference.includes('Patient'));
        patient = patient ? patient.actor.reference.split('/')[1] : null;

        participantHealthcareService = appointment.participant.find(actorObj => actorObj.actor.reference.includes('HealthcareService'));
        participantHealthcareService = participantHealthcareService ? participantHealthcareService.actor.reference.split('/')[1] : null;
    }

    let examinationCode = null;
    let examination = null;
    if (appointment.reasonCode && appointment.reasonCode.length > 0){
        if(appointment.reasonCode.every(reasonCodeObj => reasonCodeObj.coding)){
            examinationCode = appointment.reasonCode.map(reasonCodeObj => reasonCodeObj.coding[0].code);
            examination = appointment.reasonCode.map(reasonCodeObj => reasonCodeObj.text);
        }
    }

    return {
        id: appointment.id,
        priority: appointment.priority,
        status: appointment.status,
        startTime: appointment.start,
        examinationCode,
        examination,
        participantHealthcareService,
        serviceType,
        serviceTypeCode,
        patient
    };
};

export default normalizeFhirAppointment;
