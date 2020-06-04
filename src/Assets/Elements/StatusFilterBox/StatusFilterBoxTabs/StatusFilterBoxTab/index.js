import React from 'react';
import StyledStatusFilterBoxTab from './Style';
import StyledFilterBoxBadge from './StyledFilterBoxBadge/Style';
import { useSelector } from 'react-redux';
//TODO fix the flex layout so the items inside (Label and badge) look the same way they are in Zeplin aligned right
const StatusFilterBoxTab = ({
  label,
  selected,
  tabValue,
  tabHandler,
  count,
}) => {
  const direction = useSelector((state) => state.settings.lang_dir);
  const badge = (
    <StyledFilterBoxBadge
      badgeContent={count}
      color={'primary'}
      selected={selected}
      direction={direction}
    />
  );
  return (
    <StyledStatusFilterBoxTab
      label={label}
      icon={badge}
      selected={selected}
      onClick={() => tabHandler(tabValue)}
      wrapped={true}
    />
  );
};

export default StatusFilterBoxTab;
