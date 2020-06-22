import {
  BADGE_CELL,
  BUTTON_CELL,
  LABEL_CELL,
  PERSONAL_INFORMATION_CELL,
  SELECT_CELL,
} from 'Assets/Elements/CustomizedTable/CustomizedTableComponentsTypes';
import { updateAppointmentStatus } from 'Utils/Services/FhirAPI';
import moment from 'moment';
import 'moment/locale/he';
import normalizeFhirAppointment from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirAppointment';
import { store } from 'index';
import { updateAppointmentAction } from 'Store/Actions/FhirActions/fhirActions';
import normalizeFhirEncounter from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncounter/index';
import { FHIR } from 'Utils/Services/FHIR';
import { gotToPatientAdmission } from 'Utils/Helpers/goTo/gotoPatientAdmission';

// מוזמנים

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
    tableHeader: 'Reason for refferal',
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

export const setPatientDataInvitedTableRows = (
  patients,
  appointments,
  options,
  history,
  mode,
  setIsPopUpOpen,
) => {
  let result = [];
  let rows = [];
  for (let [appointmentId, appointment] of Object.entries(appointments)) {
    let row = [];
    for (
      let columnIndex = 0;
      columnIndex < tableHeaders.length;
      columnIndex++
    ) {
      const patient = patients[`#${appointment.patient}`];
      switch (tableHeaders[columnIndex].tableHeader) {
        case 'Personal information':
          row.push({
            id: patient.identifier,
            idType: patient.identifierTypeText,
            priority: appointment.priority,
            gender: patient.gender,
            firstName: patient.firstName,
            lastName: patient.lastName,
            padding: 'default',
            align: 'right',
          });
          break;
        case 'Patient admission':
          row.push({
            label: 'Patient Admission',
            padding: 'default',
            align: 'center',
            color: 'primary',
            async onClickHandler() {
              const appointment = store.getState().fhirData.appointments[
                appointmentId
              ];
              const patient = store.getState().fhirData.patients[
                `#${appointment.patient}`
              ];
              // const encounterData = await createNewEncounter(appointment ,store.getState().settings.facility)
              const plannedEncounter = await FHIR('Encounter', 'doWork', {
                functionName: 'searchEncounter',
                functionParams: {
                  searchParams: {
                    appointment: appointment.id,
                    status: 'planned',
                  },
                },
              });
              if (plannedEncounter.data.total === 0) {
                const encounterData = await FHIR('Encounter', 'doWork', {
                  functionName: 'createNewEncounter',
                  functionParams: {
                    appointment: appointment,
                    facility: store.getState().settings.facility,
                  },
                });
                gotToPatientAdmission(
                  normalizeFhirEncounter(encounterData.data),
                  patient,
                  history,
                );
              } else {
                setIsPopUpOpen(true);
              }
            },
            mode: moment(appointment.startTime).isSame(
              moment(new Date()),
              'day',
            )
              ? mode
              : 'view',
          });
          break;
        case 'Messages':
          row.push({
            padding: 'default',
            align: 'center',
            badgeContent: 0,
          });
          break;
        case 'Status':
          row.push({
            async onChange(code) {
              try {
                const updatedAppointment = await updateAppointmentStatus(
                  appointmentId,
                  code,
                );
                const appointment = normalizeFhirAppointment(
                  updatedAppointment.data,
                );
                store.dispatch(updateAppointmentAction(appointment));
                return true;
              } catch (err) {
                return false;
              }
            },
            text_color: '#076ce9',
            padding: 'default',
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
            padding: 'default',
            align: 'center',
            label: patient.mobileCellPhone,
            color: '#0027a5',
          });
          break;
        case 'Healthcare service':
          row.push({
            padding: 'default',
            align: 'center',
            label: appointment.serviceType ? appointment.serviceType : null,
          });
          break;
        case 'Reason for refferal':
          row.push({
            padding: 'default',
            align: 'center',
            label: appointment.examination ? appointment.examination : null,
          });
          break;
        case 'Time':
          row.push({
            padding: 'default',
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
