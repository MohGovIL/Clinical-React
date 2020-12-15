import React from 'react';
import StyledBadge from './Style';

const CustomizedTableBadge = ({ badgeContent }) => {
  return (
    <StyledBadge badgeContent={badgeContent}>
      <b>{badgeContent}</b>
    </StyledBadge>
  );
};

export default CustomizedTableBadge;
