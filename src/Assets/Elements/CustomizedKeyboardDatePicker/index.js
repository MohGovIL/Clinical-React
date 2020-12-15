import React from 'react';
import { useSelector } from 'react-redux';
import StyledKeyboardDatePicker from './Style';

/**
 * @author Idan Gigi idangi@matrix.co.il
 * @param {MuiKeyBoardDatePickerProps} MuiKeyBoardDatePickerProps
 * @returns {ReactElement}
 */
const CustomizedKeyboardDatePicker = ({ ...MuiKeyBoardDatePickerProps }) => {
  const direction = useSelector((state) => state.settings.lang_dir);
  return (
    <StyledKeyboardDatePicker
      {...MuiKeyBoardDatePickerProps}
      direction={direction}
    />
  );
};

export default CustomizedKeyboardDatePicker;
