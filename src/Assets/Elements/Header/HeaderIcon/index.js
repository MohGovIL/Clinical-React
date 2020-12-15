import React from 'react';
import StyledSearchIcon from './Style';
import IconWrapper from 'Assets/Elements/Header/IconWrapper'
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
