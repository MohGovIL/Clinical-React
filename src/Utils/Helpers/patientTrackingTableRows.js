import {
    LABEL_CELL,
    PERSONAL_INFORMATION_CELL,
    BUTTON_CELL,
    BADGE_CELL,
    SELECT_CELL
} from "../../Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes";

const setPatientTrackingTableRows = (appointments, tableHeaders, options) => {
    let rows = [];
    for (let rowsIndex = 0; rowsIndex < appointments.length; rowsIndex++) {
        let row = [];
        for (let columnIndex = 0; columnIndex < tableHeaders; columnIndex++) {
            const appointment = appointments[rowsIndex];
            switch (tableHeaders.component) {
                //Run on the name of the table header
                case PERSONAL_INFORMATION_CELL:
                    row.push({
                        id: appointment.participants?.patient.identifier,
                        priority: appointment.priority,
                        gender: appointment.participants?.patient.gender,
                        firstName: appointment.participants?.patient.firstName,
                        lastName: appointment.participants?.patient.lastName,
                        align: 'right',
                    });
                    break;
                case BUTTON_CELL:
                    row.push({
                        label: 'Patient Admission',
                        padding: 'none',
                        align: 'center',
                        color: 'primary',
                        onClickHandler: null
                    });
                    break;
                case BADGE_CELL:
                    row.push({
                        padding: 'none',
                        align: 'center',
                        badgeContent: appointments.length
                    });
                    break;
                case SELECT_CELL:
                    row.push({
                        onChangeHandler: null,
                        text_color: '#076ce9',
                        padding: 'none',
                        value: appointment.status,
                        options,
                        align: 'center',
                        background_color: '#eaf7ff',
                        icon_color: '#076ce9'
                    });
                    break;
                case LABEL_CELL:
                    row.push({
                        padding: 'none',
                        align: 'center',
                        color: null,
                        label: null,
                    });
                    break;
                default:
                    console.log('not supported component');
                    break;
            }
        }
        rows.push(row);
    }
    return rows;
};

export default setPatientTrackingTableRows;
