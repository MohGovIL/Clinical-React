import React from 'react';
import StyledTab from './Style';
const HeaderTab = ({ selected, Label, tabsHandler, tabIndex }) => {
  return (
    <StyledTab
      selected={selected}
      label={Label}
      onClick={() => tabsHandler(tabIndex)}
    />
  );
};

export default HeaderTab;
