import { FHIR } from 'Utils/Services/FHIR';
import { normalizeFhirEncountersWithPatients } from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirEncountersWithPatients';
import normalizeFhirValueSet from 'Utils/Helpers/FhirEntities/normalizeFhirEntity/normalizeFhirValueSet';
import { setEncounterWithPatientsAction } from 'Store/Actions/FhirActions/fhirActions';
import { store } from 'index';

export const encounterActiveFunction = async function (
  setTable,
  setTabs,
  history,
  selectFilter,
) {
  try {
    const encountersWithPatients = await FHIR('Encounter', 'doWork', {
      functionName: 'getEncountersWithPatients',
      functionParams: {
        summary: false,
        date: selectFilter.filter_date,
        organization: selectFilter.filter_organization,
        serviceType: selectFilter.filter_service_type,
        statuses: this.statuses,
        sortParams: this.sort,
      },
    });

    const [patients, encounters] = normalizeFhirEncountersWithPatients(
      encountersWithPatients.data.entry,
    );
    setTabs((prevTabs) => {
      //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
      const prevTabsClone = [...prevTabs];
      prevTabsClone[
        prevTabsClone.findIndex(
          (prevTabsObj) => prevTabsObj.tabValue === this.tabValue,
        )
      ].count = encountersWithPatients.data.total;
      return prevTabsClone;
    });
    const {
      data: {
        expansion: { contains },
      },
    } = await FHIR('ValueSet', 'doWork', {
      functionName: 'getValueSet',
      functionParams: { id: 'encounter_statuses' },
    });

    let options = [];
    for (let status of contains) {
      options.push(normalizeFhirValueSet(status));
    }
    const table = this.tableFunction(
      patients,
      encounters,
      options,
      history,
      this.mode,
    );

    setTable(table);

    store.dispatch(setEncounterWithPatientsAction(patients, encounters));
  } catch (err) {
    console.log(err);
  }
};
