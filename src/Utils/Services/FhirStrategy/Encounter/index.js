import moment from "moment";

const Encounter = () => {
    let fhirTokenInstance = null;
    let fhirBasePath = null;

    const doWork = (params) => {
        fhirTokenInstance = params.fhirTokenInstance;
        fhirBasePath = params.fhirBasePath;
    };

    const codingArr = arr => {
        return arr.map(arrEl => ({'code': arrEl}))
    }

    const createNewEncounter = (appointment, facility) => {
        let coding = codingArr(appointment.serviceTypeCode);
        const serviceType = {
            coding
        };
        // Todo fix reasonCode in here can't do it since I don't have the encounter normalizer fix from develop.
        // coding = codingArr(appointment.examinationCode);
        // const reasonCode = appointment.examinationCode
        // appointment.examination.forEach(element => {

        // });
    const reasonCode = appointment.examinationCode.map(examination => {
            return {
                "coding": [
                    {
                        "code": examination
                    }
                ]
            }
        });
        return fhirTokenInstance().post(`${fhirBasePath}/Encounter`, {
            'priority': {
                'coding': [
                    {
                        'code': appointment.priority,
                    },
                ],
            },
            'status': 'planned',
            serviceType,
            reasonCode,
            'subject': {
                'reference': `Patient/${appointment.patient}`,
            },
            'appointment': [
                {
                    'reference': `Appointment/${appointment.id}`,
                },
            ],
            'period': {
                'start': moment().format('YYYY-MM-DDTHH:mm:ss[Z]'),
            },
            'serviceProvider': {
                'reference': `Organization/${facility}`,
            },
        });
    };

    const encountersWithPatientsBasePath = summary => `/Encounter?_sort=date${summary ? '&_summary=count' : '&_include=Encounter:patient'}`;

    const getEncountersWithPatients = (summary = false, date = '', serviceProvider = '', serviceType = '', statuses = []) => {
        let statusesString = '';
        for (let status of statuses) {
            statusesString = statusesString.concat(`&status=${status}`)
        }
        return fhirTokenInstance().get(`${fhirBasePath}${encountersWithPatientsBasePath(summary)}${statusesString ? statusesString : ''}${date ? `&date=eq${date}` : ''}${serviceProvider ? `&service-provider=${serviceProvider}` : ''}${serviceType ? `&service-type=${serviceType}` : ''}${summary ? `&_summary=count` : ''}`);
    };

    const getCurrentEncounterPerPatient = (date,patient) =>{
        //PC-216 endpoint: /Encounter?date=eq<TODAY>&patient=<PID>
        try {
            return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=eq${date}&patient=${patient}`);
        }
        catch(err){
            console.log(err);
            return null;
        }
    };

    const getNextPrevEncounterPerPatient = (date,patient,prev) =>{
        //PC-216 endpoint: /Encounter?date=le<DATE>&_count=1&_sort=-date&patient=<PID>
        try {
            if (prev) {
                return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=le${date}&_count=1&_sort=-date&patient=${patient}`);
            } else {
                return fhirTokenInstance().get(`${fhirBasePath}/Encounter?date=gt${date}&_count=1&_sort=-date&patient=${patient}`);
            }
        }
        catch(err){
            console.log(err);
            return null;
        }

    };
};

export default Encounter;
