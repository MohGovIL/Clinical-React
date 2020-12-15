import React from 'react';
import CustomizedTableBadge from 'Assets/Elements/CustomizedTable/CustomizedTableBadge';
import TableCell from '@material-ui/core/TableCell';

const CustomizedTableBadgeCell = ({ badgeContent, align, padding }) => {
  return (
    <TableCell padding={padding} align={align}>
      <CustomizedTableBadge badgeContent={badgeContent} />
    </TableCell>
  );
};

export default CustomizedTableBadgeCell;
