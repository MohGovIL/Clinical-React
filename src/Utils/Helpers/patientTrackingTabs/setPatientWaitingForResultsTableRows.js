import {
    BADGE_CELL, BUTTON_CELL,
    LABEL_CELL,
    PERSONAL_INFORMATION_CELL, SELECT_CELL
} from "../../../Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes";
import moment from "moment";
import "moment/locale/he"
import {baseRoutePath} from "../baseRoutePath";
import {getEncountersWithPatients, getValueSet} from "../../Services/FhirAPI";
import {normalizeFhirEncountersWithPatients} from "../FhirEntities/normalizeFhirEntity/normalizeFhirEncountersWithPatients";
import normalizeFhirValueSet from "../FhirEntities/normalizeFhirEntity/normalizeFhirValueSet";
import {store} from "../../../index";
import {setEncounterWithPatientsAction} from "../../../Store/Actions/FhirActions/fhirActions";

//   ממתינים לפענוח
export const waitingForResultsTabActiveFunction = async function (setTable, setTabs, history, selectFilter) {
    try {
        const statuses = ['waiting-for-results'];
        const encountersWithPatients = await getEncountersWithPatients(false, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.filter_service_type, statuses);
        const [patients, encounters] = normalizeFhirEncountersWithPatients(encountersWithPatients.data.entry);
        setTabs(prevTabs => {
            //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
            const prevTabsClone = [...prevTabs];
            prevTabsClone[prevTabsClone.findIndex(prevTabsObj => prevTabsObj.tabValue === this.tabValue)].count = encountersWithPatients.data.total;
            return prevTabsClone;
        });
        const {data: {expansion: {contains}}} = await getValueSet('encounter_statuses');
        let options = [];
        for (let status of contains) {
            options.push(normalizeFhirValueSet(status));
        }
        const table = setPatientDataWaitingForResultsTableRows(patients, encounters, options, history, this.mode);

        setTable(table);

        store.dispatch(setEncounterWithPatientsAction(patients, encounters));
    } catch (err) {
        console.log(err);
    }
};

export const waitingForResultsTabNotActiveFunction = async function (setTabs, selectFilter) {
    try {
        const statuses = ['waiting-for-results'];
        const encountersWithPatientsSummaryCount = await getEncountersWithPatients(true, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.filter_service_type, statuses);
        setTabs(prevTabs => {
            //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
            const prevTabsClone = [...prevTabs];
            prevTabsClone[prevTabsClone.findIndex(prevTabsObj => prevTabsObj.tabValue === this.tabValue)].count = encountersWithPatientsSummaryCount.data.total;
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
        tableHeader: 'Encounter sheet',
        hideTableHeader: true,
        component: BUTTON_CELL,
    },

]; //Needs to be placed in another place in the project

const setPatientDataWaitingForResultsTableRows = (patients, encounters, options, history, mode) => {
    /* console.log("mode 1 = "+ mode);*/
    let result = [];
    let rows = [];
    for (let [encountersId, encounter] of Object.entries(encounters)) {
        let row = [];
        for (let columnIndex = 0; columnIndex < tableHeaders.length; columnIndex++) {
            const patient = patients[encounter.patient];
            switch (tableHeaders[columnIndex].tableHeader) {
                case 'Personal information':
                    row.push({
                        id: patient.identifier,
                        priority: encounter.priority,
                        gender: patient.gender,
                        firstName: patient.firstName,
                        lastName: patient.lastName,
                        align: 'right',
                    });
                    break;
                case 'Encounter sheet':
                    row.push({
                        label: 'Encounter Sheet',
                        padding: 'none',
                        align: 'center',
                        color: 'primary',
                        onClickHandler() {
                            console.log();
                        },
                        mode
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
                        onChange() {
                            // try{
                            //     const updateAppointmentStatus();
                            //
                            // }catch (err) {
                            //     console.log(err);
                            // }
                        },
                        text_color: '#076ce9',
                        padding: 'none',
                        value: encounter.status,
                        options,
                        align: 'center',
                        background_color: '#eaf7ff',
                        icon_color: '#076ce9',
                        langDirection: 'rtl',
                        mode: 'view'
                    });
                    break;
                case 'Cell phone':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: patient.mobileCellPhone || null,
                        color: '#0027a5'
                    });
                    break;
                case 'Healthcare service':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: encounter.serviceType ? encounter.serviceType.join(' ') : null
                    });
                    break;
                case 'Test':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: encounter.examination ? encounter.examination.join(' ') : null
                    });
                    break;
                case 'Time':
                    row.push({
                        padding: 'none',
                        align: 'center',
                        label: moment.utc(encounter.startTime).format('LT')
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
