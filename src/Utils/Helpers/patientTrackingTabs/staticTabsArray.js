import { emergencyTabs } from 'Utils/Helpers/Emergency/getStaticTabs';
import { imagingTabs } from 'Utils/Helpers/Imaging/getStaticTabs';
import { getTabs } from 'Utils/Helpers/patientTrackingTabs/getTabs';

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
