import { FHIR } from 'Utils/Services/FHIR';

export const encounterNotActiveFunction = async function (
  setTabs,
  selectFilter,
) {
  try {
    const searchParameters = {
      summary: true,
      organization: selectFilter.filter_organization,
      serviceType: selectFilter.filter_service_type,
      statuses: this.statuses,
      extendedStatuses: this.extendedStatuses,
    }
    if (!this.isDateDisabled) {
      if (this.searchDateColumn) {
        searchParameters[this.searchDateColumn] = selectFilter.filter_date;
      } else {
        searchParameters['date'] = selectFilter.filter_date;
      }
    }
    const encountersWithPatientsSummaryCount = await FHIR(
      'Encounter',
      'doWork',
      {
        functionName: 'getEncountersWithPatients',
        functionParams:searchParameters
      },
    );
    setTabs((prevTabs) => {
      //Must be copied with ... operator so it will change reference and re-render StatusFilterBoxTabs
      const prevTabsClone = [...prevTabs];
      prevTabsClone[
        prevTabsClone.findIndex(
          (prevTabsObj) => prevTabsObj.tabValue === this.tabValue,
        )
      ].count = encountersWithPatientsSummaryCount.data.total;
      return prevTabsClone;
    });
  } catch (err) {
    console.log(err);
  }
};
