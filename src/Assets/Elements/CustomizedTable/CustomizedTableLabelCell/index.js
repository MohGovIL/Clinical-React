import React from 'react';
import { useTranslation } from 'react-i18next';
import StyledTableCell from './Style';
const CustomizedTableLabelCell = ({ padding, align, label, color }) => {
  const { t } = useTranslation();
  return (
    <StyledTableCell padding={padding} align={align} color={color}>
      {Array.isArray(label)
        ? label.map((labelEl) => t(labelEl)).join(', ')
        : t(label)}
    </StyledTableCell>
  );
};

export default CustomizedTableLabelCell;
