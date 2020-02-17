import {baseRoutePath} from "./baseRoutePath";
import {
    BADGE_CELL, BUTTON_CELL,
    LABEL_CELL,
    PERSONAL_INFORMATION_CELL, SELECT_CELL
} from "../../Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes";

const tableHeaders = [
    {
        tableHeader: 'Personal information',
        hideTableHeader: false,
        component: PERSONAL_INFORMATION_CELL
    },
    {
        tableHeader: 'Cell phone',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Healthcare service',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Test',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Time',
        hideTableHeader: false,
        component: LABEL_CELL
    },
    {
        tableHeader: 'Status',
        hideTableHeader: false,
        component: SELECT_CELL
    },
    {
        tableHeader: 'Messages',
        hideTableHeader: false,
        component: BADGE_CELL
    },
    {
        tableHeader: 'Patient admission',
        hideTableHeader: true,
        component: BUTTON_CELL,
    },

]; //Needs to be placed in another place in the project

const setPatientDataInvitedTableRows = (patients, appointments, options, history) => {
    let result = [];
    let rows = [];
    for (let [appointmentId, appointment] of Object.entries(appointments)) {
        let row = [];
        for (let columnIndex = 0; columnIndex < tableHeaders.length; columnIndex++) {
            const patient = patients[appointment.participantPatient];
            switch (tableHeaders[columnIndex].tableHeader) {
                case 'Personal information':
                    row.push({
                        id: patient.id,
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
                        onClickHandler(){
                            history.push({
                                pathname: `${baseRoutePath()}/imaging/patientAdmission`,
                                search: `?index=${appointmentId}`
                            })
                        }
                    });
                    break;
                case 'Messages':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        badgeContent: 0
                    });
                    break;
                case 'Status':
                    row.push({
                        onChangeHandler: null,
                        text_color: '#076ce9',
                        padding: 'none',
                        value: appointment.status,
                        options: options,
                        align: 'center',
                        background_color: '#eaf7ff',
                        icon_color: '#076ce9'
                    });
                    break;
                case 'Cell phone':
                    row.push({
                        padding: 'none',
                        align: 'right',
                        label: patient.mobileCellPhone || null,
                        color: '#0027a5'
                    });
                    break;
                case 'Healthcare service':
                    row.push({
                        padding: 'none',
                        align: 'right',
                        label: appointment.serviceType ? appointment.serviceType.join(' ') : null
                    });
                    break;
                case 'Test':
                    row.push({
                        padding: 'none',
                        align: 'right',
                        label: appointment.examination ?  appointment.examination.join(' ') : null
                    });
                    break;
                case 'Time':
                    row.push({
                        padding: 'none',
                        align: 'right',
                        label: appointment.time
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

export default setPatientDataInvitedTableRows;
