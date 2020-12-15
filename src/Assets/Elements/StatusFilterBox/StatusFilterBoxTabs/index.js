import React from 'react';
import StyledStatusFilterBoxTabs from './Style';
import StatusFilterBoxTab from './StatusFilterBoxTab';
import { useTranslation } from 'react-i18next';

const StatusFilterBoxTabs = ({ value, orientation, tabsHandler, tabs }) => {
  const { t } = useTranslation();

  return (
    <StyledStatusFilterBoxTabs
      value={value}
      orientation={orientation}
      variant={'fullWidth'}>
      {tabs.map((tabObj, tabIndex) => (
        <StatusFilterBoxTab
          key={tabIndex}
          label={t(tabObj.tabName)}
          selected={value === tabObj.tabValue}
          tabHandler={tabsHandler}
          tabValue={tabObj.tabValue}
          count={tabObj.count}
        />
      ))}
    </StyledStatusFilterBoxTabs>
  );
};

export default StatusFilterBoxTabs;
