import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import CustomizedSelect from 'Assets/Elements/CustomizedSelect';

const CustomizedTableSelectCell = ({
  padding,
  align,
  background_color,
  icon_color,
  defaultValue,
  text_color,
  options,
  onChange,
  langDirection,
  mode,
}) => {
  return (
    <TableCell padding={padding} align={align}>
      <CustomizedSelect
        background_color={background_color}
        icon_color={icon_color}
        defaultValue={defaultValue}
        text_color={text_color}
        options={options}
        onChange={onChange}
        langDirection={langDirection}
        mode={mode}
      />
    </TableCell>
  );
};

export default CustomizedTableSelectCell;
