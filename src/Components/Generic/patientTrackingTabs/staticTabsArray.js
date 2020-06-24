import { emergencyTabs } from 'Components/Emergency/getStaticTabs';
import { imagingTabs } from 'Components/Imaging/getStaticTabs';
import { getTabs } from 'Components/Generic/patientTrackingTabs/getTabs';

export const getStaticTabsArray = (verticalName) => {
  switch (verticalName) {
    case 'imaging':
      return getTabs(imagingTabs);
    case 'emergency':
      return getTabs(emergencyTabs);
    default:
      return [];
  }
};
