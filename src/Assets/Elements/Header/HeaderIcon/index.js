import React from 'react';
import StyledSearchIcon, { IconWrapper } from './Style';

const HeaderIcon = ({ onClick, alt, img }) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <IconWrapper>
      <StyledSearchIcon alt={alt} src={img} onClick={onClickHandler} />
    </IconWrapper>
  );
};

export default HeaderIcon;
