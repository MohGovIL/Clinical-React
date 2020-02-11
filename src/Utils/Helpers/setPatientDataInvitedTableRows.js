import {baseRoutePath} from "./baseRoutePath";

const setPatientDataInvitedTableRows = (appointments, tableHeaders, options, history) => {
    let rows = [];
    for (let rowsIndex = 0; rowsIndex < appointments.length; rowsIndex++) {
        let row = [];
        const appointment = appointments[rowsIndex];
        for (let columnIndex = 0; columnIndex < tableHeaders.length; columnIndex++) {
            switch (tableHeaders[columnIndex].tableHeader) {
                case 'Personal information':
                    row.push({
                        id: appointment.participants?.patient.identifier,
                        priority: appointment.priority,
                        gender: appointment.participants?.patient.gender,
                        firstName: appointment.participants?.patient.firstName,
                        lastName: appointment.participants?.patient.lastName,
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
                                search: `?index=${rowsIndex}`
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
                        options: options[0],
                        align: 'center',
                        background_color: '#eaf7ff',
                        icon_color: '#076ce9'
                    });
                    break;
                case 'Cell phone':
                    row.push({
                        padding: 'none',
                        align: 'right',
                        label: appointment.participants?.patient?.mobileCellPhone ? appointment.participants.patient.mobileCellPhone : null,
                        color: '#0027a5'
                    });
                    break;
                case 'Healthcare service':
                    row.push({
                        padding: 'none',
                        align: 'right',
                        label: appointment.healthcareService
                    });
                    break;
                case 'Test':
                    row.push({
                        padding: 'none',
                        align: 'right',
                        label: appointment.examination
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
        rows[rowsIndex] = [...row];
    }
    return rows;
};

export default setPatientDataInvitedTableRows;
