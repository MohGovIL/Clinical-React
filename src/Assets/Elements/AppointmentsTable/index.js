import React from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const AppointmentsTable = (props) => {

    const TableHeader = [
        'Private information',

    ];

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {/*TODO
                        Iterate over the Table header to the same for each data table
                       */ }
                </TableRow>
            </TableHead>
        </Table>
    );
};

export default AppointmentsTable;
