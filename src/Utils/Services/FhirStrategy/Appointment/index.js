const Appointments = () => {
    let fhirTokenInstance = null;
    let fhirBasePath = null;

    const doWork = (params) => {
        fhirTokenInstance = params.fhirTokenInstance;
        fhirBasePath = params.fhirBasePath;
    };

    const getNextPrevAppointmentPerPatient = (date, patient,prev) =>{
        //PC-216 endpoint: /Appointment?date=ge<DATE>&_count=1&_sort=date&patient=<PID>&status:not=arrived&status:not=booked&status:not=cancelled
        try {
            if (prev) {
                return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=le${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            } else {
                return fhirTokenInstance().get(`${fhirBasePath}/Appointment?date=ge${date}&_count=1&_sort=date&patient=${patient}&status:not=arrived&status:not=booked&status:not=cancelled`);
            }
        }
        catch(err){
            console.log(err);
            return null;
        }
    };

    const appointmentsWithPatientsBasePath = summary => `${fhirBasePath}/Appointment?status:not=arrived&_sort=date${summary ? '&_summary=count' : '&_include=Appointment:patient'}`;

    const getAppointmentsWithPatients = (summary = false, date = '', organization = '', serviceType = '') => {
        return fhirTokenInstance().get(`${appointmentsWithPatientsBasePath(summary)}${date ? `&date=eq${date}` : ''}${organization ? `&actor:HealthcareService.organization=${organization}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}`);
    };


    const updateAppointmentStatus = (appointmentId, value) => {
        return fhirTokenInstance().patch(`${fhirBasePath}/Appointment/${appointmentId}`, [{
            op: 'replace',
            path: '/status',
            value,
        }]);
    };
    /*
    *
    *
    * const search = function (params){

    };
    const read = function (params){

    };
    const patch = function (params){

    };
    const update = function (params){

    };
    const create = function (params){

    };
    *
    * */


}

export default Appointments;
