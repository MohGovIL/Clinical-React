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
    const searchParameters = {
      summary: false,
      organization: selectFilter.filter_organization,
      serviceType: selectFilter.filter_service_type,
      statuses: this.statuses,
      sortParams: this.sort,
      extendedStatuses: this.extendedStatuses,
    };
    if (!this.isDateDisabled) {
      if (this.searchDateColumn) {
        searchParameters[this.searchDateColumn] = selectFilter.filter_date;
      } else {
        searchParameters['date'] = selectFilter.filter_date;
      }
    }
    const encountersWithPatients = await FHIR('Encounter', 'doWork', {
      functionName: 'getEncountersWithPatients',
      functionParams: searchParameters,
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
    const APIStatuses = [];
    const mainStatus = FHIR('ValueSet', 'doWork', {
      functionName: 'getValueSet',
      functionParams: { id: 'encounter_statuses' },
    });
    APIStatuses.push(mainStatus);
    if (this.valueSet) {
      const secStatus = FHIR('ValueSet', 'doWork', {
        functionName: 'getValueSet',
        functionParams: {
          id: this.valueSet,
        },
      });
      APIStatuses.push(secStatus);
    }
    const statuses = await Promise.all(APIStatuses);
    let options = [];
    let secOptions = [];
    let {
      data: {
        expansion: { contains },
      },
    } = statuses[0];
    for (let status of contains) {
      options.push(normalizeFhirValueSet(status));
    }
    if (this.valueSet) {
      let {
        data: {
          expansion: { contains },
        },
      } = statuses[1];
      for (let status of contains) {
        secOptions.push(normalizeFhirValueSet(status));
      }
    }
    const table = this.tableFunction(
      patients,
      encounters,
      options,
      history,
      this.mode,
      secOptions,
    );

    setTable(table);

    store.dispatch(setEncounterWithPatientsAction(patients, encounters));
  } catch (err) {
    console.log(err);
  }
};
