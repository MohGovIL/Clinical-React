const normalizeFhirEncounter = encounter => {

    const patient = encounter.subject ? encounter.subject.reference.split('/')[1] : null;

    const appointment = encounter.appointment ? encounter.appointment.map(appointmentObj => appointmentObj.reference.split('/')[1]) : null;

    let examinationCode = null
    let examination = null;
    if (encounter.reasonCode && encounter.reasonCode.length > 0){
        if(encounter.reasonCode.every(reasonCodeObj => reasonCodeObj.coding)){
            examinationCode = encounter.reasonCode.map(reasonCodeObj => reasonCodeObj.coding[0].code);
            examination = encounter.reasonCode.map(reasonCodeObj => reasonCodeObj.text);
        }
    }

    const serviceProvider = encounter.serviceProvider ? encounter.serviceProvider.reference.split('/')[1] : null;

    let serviceType = null;
    let serviceTypeCode = null;
    if(encounter.serviceType && encounter.serviceType.length > 0){
        if(encounter.serviceType.every(serviceTypeObj => serviceTypeObj.coding)){
            serviceTypeCode = encounter.serviceType.map(serviceTypeCodeObj => serviceTypeCodeObj.coding[0].code);
            serviceType = encounter.serviceType.map(serviceTypeObj => serviceTypeObj.text);
        }
    }

    return {
        id: encounter.id,
        priority: encounter.priority.length ? encounter.priority.coding[0].code : null,
        status: encounter.status,
        startTime: encounter.period ? encounter.period.start : null,
        patient,
        appointment,
        serviceProvider,
        serviceType,
        examinationCode,
        examination,
        serviceTypeCode
    }
};

export default normalizeFhirEncounter;
