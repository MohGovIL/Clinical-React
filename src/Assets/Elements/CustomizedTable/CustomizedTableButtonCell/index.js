import React from 'react';
import CustomizedTableButton from "../CustomizedTableButton";
import TableCell from "@material-ui/core/TableCell";

const CustomizedTableButtonCell = ({padding, align, onClickHandler, variant, color, label, mode}) => {

    return (
        <TableCell padding={padding} align={align}>
            <CustomizedTableButton mode={mode} variant={variant} color={color} label={label} onClickHandler={onClickHandler}/>
        </TableCell>
    );
};

export default CustomizedTableButtonCell;
