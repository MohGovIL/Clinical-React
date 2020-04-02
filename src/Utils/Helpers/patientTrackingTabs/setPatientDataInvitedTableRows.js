import {baseRoutePath} from '../baseRoutePath';
import {
    BADGE_CELL, BUTTON_CELL,
    LABEL_CELL,
    PERSONAL_INFORMATION_CELL, SELECT_CELL,
} from '../../../Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes';
import {getAppointmentsWithPatients, getValueSet, updateAppointmentStatus, createNewEncounter} from '../../Services/FhirAPI';
import moment from 'moment';
import 'moment/locale/he';
import {normalizeFhirAppointmentsWithPatients} from '../FhirEntities/normalizeFhirEntity/normalizeFhirAppointmentsWithPatients';
import normalizeFhirAppointment from '../FhirEntities/normalizeFhirEntity/normalizeFhirAppointment';
import normalizeFhirValueSet from '../FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import {store} from '../../../index';
import {setAppointmentsWithPatientsAction, updateAppointmentAction} from '../../../Store/Actions/FhirActions/fhirActions';
import { setEncounterAndPatient } from '../../../Store/Actions/ActiveActions';
import normalizeFhirEncounter from '../FhirEntities/normalizeFhirEntity/normalizeFhirEncounter/index';
import {FhirStrategy} from "../../Services/FhirStrategy";
import Appointment from "../../Services/FhirStrategy/Appointment";

//מוזמנים
export const invitedTabActiveFunction = async function (setTable, setTabs, history, selectFilter) {
    try {
       /* const appointmentsWithPatients = await getAppointmentsWithPatients(false, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.filter_service_type);*/

        const appointmentsWithPatients =  await  FhirStrategy('Appointment','doWork',{"functionName":'getAppointmentsWithPatients','functionParams':{"summery":false,'date' : selectFilter.filter_date, 'organization' : selectFilter.filter_organization, 'serviceType' : selectFilter.filter_service_type}});

        if(!appointmentsWithPatients || !appointmentsWithPatients.data)
            return;

        const [patients, appointments] = normalizeFhirAppointmentsWithPatients(appointmentsWithPatients.data.entry);
        setTabs(prevTabs => {
            //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
            const prevTabsClone = [...prevTabs];
            prevTabsClone[prevTabsClone.findIndex(prevTabsObj => prevTabsObj.tabValue === this.tabValue)].count = appointmentsWithPatients.data.total;
            return prevTabsClone;
        });
        const {data: {expansion: {contains}}} = await getValueSet('patient_tracking_statuses');
        let options = [];
        for (let status of contains) {
            options.push(normalizeFhirValueSet(status));
        }
        const table = setPatientDataInvitedTableRows(patients, appointments, options, history, this.mode);
        setTable(table);

        store.dispatch(setAppointmentsWithPatientsAction(patients, appointments));
    } catch (err) {
        console.log(err);
    }
};

export const invitedTabNotActiveFunction = async function (setTabs, selectFilter) {
    try {
        const appointmentsWithPatientsSummaryCount = await getAppointmentsWithPatients(true, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.serviceType);
        setTabs(prevTabs => {
            //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
            const prevTabsClone = [...prevTabs];
            prevTabsClone[prevTabsClone.findIndex(prevTabsObj => prevTabsObj.tabValue === this.tabValue)].count = appointmentsWithPatientsSummaryCount.data.total;
            return prevTabsClone;
        });
    } catch (err) {
        console.log(err);
    }
};

const tableHeaders = [
    {
        tableHeader: 'Personal information',
        hideTableHeader: false,
        component: PERSONAL_INFORMATION_CELL,
    },
    {
        tableHeader: 'Cell phone',
        hideTableHeader: false,
        component: LABEL_CELL,
    },
    {
        tableHeader: 'Healthcare service',
        hideTableHeader: false,
        component: LABEL_CELL,
    },
    {
        tableHeader: 'Test',
        hideTableHeader: false,
        component: LABEL_CELL,
    },
    {
        tableHeader: 'Time',
        hideTableHeader: false,
        component: LABEL_CELL,
    },
    {
        tableHeader: 'Status',
        hideTableHeader: false,
        component: SELECT_CELL,
    },
    {
        tableHeader: 'Messages',
        hideTableHeader: false,
        component: BADGE_CELL,
    },
    {
        tableHeader: 'Patient admission',
        hideTableHeader: true,
        component: BUTTON_CELL,
    },

]; //Needs to be placed in another place in the project

const setPatientDataInvitedTableRows = (patients, appointments, options, history, mode) => {
    /* console.log("mode 1 = "+ mode);*/
    let result = [];
    let rows = [];
    for (let [appointmentId, appointment] of Object.entries(appointments)) {
        let row = [];
        for (let columnIndex = 0; columnIndex < tableHeaders.length; columnIndex++) {
            const patient = patients[appointment.patient];
            switch (tableHeaders[columnIndex].tableHeader) {
                case 'Personal information':
                    row.push({
                        id: patient.identifier,
                        idType: patient.identifierType,
                        priority: appointment.priority,
                        gender: patient.gender,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        align: 'right',
                    });
                    break;
                case 'Patient admission':
                    row.push({
                        label: 'Patient Admission',
                        padding: 'none',
                        align: 'center',
                        color: 'primary',
                        async onClickHandler() {
                            const appointment  = store.getState().fhirData.appointments[appointmentId];
                            const patient = store.getState().fhirData.patients[appointment.patient]
                            const encounterData = await createNewEncounter(appointment ,store.getState().settings.facility)
                            store.dispatch(setEncounterAndPatient(normalizeFhirEncounter(encounterData.data), patient));
                            history.push({
                                pathname: `${baseRoutePath()}/imaging/patientAdmission`,
                            });
                        },
                        mode: moment(appointment.startTime).isAfter(moment()) ? 'view' : mode,
                    });
                    break;
                case 'Messages':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        badgeContent: 0,
                    });
                    break;
                case 'Status':
                    row.push({
                        async onChange(code) {
                            try{
                                const updatedAppointment = await updateAppointmentStatus(appointmentId, code);
                                const appointment = normalizeFhirAppointment(updatedAppointment.data);
                                store.dispatch(updateAppointmentAction(appointment))
                                return true;
                            }catch (err) {
                                return false;
                            }
                        },
                        text_color: '#076ce9',
                        padding: 'none',
                        defaultValue: appointment.status,
                        options,
                        align: 'center',
                        background_color: '#eaf7ff',
                        icon_color: '#076ce9',
                        langDirection: 'rtl',
                        mode,
                    });
                    break;
                case 'Cell phone':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: patient.mobileCellPhone,
                        color: '#0027a5',
                    });
                    break;
                case 'Healthcare service':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: appointment.serviceType ? appointment.serviceType : null,
                    });
                    break;
                case 'Test':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: appointment.examination ? appointment.examination : null,
                    });
                    break;
                case 'Time':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: moment.utc(appointment.startTime).format('LT'),
                    });
                    break;
                default:
                    break;
            }
        }
        rows.push(row);
    }
    result[0] = tableHeaders;
    result[1] = rows;
    return result;
};
