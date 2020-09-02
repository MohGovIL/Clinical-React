import { FHIR } from 'Utils/Services/FHIR';

export const encounterNotActiveFunction = async function (
  setTabs,
  selectFilter,
) {
  try {
    const encountersWithPatientsSummaryCount = await FHIR(
      'Encounter',
      'doWork',
      {
        functionName: 'getEncountersWithPatients',
        functionParams: {
          summary: true,
          date: this.isDateDisabled ? '' : selectFilter.filter_date,
          organization: selectFilter.filter_organization,
          serviceType: selectFilter.filter_service_type,
          statuses: this.statuses,
          extendedStatuses: this.extendedStatuses,
        },
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
