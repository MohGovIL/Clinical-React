import normalizeFhirValueSet from '../FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { store } from 'index';
import { setAppointmentsWithPatientsAction } from 'Store/Actions/FhirActions/fhirActions';
import { FHIR } from 'Utils/Services/FHIR';
import { normalizeFhirAppointmentsWithPatients } from '../FhirEntities/normalizeFhirEntity/normalizeFhirAppointmentsWithPatients';

export const appointmentActiveFunction = async function (
  setTable,
  setTabs,
  history,
  selectFilter,
  setIsPopUpOpen,
) {
  try {
    //const appointmentsWithPatients = await getAppointmentsWithPatients(false, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.filter_service_type);
    const appointmentsWithPatients = await FHIR('Appointment', 'doWork', {
      functionName: 'getAppointmentsWithPatients',
      functionParams: {
        summary: false,
        date: selectFilter.filter_date,
        organization: selectFilter.filter_organization,
        serviceType: selectFilter.filter_service_type,
      },
    });

    if (!appointmentsWithPatients || !appointmentsWithPatients.data) {
      return;
    }

    const [patients, appointments] = normalizeFhirAppointmentsWithPatients(
      appointmentsWithPatients.data.entry,
    );
    setTabs((prevTabs) => {
      //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
      const prevTabsClone = [...prevTabs];
      prevTabsClone[
        prevTabsClone.findIndex(
          (prevTabsObj) => prevTabsObj.tabValue === this.tabValue,
        )
      ].count = appointmentsWithPatients.data.total;
      return prevTabsClone;
    });
    // const {data: {expansion: {contains}}} = await getValueSet('patient_tracking_statuses');

    const valueSet = await FHIR('ValueSet', 'doWork', {
      functionName: 'getValueSet',
      functionParams: { id: 'patient_tracking_statuses' },
    });
    let options = [];
    if (!valueSet) {
      return;
    }
    if (valueSet && valueSet.data && valueSet.data.expansion) {
      const {
        data: {
          expansion: { contains },
        },
      } = valueSet;
      for (let status of contains) {
        options.push(normalizeFhirValueSet(status));
      }
    }
    const table = this.tableFunction(
      patients,
      appointments,
      options,
      history,
      this.mode,
      setIsPopUpOpen,
    );
    setTable(table);
    store.dispatch(setAppointmentsWithPatientsAction(patients, appointments));
  } catch (err) {
    console.log(err);
  }
};
