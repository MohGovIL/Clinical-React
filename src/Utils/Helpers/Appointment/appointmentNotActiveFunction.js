import { FHIR } from 'Utils/Services/FHIR';

export const appointmentNotActiveFunction = async function (
  setTabs,
  selectFilter,
) {
  try {
    // const appointmentsWithPatientsSummaryCount = await getAppointmentsWithPatients(true, selectFilter.filter_date, selectFilter.filter_organization, selectFilter.serviceType);
    const appointmentsWithPatientsSummaryCount = await FHIR(
      'Appointment',
      'doWork',
      {
        functionName: 'getAppointmentsWithPatients',
        functionParams: {
          summary: true,
          date: selectFilter.filter_date,
          organization: selectFilter.filter_organization,
          serviceType: selectFilter.filter_service_type,
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
      ].count = appointmentsWithPatientsSummaryCount.data.total;
      return prevTabsClone;
    });
  } catch (err) {
    console.log(err);
  }
};
