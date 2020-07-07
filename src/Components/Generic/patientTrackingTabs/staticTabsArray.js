import { emergencyTabs } from 'Components/Emergency/getStaticTabs';
import { imagingTabs } from 'Components/Imaging/getStaticTabs';

export const getStaticTabsArray = (verticalName) => {
  switch (verticalName) {
    case 'imaging':
      return imagingTabs;
    case 'emergency':
      return emergencyTabs;
    default:
      return [];
  }
};
