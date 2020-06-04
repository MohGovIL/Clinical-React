import React from 'react';
import StyledTextField from './Style';
import { useSelector } from 'react-redux';

/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {String} iconColor
 * @param {String} width
 * @param {MuiTextFieldProps}
 * @returns {ReactElement}
 */
const CustomizedTextField = ({ width, iconColor, ...MuiTextFieldProps }) => {
  const direction = useSelector((state) => state.settings.lang_dir);
  return (
    <StyledTextField
      direction={direction}
      {...MuiTextFieldProps}
      width={width}
      iconColor={iconColor}
    />
  );
};

export default CustomizedTextField;
