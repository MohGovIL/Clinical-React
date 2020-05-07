import React from 'react';
import StyledDropDownItem from './Style';
const HeaderDropDownItem = (props) => {
  const onClickHandler = () => {
    if (props.Function) {
      props.Function();
    }
  };

  return (
    <StyledDropDownItem onClick={onClickHandler}>
      {props.Label}
    </StyledDropDownItem>
  );
};

export default HeaderDropDownItem;
