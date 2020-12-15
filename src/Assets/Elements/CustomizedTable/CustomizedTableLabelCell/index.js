import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledTableCell from './Style';
import { useSelector } from 'react-redux';
const CustomizedTableLabelCell = ({ padding, align, label, color }) => {
  const { t } = useTranslation();
  const direction = useSelector((state) =>
    state.settings.lang_dir === 'rtl' ? 'right' : 'left',
  );
  return (
    <StyledTableCell padding={padding} align={align || direction} color={color}>
      {Array.isArray(label)
        ? label.map((labelEl) => t(labelEl)).join(', ')
        : t(label)}
    </StyledTableCell>
  );
};

export default CustomizedTableLabelCell;
