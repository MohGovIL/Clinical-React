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
    let startTime = null;
    let date = null;

    // if(encounter.period){
    //     if(encounter.period.start){
    //         const isPeriodValid = encounter.period.start.split(' ');
    //         if(isPeriodValid.length > 1){
    //             date = isPeriodValid[0];
    //             startTime = isPeriodValid[1];
    //         }
    //     }
    // }

    const serviceProvider = encounter.serviceProvider ? encounter.serviceProvider.reference.split('/')[1] : null;

    let serviceType = null;
    let serviceTypeCode = null;
    if(encounter.serviceType){
        if(encounter.serviceType.coding){
            serviceTypeCode =  encounter.serviceType.coding[0].code;
            serviceType = encounter.serviceType.text;
        }
    }

    return {
        id: encounter.id,
        priority: encounter.priority && encounter.priority.length ? encounter.priority.coding.code : null,
        status: encounter.status,
        startTime: encounter.period && encounter.period.start ? encounter.period.start : null,
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