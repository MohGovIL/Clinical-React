import React from 'react';
import StyledIconWrapper from './Style';
/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {boolean} open
 * @param {Function} onClick
 * @returns {ReactComponentElement}
 */
const IconWrapper = ({ open, onClick, children }) => {
  return <StyledIconWrapper onClick={onClick} open={open} >{children}</StyledIconWrapper>;
};

export default IconWrapper;