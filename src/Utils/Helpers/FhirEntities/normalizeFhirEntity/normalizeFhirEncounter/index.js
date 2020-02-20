const normalizeFhirEncounter = encounter => {

    const patient = encounter.subject ? encounter.subject.reference.split('/')[1] : null;

    const appointment = encounter.appointment ? encounter.appointment.map(appointmentObj => appointmentObj.reference.split('/')[1]) : null;

    const startTime = encounter.period ? encounter.period.start : null;

    const serviceProvider = encounter.serviceProvider ? encounter.serviceProvider.reference.split('/')[1] : null;

    const serviceType = encounter.serviceType ? encounter.serviceType.coding[0].code : null;

    return {
        id: encounter.id,
        priority: encounter.priority,
        patient,
        appointment,
        startTime,
        serviceProvider,
        serviceType
    }
};

export default normalizeFhirEncounter;
