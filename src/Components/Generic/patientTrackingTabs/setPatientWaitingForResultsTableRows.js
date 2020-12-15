import  { formatShortDate }  from 'Utils/Helpers/Datetime/formatDate';
import { store } from 'index';
import { goToEncounterSheet } from 'Utils/Helpers/goTo/goToEncounterSheet';
import { getTableHeaders } from './tableHeaders';

//   ממתינים לפענוח
export const setPatientDataWaitingForResultsTableRows = (
  patients,
  encounters,
  options,
  history,
  mode,
) => {
  let result = [];
  let rows = [];
  const tableHeadersId = [
    'personalInformation',
    'cellPhone',
    'healthcareService',
    'reasonForReferral',
    'date',
    'status',
    'messages',
    'encounterSheet',
  ];
  const tableHeaders = getTableHeaders(tableHeadersId);
  for (let [encountersId, encounter] of Object.entries(encounters)) {
    let row = [];
    for (
      let columnIndex = 0;
      columnIndex < tableHeaders.length;
      columnIndex++
    ) {
      const patient = patients[`#${encounter.patient}`];
      switch (tableHeaders[columnIndex].tableHeader) {
        case 'Personal information':
          row.push({
            id: patient.identifier,
            idType: patient.identifierTypeText,
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
            padding: 'default',
            align: 'center',
            color: 'primary',
            onClickHandler() {
              goToEncounterSheet(encounter, patient, history);
            },
            mode,
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
            onChange() {
              // try{
              //     const updateAppointmentStatus();
              //
              // }catch (err) {
              //     console.log(err);
              // }
            },
            text_color: '#076ce9',
            padding: 'default',
            defaultValue: encounter.status,
            options,
            align: 'center',
            background_color: '#eaf7ff',
            icon_color: '#076ce9',
            langDirection: 'rtl',
            mode: 'view',
          });
          break;
        case 'Cell phone':
          row.push({
            padding: 'default',
            align: 'center',
            label: patient.mobileCellPhone || null,
            color: '#0027a5',
          });
          break;
        case 'Healthcare service':
          row.push({
            padding: 'default',
            label: encounter.serviceType ? encounter.serviceType : null,
          });
          break;
        case 'Reason for refferal':
          row.push({
            padding: 'default',
            label: encounter.examination ? encounter.examination : null,
          });
          break;
        case 'Date':
          row.push({
            padding: 'default',
            align: 'center',
            label: formatShortDate(encounter.startTime,store.getState().settings.format_date),
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
