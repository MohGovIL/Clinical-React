import React from 'react';
import StyledButton from './Style';
import { useTranslation } from 'react-i18next';

const CustomizedTableButton = ({
  variant,
  color,
  label,
  onClickHandler,
  mode,
  other,
}) => {
  const { t } = useTranslation();
  /*  debugger;
    console.log("--------------------");
    console.log("mode Customized table button = "+ mode);
    console.log("--------------------");*/
  return (
    <StyledButton
      variant={variant}
      color={color}
      onClick={onClickHandler}
      disabled={mode === 'view'}
      {...other}>
      {t(label)}
    </StyledButton>
  );
};

export default CustomizedTableButton;
