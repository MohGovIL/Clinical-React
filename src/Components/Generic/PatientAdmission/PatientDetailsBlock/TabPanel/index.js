import React from 'react';

function TabPanel(props) {
  const { children, value, selectedValue } = props;

  return <React.Fragment>{value === selectedValue && children}</React.Fragment>;
}

export default TabPanel;
