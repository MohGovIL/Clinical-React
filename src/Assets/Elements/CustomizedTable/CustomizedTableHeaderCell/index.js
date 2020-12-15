import React from 'react';
import CustomizedTableHeaderCellStyle from './Style';
import { useSelector } from 'react-redux';
const CustomizedTableHeaderCell = ({ align, children }) => {
  const direction = useSelector((state) =>
    state.settings.lang_dir === 'rtl' ? 'right' : 'left',
  );
  return (
    <CustomizedTableHeaderCellStyle align={align || direction}>
      {children}
    </CustomizedTableHeaderCellStyle>
  );
};

export default CustomizedTableHeaderCell;
